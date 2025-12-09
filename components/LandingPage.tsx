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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full space-y-12"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-neon-cyan mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Powered by GPT-4o & Sassy Attitude</span>
          </motion.div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-gray-500 text-glow leading-[1.1]">
            GITHUB <br />
            <span className="text-neon-purple text-glow-purple">WRAP</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-lg mx-auto leading-relaxed">
            Prepare to be roasted. Our AI analyzes your coding habits and tells
            you what everyone else is thinking.
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="relative max-w-md mx-auto group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan to-neon-purple rounded-xl opacity-50 group-hover:opacity-100 blur transition duration-500" />
          <div className="relative glass-panel rounded-xl p-2 flex items-center">
            <Github className="w-6 h-6 text-gray-400 ml-3 mr-2" />
            <input
              type="text"
              placeholder="github_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 h-12 text-lg"
              autoFocus
            />
            <button
              type="submit"
              disabled={!username}
              className="px-6 h-12 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold tracking-wide hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              Analyze <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.form>

        <div className="pt-20 text-sm text-gray-600">
          <p>Disclaimer: Emotional damage may occur.</p>
        </div>
      </motion.div>
    </div>
  );
}
