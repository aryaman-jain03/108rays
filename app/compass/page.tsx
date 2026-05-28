"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const INSIDE = [
  {
    title: "Masterclass first.",
    desc: "90–120 minutes of practical frameworks on growth, brand, AI, operations, and more.",
  },
  {
    title: "Curated connections.",
    desc: "A new intuitive, evolving way to help you meet the right people, not just more people.",
  },
  {
    title: "Member-led Asks & Offers.",
    desc: "A structured, result-driven format to share what you need and what you can give.",
  },
];

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 2, zIndex: 999,
        background: "rgba(9,9,11,0.65)",
      }}
    />
  );
}

/* ── Field ───────────────────────────────────────────────────── */
function Field({
  label,
  type = "text",
  textarea = false,
  name,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const base =
    "w-full bg-transparent border-b font-[family-name:var(--font-inter)] text-[14px] font-normal text-ink outline-none transition-colors duration-300 resize-none placeholder-transparent";
  const borderColor = focused ? "rgba(9,9,11,0.55)" : "rgba(9,9,11,0.13)";

  return (
    <div className="relative pt-5 pb-1">
      {textarea ? (
        <textarea
          rows={4}
          name={name}
          placeholder={label}
          className={`${base} pt-1 leading-[1.7]`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={label}
          className={`${base} h-9 pt-1`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      )}
      <label
        className="absolute left-0 font-[family-name:var(--font-inter)] font-medium tracking-[.14em] uppercase transition-all duration-250 pointer-events-none"
        style={{
          fontSize: focused || filled ? "8.5px" : "11px",
          color: focused ? "rgba(9,9,11,0.55)" : filled ? "rgba(9,9,11,0.35)" : "rgba(9,9,11,0.28)",
          top: focused || filled ? 0 : textarea ? "24px" : "20px",
        }}
      >
        {label}
      </label>
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: EXPO }}
        style={{ background: "#09090B" }}
      />
    </div>
  );
}

/* ── Checkbox ────────────────────────────────────────────────── */
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div
        onClick={onChange}
        className="w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all duration-200"
        style={{
          borderColor: checked ? "#09090B" : "rgba(9,9,11,0.22)",
          background: checked ? "#09090B" : "transparent",
        }}
      >
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }}
            width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </div>
      <span className="font-[family-name:var(--font-inter)] text-[13.5px] font-normal transition-colors duration-200"
        style={{ color: checked ? "#09090B" : "rgba(9,9,11,0.45)" }}>
        {label}
      </span>
    </label>
  );
}

