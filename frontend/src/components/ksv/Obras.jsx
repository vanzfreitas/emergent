import { Home, Building2, Hammer, Ruler, HardHat, Layers, PanelTop, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";
import { scrollToId } from "@/lib/siteConfig";

const CARDS = [
    {
        icon: Home,
        title: "Obras residenciais",
        text: "Construção, ampliação e reforma completa de casas e apartamentos, do projeto ao acabamento.",
    },
    {
        icon: Building2,
        title: "Obras comerciais",
        text: "Execução e adequação de espaços comerciais de acordo com as necessidades do cliente.",
    },
    {
        icon: Hammer,
        title: "Reformas",
        text: "Reformas e revitalizações para residências, ambientes comerciais e empresariais.",
    },
    {
        icon: Ruler,
        title: "Adequações",
        text: "Adequações de ambientes para atender novas necessidades de operação, layout e infraestrutura.",
    },
    {
        icon: HardHat,
        title: "Infraestrutura",
        text: "Execução e adequação de estruturas e instalações necessárias para o funcionamento do espaço.",
    },
    {
        icon: Layers,
        title: "Pisos e revestimentos",
        text: "Serviços relacionados à execução, substituição e adequação de pisos e revestimentos.",
    },
    {
        icon: PanelTop,
        title: "Forros e acabamentos",
        text: "Execução e adequação de forros, acabamentos e elementos complementares.",
    },
];

export const Obras = () => (
    <section id="obras" data-testid="services-obras-grid" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
                <Eyebrow>O que a KSV executa</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver max-w-2xl">
                    Obras e Reformas
                </h2>
                <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
                    Do planejamento à execução, a KSV atua na transformação e adequação de espaços residenciais e comerciais,
                    buscando organização, qualidade de execução e acompanhamento em cada etapa.
                </p>
            </Reveal>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CARDS.map((card, i) => (
                    <Reveal key={card.title} delay={i * 0.08}>
                        <div
                            data-testid={`service-card-${i}`}
                            className="group relative h-full bg-ksv-charcoal border border-ksv-edge p-8 flex flex-col transition-colors duration-300 hover:border-ksv-orange/60"
                        >
                            <card.icon
                                size={30}
                                strokeWidth={1.5}
                                className="text-ksv-silvermid transition-colors duration-300 group-hover:text-ksv-orange"
                            />
                            <h3 className="mt-6 font-display font-semibold uppercase text-xl tracking-wide text-ksv-silver">
                                {card.title}
                            </h3>
                            <p className="mt-3 text-sm text-zinc-400 leading-relaxed flex-1">{card.text}</p>
                            <button
                                data-testid={`service-card-${i}-cta`}
                                onClick={() => scrollToId("contato")}
                                className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silverdark group-hover:text-ksv-orange transition-colors duration-300 self-start"
                            >
                                Solicitar orçamento
                                <ArrowUpRight size={14} />
                            </button>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
