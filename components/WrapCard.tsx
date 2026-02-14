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

  if (!slides.length) {
    return (
      <div className="text-white text-center p-12 glass-panel rounded-3xl aurora-bg">
        <h2 className="text-3xl font-black mb-4 text-glow-purple">
          ERROR: ROAST MALFUNCTION
        </h2>
        <p className="text-gray-400">
          The AI was too lazy to generate slides. Try again.
        </p>
        <button
          onClick={onReset}
          className="mt-8 btn-premium px-8 py-3 rounded-xl font-bold"
        >
          RETRY
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

  const Icons = [Terminal, Code, Moon, Users, Ribbon];
  const CurrentIcon = Icons[currentIndex] || Terminal;

  return (
    <div className="max-w-6xl w-full mx-auto p-4 md:p-8 flex flex-col items-center justify-center min-h-screen relative z-10">
      {/* Progress Bar */}
      <div className="flex gap-3 mb-12 w-full max-w-xl justify-center px-4">
        {slides.map((_: any, idx: number) => (
          <div
            key={idx}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              idx === currentIndex
                ? "bg-gradient-to-r from-neon-cyan to-neon-purple flex-1 shadow-[0_0_15px_rgba(0,243,255,0.5)]"
                : idx < currentIndex
                  ? "bg-neon-purple/50 w-8"
                  : "bg-white/10 w-8",
            )}
          />
        ))}
      </div>

      <div className="relative w-full overflow-visible min-h-[600px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -50, scale: 0.95, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="w-full flex justify-center"
          >
            <div className="glass-panel w-full max-w-4xl p-8 md:p-20 rounded-[3rem] relative border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-black/40 backdrop-blur-3xl overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-neon-purple/10 rounded-full blur-[100px] group-hover:bg-neon-purple/20 transition-colors duration-700" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[100px] group-hover:bg-neon-cyan/15 transition-colors duration-700" />

              {/* Large Background Icon */}
              <div className="absolute top-1/2 right-0 -translate-y-1/2 text-white/[0.02] transform scale-150 pointer-events-none">
                <CurrentIcon size={400} />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/5 p-5 rounded-3xl backdrop-blur-2xl border border-white/10 shadow-inner"
                >
                  <CurrentIcon className="w-10 h-10 md:w-14 md:h-14 text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-sm md:text-xl font-black tracking-[0.4em] text-neon-pink uppercase drop-shadow-[0_0_10px_rgba(255,0,255,0.3)]">
                    {slides[currentIndex].title}
                  </h2>

                  <h1 className="text-3xl md:text-6xl font-black text-white leading-tight max-w-3xl">
                    {slides[currentIndex].subtitle}
                  </h1>
                </div>

                <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

                <p className="text-xl md:text-3xl text-gray-300 leading-relaxed max-w-3xl font-light italic">
                  "{slides[currentIndex].content}"
                </p>

                {/* Stat Highlight */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                  className="mt-12 py-8 px-12 md:py-12 md:px-20 rounded-[2.5rem] bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 opacity-50" />
                  <span className="text-5xl md:text-8xl font-black text-white text-glow block relative z-10">
                    {slides[currentIndex].stat}
                  </span>
                  {slides[currentIndex].extra && (
                    <div className="text-5xl md:text-7xl mt-6 animate-bounce relative z-10 drop-shadow-2xl">
                      {slides[currentIndex].extra}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 md:gap-12 mt-12 mb-8 relative z-20">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-5 md:p-6 rounded-2xl glass-panel hover:bg-white/10 disabled:opacity-20 transition-all active:scale-90 border-white/10 group shadow-xl"
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>

        {currentIndex === slides.length - 1 ? (
          <button
            onClick={onReset}
            className="btn-premium px-10 py-4 md:px-16 md:py-5 text-lg md:text-xl rounded-2xl font-black text-white tracking-widest shadow-[0_0_40px_rgba(188,19,254,0.4)]"
          >
            ROAST ANOTHER
          </button>
        ) : (
          <div className="px-6 py-2 rounded-full glass-panel border-white/10">
            <span className="text-sm md:text-base tracking-[0.3em] text-neon-cyan font-black italic">
              {currentIndex + 1} <span className="text-gray-600">/</span>{" "}
              {slides.length}
            </span>
          </div>
        )}

        <button
          onClick={nextSlide}
          disabled={currentIndex === slides.length - 1}
          className="p-5 md:p-6 rounded-2xl glass-panel hover:bg-white/10 disabled:opacity-20 transition-all active:scale-90 border-white/10 group shadow-xl"
        >
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
