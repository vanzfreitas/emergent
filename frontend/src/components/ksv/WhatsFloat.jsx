import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSiteConfig, waLink } from "@/lib/siteConfig";

export const WhatsFloat = () => {
    const cfg = useSiteConfig();
    if (!cfg.whatsapp_number) return null;
    return (
        <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            data-testid="whatsapp-float-button"
            href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
            target="_blank"
            rel="noreferrer"
            aria-label="Falar com a KSV pelo WhatsApp"
            className="fixed bottom-6 right-6 z-50 group flex items-center gap-3"
        >
            <span className="hidden sm:block opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-[opacity,transform] duration-300 bg-ksv-charcoal border border-ksv-edge text-ksv-silver text-xs font-mono uppercase tracking-[0.15em] px-4 py-2.5">
                Falar com a KSV
            </span>
            <span className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-lg shadow-black/40 transition-transform duration-200 group-hover:scale-105">
                <MessageCircle size={26} className="text-white" fill="white" />
            </span>
        </motion.a>
    );
};
