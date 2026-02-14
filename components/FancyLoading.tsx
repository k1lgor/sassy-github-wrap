"use client";

import { motion } from "framer-motion";

export default function FancyLoading() {
  const loadingMessages = [
    "Compiling your failures...",
    "Analyzing your 'creative' variable names...",
    "Scanning for emotional damage...",
    "Judging your commit history...",
    "Connecting to the Sassy Cloud...",
    "Found 0 social life detections...",
    "Measuring your ego...",
  ];

  return (
    <div className="flex flex-col items-center justify-center p-12 md:p-20 glass-panel rounded-[3rem] w-full max-w-xl aurora-bg relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-cyan/5 blur-3xl" />

      <div className="relative w-48 h-48 mb-12">
        {/* Outer Orbit */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-dashed border-neon-cyan/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />

        {/* Outer Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-[6px] border-transparent border-t-neon-cyan border-b-neon-purple shadow-[0_0_30px_rgba(0,243,255,0.4)]"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute inset-6 rounded-full border-[6px] border-transparent border-r-neon-pink border-l-neon-cyan/50 shadow-[0_0_20px_rgba(255,0,255,0.3)]"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        {/* Scanning Beam */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-neon-cyan/10 to-transparent"
          animate={{ translateY: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <div className="absolute inset-0 flex items-center justify-center font-black text-4xl text-white tracking-widest text-glow">
          AI
        </div>
      </div>

      <div className="space-y-6 text-center relative z-10">
        <motion.h2
          className="text-3xl md:text-5xl font-black text-white text-glow italic"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ANALYZING CRINGE
        </motion.h2>

        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden max-w-[200px] mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.p
          key={Math.random()} // Force re-animation on message change logic could be added but keep it simple
          className="text-neon-cyan text-lg font-bold tracking-widest uppercase h-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
        </motion.p>
      </div>
    </div>
  );
}
