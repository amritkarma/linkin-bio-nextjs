"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative bg-[#0d132f] text-white py-24 px-6 text-center overflow-hidden">
      <div className="absolute top-[-100px] left-[-80px] w-[300px] h-[300px] bg-blue-600 opacity-20 blur-[100px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[280px] h-[280px] bg-cyan-400 opacity-10 blur-[100px] rounded-full z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
          Start linking your world today
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
          Join thousands of creators, coaches, and entrepreneurs managing their online presence in one place.
        </p>
        <Link
          href="/register"
          className="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 transition-all text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg"
        >
          Create Your Link
        </Link>
      </motion.div>
    </section>
  );
}
