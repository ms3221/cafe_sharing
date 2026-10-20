"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cafeInfo } from "@/data/cafe-info";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-800 via-warm-700 to-warm-900">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&h=1080&fit=crop')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-warm-200 text-sm tracking-[0.3em] uppercase mb-4"
        >
          {cafeInfo.nameEn}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {cafeInfo.catchphrase}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-warm-200 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
        >
          {cafeInfo.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#menu"
            className="inline-block px-8 py-3 bg-warm-500 text-white font-medium rounded-full hover:bg-warm-600 transition-colors"
          >
            메뉴 보기
          </a>
          <a
            href="#location"
            className="inline-block px-8 py-3 border border-white/40 text-white font-medium rounded-full hover:bg-white/10 transition-colors"
          >
            오시는 길
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown className="text-white/60" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
