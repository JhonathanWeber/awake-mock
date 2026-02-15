"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { TypingEffect } from "@/components/ui/TypingEffect";

type SubmitState = "idle" | "loading" | "success" | "error";

export default function ContatoPage() {
    const [submitState, setSubmitState] = useState<SubmitState>("idle");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSubmitState("loading");

        // Simula envio para API
        window.setTimeout(() => {
            setSubmitState("success");
        }, 1500);
    }

    return (
        <main className="relative min-h-screen overflow-hidden pt-24 pb-12 sm:pt-32">
            {/* Background Elements */}
            <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-[var(--accent)]/10 blur-[100px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-[var(--accent-2)]/5 blur-[120px]" />

            <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-2 lg:gap-24">
                {/* Left Column: Context & Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-[var(--accent)]">
                        Fale com a gente
                    </span>
                    <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
                        <TypingEffect text="Vamos construir o" speed={0.03} /> <br />
                        <span className="text-[var(--accent)]"><TypingEffect text="seu próximo nível?" speed={0.03} delay={0.5} /></span>
                    </h1>
                    <p className="mt-6 text-lg text-[var(--muted)] leading-relaxed">
                        Preencha o formulário para agendar uma conversa estratégica.
                        Entenderemos seu momento e desenharemos o plano ideal de ação.
                    </p>

                    <div className="mt-12 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[var(--accent-2)]">
                                <Mail size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">Email</h3>
                                <p className="text-[var(--muted)]">contato@awake.agency</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[var(--accent-2)]">
                                <Phone size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">WhatsApp</h3>
                                <p className="text-[var(--muted)]">+55 11 99999-9999</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[var(--accent-2)]">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-white">Base</h3>
                                <p className="text-[var(--muted)]">São Paulo, SP - Brasil</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Interactive Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl sm:p-10">
                        {submitState === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex min-h-[400px] flex-col items-center justify-center text-center"
                            >
                                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent-2)]/10 text-[var(--accent-2)]">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h2 className="text-2xl font-bold text-white">Mensagem recebida!</h2>
                                <p className="mt-2 text-[var(--muted)]">
                                    Nossa equipe analisará seu perfil e entrará em contato em até 24 horas úteis.
                                </p>
                                <button
                                    onClick={() => setSubmitState("idle")}
                                    className="mt-8 text-sm font-medium text-[var(--accent)] hover:text-white"
                                >
                                    Enviar nova mensagem
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-6 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-[var(--muted)]">Nome</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                                            placeholder="Seu nome"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="company" className="text-sm font-medium text-[var(--muted)]">Empresa</label>
                                        <input
                                            type="text"
                                            id="company"
                                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                                            placeholder="Nome da empresa"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-[var(--muted)]">Email corporativo</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                                        placeholder="seu@email.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-[var(--muted)]">Como podemos ajudar?</label>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        required
                                        className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-colors focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
                                        placeholder="Conte um pouco sobre seu desafio..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitState === "loading"}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-8 py-4 text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-70"
                                >
                                    {submitState === "loading" ? (
                                        <>
                                            <Loader2 className="animate-spin" size={18} />
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Solicitar contato
                                            <Send size={18} className="transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
