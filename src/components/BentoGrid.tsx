"use client";

import { motion } from "framer-motion";

const items = [

    {
        className: "col-span-12 md:col-span-6 row-span-2 h-[500px]",
        title: "Coca-Cola Classic",
        content: "The original taste since 1886. Experience the real magic.",
        color: "bg-gradient-to-br from-[#F40009] to-[#800000] text-white",
        subtitle: "Original Taste",
        image: "/images/coke-zero.webp"
    },
    {
        className: "col-span-12 md:col-span-6 row-span-1 h-[240px]",
        title: "Zero Sugar",
        content: "Best Coke Ever? Zero Sugar, Zero Calories.",
        color: "bg-black text-white border border-gray-800",
        subtitle: "The Future"
    },
    {
        className: "col-span-12 md:col-span-6 row-span-1 h-[240px]",
        title: "Coca-Cola Light",
        content: "Crisp, refreshing taste with no calories.",
        color: "bg-gradient-to-br from-gray-300 to-gray-400 text-black",
        subtitle: "Light Perfection"
    },
    {
        className: "col-span-12 row-span-1 h-[200px]",
        title: "Merchandise",
        content: "Wear the brand. Exclusive t-shirts, caps and accessories.",
        color: "bg-white text-black",
        subtitle: "Shop Now"
    }
];

export default function BentoGrid() {
    return (
        <section id="products" className="py-20 bg-background text-foreground">
            <div className="max-w-7xl mx-auto p-4 md:p-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-bold mb-12 text-center uppercase tracking-tighter"
                >
                    Our Collection
                </motion.h2>

                <div className="grid grid-cols-12 gap-4">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`${item.className} ${item.color} rounded-3xl p-8 flex flex-col justify-between group hover:shadow-2xl transition-shadow duration-500 overflow-hidden relative`}
                        >
                            <div className="relative z-10">
                                <span className="text-sm font-bold tracking-widest uppercase opacity-70 mb-2 block">{item.subtitle}</span>
                                <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">{item.title}</h3>
                            </div>

                            {item.image && (
                                <div className="absolute left-0 top-5 bottom-0 w-3/5 flex items-center justify-start z-0 pointer-events-none pl-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="max-w-[95%] max-h-full w-auto h-auto object-contain opacity-50 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-[-8deg] rotate-[-5deg] transition-all duration-700 drop-shadow-2xl"
                                    />
                                </div>
                            )}

                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 relative z-10">
                                <p className="text-lg opacity-80 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">{item.content}</p>
                            </div>

                            {/* Hover Effect Light */}
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
