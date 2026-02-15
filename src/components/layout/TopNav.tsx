"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
    { href: "/", label: "Home" },
    { href: "/servicos", label: "Serviços" },
    { href: "/cases", label: "Cases" },
    { href: "/contato", label: "Contato" },
];

export function TopNav() {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled || isOpen
                    ? "border-b border-white/5 bg-[#070b14]/80 backdrop-blur-xl py-3"
                    : "border-transparent bg-transparent py-6"
                    }`}
            >
                <div className="section-shell flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 text-sm font-semibold tracking-wide text-white transition hover:text-[var(--accent)]" onClick={() => setIsOpen(false)}>
                        <span className="h-2 w-2 rounded-full bg-[var(--accent)] group-hover:animate-pulse" />
                        AWAKE.
                    </Link>

                    <nav className="hidden items-center gap-1 sm:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-4 py-2 text-xs font-medium transition-all hover:bg-white/10 ${scrolled ? "text-[var(--muted)] hover:text-white" : "text-white/80 hover:text-white"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <Link
                            href="/contato"
                            className={`ml-4 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all hover:scale-105 ${scrolled
                                ? "bg-white text-black hover:bg-[var(--accent)] hover:text-white"
                                : "bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-black"
                                }`}
                        >
                            Start
                        </Link>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:hidden"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#070b14] pt-20 sm:hidden"
                    >
                        <nav className="flex flex-col items-center gap-8 text-center">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-medium text-white/90 transition-colors hover:text-[var(--accent)]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/contato"
                                onClick={() => setIsOpen(false)}
                                className="mt-4 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-wider text-black transition-transform hover:scale-105"
                            >
                                Start Project
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
