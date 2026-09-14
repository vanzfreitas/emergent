import { MapPin } from "lucide-react";
import { Reveal, Eyebrow } from "./Reveal";

export const Sobre = () => (
    <section id="sobre" data-testid="about-ksv-section" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
                <Eyebrow>Sobre</Eyebrow>
                <h2 className="font-display font-bold uppercase text-3xl sm:text-4xl lg:text-5xl tracking-tight text-ksv-silver">
                    KSV Soluções Integradas
                </h2>
                <p className="mt-4 font-mono text-xs sm:text-sm uppercase tracking-[0.2em] text-ksv-orange">
                    Soluções integradas para obras, infraestrutura, climatização e manutenção.
                </p>
                <p className="mt-6 text-base text-zinc-400 leading-relaxed max-w-xl">
                    A KSV Soluções Integradas é voltada à execução de obras, reformas, adequações e soluções de
                    infraestrutura para residências, empresas, condomínios e estabelecimentos comerciais. A equipe atua do entendimento da
                    necessidade à entrega, com organização e acompanhamento em cada etapa do serviço.
                </p>
            </Reveal>
            <Reveal delay={0.1}>
                <div className="border border-ksv-edge bg-ksv-charcoal p-8 sm:p-10">
                    <div className="flex items-start gap-4">
                        <MapPin size={20} className="text-ksv-orange mt-1 shrink-0" />
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ksv-silverdark">Localização</p>
                            <p className="mt-2 font-display font-semibold uppercase text-xl text-ksv-silver">
                                Lauro de Freitas – Bahia
                            </p>
                            <p className="mt-2 text-sm text-zinc-400">Av. Fortaleza, 722 – Lauro de Freitas – BA</p>
                            <p className="mt-1 text-sm text-zinc-500">Atuação: Salvador, Lauro de Freitas, Camaçari e região.</p>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-ksv-edge grid grid-cols-2 gap-6">
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-silverdark">E-mail</p>
                            <p className="mt-1 text-sm text-ksv-silver break-all">contato@ksvsolucoes.com.br</p>
                        </div>
                        <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ksv-silverdark">Site</p>
                            <p className="mt-1 text-sm text-ksv-silver">ksvsolucoes.com.br</p>
                        </div>
                    </div>
                </div>
            </Reveal>
        </div>
    </section>
);
