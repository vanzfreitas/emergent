import { ArrowRight, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { useSiteConfig, waLink, scrollToId } from "@/lib/siteConfig";

export const CtaFinal = () => {
    const cfg = useSiteConfig();
    return (
        <section data-testid="cta-final-section" className="relative py-24 sm:py-32 border-y border-ksv-orange/30 bg-ksv-charcoal overflow-hidden">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[320px] rounded-full bg-ksv-orange/10 blur-[120px] pointer-events-none" />
            <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
                <Reveal>
                    <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver leading-tight">
                        Sua empresa precisa de uma <span className="text-ksv-orange">obra, reforma ou adequação?</span>
                    </h2>
                    <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Fale com a KSV Soluções Integradas e apresente sua necessidade para nossa equipe.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            data-testid="cta-final-quote-button"
                            onClick={() => scrollToId("contato")}
                            className="group inline-flex items-center justify-center gap-3 bg-ksv-orange hover:bg-ksv-orangehover text-white font-semibold uppercase tracking-[0.12em] text-sm px-8 py-4 transition-colors duration-200"
                        >
                            Solicitar orçamento
                            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                        </button>
                        <a
                            data-testid="cta-final-whatsapp-button"
                            href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-3 border border-ksv-edge hover:border-ksv-silvermid text-ksv-silver font-semibold uppercase tracking-[0.12em] text-sm px-8 py-4 transition-colors duration-200"
                        >
                            <MessageCircle size={18} />
                            Falar pelo WhatsApp
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
};
