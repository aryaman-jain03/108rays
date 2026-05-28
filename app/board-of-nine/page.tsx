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
    num: "01",
    title: "Nine founders.",
    desc: "Fixed cohort, high trust, no direct competitors.",
  },
  {
    num: "02",
    title: "Deep founder work in every session.",
    desc: "Sessions balance urgency, fairness, and what the board needs most.",
  },
  {
    num: "03",
    title: "Expert lens.",
    desc: "Every meeting blends expert insight seamlessly into the peer advisory experience.",
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
        height: 2, zIndex: 999,
        background: "rgba(255,255,255,0.5)",
      }}
    />
  );
}

/* ── Inside row — own ref ────────────────────────────────────── */
function InsideRow({ item, i }: { item: typeof INSIDE[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="grid lg:grid-cols-[72px_1fr] gap-6 lg:gap-12 py-10 border-b relative"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
    >
      {/* Animated left border reveal */}
      <motion.div
        className="absolute left-0 top-0 w-px"
        style={{ background: "rgba(255,255,255,0.22)" }}
        initial={{ height: 0 }}
        animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 0.55, delay: i * 0.1 + 0.1, ease: EXPO }}
      />

      {/* Number */}
      <motion.p
        className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.2em] pt-1 pl-4"
        style={{ color: "rgba(255,255,255,0.32)" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: i * 0.1 + 0.15 }}
      >
        {item.num}
      </motion.p>

      {/* Text */}
      <div>
        <div className="overflow-hidden mb-3">
          <motion.h3
            initial={{ y: "100%" }}
            animate={inView ? { y: "0%" } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 + 0.12, ease: EXPO }}
            className="font-[family-name:var(--font-urbanist)] font-medium leading-snug tracking-[-0.025em] text-white"
            style={{ fontSize: "clamp(18px,1.8vw,24px)" }}
          >
            {item.title}
          </motion.h3>
        </div>
        <motion.p
          className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.78] font-normal"
          style={{ color: "rgba(255,255,255,0.38)" }}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: i * 0.1 + 0.24, ease: EXPO }}
        >
          {item.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Field ───────────────────────────────────────────────────── */
function Field({ label, type = "text", textarea = false, name }: { label: string; type?: string; textarea?: boolean; name: string }) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const base = "w-full bg-transparent border-b font-[family-name:var(--font-inter)] text-[14px] font-normal text-ink outline-none transition-colors duration-300 resize-none placeholder-transparent";
  const borderColor = focused ? "rgba(9,9,11,0.55)" : "rgba(9,9,11,0.13)";

  return (
    <div className="relative pt-5 pb-1">
      {textarea ? (
        <textarea rows={4} name={name} placeholder={label} className={`${base} pt-1 leading-[1.7]`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input type={type} name={name} placeholder={label} className={`${base} h-9 pt-1`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      )}
      <label className="absolute left-0 font-[family-name:var(--font-inter)] font-medium tracking-[.14em] uppercase transition-all duration-250 pointer-events-none"
        style={{
          fontSize: focused || filled ? "8.5px" : "11px",
          color: focused ? "rgba(9,9,11,0.55)" : filled ? "rgba(9,9,11,0.35)" : "rgba(9,9,11,0.28)",
          top: focused || filled ? 0 : textarea ? "24px" : "20px",
        }}
      >
        {label}
      </label>
      <motion.div className="absolute bottom-0 left-0 h-px"
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
      <div onClick={onChange}
        className="w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all duration-200"
        style={{ borderColor: checked ? "#09090B" : "rgba(9,9,11,0.22)", background: checked ? "#09090B" : "transparent" }}
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

/* ── Page ────────────────────────────────────────────────────── */
export default function BoardOfNinePage() {
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

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1],   ["0%", "14%"]);
  const heroImgY    = useTransform(heroScroll, [0, 1],   ["0%", "22%"]);
  /* Hero glow drifts upward as you scroll out */
  const heroGlowY   = useTransform(heroScroll, [0, 1],   ["0%", "-30%"]);

  /* Inside section — dot grid parallax */
  const { scrollYProgress: insideScroll } = useScroll({ target: insideRef, offset: ["start end", "end start"] });
  const insideDotY = useTransform(insideScroll, [0, 1], ["0%", "8%"]);

  /* Pricing section — glow parallax */
  const { scrollYProgress: pricingScroll } = useScroll({ target: pricingRef, offset: ["start end", "end start"] });
  const pricingGlowY = useTransform(pricingScroll, [0, 1], ["-10%", "20%"]);

  const insideInView  = useInView(insideRef,  { once: true, amount: 0.08 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.12 });
  const formInView    = useInView(formRef,    { once: true, amount: 0.08 });

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#07070A" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden" style={{ background: "#07070A" }}>

        {/* Parallax image */}
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <div className="absolute inset-0" style={{
            backgroundImage: "url('/boardroom.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center 40%",
            scale: 1.12,
          }} />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,10,0.52) 0%, rgba(5,5,10,0.25) 35%, rgba(5,5,10,0.78) 75%, rgba(5,5,10,0.98) 100%)" }}
        />
        {/* Left vignette for left-aligned text */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(5,5,10,0.65) 0%, rgba(5,5,10,0.15) 55%, transparent 100%)" }}
        />
        {/* Subtle hero glow */}
        <motion.div className="absolute pointer-events-none"
          style={{
            bottom: "-10%", left: "-5%",
            width: "55vw", height: "55vw",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
            y: heroGlowY,
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-20"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.26em] uppercase mb-10 flex items-center gap-3"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            <motion.span
              className="inline-block h-px"
              initial={{ width: 0 }}
              animate={{ width: 24 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EXPO }}
              style={{ background: "rgba(255,255,255,0.35)" }}
            />
            The Board of Nine · Peer Advisory for Growth
          </motion.p>

          {/* Headline — left-aligned, large */}
          <div className="mb-8 max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.22, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] text-white"
                style={{ fontSize: "clamp(14px,5vw,108px)" }}
              >
                Your personal board,
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.34, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] italic"
                style={{ fontSize: "clamp(14px,5vw,108px)", color: "rgba(255,255,255,0.4)" }}
              >
                without giving up equity.
              </motion.h1>
            </div>
          </div>

          {/* Sub + divider */}
          <motion.div
            className="flex items-start gap-8 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: EXPO }}
          >
            <div className="w-px self-stretch flex-shrink-0 mt-1"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.8] font-normal"
              style={{ color: "rgba(255,255,255,0.72)" }}>
              A monthly peer advisory board for founders who want a small,
              trusted circle to think and grow with. Nine carefully curated
              founders. Fixed cohort. High trust.
            </p>
          </motion.div>

          {/* Scroll cue */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-20 flex items-center gap-4"
          >
            <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
              style={{ animation: "scroll-drip 2.4s ease-in-out infinite" }}
            />
            <span className="font-[family-name:var(--font-inter)] text-[9px] tracking-[.22em] text-white/20 uppercase">
              Scroll
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Inside the Room ──────────────────────────────────── */}
      <section ref={insideRef} className="relative overflow-hidden py-24 lg:py-32" style={{ background: "#07070A" }}>
        <motion.div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none" style={{ y: insideDotY }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.35)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={insideInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              Inside the Room
            </motion.span>
            <motion.div
              className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={insideInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          {/* Rows */}
          <div className="mt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {INSIDE.map((item, i) => (
              <InsideRow key={item.num} item={item} i={i} />
            ))}
          </div>

          {/* Who It's For */}
          <motion.div
            className="mt-20 grid lg:grid-cols-[160px_1fr] gap-8 items-start"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, ease: EXPO }}
          >
            <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase pt-1"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              Who It's For
            </p>
            <p className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.5] tracking-[-0.02em]"
              style={{ fontSize: "clamp(17px,1.9vw,23px)", color: "rgba(255,255,255,0.6)" }}>
              For founders who want a serious, confidential space to work on
              strategy, leadership, and growth with peers at a similar stage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section ref={pricingRef} className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: "linear-gradient(to bottom, #07070A, #0C0C14)" }}
      >
        {/* Subtle glow centre-right — parallax drift */}
        <motion.div className="absolute pointer-events-none"
          style={{
            top: "10%", right: "-5%",
            width: "40vw", height: "40vw",
            background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
            y: pricingGlowY,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          {/* Label */}
          <div className="flex items-center gap-4 mb-16">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.38)" }}
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
            {/* Monthly */}
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
                style={{ color: "rgba(255,255,255,0.4)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Monthly
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}
                  className="flex items-baseline gap-3 flex-wrap"
                >
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                    ₹22,000
                  </span>
                </motion.div>
              </div>
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal"
                style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
              >
                /month · Year 1 launch price
              </motion.p>
            </motion.div>

            {/* Annual */}
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
                style={{ color: "rgba(255,255,255,0.4)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Annual
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.38, ease: EXPO }}
                >
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(36px,4vw,52px)" }}>
                    ₹2,40,000
                  </span>
                </motion.div>
              </div>
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal"
                style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                prepaid · effective ₹20k/mo
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Application form ─────────────────────────────────── */}
      <section ref={formRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Dark→light blend */}
        <div className="absolute top-0 inset-x-0 h-20 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          {/* Header */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EXPO }}
          >
            <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase mb-5"
              style={{ color: "rgba(9,9,11,0.32)" }}>
              Apply
            </p>
            <div className="overflow-hidden mb-3">
              <motion.h2
                initial={{ y: "105%" }}
                animate={formInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.03em]"
                style={{ fontSize: "clamp(26px,3vw,42px)", color: "#09090B" }}
              >
                By application only.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.76] font-normal max-w-[500px] mb-5"
              style={{ color: "rgba(9,9,11,0.42)" }}
            >
              Each board is intentionally small. We curate for fit, intent, and
              complementary perspectives. No payment at this stage.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={formInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3"
            >
              <div className="w-1 h-1 rounded-full" style={{ background: "rgba(9,9,11,0.25)" }} />
              <p className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal"
                style={{ color: "rgba(9,9,11,0.38)" }}>
                Board members receive the{" "}
                <a href="/founder-card" className="underline underline-offset-2 hover:text-ink transition-colors duration-200">
                  108 Rays Founder Card
                </a>{" "}
                and first priority for Summit seats.
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
              Board of Nine Application
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
                  Application received.
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75]"
                  style={{ color: "#71717A" }}>
                  We review each application carefully. You'll hear from us within
                  5 working days.
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
                <input type="hidden" name="_subject" value="New Application – Board of Nine" />
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                  <Field label="Full Name" name="full_name" />
                  <Field label="Email" type="email" name="email" />
                  <Field label="Mobile" type="tel" name="mobile" />
                  <Field label="City" name="city" />
                  <Field label="Company" name="company" />
                  <Field label="Website / LinkedIn" name="website_linkedin" />
                </div>
                <Field label="Biggest business challenge right now" textarea name="business_challenge" />
                <Field label="What would you bring to a peer board?" textarea name="peer_board_contribution" />

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
                    {submitting ? "Sending…" : "Submit"}
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
            {/* The Compass */}
            <a href="/compass" className="group relative rounded-2xl overflow-hidden block" style={{ aspectRatio: "16/9" }}>
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/compass.jpg')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,6,10,0.2) 0%, rgba(4,6,10,0.9) 100%)" }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.05) 0%, transparent 65%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ background: "linear-gradient(to right, rgba(255,255,255,0.4), rgba(255,255,255,0.12))" }} />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-2"
                  style={{ color: "rgba(255,255,255,0.4)" }}>Level 01</p>
                <h3 className="font-[family-name:var(--font-urbanist)] font-semibold text-white tracking-[-0.03em] mb-2"
                  style={{ fontSize: "clamp(18px,1.8vw,22px)" }}>The Compass</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] leading-snug mb-4"
                  style={{ color: "rgba(255,255,255,0.42)" }}>
                  Growth sessions and curated learning formats for clarity, direction, and momentum.
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
