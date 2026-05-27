"use client";
import { motion } from "framer-motion";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const items = [
  "Founders building products, services, D2C, SaaS, and emerging categories.",
  "Hungry to grow with depth, clarity, and serious intent.",
  "Ready to share openly, contribute generously, and show up consistently.",
  "Prefer curation, quality, and signal over noise.",
];

export default function WhoFor() {
  return (
    <section className="relative bg-ink-2 py-36 lg:py-48 overflow-hidden">
      {/* Left ambient */}
      <div
        className="absolute left-[-10%] top-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full pointer-events-none blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,.03) 0%, transparent 60%)" }}
      />
      {/* Mesh grid */}
      <div
        className="absolute inset-0 grid-bg-dark"
        style={{ maskImage: "radial-gradient(ellipse 75% 75% at 50% 50%, black 25%, transparent 100%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.65fr] gap-16 lg:gap-24 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EXPO }}
          >
            <p className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-white/45 uppercase mb-5">
              Who it&apos;s for
            </p>
            <h2
              className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.035em] text-white"
              style={{ fontSize: "clamp(32px,3.8vw,50px)" }}
            >
              Founders who<br />choose depth<br />over noise.
            </h2>
          </motion.div>

          {/* Right */}
          <div className="flex flex-col">
            {items.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.72, delay: i * 0.1, ease: EXPO }}
                className="group grid py-7 border-b border-white/05 first:border-t first:border-white/05 transition-all duration-300 hover:pl-2.5"
                style={{ gridTemplateColumns: "48px 1px 1fr", gap: "22px", alignItems: "center" }}
              >
                <span className="font-[family-name:var(--font-urbanist)] text-[11.5px] font-semibold tracking-[.1em] text-white/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="h-7 w-px bg-gradient-to-b from-transparent via-white/25 to-transparent" />
                <p className="font-[family-name:var(--font-inter)] text-[15.5px] leading-[1.68] text-white/65 font-normal">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
