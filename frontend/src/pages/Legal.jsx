import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DOCS = {
    privacidade: {
        title: "Política de Privacidade",
        testid: "privacy-page",
        sections: [
            {
                h: "1. Dados coletados",
                p: "Ao enviar o formulário de orçamento, coletamos as informações fornecidas por você: nome, empresa, WhatsApp, e-mail, cidade, tipo de serviço, descrição da necessidade e eventuais arquivos anexados (fotos, vídeos ou documentos).",
            },
            {
                h: "2. Finalidade do tratamento",
                p: "Os dados são utilizados exclusivamente para que a equipe da KSV Soluções Integradas possa entender sua demanda, elaborar orçamentos e entrar em contato com você.",
            },
            {
                h: "3. Compartilhamento",
                p: "Os dados enviados são encaminhados à equipe interna da KSV por e-mail e, quando configurado, por notificação em WhatsApp corporativo. Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing.",
            },
            {
                h: "4. Armazenamento e segurança",
                p: "As solicitações ficam registradas em ambiente seguro, com acesso restrito à equipe responsável pelo atendimento.",
            },
            {
                h: "5. Seus direitos (LGPD)",
                p: "Você pode solicitar a confirmação, o acesso, a correção ou a exclusão dos seus dados pessoais a qualquer momento pelo e-mail contato@ksvsolucoes.com.br.",
            },
            {
                h: "6. Cookies",
                p: "Este site pode utilizar cookies básicos de funcionamento e de consentimento. Nenhum cookie é utilizado para publicidade de terceiros.",
            },
        ],
    },
    termos: {
        title: "Termos de Uso",
        testid: "terms-page",
        sections: [
            {
                h: "1. Objeto",
                p: "Este site apresenta os serviços da KSV Soluções Integradas e permite o envio de solicitações de orçamento para obras, reformas, adequações, infraestrutura e serviços complementares.",
            },
            {
                h: "2. Solicitações de orçamento",
                p: "O envio do formulário não gera contratação automática. Toda solicitação passa por análise da equipe, que retornará o contato para alinhamento de escopo, condições e prazos.",
            },
            {
                h: "3. Informações fornecidas",
                p: "O usuário é responsável pela veracidade das informações enviadas e pelos arquivos anexados ao formulário.",
            },
            {
                h: "4. Propriedade intelectual",
                p: "A marca KSV, o logotipo e os conteúdos deste site pertencem à KSV Soluções Integradas e não podem ser reproduzidos sem autorização.",
            },
            {
                h: "5. Disponibilidade",
                p: "Envidamos esforços para manter o site disponível e atualizado, sem garantia de funcionamento ininterrupto.",
            },
        ],
    },
};

export default function Legal({ doc }) {
    const content = DOCS[doc] || DOCS.privacidade;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [doc]);

    return (
        <div data-testid={content.testid} className="bg-ksv-black min-h-screen">
            <header className="border-b border-white/10 bg-black/85 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 h-[76px] flex items-center justify-between">
                    <Link to="/" data-testid="legal-back-link" className="flex items-center gap-3">
                        <img src="/logo.png" alt="KSV Soluções Integradas" className="h-10 w-auto" />
                    </Link>
                    <Link
                        to="/"
                        data-testid="legal-home-button"
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-zinc-400 hover:text-ksv-orange transition-colors duration-200"
                    >
                        <ArrowLeft size={14} />
                        Voltar ao site
                    </Link>
                </div>
            </header>
            <main className="max-w-4xl mx-auto px-5 sm:px-8 py-20">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-ksv-orange mb-5">KSV Soluções Integradas</p>
                <h1 className="font-display font-bold uppercase text-4xl sm:text-5xl tracking-tight text-ksv-silver">
                    {content.title}
                </h1>
                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ksv-silverdark">
                    Documento modelo editável — não substitui revisão jurídica profissional
                </p>
                <div className="mt-12 space-y-10">
                    {content.sections.map((s, i) => (
                        <div key={i} className="border-t border-ksv-edge pt-6">
                            <h2 className="font-display font-semibold uppercase text-xl tracking-wide text-ksv-silver">{s.h}</h2>
                            <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">{s.p}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-14 text-xs text-zinc-600">
                    Dúvidas: contato@ksvsolucoes.com.br · Av. Fortaleza, 722 – Lauro de Freitas – BA
                </p>
            </main>
        </div>
    );
}
