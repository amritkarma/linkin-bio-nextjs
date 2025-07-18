"use client";

import { motion } from "framer-motion";
import { FiSmartphone, FiShare2 } from "react-icons/fi"; 
import { TbSparkles } from "react-icons/tb";

const features = [
  {
    icon: <TbSparkles className="w-8 h-8 text-blue-500" />,
    title: "Custom Links",
    description: "Add and manage links to your socials, store, or content with precision.",
  },
  {
    icon: <FiSmartphone className="w-8 h-8 text-blue-500" />,
    title: "Mobile-Optimized",
    description: "Bio pages auto-scale perfectly across all devices and screen sizes.",
  },
  {
    icon: <FiShare2 className="w-8 h-8 text-blue-500" />,
    title: "Instant Sharing",
    description: "One link to rule them all — share your whole identity instantly.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-[#0c122c] text-white py-24 px-6 overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Why Linkify?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-white/70"
        >
          All your digital links. One sleek, powerful page.
        </motion.p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto z-10 relative">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="p-6 rounded-2xl border border-white/10 bg-[#10142e] hover:bg-[#121933] transition-colors shadow-xl"
          >
            <div className="flex justify-center items-center mb-4">
              {f.icon}
            </div>
            <h3 className="text-xl font-bold mb-2">{f.title}</h3>
            <p className="text-white/70 text-base">{f.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-blue-600 opacity-10 rounded-full blur-[100px] pointer-events-none z-0" />
    </section>
  );
}
