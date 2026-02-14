"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LandingPageProps {
  onAnalyze: (username: string) => void;
}

export default function LandingPage({ onAnalyze }: LandingPageProps) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onAnalyze(username);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center aurora-bg relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-cyan/20 rounded-full blur-[120px] animate-pulse-slow" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl w-full space-y-12 relative z-10"
      >
        <div className="space-y-6">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-panel text-sm font-bold text-neon-cyan tracking-wider uppercase border-white/20 shadow-xl"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Powered by GPT-4o & Sassy Attitude</span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-glow leading-none pt-4">
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              GITHUB
            </span>
            <br />
            <span className="text-neon-purple text-glow-purple">WRAP</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Get roasted by a futuristic AI that judges your coding habits,
            <span className="text-white font-medium"> tech stack</span>, and
            <span className="text-white font-medium"> sleep schedule</span>.
          </p>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink rounded-2xl opacity-20 group-hover:opacity-100 blur transition duration-500" />
            <div className="relative glass-panel rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="flex items-center flex-1 px-3">
                <Github className="w-6 h-6 text-gray-400 mr-3 shrink-0" />
                <input
                  type="text"
                  placeholder="github_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-gray-500 h-12 text-lg font-medium"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!username}
                className="btn-premium px-8 h-12 rounded-xl text-white font-black tracking-widest flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group/btn"
              >
                ANALYZE
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-12 text-sm font-bold tracking-[0.3em] text-gray-600 uppercase"
          >
            Disclaimer: Emotional damage may occur.
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
}
