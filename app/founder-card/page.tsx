"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { Coffee, Building2, Hotel, Plus, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

/* ── Precomputed rays (no Math.random → no hydration mismatch) ── */
const RAYS = [
  { angle: -55, len: 440, w: 0.8, op: 0.55 },
  { angle: -49, len: 390, w: 0.6, op: 0.40 },
  { angle: -43, len: 460, w: 1.1, op: 0.65 },
  { angle: -37, len: 410, w: 0.6, op: 0.38 },
  { angle: -31, len: 480, w: 0.8, op: 0.52 },
  { angle: -25, len: 395, w: 0.6, op: 0.35 },
  { angle: -19, len: 450, w: 1.2, op: 0.70 },
  { angle: -13, len: 420, w: 0.6, op: 0.42 },
  { angle:  -7, len: 470, w: 0.9, op: 0.58 },
  { angle:   0, len: 400, w: 0.6, op: 0.37 },
  { angle:   6, len: 455, w: 1.1, op: 0.68 },
  { angle:  12, len: 390, w: 0.6, op: 0.40 },
  { angle:  18, len: 465, w: 0.8, op: 0.55 },
  { angle:  24, len: 410, w: 0.6, op: 0.36 },
  { angle:  30, len: 450, w: 1.0, op: 0.62 },
  { angle:  36, len: 395, w: 0.6, op: 0.38 },
  { angle:  42, len: 460, w: 0.8, op: 0.50 },
  { angle:  48, len: 385, w: 0.6, op: 0.35 },
  { angle:  54, len: 440, w: 1.1, op: 0.64 },
  { angle:  60, len: 400, w: 0.6, op: 0.40 },
  { angle:  66, len: 420, w: 0.7, op: 0.45 },
  { angle:  72, len: 380, w: 0.6, op: 0.32 },
];

const PERKS = [
  {
    Icon: Coffee,
    title: "Founder-friendly cafés & bistros.",
    desc: "Flat discounts at thoughtfully chosen spots. Built for thinking, working, and meeting.",
  },
  {
    Icon: Building2,
    title: "Partner coworking spaces.",
    desc: "Special rates and day passes when you're traveling or need a focused space.",
  },
  {
    Icon: Hotel,
    title: "Hotels & stays.",
    desc: "Curated rates at partner properties across India and beyond.",
  },
  {
    Icon: Plus,
    title: "More partners added over time.",
    desc: "",
  },
];

/* ── Scroll progress bar ─────────────────────────────────────── */
function GoldScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX, transformOrigin: "left",
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 999,
        background: "rgba(212,175,55,0.75)",
      }}
    />
  );
}

