"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const NetworkScene = dynamic(() => import("@/components/NetworkScene"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-accent/30 border-t-accent animate-spin" />
    </div>
  ),
});

export default function Interactive3D() {
  return (
    <section className="relative bg-ink-2 py-28 overflow-hidden">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 grid-bg-dark opacity-60"
        style={{
          maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(99,102,241,.1) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.85, ease: EXPO }}
          className="text-center mb-2"
        >
          <p className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-accent/65 uppercase mb-5">
            The Founder Network
          </p>
          <h2
            className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.035em] text-white mb-4"
            style={{ fontSize: "clamp(30px,3.6vw,46px)" }}
          >
            Your circle, visualized.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/38 max-w-md mx-auto font-normal leading-relaxed">
            108 Rays brings together founders across industries, stages, and
            geographies into one intimate ecosystem.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: EXPO, delay: 0.2 }}
          className="relative h-[480px] lg:h-[560px] rounded-2xl overflow-hidden border border-white/06"
          style={{ background: "linear-gradient(135deg, #06060E 0%, #080A12 100%)" }}
        >
          {/* Subtle vignette */}
          <div className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
               style={{ boxShadow: "inset 0 0 80px rgba(6,6,14,.8)" }} />
          <NetworkScene />
        </motion.div>

        {/* Bottom labels */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EXPO, delay: 0.4 }}
          className="flex justify-center gap-8 mt-6"
        >
          {["The Compass", "The Board of Nine", "The Summit"].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent-light" />
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/38">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
