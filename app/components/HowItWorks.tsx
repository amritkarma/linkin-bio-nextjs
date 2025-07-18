"use client";

import { motion } from "framer-motion";

const steps = [
  "Sign up with your email or social account.",
  "Create your custom profile & add your links.",
  "Share your link anywhere — that's it!",
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 bg-[#0d132f] text-white text-center overflow-hidden px-6">
      <div className="absolute top-[-80px] left-[-100px] w-[250px] h-[250px] bg-blue-600 opacity-20 blur-[100px] rounded-full z-0" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[200px] h-[200px] bg-cyan-400 opacity-10 blur-[100px] rounded-full z-0" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-14 leading-snug tracking-tight">
          How it works
        </h2>

        <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center px-4"
            >
              <div className="text-white bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full w-14 h-14 flex items-center justify-center font-bold text-xl shadow-lg mb-4">
                {index + 1}
              </div>
              <p className="text-white/80 text-lg">{step}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
