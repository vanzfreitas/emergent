import { CheckCircle2 } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

const ITEMS = [
    "Execução organizada",
    "Soluções integradas",
    "Atendimento profissional",
    "Equipe técnica",
    "Atendimento residencial e empresarial",
    "Acompanhamento da execução",
    "Capacidade de atender diferentes necessidades dentro de um mesmo projeto",
];

export const Diferenciais = () => (
    <section data-testid="diferenciais-section" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-start">
            <Reveal>
                <Eyebrow>Diferenciais</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver">
                    Por que contratar a KSV?
                </h2>
                <p className="mt-6 text-base sm:text-lg text-zinc-400 leading-relaxed max-w-lg">
                    Uma equipe preparada para conduzir obras, reformas e adequações em residências e ambientes empresariais,
                    com organização e acompanhamento em todas as etapas.
                </p>
            </Reveal>
            <div className="grid gap-4">
                {ITEMS.map((item, i) => (
                    <Reveal key={item} delay={i * 0.06}>
                        <div
                            data-testid={`diferencial-item-${i}`}
                            className="flex items-center gap-4 border border-ksv-edge bg-ksv-charcoal px-6 py-5 transition-colors duration-300 hover:border-ksv-orange/50"
                        >
                            <CheckCircle2 size={20} className="text-ksv-orange shrink-0" />
                            <span className="text-sm sm:text-base text-ksv-silver">{item}</span>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
