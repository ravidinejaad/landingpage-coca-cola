"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "#story", label: "Our Story" },
    { href: "#products", label: "Products" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
        },
        open: {
            opacity: 1,
            y: "0%",
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
        },
    };

    const linkVariants = {
        closed: { y: "100%", opacity: 0 },
        open: (i: number) => ({
            y: "0%",
            opacity: 1,
            transition: { delay: 0.4 + i * 0.1, duration: 0.5, ease: [0.76, 0, 0.24, 1] as const },
        }),
    };

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 md:p-10 pointer-events-none mix-blend-difference text-white">
                <div className="pointer-events-auto">
                    <Link href="/" className="text-2xl font-bold tracking-tighter uppercase disable-scroll-blend">Coca-Cola</Link>
                </div>
                <button
                    onClick={toggleMenu}
                    className="pointer-events-auto flex flex-col gap-1.5 focus:outline-none group"
                >
                    <span className={`block w-8 h-0.5 bg-white transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                    <span className={`block w-8 h-0.5 bg-white transition-opacity ${isOpen ? "opacity-0" : ""}`} />
                    <span className={`block w-8 h-0.5 bg-white transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </button>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="navbar-overlay"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 bg-[#1A1A1A] z-40 flex flex-col items-center justify-center text-white"
                    >
                        <nav className="flex flex-col gap-4 items-center">
                            {navLinks.map((link, i) => (
                                <div key={link.href} className="overflow-hidden">
                                    <motion.div
                                        custom={i}
                                        variants={linkVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={toggleMenu}
                                            className="text-6xl md:text-8xl font-bold tracking-tighter hover:text-tuku-accent transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                </div>
                            ))}
                        </nav>

                        <div className="absolute bottom-10 flex gap-6 text-sm uppercase tracking-widest opacity-50">
                            <a href="#">Instagram</a>
                            <a href="#">Twitter</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
