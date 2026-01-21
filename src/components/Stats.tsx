import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { label: "Countries Served", value: 200, suffix: "+" },
    { label: "Daily Servings", value: 1900000000, suffix: "" },
    { label: "Years of Joy", value: 138, suffix: "+" },
];

export default function Stats() {
    return (
        <div className="py-20 bg-black text-white flex flex-wrap justify-around items-center">
            {stats.map((stat, i) => (
                <Counter key={i} {...stat} />
            ))}
        </div>
    );
}

function Counter({ label, value, suffix = "" }: { label: string, value: number, suffix?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
    const displayValue = useTransform(springValue, (latest) => Math.floor(latest).toLocaleString());

    useEffect(() => {
        if (inView) {
            motionValue.set(value);
        }
    }, [inView, value, motionValue]);

    return (
        <div ref={ref} className="text-center p-6">
            <h3 className="text-6xl md:text-8xl font-bold mb-2 tabular-nums">
                <motion.span>{displayValue}</motion.span>{suffix}
            </h3>
            <p className="text-xl uppercase tracking-widest opacity-70">{label}</p>
        </div>
    );
}
