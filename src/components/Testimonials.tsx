"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
    { text: "Nothing beats an ice cold Coke.", author: "Everywhere" },
    { text: "The pause that refreshes.", author: "Since 1929" },
    { text: "Open happiness.", author: "Global Campaign" },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-tuku-light text-tuku-dark relative overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl p-10"
                >
                    <h3 className="text-4xl md:text-7xl font-bold leading-tight mb-10">"{testimonials[index].text}"</h3>
                    <p className="text-xl md:text-2xl uppercase tracking-widest font-semibold">— {testimonials[index].author}</p>
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-10 flex gap-2">
                {testimonials.map((_, i) => (
                    <div key={i} className={`h-1 transition-all duration-500 rounded-full bg-tuku-dark ${i === index ? "w-10 opacity-100" : "w-2 opacity-30"}`} />
                ))}
            </div>
        </div>
    );
}
