from fastapi import FastAPI, APIRouter, UploadFile, File, Form, Request, HTTPException, Header
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import uuid
import time
import ipaddress
import logging
from pathlib import Path
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
from datetime import datetime, timezone
from zoneinfo import ZoneInfo
from typing import List, Optional
import httpx

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "KSV Soluções Integradas")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO", "")
LEADS_EMAIL_TO = os.environ.get("LEADS_EMAIL_TO", "contato@ksvsolucoes.com.br")

WHATSAPP_SITE_NUMBER = os.environ.get("WHATSAPP_SITE_NUMBER", "")
WHATSAPP_NOTIFY_NUMBER = os.environ.get("WHATSAPP_NOTIFY_NUMBER", "")
WHATSAPP_API_URL = os.environ.get("WHATSAPP_API_URL", "")
WHATSAPP_API_TOKEN = os.environ.get("WHATSAPP_API_TOKEN", "")
WHATSAPP_MESSAGE = "Olá! Vim pelo site da KSV e gostaria de solicitar um orçamento."
INSTAGRAM_URL = os.environ.get("INSTAGRAM_URL", "")
ADMIN_KEY = os.environ.get("ADMIN_KEY", "")

UPLOAD_DIR = ROOT_DIR / os.environ.get("UPLOAD_DIR", "uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

BAHIA = ZoneInfo("America/Bahia")

TIPOS_SERVICO = ["Obra residencial", "Obra comercial", "Reforma residencial", "Reforma comercial", "Adequação",
                 "Infraestrutura", "Piso e revestimento", "Forro e acabamento", "Manutenção", "Climatização", "Outro"]
TIPOS_ATENDIMENTO = ["Orçamento", "Visita técnica"]
PERIODOS = ["Manhã", "Tarde"]
ALLOWED_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp4", ".mov", ".pdf", ".doc", ".docx"}
MAX_FILE_SIZE = 15 * 1024 * 1024
MAX_FILES = 5
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

_rate: dict = {}

def rate_ok(ip: str) -> bool:
    now = time.time()
    arr = [t for t in _rate.get(ip, []) if now - t < 600]
    if len(arr) >= 5:
        _rate[ip] = arr
        return False
    arr.append(now)
    _rate[ip] = arr
    return True


# ---------- Email guardrail gate ----------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: Optional[str] = None) -> Optional[str]:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    rt = reply_to or EMAIL_REPLY_TO
    if rt:
        payload["contact_email"] = rt
    async with httpx.AsyncClient(timeout=30) as c:
        resp = await c.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": EMAIL_KEY},
            json=payload,
        )
    resp.raise_for_status()
    return resp.json().get("id")


async def notify_whatsapp(message: str) -> str:
    # Fluxo preparado para provedor de WhatsApp Business (ex.: API oficial via broker,
    # Z-API, Evolution API). Basta configurar WHATSAPP_API_URL e WHATSAPP_API_TOKEN no .env.
    if not (WHATSAPP_API_URL and WHATSAPP_API_TOKEN and WHATSAPP_NOTIFY_NUMBER):
        return "nao_configurado"
    try:
        async with httpx.AsyncClient(timeout=20) as c:
            resp = await c.post(
                WHATSAPP_API_URL,
                headers={"Authorization": f"Bearer {WHATSAPP_API_TOKEN}", "Content-Type": "application/json"},
                json={"number": WHATSAPP_NOTIFY_NUMBER, "message": message},
            )
        return "enviado" if resp.status_code < 300 else f"erro_{resp.status_code}"
    except Exception as e:
        logger.error(f"WhatsApp notify error: {e}")
        return "erro_envio"


def build_email_html(d: dict) -> str:
    def row(label, value):
        return (f'<tr><td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:1px;'
                f'text-transform:uppercase;color:#949DAA;width:210px;vertical-align:top">{escape(label)}</td>'
                f'<td style="padding:10px 16px;font-family:Arial,sans-serif;font-size:14px;color:#E2E6EC">{value}</td></tr>')
    files_html = escape(", ".join(d["arquivos"])) if d["arquivos"] else "Nenhum"
    desc = escape(d["descricao"]).replace("\n", "<br/>")
    return (
        '<table role="presentation" width="100%" style="background:#0A0B0D;padding:32px 0"><tr><td align="center">'
        '<table role="presentation" width="640" style="background:#121418;border:1px solid #2D323E">'
        '<tr><td style="padding:24px;border-bottom:3px solid #FF6B00;font-family:Arial,sans-serif">'
        '<span style="font-size:18px;font-weight:bold;color:#FFFFFF;letter-spacing:2px">NOVO FORMULÁRIO — KSV SITE</span>'
        '</td></tr>'
        + row("Nome", escape(d["nome"]))
        + row("Empresa", escape(d["empresa"]) or "—")
        + row("WhatsApp", escape(d["whatsapp"]))
        + row("E-mail", escape(d["email"]))
        + row("Endereço", escape(d["endereco_completo"]))
        + row("Ponto de referência", escape(d["ponto_referencia"]) or "—")
        + row("Atendimento", escape(d["tipo_atendimento"]))
        + row("Data / período", escape(f"{d['data_preferida_br']} — {d['periodo']}"))
        + row("Tipo de serviço", escape(d["tipo_servico"]))
        + row("Descrição da necessidade", desc)
        + row("Arquivos anexados", files_html)
        + row("Data e hora", escape(d["data_hora_bahia"]))
        + row("Origem", "Site KSV")
        + row("Status", "Novo")
        + '<tr><td colspan="2" style="padding:16px;font-family:Arial,sans-serif;font-size:11px;color:#4A5260">'
          'Enviado automaticamente pelo site da KSV Soluções Integradas.</td></tr>'
        '</table></td></tr></table>'
    )


