"use client";

import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frameCount = 80;
const INITIAL_FRAMES = 15; // Load first 15 frames immediately

export default function SequenceScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>(new Array(frameCount).fill(null));
    const [loadProgress, setLoadProgress] = useState(0);
    const [initialLoaded, setInitialLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        const imgs = imagesRef.current;

        if (!canvas || !imgs[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imgs[index];

        if (img && img.complete && img.naturalHeight !== 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Cover fit calculation
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width / 2) - (img.width / 2) * scale;
            const y = (canvas.height / 2) - (img.height / 2) * scale;

            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
    };

    useEffect(() => {
        const loadImages = async () => {
            // PHASE 1: Load first batch immediately for instant display
            const initialPromises = Array.from({ length: INITIAL_FRAMES }, (_, i) => {
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = i.toString().padStart(3, "0");
                    img.src = `/sequence/Begin_with_an_202601220117_7xziv_${paddedIndex}.jpg`;

                    img.onload = () => {
                        imagesRef.current[i] = img;
                        setLoadProgress((prev) => Math.min(prev + (100 / frameCount), 100));
                        resolve();
                    };
                    img.onerror = () => {
                        setLoadProgress((prev) => Math.min(prev + (100 / frameCount), 100));
                        resolve();
                    };
                });
            });

            // Wait for initial frames to load
            await Promise.all(initialPromises);
            setInitialLoaded(true);
            renderFrame(0);

            // PHASE 2: Load remaining frames in background (non-blocking)
            const remainingPromises = Array.from({ length: frameCount - INITIAL_FRAMES }, (_, i) => {
                const frameIndex = i + INITIAL_FRAMES;
                return new Promise<void>((resolve) => {
                    const img = new Image();
                    const paddedIndex = frameIndex.toString().padStart(3, "0");
                    img.src = `/sequence/Begin_with_an_202601220117_7xziv_${paddedIndex}.jpg`;

                    img.onload = () => {
                        imagesRef.current[frameIndex] = img;
                        setLoadProgress((prev) => Math.min(prev + (100 / frameCount), 100));
                        resolve();
                    };
                    img.onerror = () => {
                        setLoadProgress((prev) => Math.min(prev + (100 / frameCount), 100));
                        resolve();
                    };
                });
            });

            // Load rest without blocking
            await Promise.all(remainingPromises);
        };

        loadImages();
    }, []);

    useMotionValueEvent(currentIndex, "change", (latest) => {
        const index = Math.min(Math.floor(latest), frameCount - 1);
        renderFrame(index);
    });

    useEffect(() => {
        const handleResize = () => {
            const index = Math.min(Math.floor(currentIndex.get()), frameCount - 1);
            renderFrame(index);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [currentIndex]);

    return (
        <div ref={containerRef} className="h-[400vh] relative z-0 bg-background">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas ref={canvasRef} className="block w-full h-full" />

                {/* Subtle background loading indicator - only if not fully loaded */}
                {loadProgress < 100 && initialLoaded && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50">
                        <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                            <p className="text-white text-xs opacity-70">Loading {Math.round(loadProgress)}%</p>
                        </div>
                    </div>
                )}

                {/* Initial loading overlay - only for first frames */}
                {!initialLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
                        <p className="text-2xl font-bold mb-4">Loading Experience...</p>
                        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#F40009]"
                                initial={{ width: 0 }}
                                animate={{ width: `${(loadProgress / INITIAL_FRAMES) * 100}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                )}

                <OverlayText scrollYProgress={scrollYProgress} />
            </div>
        </div>
    );
}

function OverlayText({ scrollYProgress }: { scrollYProgress: any }) {
    const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const opacity4 = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const x2 = useTransform(scrollYProgress, [0.25, 0.45], [-50, 0]);
    const x3 = useTransform(scrollYProgress, [0.55, 0.75], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-white mix-blend-difference">
            {/* 0% - Title */}
            <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center">
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-[#F40009]">COCA-COLA</h1>
                <p className="text-xl md:text-2xl mt-4">Real Magic</p>
            </motion.div>

            {/* 30% - Slogan Left */}
            <motion.div style={{ opacity: opacity2, x: x2 }} className="absolute left-10 md:left-20 max-w-md">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Taste the Feeling</h2>
            </motion.div>

            {/* 60% - Slogan Right */}
            <motion.div style={{ opacity: opacity3, x: x3 }} className="absolute right-10 md:right-20 max-w-md text-right">
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">Universal Joy</h2>
            </motion.div>

            {/* 90% - CTA */}
            <motion.div style={{ opacity: opacity4 }} className="absolute bottom-20 text-center pointer-events-auto">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Share a Coke?</h2>
                <button className="bg-tuku-accent text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform">
                    Grab One
                </button>
            </motion.div>
        </div>
    )
}
