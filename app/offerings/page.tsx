"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Compass, Users, Mountain, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const offerings = [
  {
    num: "01",
    category: "GROWTH & NETWORK SESSIONS",
    Icon: Compass,
    title: "The Compass",
    tagline: "Clarity. Growth. Network.",
    desc: "Monthly masterclasses and curated connections. The natural entry point.",
    cta: "JOIN NOW",
    ctaHref: "/compass",
    ctaDark: true,
    img: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1000&h=800&fit=crop&auto=format",
    dark: false,
    glow: "rgba(245,158,11,0.13)",
    flip: false,
  },
  {
    num: "02",
    category: "PEER ADVISORY FOR GROWTH",
    Icon: Users,
    title: "The Board of Nine",
    tagline: "Your personal board, without giving up equity.",
    desc: "A fixed cohort of nine founders. Confidential, structured peer advisory.",
    cta: "APPLY",
    ctaHref: "/board-of-nine",
    ctaDark: false,
    img: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1000&h=800&fit=crop&auto=format",
    dark: true,
    glow: "rgba(99,102,241,0.18)",
    flip: true,
  },
  {
    num: "03",
    category: "CURATED FOUNDER EXPERIENCES",
    Icon: Mountain,
    title: "The Summit",
    tagline: "Three to seven days. One breakthrough.",
    desc: "Immersive retreats blending experiences, deep war rooms, and wellness.",
    cta: "APPLY",
    ctaHref: "/summit",
    ctaDark: true,
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1000&h=800&fit=crop&auto=format",
    dark: false,
    glow: "rgba(16,185,129,0.12)",
    flip: false,
  },
];

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[999] bg-ink"
    />
  );
}

/* ── Individual offering row (own scroll hooks) ──────────────── */
type Offering = typeof offerings[number];

