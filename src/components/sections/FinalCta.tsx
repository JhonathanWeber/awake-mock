"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TypingEffect } from "@/components/ui/TypingEffect";

export function FinalCta() {
    return (
        <section id="contato" className="relative h-full w-full flex flex-col justify-center overflow-hidden">
            {/* Full width gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface)] to-[var(--bg)]" />
            <div className="absolute inset-0 bg-[var(--accent)]/5" />

            {/* Abstract Shapes */}
            <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[var(--accent-2)]/20 blur-[120px]" />
            <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[var(--accent)]/20 blur-[120px]" />

            <div className="section-shell relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl">
                        <TypingEffect text="Pronto para acordar" speed={0.03} /> <br />
                        <span className="text-[var(--accent)]"><TypingEffect text="o potencial da sua marca?" speed={0.03} delay={0.5} /></span>
                    </h2>

                    <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--muted)] sm:text-xl">
                        Não deixe seu negócio dormindo enquanto o mercado acelera.
                        Vamos criar hoje seu plano de ação.
                    </p>

                    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contato"
                            className="group relative flex items-center gap-3 overflow-hidden rounded-full bg-white px-8 py-4 text-base font-bold text-black transition-transform hover:scale-105"
                        >
                            <span className="relative z-10">Solicitar diagnóstico</span>
                            <div className="absolute inset-0 -translate-x-full bg-[var(--accent-2)] transition-transform group-hover:translate-x-0" />
                        </Link>

                        <Link
                            href="/cases"
                            className="text-sm font-medium uppercase tracking-widest text-white/60 transition-colors hover:text-white"
                        >
                            Ver cases recentes
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
