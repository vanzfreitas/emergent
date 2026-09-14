import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/ksv/Header";
import { Hero } from "@/components/ksv/Hero";
import { Marquee } from "@/components/ksv/Marquee";
import { Obras } from "@/components/ksv/Obras";
import { Processo } from "@/components/ksv/Processo";
import { Diferenciais } from "@/components/ksv/Diferenciais";
import { Projetos } from "@/components/ksv/Projetos";
import { Segmentos } from "@/components/ksv/Segmentos";
import { Complementares } from "@/components/ksv/Complementares";
import { Formulario } from "@/components/ksv/Formulario";
import { CtaFinal } from "@/components/ksv/CtaFinal";
import { Sobre } from "@/components/ksv/Sobre";
import { Footer } from "@/components/ksv/Footer";
import { WhatsFloat } from "@/components/ksv/WhatsFloat";
import { CookieBanner } from "@/components/ksv/CookieBanner";
import { scrollToId } from "@/lib/siteConfig";

export default function Landing() {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.slice(1);
            setTimeout(() => scrollToId(id), 400);
        } else {
            window.scrollTo(0, 0);
        }
    }, [location]);

    return (
        <div data-testid="landing-page" className="bg-ksv-black min-h-screen">
            <Header />
            <main>
                <Hero />
                <Marquee />
                <Obras />
                <Processo />
                <Diferenciais />
                <Projetos />
                <Segmentos />
                <Complementares />
                <Formulario />
                <CtaFinal />
                <Sobre />
            </main>
            <Footer />
            <WhatsFloat />
            <CookieBanner />
        </div>
    );
}