function OfferingRow({ o, i }: { o: Offering; i: number }) {
  const sectionRef  = useRef<HTMLElement>(null);
  const textRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const isInView    = useInView(sectionRef, { once: true, amount: 0.2 });

  /* Parallax for the image */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawImgY   = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const imgY      = useSpring(rawImgY, { stiffness: 60, damping: 20 });
  const rawImgScale = useTransform(scrollYProgress, [0, 0.4, 1], [1.06, 1.0, 1.06]);
  const imgScale  = useSpring(rawImgScale, { stiffness: 60, damping: 20 });

  /* Text side slides in from the side */
  const textX     = o.flip ? 48 : -48;

  /* Stagger delays for text children */
  const stagger = (extra: number) => ({
    duration: 0.75,
    delay: extra,
    ease: EXPO,
  });

  const { Icon } = o;
  const ink = o.dark ? "rgba(255,255,255,0.28)" : "rgba(9,9,11,0.32)";
  const inkMed = o.dark ? "rgba(255,255,255,0.42)" : "#52525B";
  const inkStrong = o.dark ? "#FAFAFA" : "#09090B";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: o.dark ? "#09090B" : "#FAFAFA" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700, height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${o.glow} 0%, transparent 65%)`,
          top: "50%", left: o.flip ? "62%" : "38%",
          transform: "translate(-50%, -50%)",
          filter: "blur(6px)",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${o.dark ? "rgba(255,255,255,0.05)" : "rgba(9,9,11,0.06)"} 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${o.flip ? "lg:[&>*:first-child]:order-last" : ""}`}>

          {/* ── Text ── */}
          <motion.div
            ref={textRef}
            initial={{ opacity: 0, x: textX }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: EXPO }}
          >
            {/* Category row */}
            <motion.div
              className="flex items-center gap-4 mb-7 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={stagger(0.08)}
            >
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.2em] uppercase" style={{ color: ink }}>
                {o.num}
              </span>
              <motion.div
                className="h-px"
                initial={{ width: 0 }}
                animate={isInView ? { width: 24 } : {}}
                transition={{ duration: 0.6, delay: 0.25, ease: EXPO }}
                style={{ background: o.dark ? "rgba(255,255,255,0.15)" : "rgba(9,9,11,0.15)" }}
              />
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.2em] uppercase" style={{ color: ink }}>
                {o.category}
              </span>
            </motion.div>

            {/* Icon */}
            <motion.div
              className="mb-7"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: 0.15, ease: EXPO }}
            >
              <div
                className="w-14 h-14 flex items-center justify-center rounded-full"
                style={{
                  background: o.dark
                    ? "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))"
                    : "linear-gradient(135deg, #18181B, #09090B)",
                  border: o.dark ? "1px solid rgba(255,255,255,0.10)" : "none",
                  boxShadow: o.dark ? "none" : "0 8px 28px rgba(9,9,11,0.22)",
                }}
              >
                <Icon size={22} style={{ color: o.dark ? "rgba(255,255,255,0.75)" : "#fff" }} strokeWidth={1.6} />
              </div>
            </motion.div>

            {/* Title — clip reveal */}
            <div className="clip-line mb-4" style={{ overflow: "hidden" }}>
              <motion.h2
                className="font-[family-name:var(--font-urbanist)] font-semibold leading-[1.06] tracking-[-0.035em]"
                style={{ fontSize: "clamp(22px,3.8vw,54px)", color: inkStrong }}
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.18, ease: EXPO }}
              >
                {o.title}
              </motion.h2>
            </div>

            {/* Tagline — clip reveal */}
            <div style={{ overflow: "hidden" }} className="mb-5">
              <motion.p
                className="font-[family-name:var(--font-urbanist)] font-medium text-[18px] leading-snug tracking-[-0.01em]"
                style={{ color: o.dark ? "rgba(255,255,255,0.65)" : "rgba(9,9,11,0.62)" }}
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : {}}
                transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}
              >
                {o.tagline}
              </motion.p>
            </div>

            {/* Divider line — draw */}
            <motion.div
              className="mb-6"
              initial={{ width: 0 }}
              animate={isInView ? { width: 40 } : {}}
              transition={{ duration: 0.6, delay: 0.36, ease: EXPO }}
              style={{ height: 1, background: o.dark ? "rgba(255,255,255,0.14)" : "rgba(9,9,11,0.14)" }}
            />

            {/* Description */}
            <motion.p
              className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.78] font-normal mb-10 max-w-[420px]"
              style={{ color: inkMed }}
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={stagger(0.42)}
            >
              {o.desc}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={stagger(0.52)}
            >
              {o.dark ? (
                <a
                  href={o.ctaHref}
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-full border border-white/25 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] text-white hover:bg-white/10 hover:border-white/45 transition-all duration-300 whitespace-nowrap"
                >
                  {o.cta} <ArrowRight size={14} />
                </a>
              ) : (
                <a href={o.ctaHref}>
                  <LiquidButton
                    size="xl"
                    tint="rgba(9,9,11,0.92)"
                    className="font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] text-white whitespace-nowrap"
                  >
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      {o.cta} <ArrowRight size={14} />
                    </span>
                  </LiquidButton>
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* ── Image (parallax) ── */}
          <motion.div
            ref={imageRef}
            className="relative"
            initial={{ opacity: 0, x: o.flip ? -32 : 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.14, ease: EXPO }}
          >
            {/* Frame */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                boxShadow: o.dark
                  ? "0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.38)"
                  : "0 32px 80px rgba(9,9,11,0.14), 0 8px 24px rgba(9,9,11,0.08)",
              }}
            >
              <div className="h-[420px] lg:h-[500px] overflow-hidden">
                <motion.img
                  src={o.img}
                  alt={o.title}
                  className="w-full h-full object-cover"
                  style={{ y: imgY, scale: imgScale }}
                />
              </div>

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: o.dark
                    ? "linear-gradient(to bottom right, rgba(9,9,11,0.35) 0%, transparent 60%)"
                    : "linear-gradient(to bottom right, rgba(255,255,255,0.10) 0%, transparent 60%)",
                }}
              />

              {/* Watermark number */}
              <div
                className="absolute bottom-5 right-6 font-[family-name:var(--font-urbanist)] font-semibold leading-none pointer-events-none select-none"
                style={{ fontSize: 72, color: "rgba(255,255,255,0.06)" }}
              >
                {o.num}
              </div>
            </div>

            {/* Floating chip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55, ease: EXPO }}
              className="absolute -bottom-5 left-6 flex items-center gap-2.5 px-4 py-2.5 rounded-full"
              style={{
                background: o.dark ? "rgba(255,255,255,0.06)" : "#ffffff",
                border: o.dark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(9,9,11,0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
              }}
            >
              <Icon size={13} style={{ color: o.dark ? "rgba(255,255,255,0.7)" : "#09090B" }} strokeWidth={1.8} />
              <span
                className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.08em]"
                style={{ color: o.dark ? "rgba(255,255,255,0.65)" : "#09090B" }}
              >
                {o.title}
              </span>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom divider */}
      {i < offerings.length - 1 && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: o.dark ? "rgba(255,255,255,0.05)" : "rgba(9,9,11,0.06)" }}
        />
      )}
    </section>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function OfferingsPage() {
  /* Hero scroll fade */
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "18%"]);

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative bg-ink-2 overflow-hidden flex items-center min-h-[52vh] pt-24 pb-16"
      >
        <div className="absolute inset-0 grid-bg-dark opacity-60 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[480px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,.04) 0%, transparent 65%)" }}
        />
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-urbanist)] font-semibold leading-none select-none pointer-events-none"
          style={{ fontSize: "clamp(120px,18vw,240px)", color: "rgba(255,255,255,0.025)" }}
        >
          108
        </div>

        {/* All hero content fades + rises on scroll */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.24em] text-white/40 uppercase mb-6"
          >
            Offerings
          </motion.p>

          {/* Headline — clip reveal */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
              className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(14px,5.5vw,76px)" }}
            >
              Three ways to plug in.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.75] text-white/42 max-w-[480px] font-normal"
          >
            Each format is designed for a different altitude of conversation.
            Start where you are.
          </motion.p>

          {/* Animated line + dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 flex items-center gap-4"
          >
            <motion.div
              className="h-px bg-gradient-to-r from-white/18 to-transparent"
              initial={{ width: 0, flex: "none" }}
              animate={{ width: "100%", flex: 1 }}
              transition={{ duration: 1, delay: 0.65, ease: EXPO }}
            />
            {offerings.map((_, idx) => (
              <motion.div
                key={idx}
                className="w-1.5 h-1.5 rounded-full bg-white/22"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, delay: 0.75 + idx * 0.1 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Offering rows ────────────────────────────────────── */}
      {offerings.map((o, i) => (
        <OfferingRow key={o.num} o={o} i={i} />
      ))}

      {/* ── Closing tagline ──────────────────────────────────── */}
      <section className="relative bg-ink-2 overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-bg-dark opacity-40 pointer-events-none" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(255,255,255,.04) 0%, transparent 65%)" }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] text-white/42 max-w-[500px] mx-auto mb-10 font-normal"
          >
            A curated ecosystem for ambitious founders. Peer boards, growth
            sessions, and curated founder experiences.
          </motion.p>

          <motion.div
            className="w-12 h-px bg-white/12 mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.30em] text-white/22 uppercase"
          >
            Built for founders. Designed for visionaries worldwide
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
