import { useState } from "react";
import { format, parseISO, startOfToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Sun, Sunset, ClipboardList, HardHat } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Field, OptionGroup, inputCls } from "./Field";

const ATENDIMENTO = [
    { value: "Orçamento", label: "Orçamento do serviço", icon: ClipboardList },
    { value: "Visita técnica", label: "Visita técnica para avaliação", icon: HardHat },
];

const PERIODOS = [
    { value: "Manhã", label: "Manhã (08h – 12h)", icon: Sun },
    { value: "Tarde", label: "Tarde (13h – 17h)", icon: Sunset },
];

export const AgendamentoFields = ({ form, errors, patch }) => {
    const [open, setOpen] = useState(false);
    const selected = form.data_preferida ? parseISO(form.data_preferida) : undefined;
    return (
        <>
            <Field label="O que você precisa? *" error={errors.tipo_atendimento} testid="form-field-atendimento" className="sm:col-span-2">
                <OptionGroup
                    testid="form-atendimento"
                    options={ATENDIMENTO}
                    value={form.tipo_atendimento}
                    onChange={(v) => patch({ tipo_atendimento: v })}
                />
            </Field>
            <Field label="Data preferida *" error={errors.data_preferida} testid="form-field-data">
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            data-testid="form-data-trigger"
                            className={`${inputCls} flex items-center justify-between text-left ${selected ? "" : "text-zinc-600"}`}
                        >
                            {selected ? format(selected, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Escolha uma data"}
                            <CalendarDays size={16} className="text-ksv-orange shrink-0" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="w-auto p-0 border-ksv-edge bg-ksv-charcoal" data-testid="form-data-calendar">
                        <Calendar
                            mode="single"
                            locale={ptBR}
                            selected={selected}
                            onSelect={(d) => { patch({ data_preferida: d ? format(d, "yyyy-MM-dd") : "" }); setOpen(false); }}
                            disabled={[{ before: startOfToday() }, { dayOfWeek: [0] }]}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </Field>
            <Field label="Período *" error={errors.periodo} testid="form-field-periodo">
                <OptionGroup testid="form-periodo" options={PERIODOS} value={form.periodo} onChange={(v) => patch({ periodo: v })} />
            </Field>
        </>
    );
};