/* ── Interactive 3-D card ────────────────────────────────────── */
function FounderCardVisual({ large = false }: { large?: boolean }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const rotateX  = useSpring(0, { stiffness: 180, damping: 26 });
  const rotateY  = useSpring(0, { stiffness: 180, damping: 26 });
  const [glow,   setGlow]    = useState({ x: 62, y: 40 });
  const [active, setActive]  = useState(false);
  const [vw,     setVw]      = useState(typeof window !== "undefined" ? window.innerWidth : 1280);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const base  = large ? 520 : 420;
  const maxW  = vw < 1024 ? Math.min(vw - 48, base) : base;
  const ratio = maxW / base;
  const W     = maxW;
  const H     = Math.round((large ? 328 : 265) * ratio);
  const OX    = Math.round((large ? 335 : 270) * ratio);
  const OY    = Math.round((large ? 128 : 102) * ratio);
  const scale = ratio;

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    rotateX.set((y - 0.5) * -20);
    rotateY.set((x - 0.5) *  20);
    setGlow({ x: x * 100, y: y * 100 });
  };
  const onLeave = () => {
    rotateX.set(0); rotateY.set(0);
    setGlow({ x: 62, y: 40 });
    setActive(false);
  };

  const fontSize = Math.round((large ? 20 : 17) * ratio);

  return (
    <div style={{ perspective: "1400px" }}>
      <motion.div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onMouseEnter={() => setActive(true)}
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          width: W, height: H,
        }}
        className="relative rounded-[24px] cursor-pointer select-none"
      >
        {/* Gold glow shadow */}
        <motion.div
          className="absolute pointer-events-none"
          style={{ inset: -24, borderRadius: 48 }}
          animate={{ opacity: active ? 1 : 0.45 }}
          transition={{ duration: 0.4 }}
        >
          <div style={{
            width: "100%", height: "100%",
            background: "radial-gradient(ellipse at 55% 85%, rgba(212,175,55,0.22) 0%, transparent 65%)",
            filter: "blur(24px)",
          }} />
        </motion.div>

        {/* Card surface */}
        <div
          className="absolute inset-0 rounded-[24px] overflow-hidden"
          style={{ background: "linear-gradient(145deg,#1c1c1c 0%,#0a0a0a 55%,#141414 100%)" }}
        >
          {/* Mouse-follow specular */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.055) 0%, transparent 55%)`,
              opacity: active ? 1 : 0,
            }}
          />

          {/* Rays */}
          <svg
            className="absolute inset-0"
            width={W} height={H}
            viewBox={`0 0 ${W} ${H}`}
            style={{ overflow: "visible" }}
          >
            <defs>
              <radialGradient id="rayFade" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(212,175,55,1)" />
                <stop offset="100%" stopColor="rgba(212,175,55,0)" />
              </radialGradient>
            </defs>
            {RAYS.map((ray, i) => {
              const rad = (ray.angle * Math.PI) / 180;
              const ex = OX + Math.cos(rad) * ray.len * scale;
              const ey = OY + Math.sin(rad) * ray.len * scale;
              return (
                <line
                  key={i}
                  x1={OX} y1={OY} x2={ex} y2={ey}
                  stroke={`rgba(212,175,55,${ray.op})`}
                  strokeWidth={ray.w * scale}
                  strokeLinecap="round"
                />
              );
            })}
            {/* Origin glow dot */}
            <circle cx={OX} cy={OY} r={6 * scale}  fill="rgba(212,175,55,0.12)" />
            <circle cx={OX} cy={OY} r={3 * scale}  fill="rgba(212,175,55,0.85)" />
          </svg>

          {/* Top-edge specular line */}
          <div className="absolute top-0 left-[10%] right-[10%] h-px"
            style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.09),transparent)" }} />

          {/* 108 RAYS + red dot */}
          <div className="absolute flex items-center gap-[10px]"
            style={{ bottom: large ? 40 : 30, left: large ? 36 : 28 }}
          >
            <span
              className="font-[family-name:var(--font-montserrat)] font-light"
              style={{
                fontSize, letterSpacing: "0.30em",
                color: "rgba(212,175,55,0.92)",
              }}
            >
              108 RAYS
            </span>
          </div>
        </div>

        {/* Glass gloss overlay */}
        <div className="absolute inset-0 rounded-[24px] pointer-events-none"
          style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.045) 0%,transparent 48%,rgba(255,255,255,0.012) 100%)" }}
        />
      </motion.div>
    </div>
  );
}

/* ── Perk card ───────────────────────────────────────────────── */
function PerkCard({ perk, i }: { perk: typeof PERKS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const { Icon } = perk;
  const isEmpty = !perk.desc;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-7 cursor-default overflow-hidden"
      style={{
        background: hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.025)",
        border: "1px solid",
        borderColor: hovered
          ? "rgba(212,175,55,0.25)"
          : "rgba(255,255,255,0.07)",
        transition: "background 0.35s, border-color 0.35s",
      }}
    >
      {/* Corner glow on hover */}
      <motion.div
        className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 70%)",
          transform: "translate(30%,-30%)",
        }}
      />

      {/* Icon */}
      <motion.div
        className="w-11 h-11 flex items-center justify-center rounded-full mb-5"
        animate={{
          background: hovered
            ? "rgba(212,175,55,0.15)"
            : "rgba(255,255,255,0.06)",
          borderColor: hovered
            ? "rgba(212,175,55,0.35)"
            : "rgba(255,255,255,0.10)",
        }}
        transition={{ duration: 0.3 }}
        style={{ border: "1px solid" }}
      >
        <Icon
          size={17}
          style={{ color: hovered ? "rgba(212,175,55,0.9)" : "rgba(255,255,255,0.55)", transition: "color 0.3s" }}
          strokeWidth={1.6}
        />
      </motion.div>

      {/* Title */}
      <h3
        className="font-[family-name:var(--font-urbanist)] font-medium text-[17px] leading-snug tracking-[-0.01em] mb-3"
        style={{ color: isEmpty ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.88)" }}
      >
        {perk.title}
      </h3>

      {/* Desc */}
      {perk.desc && (
        <p
          className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.72] font-normal"
          style={{ color: "rgba(255,255,255,0.38)" }}
        >
          {perk.desc}
        </p>
      )}

      {/* Bottom draw line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        animate={{ width: hovered ? "100%" : "0%" }}
        transition={{ duration: 0.55, ease: EXPO }}
        style={{ background: "linear-gradient(90deg,rgba(212,175,55,0),rgba(212,175,55,0.5),rgba(212,175,55,0))" }}
      />
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function FounderCardPage() {
  const heroRef = useRef<HTMLElement>(null);
  const perksRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1],    ["0%", "14%"]);

  const perksInView = useInView(perksRef, { once: true, amount: 0.15 });

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: "#09090B" }}>
      <GoldScrollBar />

      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: "#09090B" }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none" />

        {/* Background gold haze */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 55% at 65% 45%, rgba(212,175,55,0.065) 0%, transparent 70%)",
        }} />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left: text */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.24em] uppercase mb-6"
                style={{ color: "rgba(212,175,55,0.6)" }}
              >
                108 Rays Founder Card
              </motion.p>

              {/* Headline clip-reveal */}
              <div className="overflow-hidden mb-5">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.18, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(14px,5.2vw,72px)", color: "#FAFAFA" }}
                >
                  Perks that travel
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-8">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.26, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em] italic"
                  style={{ fontSize: "clamp(14px,5.2vw,72px)", color: "rgba(212,175,55,0.88)" }}
                >
                  with you.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: EXPO }}
                className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.78] font-normal max-w-[440px] mb-12"
                style={{ color: "rgba(255,255,255,0.42)" }}
              >
                A simple way to unlock partner benefits at select cafés,
                coworking spaces, hotels, and more. Our way of extending the
                ecosystem into your everyday life.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.54, ease: EXPO }}
                className="flex flex-wrap gap-3"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full font-[family-name:var(--font-urbanist)] font-semibold tracking-[.10em] uppercase text-[11px] whitespace-nowrap transition-all duration-300"
                  style={{
                    background: "rgba(212,175,55,0.9)",
                    color: "#09090B",
                    boxShadow: "0 4px 24px rgba(212,175,55,0.28)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(212,175,55,1)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(212,175,55,0.9)")}
                >
                  Join to Get Yours <ArrowRight size={13} />
                </a>
                <a
                  href="/offerings"
                  className="inline-flex items-center gap-2 h-12 px-7 rounded-full border font-[family-name:var(--font-urbanist)] font-semibold tracking-[.10em] uppercase text-[11px] whitespace-nowrap transition-all duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.65)" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                >
                  Explore Offerings <ArrowRight size={13} />
                </a>
              </motion.div>
            </div>

            {/* Right: card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.95, delay: 0.3, ease: EXPO }}
              className="flex items-center justify-center lg:justify-end"
            >
              <FounderCardVisual large />
            </motion.div>
          </div>
        </motion.div>


      </section>

      {/* ── Perks grid ───────────────────────────────────────── */}
      <section ref={perksRef} className="relative py-24 lg:py-32 overflow-hidden" style={{ background: "#09090B" }}>
        {/* Divider */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            className="flex items-center gap-5 mb-16"
            initial={{ opacity: 0 }}
            animate={perksInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="h-px"
              initial={{ width: 0 }}
              animate={perksInView ? { width: 40 } : {}}
              transition={{ duration: 0.7, ease: EXPO }}
              style={{ background: "rgba(212,175,55,0.45)" }}
            />
            <p className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] uppercase"
              style={{ color: "rgba(212,175,55,0.55)" }}>
              Partner Benefits
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERKS.map((perk, i) => (
              <PerkCard key={perk.title} perk={perk} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing tagline ──────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "#09090B" }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }} />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: 700, height: 300,
            background: "radial-gradient(ellipse, rgba(212,175,55,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] max-w-[500px] mx-auto mb-8 font-normal"
            style={{ color: "rgba(255,255,255,0.38)" }}
          >
            A curated ecosystem for ambitious founders. Peer boards, growth
            sessions, and curated founder experiences.
          </motion.p>
          <motion.div
            className="h-px mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EXPO }}
            style={{ background: "rgba(212,175,55,0.3)" }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.30em] uppercase"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Built for founders. Designed for visionaries worldwide
          </motion.p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
