import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useSiteConfig, waLink, scrollToId } from "@/lib/siteConfig";

const LINES = [
    { text: "Obras e reformas", accent: false },
    { text: "com execução", accent: false },
    { text: "profissional", accent: true },
    { text: "do início ao fim.", accent: false },
];

const CHIPS = ["Obras comerciais", "Reformas", "Adequações", "Infraestrutura"];

export const Hero = () => {
    const cfg = useSiteConfig();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

    return (
        <section id="inicio" data-testid="hero-section" ref={ref} className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-ksv-orange/10 blur-[140px]" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-14 items-center w-full">
                <div className="lg:col-span-7">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        data-testid="hero-badge"
                        className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-ksv-silvermid mb-8 flex items-center gap-3"
                    >
                        <span className="inline-block w-8 h-px bg-ksv-orange" />
                        Lauro de Freitas · Salvador e região — BA
                    </motion.p>
                    <h1 className="font-display font-extrabold uppercase text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight text-ksv-silver">
                        {LINES.map((line, i) => (
                            <span key={i} className="block overflow-hidden pb-1">
                                <motion.span
                                    initial={{ y: "110%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.9, delay: 0.2 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                                    className={`block ${line.accent ? "text-ksv-orange" : ""}`}
                                >
                                    {line.text}
                                </motion.span>
                            </span>
                        ))}
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.85, duration: 0.7 }}
                        data-testid="hero-subtitle"
                        className="mt-8 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed"
                    >
                        A KSV Soluções Integradas executa obras, reformas, adequações e serviços de infraestrutura
                        para empresas e estabelecimentos comerciais.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.7 }}
                        className="mt-10 flex flex-col sm:flex-row gap-4"
                    >
                        <button
                            data-testid="hero-quote-button"
                            onClick={() => scrollToId("contato")}
                            className="group inline-flex items-center justify-center gap-3 bg-ksv-orange hover:bg-ksv-orangehover text-white font-semibold uppercase tracking-[0.12em] text-sm px-8 py-4 transition-colors duration-200"
                        >
                            Solicitar orçamento
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                        <a
                            data-testid="hero-whatsapp-button"
                            href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 border border-ksv-edge hover:border-ksv-silvermid text-ksv-silver font-semibold uppercase tracking-[0.12em] text-sm px-8 py-4 transition-colors duration-200"
                        >
                            <MessageCircle size={18} />
                            Falar com a KSV
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="mt-12 flex flex-wrap gap-x-6 gap-y-2"
                    >
                        {CHIPS.map((c) => (
                            <span key={c} className="font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silverdark flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-ksv-orange inline-block" />
                                {c}
                            </span>
                        ))}
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="lg:col-span-5 relative hidden lg:block"
                >
                    <div className="absolute -top-4 -left-4 w-full h-full border border-ksv-orange/40 pointer-events-none" />
                    <div className="relative overflow-hidden border border-ksv-edge aspect-[4/5]">
                        <motion.img
                            style={{ y }}
                            src="https://images.unsplash.com/photo-1759044814280-e2b98b9609a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjV8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwY29uc3RydWN0aW9uJTIwYnVpbGRpbmclMjByZW5vdmF0aW9uJTIwbW9kZXJuJTIwZW5naW5lZXJpbmd8ZW58MHx8fHwxNzg5NDAwOTk3fDA&ixlib=rb-4.1.0&q=85"
                            alt="Obra comercial em execução profissional"
                            className="w-full h-[112%] object-cover"
                            loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ksv-black/70 via-transparent to-transparent" />
                        <p className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ksv-silvermid">
                            Execução · Organização · Entrega
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
