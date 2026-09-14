import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("ksv_consent")) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("ksv_consent", "1");
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 24 }}
                    data-testid="cookie-banner"
                    className="fixed bottom-5 left-5 right-5 sm:right-auto sm:max-w-md z-50 bg-ksv-charcoal border border-ksv-edge p-6 shadow-2xl shadow-black/50"
                >
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Utilizamos cookies e tratamos os dados enviados pelo formulário apenas para atender sua
                        solicitação, conforme nossa{" "}
                        <Link to="/politica-de-privacidade" className="underline text-ksv-silver hover:text-ksv-orange">
                            Política de Privacidade
                        </Link>
                        .
                    </p>
                    <button
                        data-testid="cookie-accept-button"
                        onClick={accept}
                        className="mt-4 bg-ksv-orange hover:bg-ksv-orangehover text-white font-semibold uppercase tracking-[0.15em] text-xs px-6 py-2.5 transition-colors duration-200"
                    >
                        Entendi
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
