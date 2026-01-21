"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
    children: string;
    className?: string;
}

export default function TextReveal({ children, className = "" }: TextRevealProps) {
    const element = useRef<HTMLParagraphElement>(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ["start 0.9", "start 0.25"],
    });

    const words = children.split(" ");

    return (
        <p
            ref={element}
            className={`flex flex-wrap leading-tight overflow-hidden ${className}`}
        >
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

const Word = ({ children, progress, range }: any) => {
    const characters = children.split("");
    const amount = range[1] - range[0];
    const step = amount / characters.length;

    return (
        <span className="relative mr-[0.2em] mt-[0.2em]">
            {characters.map((char: string, i: number) => {
                const start = range[0] + i * step;
                const end = range[0] + (i + 1) * step;
                return (
                    <Char key={`c_${i}`} progress={progress} range={[start, end]}>
                        {char}
                    </Char>
                );
            })}
        </span>
    );
};

const Char = ({ children, progress, range }: any) => {
    const opacity = useTransform(progress, range, [0.1, 1]);
    return (
        <span>
            <span className="absolute opacity-10">{children}</span>
            <motion.span style={{ opacity }}>{children}</motion.span>
        </span>
    );
};
