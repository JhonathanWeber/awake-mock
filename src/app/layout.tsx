import type { Metadata } from "next";
import "./globals.css";
import { TopNav } from "@/components/layout/TopNav";
import { InteractiveBackground } from '@/components/ui/InteractiveBackground';

export const metadata: Metadata = {
    title: "Awake Digital | Growth & Content High-End",
    description: "Estratégia, criação e performance para marcas que buscam o próximo nível de presença digital.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className="antialiased relative bg-slate-950 text-slate-50">
                <InteractiveBackground />
                <TopNav />
                {children}
            </body>
        </html>
    );
}
