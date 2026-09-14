import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { scrollToId } from "@/lib/siteConfig";

const LINKS = [
    { id: "inicio", label: "Início" },
    { id: "obras", label: "Obras" },
    { id: "servicos", label: "Serviços" },
    { id: "projetos", label: "Projetos" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
];

export const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const go = (id) => (e) => {
        e.preventDefault();
        setOpen(false);
        scrollToId(id);
    };

    return (
        <header
            data-testid="nav-header"
            className={`fixed top-0 left-0 right-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
                scrolled || open
                    ? "bg-black/85 backdrop-blur-xl border-white/10"
                    : "bg-transparent border-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
                <a href="#inicio" onClick={go("inicio")} data-testid="nav-logo" className="flex items-center gap-3">
                    <img src="/logo.png" alt="KSV Soluções Integradas" className="h-11 w-auto" />
                    <span className="hidden md:block font-display text-xs tracking-[0.25em] uppercase text-zinc-400 leading-tight">
                        Soluções
                        <br />
                        Integradas
                    </span>
                </a>
                <nav className="hidden lg:flex items-center gap-8">
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={go(l.id)}
                            data-testid={`nav-link-${l.id}`}
                            className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <button
                        data-testid="nav-quote-button"
                        onClick={go("contato")}
                        className="hidden sm:inline-flex items-center bg-ksv-orange hover:bg-ksv-orangehover text-white font-semibold text-xs uppercase tracking-[0.15em] px-6 py-3 transition-colors duration-200"
                    >
                        Solicitar orçamento
                    </button>
                    <button
                        data-testid="nav-mobile-toggle"
                        onClick={() => setOpen(!open)}
                        className="lg:hidden text-zinc-200 p-2"
                        aria-label="Abrir menu"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {open && (
                <div
                    data-testid="nav-mobile-menu"
                    className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-5"
                >
                    {LINKS.map((l) => (
                        <a
                            key={l.id}
                            href={`#${l.id}`}
                            onClick={go(l.id)}
                            data-testid={`nav-mobile-link-${l.id}`}
                            className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-300"
                        >
                            {l.label}
                        </a>
                    ))}
                    <button
                        data-testid="nav-mobile-quote-button"
                        onClick={go("contato")}
                        className="mt-2 bg-ksv-orange text-white font-semibold uppercase tracking-[0.15em] text-sm px-5 py-3.5"
                    >
                        Solicitar orçamento
                    </button>
                </div>
            )}
        </header>
    );
};
