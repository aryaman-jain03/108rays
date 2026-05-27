"use client";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function CTA() {
  return (
    <section className="relative bg-surface py-44 lg:py-56 overflow-hidden text-center">
      {/* Orbital rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[300px] h-[300px] rounded-full border border-accent/16"
             style={{ animation: "spin-cw 26s linear infinite" }} />
        <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-accent/08"
             style={{ animation: "spin-ccw 44s linear infinite" }} />
        <div className="absolute w-[620px] h-[620px] rounded-full border border-accent/04"
             style={{ animation: "spin-cw 65s linear infinite" }} />
        <div
          className="absolute w-[60px] h-[60px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(9,9,11,.10) 0%, transparent 65%)",
            filter: "blur(8px)",
            animation: "orb-breathe 5s ease-in-out infinite",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ staggerChildren: 0.12 }}
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-accent/75 uppercase mb-6"
          >
            Take the next step
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EXPO, delay: 0.1 }}
            className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.05] tracking-[-0.04em] text-ink mb-6"
            style={{ fontSize: "clamp(40px,5.8vw,76px)" }}
          >
            The right circle<br />changes everything.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.2 }}
            className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.72] mb-14 max-w-md mx-auto font-normal"
            style={{ color: "#71717A" }}
          >
            Whether you&apos;re ready to join or just exploring, we&apos;d love to hear from you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EXPO, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <a href="/contact">
              <LiquidButton
                size="xl"
                tint="rgba(9,9,11,0.92)"
                className="font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] text-white"
              >
                APPLY
              </LiquidButton>
            </a>
            <a href="/offerings">
              <LiquidButton
                size="xl"
                className="font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] text-ink"
              >
                EXPLORE OFFERINGS
              </LiquidButton>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
