import { Store, Pill, Stethoscope, Dumbbell, Briefcase, Building, Users } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

const SEGMENTS = [
    { icon: Store, label: "Lojas" },
    { icon: Pill, label: "Farmácias" },
    { icon: Stethoscope, label: "Clínicas" },
    { icon: Dumbbell, label: "Academias" },
    { icon: Briefcase, label: "Escritórios" },
    { icon: Building, label: "Condomínios" },
    { icon: Users, label: "Estabelecimentos comerciais" },
];

export const Segmentos = () => (
    <section id="segmentos" data-testid="segmentos-b2b-section" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
                <Eyebrow>Atendimento empresarial</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver max-w-3xl">
                    Soluções para empresas e estabelecimentos comerciais
                </h2>
                <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
                    Cada operação possui necessidades diferentes. A KSV trabalha com soluções integradas para
                    adequação, reforma, infraestrutura e manutenção de ambientes empresariais.
                </p>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {SEGMENTS.map((s, i) => (
                    <Reveal key={s.label} delay={i * 0.05}>
                        <div
                            data-testid={`segment-${i}`}
                            className="group flex items-center gap-4 border border-ksv-edge bg-ksv-charcoal px-5 py-6 transition-colors duration-300 hover:border-ksv-orange/50"
                        >
                            <s.icon size={22} strokeWidth={1.5} className="text-ksv-silvermid group-hover:text-ksv-orange transition-colors duration-300 shrink-0" />
                            <span className="font-display font-semibold uppercase tracking-wide text-sm sm:text-base text-ksv-silver">
                                {s.label}
                            </span>
                        </div>
                    </Reveal>
                ))}
                <Reveal delay={0.35}>
                    <div className="hidden lg:flex items-center justify-center border border-dashed border-ksv-edge px-5 py-6 h-full">
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ksv-silverdark text-center">
                            E outros ambientes empresariais
                        </span>
                    </div>
                </Reveal>
            </div>
        </div>
    </section>
);
