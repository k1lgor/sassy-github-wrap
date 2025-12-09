"use client";

import { motion } from "framer-motion";

export default function FancyLoading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8 md:p-12 glass-panel rounded-3xl w-full max-w-[300px] md:max-w-md mx-4">
      <div className="relative w-32 h-32">
        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-cyan border-b-neon-purple"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-4 rounded-full border-4 border-transparent border-r-neon-pink border-l-neon-cyan"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Pulse */}
        <motion.div
          className="absolute inset-8 rounded-full bg-neon-purple/20 blur-md"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />

        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-neon-cyan">
          AI
        </div>
      </div>

      <div className="space-y-2 text-center">
        <motion.h2
          className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-cyan via-white to-neon-purple bg-300% animate-gradient"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          ANALYZING CRINGE
        </motion.h2>
        <p className="text-gray-400 text-sm">
          Scanning repositories for bad code...
        </p>
      </div>
    </div>
  );
}