def build_whatsapp_message(d: dict) -> str:
    arquivos = "Sim" if d["arquivos"] else "Não"
    return (
        "🔔 *NOVO FORMULÁRIO — KSV SITE*\n\n"
        f"*Nova solicitação de {d['tipo_atendimento'].lower()} recebida pelo site.*\n\n"
        f"👤 *Cliente:* {d['nome']}\n\n"
        f"🏢 *Empresa:* {d['empresa'] or '—'}\n\n"
        f"📱 *WhatsApp:* {d['whatsapp']}\n\n"
        f"📧 *E-mail:* {d['email']}\n\n"
        f"📍 *Endereço:* {d['endereco_completo']}\n\n"
        f"🧭 *Referência:* {d['ponto_referencia'] or '—'}\n\n"
        f"📅 *Data / período:* {d['data_preferida_br']} — {d['periodo']}\n\n"
        f"🛠️ *Serviço:* {d['tipo_servico']}\n\n"
        f"📝 *Solicitação:*\n{d['descricao']}\n\n"
        f"📎 *Arquivos:* {arquivos}\n\n"
        f"🕐 *Recebido em:* {d['data_hora_bahia']}\n\n"
        "🔗 *Origem:* Site KSV\n\n"
        "*Status:* Novo"
    )


@api_router.get("/")
async def root():
    return {"message": "KSV Soluções Integradas API"}

@api_router.get("/health")
async def health():
    return {"status": "ok"}

@api_router.get("/config")
async def public_config():
    return {
        "whatsapp_number": WHATSAPP_SITE_NUMBER,
        "whatsapp_message": WHATSAPP_MESSAGE,
        "instagram_url": INSTAGRAM_URL,
        "email": LEADS_EMAIL_TO,
    }


