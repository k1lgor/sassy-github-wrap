"use client";

import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import FancyLoading from "@/components/FancyLoading";
import WrapCard from "@/components/WrapCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [status, setStatus] = useState<"idle" | "loading" | "result" | "error">(
    "idle",
  );
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAnalyze = async (user: string) => {
    setUsername(user);
    setStatus("loading");
    setErrorMsg("");

    try {
      const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const baseUrl = rawBaseUrl.replace(/\/$/, "");
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
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden aurora-bg">
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="landing"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-full"
          >
            <LandingPage onAnalyze={handleAnalyze} />
          </motion.div>
        )}

        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -40, filter: "blur(20px)" }}
            transition={{ duration: 0.6 }}
          >
            <FancyLoading />
          </motion.div>
        )}

        {status === "result" && data && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <WrapCard data={data} onReset={() => setStatus("idle")} />
          </motion.div>
        )}

        {status === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-12 rounded-[2.5rem] text-center max-w-lg border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-red-500/5 blur-3xl" />
            <h2 className="text-4xl text-red-500 font-black mb-6 tracking-tighter italic">
              ERROR 404: SKILL NOT FOUND
            </h2>
            <p className="text-gray-300 mb-8 text-xl font-light italic">
              "{errorMsg}"
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="btn-premium px-10 py-3 rounded-xl font-black text-white tracking-widest"
            >
              TRY AGAIN
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
