"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Code,
  Moon,
  Users,
  Ribbon,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface WrapCardProps {
  data: any;
  onReset: () => void;
}

export default function WrapCard({ data, onReset }: WrapCardProps) {
  const { user, roast } = data;
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = roast.slides || [];

  // Fallback if slides are missing (legacy or error)
  if (!slides.length) {
    return (
      <div className="text-white text-center p-8 glass-panel rounded-2xl">
        <h2 className="text-2xl font-bold mb-4">Error: Roast Malfunction</h2>
        <p>The AI was too lazy to generate slides. Try again.</p>
        <button onClick={onReset} className="mt-4 underline">
          Retry
        </button>
      </div>
    );
  }

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const Icons = [Terminal, Code, Moon, Users, Ribbon]; // Mapping icons to slides 0-4

  const CurrentIcon = Icons[currentIndex] || Terminal;

  return (
    <div className="max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-[600px]">
      {/* Progress Bar */}
      <div className="flex gap-2 mb-8 w-full max-w-md justify-center">
        {slides.map((_: any, idx: number) => (
          <div
            key={idx}
            className={cn(
              "h-1 px-4 rounded-full transition-all duration-300",
              idx === currentIndex ? "bg-neon-cyan flex-1" : "bg-gray-700 w-4"
            )}
          />
        ))}
      </div>

      <div className="relative w-full overflow-hidden min-h-[500px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            <div className="glass-panel p-8 md:p-12 rounded-[2rem] relative border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-3xl">
              {/* Floating Background Icon */}
              <div className="absolute top-4 right-4 text-white/5">
                <CurrentIcon size={200} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md mb-4 border border-white/20">
                  <CurrentIcon className="w-12 h-12 text-neon-cyan" />
                </div>

                <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-neon-pink uppercase">
                  {slides[currentIndex].title}
                </h2>

                <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-4 max-w-lg">
                  {slides[currentIndex].subtitle}
                </h1>

                <div className="h-px w-24 bg-gradient-to-r from-transparent via-neon-purple to-transparent my-6" />

                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
                  "{slides[currentIndex].content}"
                </p>

                {/* Stat Highlight */}
                <div className="mt-8 py-4 px-8 rounded-xl bg-gradient-to-r from-neon-purple/20 to-neon-cyan/20 border border-white/10 backdrop-blur-md">
                  <span className="text-4xl md:text-6xl font-black text-white text-glow">
                    {slides[currentIndex].stat}
                  </span>
                  {slides[currentIndex].extra && (
                    <div className="text-6xl mt-4 animate-bounce">
                      {slides[currentIndex].extra}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-8 mt-8">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-4 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 transition-all active:scale-95"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {currentIndex === slides.length - 1 ? (
          <button
            onClick={onReset}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink font-bold text-white hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-neon-purple/50"
          >
            ROAST ANOTHER
          </button>
        ) : (
          <span className="text-xs tracking-widest text-gray-500 font-mono">
            {currentIndex + 1} / {slides.length}
          </span>
        )}

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="p-4 rounded-full glass-panel hover:bg-white/10 disabled:opacity-30 transition-all active:scale-95"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
