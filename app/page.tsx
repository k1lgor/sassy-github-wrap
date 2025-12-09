"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import FancyLoading from "@/components/FancyLoading";
import WrapCard from "@/components/WrapCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "error">(
    "idle"
  );
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async (user: string) => {
    setUsername(user);
    setStatus("loading");
    setErrorMsg("");

    try {
      // Use env var for API URL (Vercel) or default to relative (Local)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${baseUrl}/api/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Unknown error");
      }

      setData(json);
      setStatus("result");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Failed to analyze");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden p-4">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#05050a] to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse-slow" />
      </div>

      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <LandingPage onAnalyze={handleAnalyze} />
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <FancyLoading />
          </motion.div>
        )}

        {status === "result" && data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            className="w-full"
          >
            <WrapCard data={data} onReset={() => setStatus("idle")} />
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-panel p-8 rounded-2xl text-center max-w-md"
          >
            <h2 className="text-2xl text-red-500 font-bold mb-4">
              Error 404: Skill Not Found
            </h2>
            <p className="text-gray-300 mb-6">{errorMsg}</p>
            <button
              onClick={() => setStatus("idle")}
              className="px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
