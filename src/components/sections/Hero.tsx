"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { heroMock } from "@/mocks/home";
import { TypingEffect } from "@/components/ui/TypingEffect";

export function Hero() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
    const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.5, 0.15]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);

    return (
        <section ref={sectionRef} className="section-shell relative flex h-full flex-col justify-center">
            <div className="pointer-events-none absolute -top-16 left-0 h-56 w-56 rounded-full bg-[var(--accent)]/20 blur-3xl" />
            <div className="pointer-events-none absolute -right-6 bottom-8 h-56 w-56 rounded-full bg-[var(--accent-2)]/20 blur-3xl" />


            <motion.div
                style={{ y, opacity, scale }}
                className="relative z-10 max-w-4xl"
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                >
                    <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-cyan-200">
                        {heroMock.badge}
                    </p>

                    <h1 className="max-w-3xl text-3xl font-semibold leading-tight sm:text-5xl">
                        <TypingEffect text={heroMock.title} speed={0.03} />
                    </h1>

                    <p className="mt-4 max-w-2xl text-sm text-[var(--muted)] sm:text-base">
                        {heroMock.description}
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="#home-contato" className="rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-medium text-white transition hover:brightness-110">
                            {heroMock.primaryCta}
                        </Link>
                        <Link href="#home-services" className="rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                            {heroMock.secondaryCta}
                        </Link>
                    </div>

                    <p className="mt-8 text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                        role para baixo para explorar
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