@api_router.post("/leads")
async def create_lead(
    request: Request,
    nome: str = Form(...),
    empresa: str = Form(""),
    whatsapp: str = Form(...),
    email: str = Form(...),
    cep: str = Form(...),
    logradouro: str = Form(...),
    numero: str = Form(...),
    complemento: str = Form(""),
    bairro: str = Form(...),
    cidade: str = Form(...),
    estado: str = Form(...),
    ponto_referencia: str = Form(""),
    tipo_atendimento: str = Form(...),
    data_preferida: str = Form(...),
    periodo: str = Form(...),
    tipo_servico: str = Form(...),
    descricao: str = Form(...),
    website: str = Form(""),
    files: List[UploadFile] = File(default=[]),
):
    if website.strip():
        return {"success": True, "lead_id": "ok"}

    ip = request.client.host if request.client else "unknown"
    if not rate_ok(ip):
        raise HTTPException(status_code=429, detail="Muitas solicitações. Tente novamente em alguns minutos.")

    nome = nome.strip()
    empresa = empresa.strip()
    whatsapp = whatsapp.strip()
    email = email.strip()
    cep = re.sub(r"\D", "", cep)
    logradouro = logradouro.strip()
    numero = numero.strip()
    complemento = complemento.strip()
    bairro = bairro.strip()
    cidade = cidade.strip()
    estado = estado.strip().upper()
    ponto_referencia = ponto_referencia.strip()
    tipo_atendimento = tipo_atendimento.strip()
    data_preferida = data_preferida.strip()
    periodo = periodo.strip()
    tipo_servico = tipo_servico.strip()
    descricao = descricao.strip()

    errors = []
    if len(nome) < 2:
        errors.append("nome inválido")
    if not EMAIL_RE.match(email):
        errors.append("e-mail inválido")
    if len(re.sub(r"\D", "", whatsapp)) < 10:
        errors.append("whatsapp inválido")
    if len(cep) != 8:
        errors.append("CEP inválido")
    if not logradouro or not numero or not bairro:
        errors.append("endereço incompleto")
    if not cidade:
        errors.append("cidade obrigatória")
    if len(estado) != 2:
        errors.append("UF inválida")
    if tipo_atendimento not in TIPOS_ATENDIMENTO:
        errors.append("tipo de atendimento inválido")
    try:
        data_dt = datetime.strptime(data_preferida, "%Y-%m-%d").date()
    except ValueError:
        data_dt = None
        errors.append("data inválida")
    if periodo not in PERIODOS:
        errors.append("período inválido")
    if tipo_servico not in TIPOS_SERVICO:
        errors.append("tipo de serviço inválido")
    if len(descricao) < 5 or len(descricao) > 5000:
        errors.append("descrição inválida")
    if len(files) > MAX_FILES:
        errors.append(f"máximo de {MAX_FILES} arquivos")
    if errors:
        raise HTTPException(status_code=422, detail="Dados inválidos: " + ", ".join(errors))

    now = datetime.now(timezone.utc)
    now_ba = now.astimezone(BAHIA)
    lead_id = f"KSV-{now_ba.strftime('%Y%m%d')}-{uuid.uuid4().hex[:6].upper()}"

    saved = []
    lead_dir = UPLOAD_DIR / lead_id
    lead_dir.mkdir(parents=True, exist_ok=True)
    for f in files:
        ext = Path(f.filename or "").suffix.lower()
        if ext not in ALLOWED_EXT:
            raise HTTPException(status_code=422, detail=f"Tipo de arquivo não permitido: {ext}")
        content = await f.read()
        if len(content) > MAX_FILE_SIZE:
            raise HTTPException(status_code=422, detail=f"Arquivo muito grande (máx. 15MB): {f.filename}")
        safe = re.sub(r"[^A-Za-z0-9._-]", "_", f.filename or "arquivo")
        (lead_dir / safe).write_bytes(content)
        saved.append(safe)

    cep_fmt = f"{cep[:5]}-{cep[5:]}"
    endereco_completo = f"{logradouro}, {numero}" + (f" – {complemento}" if complemento else "") + f" – {bairro}, {cidade}/{estado} – CEP {cep_fmt}"
    doc = {
        "lead_id": lead_id,
        "nome": nome,
        "empresa": empresa,
        "whatsapp": whatsapp,
        "email": email,
        "cep": cep_fmt,
        "logradouro": logradouro,
        "numero": numero,
        "complemento": complemento,
        "bairro": bairro,
        "cidade": cidade,
        "estado": estado,
        "ponto_referencia": ponto_referencia,
        "endereco_completo": endereco_completo,
        "tipo_atendimento": tipo_atendimento,
        "data_preferida": data_preferida,
        "data_preferida_br": data_dt.strftime("%d/%m/%Y"),
        "periodo": periodo,
        "tipo_servico": tipo_servico,
        "descricao": descricao,
        "arquivos": saved,
        "status": "Novo",
        "origem": "Site KSV",
        "created_at": now.isoformat(),
        "data_hora_bahia": now_ba.strftime("%d/%m/%Y %H:%M:%S"),
    }
    await db.leads.insert_one(doc)

    try:
        await send_email(
            to=LEADS_EMAIL_TO,
            subject="Formulario KSV Site",
            html=build_email_html(doc),
            reply_to=email,
        )
        email_status = "enviado"
    except Exception as e:
        logger.error(f"Lead {lead_id}: falha no envio de e-mail: {e}")
        email_status = "erro_envio"

    whatsapp_status = await notify_whatsapp(build_whatsapp_message(doc))

    await db.leads.update_one(
        {"lead_id": lead_id},
        {"$set": {"email_status": email_status, "whatsapp_status": whatsapp_status}},
    )

    return {"success": True, "lead_id": lead_id}


@api_router.get("/leads")
async def list_leads(x_admin_key: Optional[str] = Header(None)):
    if not ADMIN_KEY or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Não autorizado")
    leads = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return {"count": len(leads), "leads": leads}


@api_router.patch("/leads/{lead_id}/status")
async def update_lead_status(lead_id: str, payload: dict, x_admin_key: Optional[str] = Header(None)):
    if not ADMIN_KEY or x_admin_key != ADMIN_KEY:
        raise HTTPException(status_code=401, detail="Não autorizado")
    new_status = str(payload.get("status", "")).strip()
    if not new_status:
        raise HTTPException(status_code=422, detail="Status obrigatório")
    res = await db.leads.update_one({"lead_id": lead_id}, {"$set": {"status": new_status}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Lead não encontrado")
    return {"success": True, "lead_id": lead_id, "status": new_status}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