/* ── Inside item — own ref for stagger ──────────────────────── */
function InsideItem({ item, i }: { item: typeof INSIDE[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: i * 0.14, ease: EXPO }}
    >
      <motion.p
        className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.18em] mb-6"
        style={{ color: "rgba(9,9,11,0.28)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: i * 0.14 }}
      >
        0{i + 1}
      </motion.p>
      <div className="overflow-hidden mb-4">
        <motion.h3
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.75, delay: i * 0.14 + 0.1, ease: EXPO }}
          className="font-[family-name:var(--font-urbanist)] font-medium leading-snug tracking-[-0.02em]"
          style={{ fontSize: "clamp(20px,2vw,26px)", color: "#09090B" }}
        >
          {item.title}
        </motion.h3>
      </div>
      <motion.div
        className="mb-5"
        initial={{ width: 0 }}
        animate={inView ? { width: 32 } : {}}
        transition={{ duration: 0.65, delay: i * 0.14 + 0.18, ease: EXPO }}
        style={{ height: 1, background: "rgba(9,9,11,0.1)" }}
      />
      <motion.p
        className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.8] font-normal"
        style={{ color: "#71717A" }}
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay: i * 0.14 + 0.25, ease: EXPO }}
      >
        {item.desc}
      </motion.p>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function CompassPage() {
  const heroRef    = useRef<HTMLElement>(null);
  const insideRef  = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLElement>(null);

  const [privacy,     setPrivacy]     = useState(false);
  const [submitted,   setSubmitted]   = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (submitted) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  /* Hero parallax */
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "14%"]);
  const heroImgY    = useTransform(heroScroll, [0, 1],   ["0%", "22%"]);

  /* Inside parallax */
  const { scrollYProgress: insideScroll } = useScroll({ target: insideRef, offset: ["start end", "end start"] });
  const insideBg = useTransform(insideScroll, [0, 1], ["0%", "6%"]);

  const insideInView  = useInView(insideRef,  { once: true, amount: 0.1  });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.15 });
  const formInView    = useInView(formRef,    { once: true, amount: 0.1  });

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden bg-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#09090B" }}>
        {/* Parallax image */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <div className="absolute inset-0" style={{
            backgroundImage: "url('/compass.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 50%",
            scale: 1.12,
          }} />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.55) 0%, rgba(5,5,8,0.30) 40%, rgba(5,5,8,0.75) 80%, rgba(5,5,8,0.97) 100%)" }}
        />
        {/* Subtle centre vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,255,255,0.03) 0%, transparent 65%)" }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-24 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.26em] uppercase mb-10 flex items-center gap-3"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            <span className="inline-block w-6 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
            The Compass · Growth & Network Sessions
            <span className="inline-block w-6 h-px" style={{ background: "rgba(255,255,255,0.3)" }} />
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden mb-7 w-full">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
              className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.04] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(14px,5.5vw,100px)" }}
            >
              Clarity. Growth. Network.
            </motion.h1>
          </div>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[17px] leading-[1.78] font-normal text-white/70 max-w-[520px] mb-14"
          >
            Our monthly growth and network session for ambitious founders. Each
            cycle combines an expert-led masterclass with structured,
            high-signal networking.
          </motion.p>

          {/* Scroll to explore */}
          <motion.a
            href="#inside"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col items-center gap-3 group"
          >
            <span className="font-[family-name:var(--font-inter)] text-[9px] tracking-[.24em] text-white/28 uppercase group-hover:text-white/50 transition-colors duration-300">
              Explore
            </span>
            <div
              className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent"
              style={{ animation: "scroll-drip 2.4s ease-in-out infinite" }}
            />
          </motion.a>
        </motion.div>
      </section>

      {/* ── Inside the Room ──────────────────────────────────── */}
      <section
        id="inside"
        ref={insideRef}
        className="relative bg-surface overflow-hidden py-24 lg:py-32"
      >
        {/* Dark→light top blend */}
        <div className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }}
        />

        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: insideBg,
            backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Label + expanding line */}
          <div className="flex items-center gap-4 mb-16 overflow-hidden">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(9,9,11,0.42)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={insideInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              Inside the Room
            </motion.span>
            <motion.div
              className="flex-1 h-px"
              style={{ background: "rgba(9,9,11,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={insideInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          {/* Three items — each has its own useInView */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {INSIDE.map((item, i) => (
              <InsideItem key={item.title} item={item} i={i} />
            ))}
          </div>

        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section ref={pricingRef} className="relative bg-ink-2 overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 grid-bg-dark opacity-40 pointer-events-none" />

        {/* Ambient glow centre */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,255,255,0.02) 0%, transparent 70%)" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Label */}
          <div className="flex items-center gap-4 mb-16">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.4)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              Pricing
            </motion.span>
            <motion.div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={pricingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-2xl">
            {/* Member */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: EXPO }}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(255,255,255,0.22)", backgroundColor: "rgba(255,255,255,0.05)" }}
              className="rounded-2xl p-8 border relative overflow-hidden cursor-default transition-colors duration-300"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)" }}
              />
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-8"
                style={{ color: "rgba(255,255,255,0.42)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Member
              </motion.p>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}
                  className="flex items-baseline gap-3 flex-wrap"
                >
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                    ₹7,499
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal"
                    style={{ color: "rgba(255,255,255,0.32)" }}>
                    /month, billed quarterly
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Walk-in */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={pricingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.12, ease: EXPO }}
              whileHover={{ y: -6, scale: 1.02, borderColor: "rgba(255,255,255,0.22)", backgroundColor: "rgba(255,255,255,0.05)" }}
              className="rounded-2xl p-8 border relative overflow-hidden cursor-default transition-colors duration-300"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}
            >
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.05) 0%, transparent 70%)" }}
              />
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-8"
                style={{ color: "rgba(255,255,255,0.38)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Walk-in
              </motion.p>
              <div className="overflow-hidden">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.38, ease: EXPO }}
                >
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                    ₹9,999
                  </span>
                </motion.div>
              </div>
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal mt-2"
                style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                /single session
              </motion.p>
            </motion.div>
          </div>

          {/* Who It's For */}
          <motion.div
            className="mt-16 pt-12 border-t"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3, ease: EXPO }}
          >
            <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase mb-5"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              Who It's For
            </p>
            <p className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.5] tracking-[-0.02em] max-w-[560px]"
              style={{ fontSize: "clamp(18px,2vw,24px)", color: "rgba(255,255,255,0.65)" }}>
              Founders building products, services, D2C, SaaS, and more, who
              are committed to serious growth.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Meetings ────────────────────────────────── */}
      <section className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(9,9,11,0.4)" }}>
              Upcoming Meetings
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(9,9,11,0.09)" }} />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
            <h2 className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em] text-ink"
              style={{ fontSize: "clamp(24px,2.8vw,38px)" }}>
              Coming to your city.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[1.72] font-normal lg:text-right max-w-[280px]"
              style={{ color: "rgba(9,9,11,0.42)" }}>
              Monthly Compass sessions across India's top startup cities.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {/* Mumbai */}
            <div className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=700&h=500&fit=crop&auto=format')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.18) 0%, rgba(5,5,8,0.85) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.45), rgba(255,255,255,0.1))" }} />
              <div className="absolute top-5 left-5">
                <span className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  Accepting RSVPs
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-1.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  July 2026 · Half Day
                </p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.025em] mb-1"
                  style={{ fontSize: "clamp(17px,1.6vw,20px)" }}>Mumbai</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12px] leading-snug mb-3"
                  style={{ color: "rgba(255,255,255,0.38)" }}>
                  Bandra · Masterclass on brand & distribution for D2C founders
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Brand", "D2C", "Distribution"].map(tag => (
                    <span key={tag} className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.1em] uppercase px-2 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Bengaluru */}
            <div className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=700&h=500&fit=crop&auto=format')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.18) 0%, rgba(5,5,8,0.85) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.45), rgba(255,255,255,0.1))" }} />
              <div className="absolute top-5 left-5">
                <span className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.22)" }}>
                  Accepting RSVPs
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-1.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  August 2026 · Half Day
                </p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.025em] mb-1"
                  style={{ fontSize: "clamp(17px,1.6vw,20px)" }}>Bengaluru</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12px] leading-snug mb-3"
                  style={{ color: "rgba(255,255,255,0.38)" }}>
                  Koramangala · Masterclass on AI leverage & product-led growth
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["AI", "Product", "SaaS"].map(tag => (
                    <span key={tag} className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.1em] uppercase px-2 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* Delhi NCR */}
            <div className="group relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587474260584-136574528ed5?w=700&h=500&fit=crop&auto=format')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.18) 0%, rgba(5,5,8,0.85) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.07) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.45), rgba(255,255,255,0.1))" }} />
              <div className="absolute top-5 left-5">
                <span className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  Coming Soon
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-1.5"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  September 2026 · Half Day
                </p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.025em] mb-1"
                  style={{ fontSize: "clamp(17px,1.6vw,20px)" }}>Delhi NCR</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12px] leading-snug mb-3"
                  style={{ color: "rgba(255,255,255,0.38)" }}>
                  Gurugram · Masterclass on capital strategy & scaling operations
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Capital", "Ops", "Scale"].map(tag => (
                    <span key={tag} className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.1em] uppercase px-2 py-1 rounded-full"
                      style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.09)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[11.5px] font-normal text-center mt-8"
            style={{ color: "rgba(9,9,11,0.28)" }}>
            Dates and venues subject to confirmation. Register below to receive location-specific updates.
          </p>
        </div>
      </section>

      {/* ── Registration form ────────────────────────────────── */}
      <section id="register" ref={formRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        {/* Dark→light blend */}
        <div className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }}
        />
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO }}
            className="mb-14"
          >
            <div className="overflow-hidden mb-3">
              <motion.h2
                initial={{ y: "105%" }}
                animate={formInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.03em]"
                style={{ fontSize: "clamp(28px,3.2vw,44px)", color: "#09090B" }}
              >
                Step into your next room.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.76] font-normal max-w-[480px]"
              style={{ color: "rgba(9,9,11,0.42)" }}
            >
              Register below to lock in your seat. After submitting, you'll be
              directed to secure payment via our gateway.
            </motion.p>

            {/* Founder card note */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-6 flex items-center gap-3"
            >
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(9,9,11,0.25)" }} />
              <p className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal"
                style={{ color: "rgba(9,9,11,0.38)" }}>
                All Compass members receive the{" "}
                <a href="/founder-card" className="underline underline-offset-2 hover:text-ink transition-colors duration-200">
                  108 Rays Founder Card
                </a>{" "}
                with partner benefits.
              </p>
            </motion.div>
          </motion.div>

          {/* Form label */}
          <div className="flex items-center gap-4 mb-10">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(9,9,11,0.30)" }}
              initial={{ opacity: 0, x: -12 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: EXPO }}
            >
              Compass Registration
            </motion.span>
            <motion.div
              className="flex-1 h-px"
              style={{ background: "rgba(9,9,11,0.07)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={formInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.32, ease: EXPO }}
            />
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EXPO }}
                className="py-16 text-center"
              >
                <p className="font-[family-name:var(--font-urbanist)] font-medium text-[22px] tracking-[-0.02em] mb-3"
                  style={{ color: "#09090B" }}>
                  Registration received.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75]"
                  style={{ color: "#71717A" }}>
                  You'll be redirected to our payment gateway shortly. Check your
                  email for next steps.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.3, ease: EXPO }}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSubmitting(true);
                  setSubmitError(false);
                  const data = new FormData(e.currentTarget);
                  try {
                    const res = await fetch("https://formspree.io/f/maqkvwdo", {
                      method: "POST",
                      body: data,
                      headers: { Accept: "application/json" },
                    });
                    if (res.ok) { setSubmitted(true); } else { setSubmitError(true); }
                  } catch { setSubmitError(true); }
                  setSubmitting(false);
                }}
                className="space-y-8"
              >
                <input type="hidden" name="_subject" value="New Application – The Compass" />
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                  <Field label="Full Name" name="full_name" />
                  <Field label="Email" type="email" name="email" />
                  <Field label="Mobile" type="tel" name="mobile" />
                  <Field label="City" name="city" />
                  <Field label="Company" name="company" />
                  <Field label="Website / LinkedIn" name="website_linkedin" />
                </div>
                <Field label="What are you hoping to get from The Compass?" textarea name="message" />

                <Checkbox
                  label="I agree to 108 Rays' Privacy Policy and Terms."
                  checked={privacy}
                  onChange={() => setPrivacy(!privacy)}
                />

                {submitError && (
                  <p className="font-[family-name:var(--font-inter)] text-[13px]" style={{ color: "#B91C1C" }}>
                    Something went wrong. Please try again or email us at{" "}
                    <a href="mailto:info@108rays.com" style={{ textDecoration: "underline" }}>info@108rays.com</a>.
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!privacy || submitting}
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full bg-ink text-white transition-all duration-300 hover:bg-ink/85 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Sending…" : "Continue to Payment"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Explore More ─────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#07070A" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-25 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              Explore More
            </span>
            <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Board of Nine */}
            <a href="/board-of-nine" className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/boardroom.jpg')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,6,10,0.2) 0%, rgba(4,6,10,0.9) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.12))" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}>Level 02</p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.03em] mb-2"
                  style={{ fontSize: "clamp(18px,1.8vw,22px)" }}>The Board of Nine</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] leading-snug mb-4"
                  style={{ color: "rgba(255,255,255,0.42)" }}>
                  Intimate peer advisory boards of 9 founders. Structured, recurring, and designed for real breakthroughs.
                </p>
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-[.14em] uppercase transition-all duration-300 group-hover:gap-2.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}>
                  Explore <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
            {/* The Summit */}
            <a href="/summit" className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=900&h=500&fit=crop&auto=format')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,6,10,0.2) 0%, rgba(4,6,10,0.9) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.12))" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}>Level 03</p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.03em] mb-2"
                  style={{ fontSize: "clamp(18px,1.8vw,22px)" }}>The Summit</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] leading-snug mb-4"
                  style={{ color: "rgba(255,255,255,0.42)" }}>
                  Curated founder retreats crafted for depth, connection, and breakthrough moments.
                </p>
                <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-[.14em] uppercase transition-all duration-300 group-hover:gap-2.5"
                  style={{ color: "rgba(255,255,255,0.7)" }}>
                  Explore <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
