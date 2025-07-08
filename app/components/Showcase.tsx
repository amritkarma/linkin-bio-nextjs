"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const showcase = [
  {
    image: "/showcase/creator.png",
    label: "Creator Profile",
    alt: "Customizable creator profile demo",
  },
  {
    image: "/showcase/coach.png",
    label: "Coach Page",
    alt: "Tailored coaching page design preview",
  },
  {
    image: "/showcase/storefront.png",
    label: "Mini Storefront",
    alt: "Mini storefront with digital products preview",
  },
];

export default function Showcase() {
  return (
    <section className="relative bg-[#0a112d] text-white py-24 px-6 overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Beautiful, branded pages
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-lg max-w-xl mx-auto"
        >
          Look professional with fully customizable design and themes tailored to your style.
        </motion.p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto relative z-10">
        {showcase.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="bg-[#101633] border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden max-w-xs w-full sm:w-[300px] transform hover:scale-105 transition-transform"
          >
            <Image
              src={item.image}
              alt={item.alt}
              width={400}
              height={300}
              className="w-full h-56 object-cover"
            />
            <p className="py-4 text-base font-medium text-white text-center border-t border-white/10 bg-[#0e1533]">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-[10%] left-[-80px] w-[300px] h-[300px] bg-blue-600 opacity-10 blur-[100px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-60px] right-[-100px] w-[280px] h-[280px] bg-cyan-400 opacity-10 blur-[100px] rounded-full pointer-events-none z-0" />
    </section>
  );
}
