import { Reveal, Eyebrow } from "./Reveal";

const STEPS = [
    { n: "01", title: "Entendemos a necessidade", text: "Recebemos as informações sobre o serviço, ambiente e objetivo do cliente." },
    { n: "02", title: "Avaliamos", text: "Analisamos as condições do local, necessidades técnicas e escopo." },
    { n: "03", title: "Planejamos", text: "Definimos o escopo e as etapas necessárias para execução." },
    { n: "04", title: "Executamos", text: "Nossa equipe realiza os serviços conforme o planejamento." },
    { n: "05", title: "Acompanhamos", text: "Monitoramos o andamento da execução." },
    { n: "06", title: "Entregamos", text: "Finalizamos o serviço buscando organização e qualidade na entrega." },
];

export const Processo = () => (
    <section id="processo" data-testid="process-steps-section" className="py-24 sm:py-32 bg-ksv-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
                <Eyebrow>Como trabalhamos</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver max-w-2xl">
                    Processo de trabalho
                </h2>
            </Reveal>
            <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                {STEPS.map((s, i) => (
                    <Reveal key={s.n} delay={i * 0.07}>
                        <div data-testid={`process-step-${s.n}`} className="relative border-t border-ksv-edge pt-8">
                            <span className="font-display font-extrabold text-6xl text-outline leading-none">{s.n}</span>
                            <h3 className="mt-5 font-display font-semibold uppercase text-xl tracking-wide text-ksv-silver">
                                {s.title}
                            </h3>
                            <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{s.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
