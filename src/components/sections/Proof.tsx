"use client";

import { motion } from "framer-motion";
import { proofMock } from "@/mocks/home";
import { TypingEffect } from "@/components/ui/TypingEffect";

export function Proof() {
    return (
        <section id="proof" className="section-shell flex h-full flex-col justify-center">
            <div className="mb-16 border-l-4 border-[var(--accent)] pl-6">
                <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
                    <TypingEffect text="Execução que traz" speed={0.03} /> <br />
                    <TypingEffect text="resultados reais." speed={0.03} delay={0.5} />
                </h2>
            </div>

            <div className="grid gap-12 sm:grid-cols-3">
                {proofMock.map((item, index) => (
                    <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6, delay: index * 0.15, type: "spring" }}
                        className="relative"
                    >
                        <span className="absolute -left-4 -top-6 text-8xl font-black text-white/[0.03]">
                            0{index + 1}
                        </span>

                        <div className="relative z-10">
                            <p className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl">
                                {item.value}
                            </p>
                            <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-[var(--accent)]">
                                {item.label}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
