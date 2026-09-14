import { Network, Snowflake, Wrench, Ruler, Settings } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

const ITEMS = [
    { icon: Network, title: "Infraestrutura", text: "Estruturas e instalações para o funcionamento do espaço." },
    { icon: Snowflake, title: "Climatização", text: "Soluções de climatização para ambientes residenciais e comerciais." },
    { icon: Wrench, title: "Manutenção técnica", text: "Serviços técnicos de manutenção para residências e empresas." },
    { icon: Ruler, title: "Adequações", text: "Adaptação de ambientes a novas necessidades de operação." },
    { icon: Settings, title: "Serviços complementares", text: "Apoio técnico integrado às obras executadas." },
];

export const Complementares = () => (
    <section id="servicos" data-testid="complementary-services-section" className="py-24 sm:py-32 bg-ksv-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
                <Eyebrow>Serviços complementares</Eyebrow>
                <h2 className="font-display font-bold uppercase text-2xl sm:text-3xl lg:text-4xl tracking-tight text-ksv-silver">
                    Outras soluções da KSV
                </h2>
                <p className="mt-5 text-sm sm:text-base text-zinc-500 max-w-2xl">
                    Serviços que complementam as obras e reformas executadas pela KSV.
                </p>
            </Reveal>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {ITEMS.map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.06}>
                        <div
                            data-testid={`complementary-item-${i}`}
                            className="h-full border border-ksv-edge bg-ksv-gunmetal/40 p-6 transition-colors duration-300 hover:border-ksv-silverdark"
                        >
                            <item.icon size={22} strokeWidth={1.5} className="text-ksv-silvermid" />
                            <h3 className="mt-4 font-display font-semibold uppercase tracking-wide text-base text-ksv-silver">
                                {item.title}
                            </h3>
                            <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{item.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
