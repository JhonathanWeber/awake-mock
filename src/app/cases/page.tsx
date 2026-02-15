"use client";

import { motion } from "framer-motion";
import { casesMock } from "@/mocks/cases";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TypingEffect } from "@/components/ui/TypingEffect";

export default function CasesPage() {
    return (
        <main className="relative min-h-screen overflow-hidden pt-24 pb-20 sm:pt-32">
            {/* Background Elements */}
            <div className="pointer-events-none absolute right-0 bottom-0 h-[800px] w-[800px] rounded-full bg-[var(--accent)]/5 blur-[120px]" />

            <section className="section-shell relative z-10 mb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                        Portfolio Selecionado
                    </span>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        <TypingEffect text="Histórias de" speed={0.03} /> <br />
                        <span className="text-[var(--accent)]"><TypingEffect text="transformação digital." speed={0.03} delay={0.5} /></span>
                    </h1>
                </motion.div>
            </section>

            <section className="section-shell relative z-10 grid gap-8 pb-32">
                {casesMock.map((item, index) => (
                    <motion.article
                        key={item.title}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/[0.02] p-8 backdrop-blur-md transition-all hover:bg-white/[0.04] sm:p-12"
                    >
                        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                                    {item.title}
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent)]">Contexto</h3>
                                        <p className="mt-1 text-[var(--muted)]">{item.context}</p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--accent-2)]">Ação</h3>
                                        <p className="mt-1 text-[var(--muted)]">{item.action}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative flex flex-1 flex-col justify-between rounded-3xl bg-[var(--surface-2)]/50 p-8 lg:max-w-md lg:self-stretch">
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                                <div>
                                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-white/50">Impacto Gerado</h3>
                                    <p className="text-xl font-medium leading-relaxed text-white sm:text-2xl">
                                        &quot;{item.impact}&quot;
                                    </p>
                                </div>

                                <div className="mt-8 flex justify-end">
                                    <button className="group/btn flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-110">
                                        <ArrowUpRight size={20} className="transition-transform group-hover/btn:rotate-45" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </section>

            <section className="text-center pb-20">
                <p className="text-[var(--muted)] mb-6">Quer ver mais resultados?</p>
                <Link
                    href="/contato"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
                >
                    Solicitar apresentação completa
                </Link>
            </section>
        </main>
    );
}
