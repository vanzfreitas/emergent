import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Landing from "@/pages/Landing";
import Legal from "@/pages/Legal";
import "@/App.css";

function App() {
    useEffect(() => {
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        window.__lenis = lenis;
        let raf;
        const loop = (t) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            window.__lenis = null;
        };
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Toaster theme="dark" position="top-center" richColors />
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/politica-de-privacidade" element={<Legal doc="privacidade" />} />
                    <Route path="/termos-de-uso" element={<Legal doc="termos" />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
