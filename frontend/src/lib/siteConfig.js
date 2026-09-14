import axios from "axios";
import { useEffect, useState } from "react";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FALLBACK = {
    whatsapp_number: "5571981376609",
    whatsapp_message: "Olá! Vim pelo site da KSV e gostaria de solicitar um orçamento.",
    instagram_url: "",
    email: "contato@ksvsolucoes.com.br",
};

let cache = null;

export function useSiteConfig() {
    const [cfg, setCfg] = useState(FALLBACK);
    useEffect(() => {
        if (cache) {
            setCfg(cache);
            return;
        }
        axios
            .get(`${API}/config`)
            .then((r) => {
                cache = { ...FALLBACK, ...r.data };
                setCfg(cache);
            })
            .catch(() => {});
    }, []);
    return cfg;
}

export function waLink(number, message) {
    return `https://wa.me/${number}?text=${encodeURIComponent(message || FALLBACK.whatsapp_message)}`;
}

export function scrollToId(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -76 });
    else el.scrollIntoView({ behavior: "smooth" });
}
