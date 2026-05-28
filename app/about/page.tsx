"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const PILLARS = [
  {
    num: "01",
    title: "Curated, not crowded.",
    desc: "Small groups, serious founders. We optimize for signal, not size.",
  },
  {
    num: "02",
    title: "Structure with soul.",
    desc: "Clear agendas held by human conversations. Both matter.",
  },
  {
    num: "03",
    title: "Globally minded, founder-led.",
    desc: "Real challenges. Real solutions. Worldwide.",
  },
];

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX, transformOrigin: "left",
        position: "fixed", top: 0, left: 0, right: 0,
        height: 2, zIndex: 999, background: "#09090B",
      }}
    />
  );
}

/* ── Pillar row ──────────────────────────────────────────────── */
function PillarRow({ p, i }: { p: typeof PILLARS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <motion.div
      ref={ref}
      className="relative grid lg:grid-cols-[160px_1fr] gap-8 lg:gap-16 items-start py-12 lg:py-14"
      style={{ borderTop: "1px solid rgba(9,9,11,0.08)" }}
    >
      {/* Large ghost number */}
      <div className="relative">
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: i * 0.08, ease: EXPO }}
          className="font-[family-name:var(--font-urbanist)] font-semibold leading-none select-none"
          style={{ fontSize: "clamp(64px,7vw,96px)", color: "rgba(9,9,11,0.07)" }}
        >
          {p.num}
        </motion.span>
        {/* Small number overlay */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: i * 0.08 + 0.15 }}
          className="absolute top-[10px] left-[4px] font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.18em]"
          style={{ color: "rgba(9,9,11,0.35)" }}
        >
          {p.num}
        </motion.span>
      </div>

      {/* Text */}
      <div>
        <div className="overflow-hidden mb-3">
          <motion.h3
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.78, delay: i * 0.08 + 0.1, ease: EXPO }}
            className="font-[family-name:var(--font-urbanist)] font-medium tracking-[-0.025em] leading-snug"
            style={{ fontSize: "clamp(22px,2.4vw,32px)", color: "#09090B" }}
          >
            {p.title}
          </motion.h3>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: i * 0.08 + 0.25, ease: EXPO }}
          className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.76] font-normal max-w-[460px]"
          style={{ color: "#71717A" }}
        >
          {p.desc}
        </motion.p>
      </div>

      {/* Bottom accent line on last item */}
      {i === PILLARS.length - 1 && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "rgba(9,9,11,0.08)" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: EXPO }}
        />
      )}
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function AboutPage() {
  const heroRef      = useRef<HTMLElement>(null);
  const raycreateRef = useRef<HTMLElement>(null);

  /* Hero parallax exit */
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1],    ["0%", "16%"]);

  /* Raycreate section in-view */
  const raycreateInView = useInView(raycreateRef, { once: true, amount: 0.25 });

  return (
    <div className="min-h-screen overflow-x-hidden bg-surface">
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-ink-2"
      >
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg-dark opacity-50 pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 50% at 60% 45%, rgba(255,255,255,0.035) 0%, transparent 70%)" }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16"
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto min-h-[70vh] justify-center w-full">

              {/* Eyebrow */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.24em] text-white/40 uppercase mb-10 flex items-center gap-3"
              >
                <span className="inline-block w-6 h-px bg-white/20" />
                About 108 Rays
                <span className="inline-block w-6 h-px bg-white/20" />
              </motion.p>

              {/* Headline — two lines, clip reveal */}
              <div className="mb-8 w-full">
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
                    className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.04] tracking-[-0.04em] text-white"
                    style={{ fontSize: "clamp(14px,6vw,96px)" }}
                  >
                    The right circle
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h1
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.95, delay: 0.3, ease: EXPO }}
                    className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.04] tracking-[-0.04em] italic"
                    style={{ fontSize: "clamp(14px,6vw,96px)", color: "rgba(255,255,255,0.55)" }}
                  >
                    changes everything.
                  </motion.h1>
                </div>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.48, ease: EXPO }}
                className="font-[family-name:var(--font-inter)] text-[17px] leading-[1.8] font-normal text-white/40 max-w-[520px]"
              >
                A founder ecosystem designed around structured learning, honest
                conversations, and experiences that move you forward. Not just in
                business, but as a leader.
              </motion.p>

              {/* Animated line */}
              <motion.div
                className="flex items-center gap-4 mt-14"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <motion.div
                  className="h-px"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.9, delay: 0.75, ease: EXPO }}
                  style={{ background: "rgba(255,255,255,0.18)" }}
                />
                <span className="font-[family-name:var(--font-inter)] text-[10px] tracking-[.22em] text-white/22 uppercase">
                  Curated · Considered · Crafted
                </span>
                <motion.div
                  className="h-px"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ duration: 0.9, delay: 0.75, ease: EXPO }}
                  style={{ background: "rgba(255,255,255,0.18)" }}
                />
              </motion.div>

          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-10 left-6 lg:left-10 flex flex-col items-center gap-2 z-10"
        >
          <div
            className="w-px h-12 bg-gradient-to-b from-white/35 to-transparent"
            style={{ animation: "scroll-drip 2.4s ease-in-out infinite" }}
          />
          <span
            className="font-[family-name:var(--font-inter)] text-[8px] tracking-[.25em] text-white/28 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </motion.div>
      </section>

      {/* ── Pillars ───────────────────────────────────────────── */}
      <section className="relative bg-surface overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
          {PILLARS.map((p, i) => (
            <PillarRow key={p.num} p={p} i={i} />
          ))}
        </div>
      </section>

      {/* ── Raycreate / Parent Studio ────────────────────────── */}
      <section
        ref={raycreateRef}
        className="relative overflow-hidden py-24 lg:py-32 bg-ink-2"
      >
        <div className="absolute inset-0 grid-bg-dark opacity-40 pointer-events-none" />

        {/* Large ghost "R" */}
        <div
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-[family-name:var(--font-urbanist)] font-semibold leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(180px,22vw,300px)", color: "rgba(255,255,255,0.022)" }}
        >
          R
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left */}
            <div>
              {/* Label */}
              <motion.div
                className="flex items-center gap-3 mb-8"
                initial={{ opacity: 0, x: -16 }}
                animate={raycreateInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: EXPO }}
              >
                <motion.div
                  className="h-px"
                  initial={{ width: 0 }}
                  animate={raycreateInView ? { width: 32 } : {}}
                  transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
                  style={{ background: "rgba(255,255,255,0.25)" }}
                />
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.22em] text-white/38 uppercase">
                  Parent Studio
                </span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden mb-6">
                <motion.h2
                  initial={{ y: "105%" }}
                  animate={raycreateInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.85, delay: 0.12, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.08] tracking-[-0.035em] text-white"
                  style={{ fontSize: "clamp(30px,3.6vw,50px)" }}
                >
                  An initiative by{" "}
                  <a href="https://letsraycreate.com" target="_blank" rel="noopener noreferrer"
                    className="hover:text-pink-400 transition-colors duration-200">
                    Raycreate.
                  </a>
                </motion.h2>
              </div>

              {/* Divider */}
              <motion.div
                className="mb-7"
                initial={{ width: 0 }}
                animate={raycreateInView ? { width: 40 } : {}}
                transition={{ duration: 0.6, delay: 0.28, ease: EXPO }}
                style={{ height: 1, background: "rgba(255,255,255,0.14)" }}
              />

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={raycreateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.32, ease: EXPO }}
                className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] font-normal mb-5"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                Raycreate is a strategy and experience studio that works with
                brands and founders on building meaningful businesses. 108 Rays
                is its founder-facing initiative.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={raycreateInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.42, ease: EXPO }}
                className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] font-normal"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                Their mission is to help visionaries grow into category leaders
                — locally and globally.
              </motion.p>
            </div>

            {/* Right — abstract visual */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              animate={raycreateInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.18, ease: EXPO }}
              className="flex items-center justify-center lg:justify-end"
            >
              <div className="relative w-[320px] h-[320px]">
                {/* Concentric rings */}
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    className="absolute top-1/2 left-1/2 rounded-full border"
                    style={{
                      width:  n * 78, height: n * 78,
                      transform: "translate(-50%,-50%)",
                      borderColor: `rgba(255,255,255,${0.07 - n * 0.012})`,
                      animation: n % 2 === 0
                        ? `spin-ccw ${14 + n * 8}s linear infinite`
                        : `spin-cw ${14 + n * 8}s linear infinite`,
                    }}
                  >
                    {/* Dot on ring */}
                    <div
                      className="absolute -top-[3px] left-1/2 -translate-x-1/2 rounded-full"
                      style={{
                        width: n === 1 ? 6 : 4,
                        height: n === 1 ? 6 : 4,
                        background: `rgba(255,255,255,${n === 1 ? 0.55 : 0.22})`,
                        boxShadow: n === 1 ? "0 0 10px rgba(255,255,255,0.3)" : "none",
                      }}
                    />
                  </div>
                ))}
                {/* Centre orb */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 28, height: 28,
                    background: "radial-gradient(circle at 35% 35%, #52525B, #09090B)",
                    boxShadow: "0 0 24px rgba(255,255,255,0.14), 0 0 56px rgba(255,255,255,0.05)",
                    animation: "orb-breathe 5s ease-in-out infinite",
                  }}
                />
                {/* Tagline arc text */}
                <div
                  className="absolute bottom-[-12px] left-1/2 -translate-x-1/2 font-[family-name:var(--font-inter)] text-[9px] tracking-[.22em] uppercase whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  Strategy · Experience · Growth
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Closing tagline ──────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-surface">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 600, height: 300,
            background: "radial-gradient(ellipse, rgba(9,9,11,0.04) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] font-normal max-w-[500px] mx-auto mb-8"
            style={{ color: "#71717A" }}
          >
            A curated ecosystem for ambitious founders. Peer boards, growth
            sessions, and curated founder experiences.
          </motion.p>
          <motion.div
            className="h-px mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
            style={{ background: "rgba(9,9,11,0.15)" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.30em] uppercase"
            style={{ color: "rgba(9,9,11,0.22)" }}
          >
            Built for founders. Designed for visionaries worldwide
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
