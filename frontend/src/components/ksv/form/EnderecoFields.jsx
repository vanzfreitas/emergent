import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Field, inputCls } from "./Field";

const ESTADOS = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

export const maskCep = (v) => v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");

export const EnderecoFields = ({ form, errors, set, patch }) => {
    const [cepStatus, setCepStatus] = useState("");

    const onCep = async (e) => {
        const masked = maskCep(e.target.value);
        set("cep")({ target: { value: masked } });
        const digits = masked.replace(/\D/g, "");
        if (digits.length !== 8) return;
        setCepStatus("loading");
        try {
            const r = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
            const d = await r.json();
            if (d.erro) {
                setCepStatus("notfound");
                return;
            }
            patch({ cep: masked, logradouro: d.logradouro || "", bairro: d.bairro || "", cidade: d.localidade || "", estado: d.uf || "" });
            setCepStatus("ok");
        } catch {
            setCepStatus("error");
        }
    };

    return (
        <>
            <Field label="CEP *" error={errors.cep} testid="form-field-cep">
                <div className="relative">
                    <input
                        data-testid="form-cep-input"
                        inputMode="numeric"
                        className={inputCls}
                        value={form.cep}
                        onChange={onCep}
                        placeholder="40000-000"
                    />
                    {cepStatus === "loading" && (
                        <Loader2 size={16} className="animate-spin text-ksv-orange absolute right-4 top-1/2 -translate-y-1/2" />
                    )}
                </div>
                {cepStatus === "ok" && <p data-testid="form-cep-status" className="mt-1.5 text-xs text-emerald-400">Endereço preenchido automaticamente.</p>}
                {cepStatus === "notfound" && <p data-testid="form-cep-status" className="mt-1.5 text-xs text-amber-400">CEP não encontrado. Preencha manualmente.</p>}
                {cepStatus === "error" && <p data-testid="form-cep-status" className="mt-1.5 text-xs text-amber-400">Não foi possível consultar o CEP. Preencha manualmente.</p>}
            </Field>
            <Field label="Rua / Logradouro *" error={errors.logradouro} testid="form-field-logradouro">
                <input data-testid="form-logradouro-input" className={inputCls} value={form.logradouro} onChange={set("logradouro")} placeholder="Av. Tancredo Neves" />
            </Field>
            <Field label="Número *" error={errors.numero} testid="form-field-numero">
                <input data-testid="form-numero-input" className={inputCls} value={form.numero} onChange={set("numero")} placeholder="1234" />
            </Field>
            <Field label="Complemento" testid="form-field-complemento">
                <input data-testid="form-complemento-input" className={inputCls} value={form.complemento} onChange={set("complemento")} placeholder="Apto, sala, bloco..." />
            </Field>
            <Field label="Bairro *" error={errors.bairro} testid="form-field-bairro">
                <input data-testid="form-bairro-input" className={inputCls} value={form.bairro} onChange={set("bairro")} placeholder="Caminho das Árvores" />
            </Field>
            <div className="grid grid-cols-[1fr_96px] gap-3">
                <Field label="Cidade *" error={errors.cidade} testid="form-field-cidade">
                    <input data-testid="form-cidade-input" className={inputCls} value={form.cidade} onChange={set("cidade")} placeholder="Salvador" />
                </Field>
                <Field label="UF *" error={errors.estado} testid="form-field-estado">
                    <select data-testid="form-estado-select" className={inputCls} value={form.estado} onChange={set("estado")}>
                        <option value="">UF</option>
                        {ESTADOS.map((uf) => <option key={uf} value={uf}>{uf}</option>)}
                    </select>
                </Field>
            </div>
            <Field label="Ponto de referência" testid="form-field-referencia" className="sm:col-span-2">
                <input data-testid="form-referencia-input" className={inputCls} value={form.ponto_referencia} onChange={set("ponto_referencia")} placeholder="Ex.: próximo ao Shopping da Bahia, em frente à farmácia..." />
            </Field>
        </>
    );
};
