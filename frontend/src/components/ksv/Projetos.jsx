import { Reveal, Eyebrow } from "./Reveal";

const PROJECTS = [
    {
        img: "https://images.unsplash.com/photo-1721448288151-f164655fa6e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwyfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmclMjByZW5vdmF0aW9uJTIwbW9kZXJuJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzg5NDAwOTk3fDA&ixlib=rb-4.1.0&q=85",
        label: "Obra comercial",
    },
    {
        img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBjb21tZXJjaWFsJTIwaW50ZXJpb3IlMjByZW5vdmF0aW9unGVufDB8fHx8MTc4ODYxNTUxNHww&ixlib=rb-4.1.0&q=85",
        label: "Reforma de ambiente corporativo",
    },
    {
        img: "https://images.unsplash.com/photo-1773848987369-38afd0e268d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHw0fHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmclMjByZW5vdmF0aW9uJTIwbW9kZXJuJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzg5NDAwOTk3fDA&ixlib=rb-4.1.0&q=85",
        label: "Adequação de espaço comercial",
    },
    {
        img: "https://images.unsplash.com/photo-1509390144018-eeaf65052242?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzZ8MHwxfHNlYXJjaHw0fHxpbmR1c3RyaWFsJTIwZmFjaWxpdHklMjBlbmdpbmVlcmluZyUyMEhWQUMlMjBlbGVjdHJpY2FsJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MHx8fHwxNzg5NDAxMDA2fDA&ixlib=rb-4.1.0&q=85",
        label: "Infraestrutura técnica",
    },
    {
        img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBvZmZpY2UlMjBjb21tZXJjaWFsJTIwaW50ZXJpb3IlMjByZW5vdmF0aW9unGVufDB8fHx8MTc4ODYxNTUxNHww&ixlib=rb-4.1.0&q=85",
        label: "Escritório reformado",
    },
    {
        img: "https://images.unsplash.com/photo-1715593949273-09009558300a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBvZmZpY2UlMjBjb21tZXJjaWFsJTIwaW50ZXJpb3IlMjByZW5vdmF0aW9unGVufDB8fHx8MTc4ODYxNTUxNHww&ixlib=rb-4.1.0&q=85",
        label: "Interior comercial",
    },
];

export const Projetos = () => (
    <section id="projetos" data-testid="portfolio-gallery-section" className="py-24 sm:py-32 bg-ksv-charcoal border-y border-white/5">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Reveal>
                <Eyebrow>Portfólio</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver">
                    Projetos e serviços realizados
                </h2>
                <p
                    data-testid="portfolio-placeholder-note"
                    className="mt-6 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silvermid border border-dashed border-ksv-edge px-4 py-2"
                >
                    Galeria em atualização — as imagens abaixo são ilustrativas e serão substituídas por fotos reais dos projetos KSV
                </p>
            </Reveal>
            <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {PROJECTS.map((p, i) => (
                    <Reveal key={p.label} delay={i * 0.06}>
                        <figure
                            data-testid={`portfolio-item-${i}`}
                            className="group relative overflow-hidden border border-ksv-edge aspect-[4/3]"
                        >
                            <img
                                src={p.img}
                                alt={`${p.label} — imagem ilustrativa`}
                                loading="lazy"
                                className="w-full h-full object-cover grayscale-[40%] transition-[filter,transform] duration-500 group-hover:grayscale-0 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-ksv-black/85 via-transparent to-transparent" />
                            <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-orange">
                                    Imagem ilustrativa
                                </span>
                                <p className="mt-1 font-display font-semibold uppercase tracking-wide text-ksv-silver">
                                    {p.label}
                                </p>
                            </figcaption>
                        </figure>
                    </Reveal>
                ))}
            </div>
        </div>
    </section>
);
