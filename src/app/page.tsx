"use client";

import dynamic from "next/dynamic";
import SequenceScroll from "@/components/SequenceScroll";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";

// Dynamically import heavy components
const TextReveal = dynamic(() => import("@/components/TextReveal"));
const BentoGrid = dynamic(() => import("@/components/BentoGrid"));
const Stats = dynamic(() => import("@/components/Stats"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Preloader />
      <Navbar />

      {/* Hero / Scrollytelling Section */}
      <SequenceScroll />

      {/* Content Section - Z-Index to cover the sticky canvas if needed, or flows naturally */}
      <div className="relative z-10 bg-background -mt-[100vh]">

        {/* About / Text Reveal */}
        <section id="story" className="min-h-screen flex items-center justify-center p-10 bg-white text-black">
          <div className="max-w-4xl text-4xl md:text-6xl font-bold leading-tight">
            <TextReveal>
              It started in 1886. A secret formula that changed the world. Refreshing, uplifting, and bringing people together for over a century.
            </TextReveal>
          </div>
        </section>

        {/* Bento Grid */}
        <section id="brew" className="bg-tuku-dark text-white py-20">
          <BentoGrid />
        </section>

        {/* Stats */}
        <Stats />

        {/* Testimonials */}
        <Testimonials />

        {/* CTA & Footer */}
        <section id="contact" className="min-h-screen flex flex-col items-center justify-center bg-tuku-accent text-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

          <h2 className="text-6xl md:text-9xl font-bold mb-10 text-center relative z-10">
            Taste the <br /> Feeling.
          </h2>
          <button className="text-2xl border-2 border-black px-10 py-4 rounded-full hover:bg-black hover:text-white transition-all relative z-10">
            Refresh Now
          </button>

          <footer className="absolute bottom-10 w-full text-center font-bold opacity-50">
            &copy; 2024 The Coca-Cola Company. All rights reserved.
          </footer>
        </section>
      </div>
    </main>
  );
}
