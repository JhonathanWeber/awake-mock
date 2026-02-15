"use client";

import { motion } from "framer-motion";
import { serviceMock } from "@/mocks/home";
import Link from "next/link";
import {
    LayoutGrid,
    MessageCircle,
    Smartphone,
    MapPin,
    Camera,
    Video,
    Search,
    PenTool,
    BarChart3,
    Rocket
} from "lucide-react";
import { TypingEffect } from "@/components/ui/TypingEffect";

// Mapeamento de ícones para os serviços (similar à home)
const icons = [LayoutGrid, MessageCircle, Smartphone, MapPin, Camera, Video];

const processSteps = [
    {
        icon: Search,
        title: "Diagnóstico",
        desc: "Analisamos sua presença atual, concorrentes e oportunidades de mercado."
    },
    {
        icon: PenTool,
        title: "Estratégia",
        desc: "Definimos pilares de conteúdo, tom de voz e canais de atuação."
    },
    {
        icon: Rocket,
        title: "Execução",
        desc: "Produção high-end, gestão de comunidade e publicação consistente."
    },
    {
        icon: BarChart3,
        title: "Otimização",
        desc: "Análise de métricas mensais para ajustar a rota e maximizar ROI."
    }
];

export default function ServicosPage() {
    return (
        <main className="relative min-h-screen overflow-hidden pt-24 pb-20 sm:pt-32">
            {/* Background Elements */}
            <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />
            <div className="pointer-events-none absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-[var(--accent-2)]/5 blur-[120px]" />

            {/* Header Section */}
            <section className="section-shell relative z-10 mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--accent-2)]">
                        O que fazemos
                    </span>
                    <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        <TypingEffect text="Soluções integradas para" speed={0.03} /> <br />
                        <span className="text-[var(--accent)]"><TypingEffect text="destravar crescimento." speed={0.03} delay={0.5} /></span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg text-[var(--muted)] leading-relaxed">
                        Não somos apenas uma agência de posts. Somos seu braço estratégico de growth,
                        conteúdo e posicionamento digital.
                    </p>
                </motion.div>
            </section>

            {/* Services Grid */}
            <section className="section-shell relative z-10 mb-32">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {serviceMock.map((service, i) => {
                        const Icon = icons[i] || LayoutGrid;
                        return (
                            <motion.article
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 hover:shadow-2xl hover:shadow-[var(--accent)]/10"
                            >
                                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[var(--accent)]/5 blur-[50px] transition-all group-hover:bg-[var(--accent)]/20" />

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-[var(--text)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                                    <Icon size={28} />
                                </div>

                                <div>
                                    <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">{service.title}</h3>
                                    <p className="text-base font-medium leading-relaxed text-[var(--muted)]">{service.summary}</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </section>

            {/* Methodology Section */}
            <section className="relative border-y border-white/5 bg-white/[0.02] py-24 backdrop-blur-sm">
                <div className="section-shell">
                    <div className="mb-16 text-center">
                        <span className="mb-3 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">Metodologia</span>
                        <h2 className="text-3xl font-bold sm:text-4xl text-white">Como geramos valor</h2>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                className="relative flex flex-col items-center text-center"
                            >
                                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[var(--surface-2)] text-[var(--accent)] shadow-lg shadow-[var(--accent)]/5">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-white">{step.title}</h3>
                                <p className="text-sm leading-relaxed text-[var(--muted)]">{step.desc}</p>

                                {/* Connector Line (Desktop only, except last item) */}
                                {index < processSteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-8 left-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent)]/30 to-transparent -z-10 translate-x-1/2" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-shell relative z-10 pt-32 pb-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mx-auto max-w-3xl rounded-[2.5rem] bg-gradient-to-br from-[var(--surface-2)] to-[var(--bg)] border border-white/5 p-12 shadow-2xl shadow-black/50 overflow-hidden relative"
                >
                    <div className="absolute top-0 right-0 h-64 w-64 bg-[var(--accent-2)]/10 blur-[80px] rounded-full pointer-events-none" />

                    <h2 className="text-3xl font-bold text-white sm:text-4xl">Pronto para começar?</h2>
                    <p className="mt-4 text-lg text-[var(--muted)]">
                        Agende um diagnóstico gratuito e descubra onde sua marca pode chegar.
                    </p>
                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/contato"
                            className="rounded-full bg-[var(--accent)] px-8 py-4 text-base font-bold text-white transition hover:brightness-110 hover:shadow-lg hover:shadow-[var(--accent)]/20"
                        >
                            Solicitar Proposta
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
