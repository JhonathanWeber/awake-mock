"use client";

import { motion } from "framer-motion";
import {
    LayoutGrid,
    MessageCircle,
    Smartphone,
    MapPin,
    Camera,
    Video
} from "lucide-react";
import { serviceMock } from "@/mocks/home";
import { TypingEffect } from "@/components/ui/TypingEffect";

const icons = [LayoutGrid, MessageCircle, Smartphone, MapPin, Camera, Video];

export function Services() {
    return (
        <section id="servicos" className="section-shell relative flex min-h-full flex-col justify-center py-20 sm:py-32 overflow-hidden">
            {/* Background Decor */}
            <div className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[100px]" />

            <div className="mb-12 shrink-0">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--accent-2)]"
                >
                    Soluções
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
                >
                    <TypingEffect text="Serviços para escalar sua" speed={0.03} /> <br />
                    <span className="text-[var(--accent)]"><TypingEffect text="presença digital." speed={0.03} delay={0.5} /></span>
                </motion.h2>
            </div>

            <div className="grid h-auto w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {serviceMock.map((service, i) => {
                    const Icon = icons[i] || LayoutGrid;
                    const isLarge = i === 0 || i === 3;

                    return (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-sm transition-all md:p-6 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/5 hover:shadow-2xl hover:shadow-[var(--accent)]/10 min-h-[260px] ${isLarge ? 'md:col-span-2' : ''}`}
                        >
                            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[var(--accent)]/10 blur-[30px] transition-all group-hover:bg-[var(--accent)]/20" />

                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-[var(--text)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                                <Icon size={20} />
                            </div>

                            <div>
                                <h3 className="mb-2 text-lg font-bold tracking-tight text-white md:text-xl">{service.title}</h3>
                                <p className="text-sm font-medium leading-relaxed text-[var(--muted)] md:text-base">{service.summary}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
