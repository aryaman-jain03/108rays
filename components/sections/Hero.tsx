"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const CYCLING_WORDS = ["ambitious", "visionary", "relentless"];

const fade = {
  hidden: { y: 20, opacity: 0 },
  show:   { y: 0,  opacity: 1, transition: { duration: 0.85, ease: EXPO } },
};

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setWordIdx((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2200);
    return () => clearTimeout(id);
  }, [wordIdx]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-surface overflow-hidden">

      {/* Content — centred */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center pt-28 pb-20">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex items-center gap-3 font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.22em] text-accent/80 uppercase mb-10"
        >
          <span className="inline-block w-8 h-px bg-accent/50" />
          A Global Founders Ecosystem
          <span className="inline-block w-8 h-px bg-accent/50" />
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EXPO }}
          className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.08] tracking-[-0.04em] text-ink mb-4"
          style={{ fontSize: "clamp(14px,5vw,80px)" }}
        >
          A curated ecosystem for
        </motion.h1>

        {/* Cycling word + "founders" on same line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EXPO }}
          className="flex items-center justify-center gap-[0.22em] font-[family-name:var(--font-urbanist)] font-medium tracking-[-0.04em] text-ink mb-10"
          style={{ fontSize: "clamp(14px,5vw,80px)" }}
        >
          {/* Fixed height slot for cycling word — sized by longest word */}
          <span
            className="relative inline-block"
            style={{ height: "1.5em", verticalAlign: "middle", paddingRight: "1em", clipPath: "inset(0 -0.5em)" }}
          >
            {/* Invisible anchor that holds the width of the longest word */}
            <span aria-hidden className="invisible whitespace-nowrap" style={{ lineHeight: "1.5em" }}>relentless</span>
            {CYCLING_WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="absolute inset-0 flex items-center justify-end text-accent-gradient italic font-semibold"
                initial={{ opacity: 0, y: "150%" }}
                animate={
                  wordIdx === i
                    ? { y: "0%", opacity: 1 }
                    : { y: wordIdx > i ? "-150%" : "150%", opacity: 0 }
                }
                transition={{ type: "spring", stiffness: 52, damping: 18 }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="leading-[1.08]">founders.</span>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fade}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.9 }}
          className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.75] mb-12 max-w-[520px] font-normal"
          style={{ color: "#71717A" }}
        >
          Peer boards, growth sessions, and curated experiences for founders
          who want 10x growth and beyond.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1,  y: 0  }}
          transition={{ duration: 0.8, delay: 1.1, ease: EXPO }}
          className="flex flex-wrap justify-center gap-3 mb-14"
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
              EXPLORE
            </LiquidButton>
          </a>
        </motion.div>

        {/* Tag */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1  }}
          transition={{ duration: 0.8, delay: 1.35 }}
          className="font-[family-name:var(--font-inter)] text-[10px] font-normal tracking-[.28em] text-ink/22 uppercase"
        >
          Built for founders. Designed for visionaries
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1  }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-6 lg:left-10 flex flex-col items-center gap-2 z-10"
      >
        <div
          className="w-px h-12 bg-gradient-to-b from-ink/40 to-transparent"
          style={{ animation: "scroll-drip 2.4s ease-in-out infinite" }}
        />
        <span className="font-[family-name:var(--font-inter)] text-[8px] tracking-[.25em] text-ink/35 [writing-mode:vertical-rl] uppercase">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
