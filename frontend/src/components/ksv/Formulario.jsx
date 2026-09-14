import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { UploadCloud, X, Loader2, CheckCircle2, Mail, MapPin, MessageCircle, Globe, FileText } from "lucide-react";
import { API, useSiteConfig, waLink } from "@/lib/siteConfig";
import { Reveal, Eyebrow } from "./Reveal";

const TIPOS = [
    "Obra",
    "Reforma",
    "Adequação",
    "Infraestrutura",
    "Piso e revestimento",
    "Forro e acabamento",
    "Manutenção",
    "Climatização",
    "Outro",
];

const INITIAL = { nome: "", empresa: "", whatsapp: "", email: "", cidade: "", tipo_servico: "", descricao: "", website: "" };

const inputCls =
    "w-full bg-ksv-gunmetal/50 border border-ksv-edge focus:border-ksv-orange outline-none px-4 py-3.5 text-sm text-ksv-silver placeholder:text-zinc-600 transition-colors duration-200";

const Field = ({ label, error, children, testid }) => (
    <div data-testid={testid}>
        <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silvermid mb-2">{label}</label>
        {children}
        {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
);

export const Formulario = () => {
    const cfg = useSiteConfig();
    const [form, setForm] = useState(INITIAL);
    const [files, setFiles] = useState([]);
    const [errors, setErrors] = useState({});
    const [sending, setSending] = useState(false);
    const [sentId, setSentId] = useState(null);
    const [failMsg, setFailMsg] = useState("");

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const validate = () => {
        const er = {};
        if (form.nome.trim().length < 2) er.nome = "Informe seu nome.";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) er.email = "Informe um e-mail válido.";
        if (form.whatsapp.replace(/\D/g, "").length < 10) er.whatsapp = "Informe um WhatsApp válido com DDD.";
        if (!form.cidade.trim()) er.cidade = "Informe a cidade.";
        if (!form.tipo_servico) er.tipo_servico = "Selecione o tipo de serviço.";
        if (form.descricao.trim().length < 5) er.descricao = "Descreva brevemente sua necessidade.";
        setErrors(er);
        return Object.keys(er).length === 0;
    };

    const onFiles = (e) => {
        const list = Array.from(e.target.files || []).slice(0, 5);
        setFiles(list);
    };

    const submit = async (e) => {
        e.preventDefault();
        setFailMsg("");
        if (!validate()) return;
        setSending(true);
        try {
            const fd = new FormData();
            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            files.forEach((f) => fd.append("files", f));
            const { data } = await axios.post(`${API}/leads`, fd);
            setSentId(data.lead_id);
            toast.success("Solicitação enviada com sucesso!");
        } catch (err) {
            setFailMsg(
                "Não foi possível enviar sua solicitação no momento. Tente novamente ou fale diretamente conosco pelo WhatsApp."
            );
            toast.error("Falha no envio da solicitação.");
        } finally {
            setSending(false);
        }
    };

    const reset = () => {
        setForm(INITIAL);
        setFiles([]);
        setErrors({});
        setSentId(null);
    };

    return (
        <section id="contato" data-testid="quote-form-section" className="py-24 sm:py-32">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-5 gap-14">
                <Reveal className="lg:col-span-2">
                    <Eyebrow>Orçamento</Eyebrow>
                    <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver">
                        Solicite um orçamento
                    </h2>
                    <p className="mt-6 text-base text-zinc-400 leading-relaxed">
                        Conte um pouco sobre o que você precisa e nossa equipe entrará em contato para entender
                        melhor sua demanda.
                    </p>
                    <div className="mt-10 space-y-5">
                        <div className="flex items-start gap-4">
                            <Mail size={18} className="text-ksv-orange mt-0.5 shrink-0" />
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-silverdark">E-mail</p>
                                <p className="text-sm text-ksv-silver">contato@ksvsolucao.com.br</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <MapPin size={18} className="text-ksv-orange mt-0.5 shrink-0" />
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-silverdark">Endereço</p>
                                <p className="text-sm text-ksv-silver">Av. Fortaleza, 722 – Lauro de Freitas – BA</p>
                                <p className="text-xs text-zinc-500 mt-1">Atuação: Lauro de Freitas, Salvador e região</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Globe size={18} className="text-ksv-orange mt-0.5 shrink-0" />
                            <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-silverdark">Site</p>
                                <p className="text-sm text-ksv-silver">ksvsolucao.com.br</p>
                            </div>
                        </div>
                    </div>
                    <a
                        data-testid="form-whatsapp-button"
                        href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-10 inline-flex items-center gap-3 border border-ksv-edge hover:border-ksv-silvermid text-ksv-silver font-semibold uppercase tracking-[0.12em] text-xs px-6 py-3.5 transition-colors duration-200"
                    >
                        <MessageCircle size={16} />
                        Falar com a KSV
                    </a>
                </Reveal>

                <Reveal className="lg:col-span-3" delay={0.1}>
                    <div className="border border-ksv-edge bg-ksv-charcoal p-7 sm:p-10">
                        <AnimatePresence mode="wait">
                            {sentId ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    data-testid="form-success-message"
                                    className="text-center py-14"
                                >
                                    <CheckCircle2 size={52} className="text-ksv-orange mx-auto" />
                                    <h3 className="mt-6 font-display font-bold uppercase text-2xl sm:text-3xl text-ksv-silver">
                                        Solicitação enviada com sucesso!
                                    </h3>
                                    <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-md mx-auto leading-relaxed">
                                        Recebemos suas informações e nossa equipe entrará em contato para entender
                                        melhor sua necessidade.
                                    </p>
                                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silverdark">
                                        Protocolo: {sentId}
                                    </p>
                                    <button
                                        data-testid="form-new-request-button"
                                        onClick={reset}
                                        className="mt-8 border border-ksv-edge hover:border-ksv-silvermid text-ksv-silver font-semibold uppercase tracking-[0.12em] text-xs px-6 py-3 transition-colors duration-200"
                                    >
                                        Enviar outra solicitação
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onSubmit={submit}
                                    data-testid="quote-form"
                                    noValidate
                                    className="grid sm:grid-cols-2 gap-5"
                                >
                                    <Field label="Nome *" error={errors.nome} testid="form-field-nome">
                                        <input data-testid="form-nome-input" className={inputCls} value={form.nome} onChange={set("nome")} placeholder="Seu nome" />
                                    </Field>
                                    <Field label="Empresa" error={errors.empresa} testid="form-field-empresa">
                                        <input data-testid="form-empresa-input" className={inputCls} value={form.empresa} onChange={set("empresa")} placeholder="Nome da empresa" />
                                    </Field>
                                    <Field label="WhatsApp *" error={errors.whatsapp} testid="form-field-whatsapp">
                                        <input data-testid="form-whatsapp-input" className={inputCls} value={form.whatsapp} onChange={set("whatsapp")} placeholder="(71) 90000-0000" />
                                    </Field>
                                    <Field label="E-mail *" error={errors.email} testid="form-field-email">
                                        <input data-testid="form-email-input" type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="voce@empresa.com.br" />
                                    </Field>
                                    <Field label="Cidade *" error={errors.cidade} testid="form-field-cidade">
                                        <input data-testid="form-cidade-input" className={inputCls} value={form.cidade} onChange={set("cidade")} placeholder="Lauro de Freitas" />
                                    </Field>
                                    <Field label="Tipo de serviço *" error={errors.tipo_servico} testid="form-field-tipo">
                                        <select data-testid="form-tipo-select" className={inputCls} value={form.tipo_servico} onChange={set("tipo_servico")}>
                                            <option value="">Selecione</option>
                                            {TIPOS.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                    </Field>
                                    <div className="sm:col-span-2">
                                        <Field label="Descrição da necessidade *" error={errors.descricao} testid="form-field-descricao">
                                            <textarea
                                                data-testid="form-descricao-input"
                                                rows={5}
                                                className={`${inputCls} resize-none`}
                                                value={form.descricao}
                                                onChange={set("descricao")}
                                                placeholder="Ex.: preciso reformar uma loja de 120m², trocar o piso, refazer o forro e adequar a parte elétrica..."
                                            />
                                        </Field>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silvermid mb-2">
                                            Fotos, vídeos ou documentos (opcional, até 5 arquivos)
                                        </label>
                                        <label
                                            data-testid="form-files-dropzone"
                                            className="flex flex-col items-center justify-center gap-3 border border-dashed border-ksv-edge hover:border-ksv-orange/60 cursor-pointer px-6 py-8 transition-colors duration-200"
                                        >
                                            <UploadCloud size={26} className="text-ksv-silvermid" />
                                            <span className="text-xs text-zinc-500 text-center">
                                                Clique para selecionar arquivos (imagens, vídeos, PDF — máx. 15MB cada)
                                            </span>
                                            <input
                                                data-testid="form-files-input"
                                                type="file"
                                                multiple
                                                accept="image/*,video/mp4,video/quicktime,.pdf,.doc,.docx"
                                                className="hidden"
                                                onChange={onFiles}
                                            />
                                        </label>
                                        {files.length > 0 && (
                                            <ul data-testid="form-files-list" className="mt-3 space-y-2">
                                                {files.map((f, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-xs text-ksv-silvermid bg-ksv-gunmetal/50 border border-ksv-edge px-3 py-2">
                                                        <FileText size={14} className="text-ksv-orange shrink-0" />
                                                        <span className="truncate flex-1">{f.name}</span>
                                                        <button
                                                            type="button"
                                                            data-testid={`form-file-remove-${i}`}
                                                            onClick={() => setFiles(files.filter((_, idx) => idx !== i))}
                                                            className="text-zinc-500 hover:text-red-400 transition-colors duration-150"
                                                            aria-label="Remover arquivo"
                                                        >
                                                            <X size={14} />
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <input
                                        type="text"
                                        name="website"
                                        value={form.website}
                                        onChange={set("website")}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />
                                    {failMsg && (
                                        <div data-testid="form-error-message" className="sm:col-span-2 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                                            {failMsg}{" "}
                                            <a
                                                href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="underline text-red-200"
                                            >
                                                Falar pelo WhatsApp
                                            </a>
                                        </div>
                                    )}
                                    <div className="sm:col-span-2">
                                        <button
                                            data-testid="form-submit-button"
                                            type="submit"
                                            disabled={sending}
                                            className="w-full inline-flex items-center justify-center gap-3 bg-ksv-orange hover:bg-ksv-orangehover disabled:opacity-60 text-white font-semibold uppercase tracking-[0.12em] text-sm px-8 py-4 transition-colors duration-200"
                                        >
                                            {sending && <Loader2 size={18} className="animate-spin" />}
                                            {sending ? "Enviando..." : "Solicitar orçamento"}
                                        </button>
                                        <p className="mt-4 text-[11px] text-zinc-600 leading-relaxed">
                                            Ao enviar, você concorda com o tratamento dos dados informados conforme a{" "}
                                            <a href="/politica-de-privacidade" className="underline hover:text-zinc-400">
                                                Política de Privacidade
                                            </a>
                                            .
                                        </p>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
