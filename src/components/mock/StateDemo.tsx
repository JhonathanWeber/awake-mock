"use client";

import { useState } from "react";

type MockState = "loading" | "error" | "success";

type StateDemoProps = {
    title: string;
    description: string;
    successContent: React.ReactNode;
    loadingLabel?: string;
    errorLabel?: string;
};

const buttons: { key: MockState; label: string }[] = [
    { key: "loading", label: "Loading" },
    { key: "error", label: "Erro" },
    { key: "success", label: "Sucesso" },
];

export function StateDemo({
    title,
    description,
    successContent,
    loadingLabel = "Carregando dados simulados...",
    errorLabel = "Não foi possível carregar agora. Tente novamente.",
}: StateDemoProps) {
    const [state, setState] = useState<MockState>("success");

    return (
        <section className="section-shell pb-20">
            <div className="surface-card rounded-3xl p-6 sm:p-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold sm:text-4xl">{title}</h1>
                        <p className="mt-2 text-sm text-[var(--muted)] sm:text-base">{description}</p>
                    </div>

                    <div className="inline-flex w-fit rounded-xl border border-white/15 bg-white/5 p-1">
                        {buttons.map((button) => (
                            <button
                                key={button.key}
                                onClick={() => setState(button.key)}
                                className={`rounded-lg px-3 py-2 text-xs transition sm:text-sm ${state === button.key
                                        ? "bg-[var(--accent)] text-white"
                                        : "text-[var(--muted)] hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {button.label}
                            </button>
                        ))}
                    </div>
                </div>

                {state === "loading" && (
                    <div className="space-y-3">
                        <p className="text-sm text-[var(--muted)]">{loadingLabel}</p>
                        <div className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
                        <div className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
                    </div>
                )}

                {state === "error" && (
                    <div className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-5">
                        <p className="text-sm text-rose-200">{errorLabel}</p>
                    </div>
                )}

                {state === "success" && successContent}
            </div>
        </section>
    );
}
