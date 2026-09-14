import { Link } from "react-router-dom";
import { Mail, MapPin, MessageCircle, Instagram, Globe } from "lucide-react";
import { scrollToId, useSiteConfig, waLink } from "@/lib/siteConfig";

const NAV = [
    { id: "inicio", label: "Início" },
    { id: "obras", label: "Obras" },
    { id: "servicos", label: "Serviços" },
    { id: "projetos", label: "Projetos" },
    { id: "sobre", label: "Sobre" },
    { id: "contato", label: "Contato" },
];

export const Footer = () => {
    const cfg = useSiteConfig();
    return (
        <footer data-testid="footer-section" className="bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid md:grid-cols-3 gap-12">
                <div>
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="KSV Soluções Integradas" className="h-12 w-auto" />
                    </div>
                    <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-ksv-silvermid">
                        Obras · Infraestrutura · Manutenção Técnica
                    </p>
                    <p className="mt-4 text-sm text-zinc-500">Lauro de Freitas – Bahia</p>
                    <p className="text-sm text-zinc-500">contato@ksvsolucoes.com.br</p>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ksv-silverdark mb-5">Navegação</p>
                    <ul className="space-y-3">
                        {NAV.map((l) => (
                            <li key={l.id}>
                                <a
                                    href={`#${l.id}`}
                                    data-testid={`footer-link-${l.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToId(l.id);
                                    }}
                                    className="text-sm text-zinc-400 hover:text-ksv-orange transition-colors duration-200"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ksv-silverdark mb-5">Contato</p>
                    <ul className="space-y-4 text-sm text-zinc-400">
                        <li className="flex items-center gap-3">
                            <Mail size={15} className="text-ksv-orange shrink-0" />
                            <a href="mailto:contato@ksvsolucoes.com.br" data-testid="footer-email-link" className="hover:text-ksv-orange transition-colors duration-200 break-all">
                                contato@ksvsolucoes.com.br
                            </a>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin size={15} className="text-ksv-orange shrink-0 mt-0.5" />
                            <span>Av. Fortaleza, 722 – Lauro de Freitas – BA</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Globe size={15} className="text-ksv-orange shrink-0" />
                            <span>ksvsolucoes.com.br</span>
                        </li>
                        {cfg.whatsapp_number && (
                            <li className="flex items-center gap-3">
                                <MessageCircle size={15} className="text-ksv-orange shrink-0" />
                                <a
                                    href={waLink(cfg.whatsapp_number, cfg.whatsapp_message)}
                                    target="_blank"
                                    rel="noreferrer"
                                    data-testid="footer-whatsapp-link"
                                    className="hover:text-ksv-orange transition-colors duration-200"
                                >
                                    WhatsApp
                                </a>
                            </li>
                        )}
                        {cfg.instagram_url && (
                            <li className="flex items-center gap-3">
                                <Instagram size={15} className="text-ksv-orange shrink-0" />
                                <a href={cfg.instagram_url} target="_blank" rel="noreferrer" data-testid="footer-instagram-link" className="hover:text-ksv-orange transition-colors duration-200">
                                    Instagram
                                </a>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-zinc-600">
                        © {new Date().getFullYear()} KSV Soluções Integradas. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link to="/politica-de-privacidade" data-testid="footer-privacy-link" className="text-xs text-zinc-500 hover:text-ksv-orange transition-colors duration-200">
                            Política de Privacidade
                        </Link>
                        <Link to="/termos-de-uso" data-testid="footer-terms-link" className="text-xs text-zinc-500 hover:text-ksv-orange transition-colors duration-200">
                            Termos de Uso
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
