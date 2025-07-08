"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "./AuthProvider";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [loading, user, router]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#0a0e24] px-6 overflow-hidden">
      <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-blue-600 rotate-45 rounded-3xl opacity-20 z-0" />
      <div className="absolute -bottom-20 -right-20 w-[250px] h-[250px] bg-cyan-400 rounded-full opacity-20 z-0" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="z-10 max-w-2xl w-full p-10 rounded-2xl border border-white/10 bg-[#10142e] text-white shadow-xl"
      >
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-white">
          Link your world,<br />
          <span className="text-blue-500">beautifully</span>.
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
          Craft a sleek link-in-bio hub that evolves with your digital identity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-full border border-white/20 text-white font-semibold text-lg hover:bg-white/10 transition-colors"
          >
            Login
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
