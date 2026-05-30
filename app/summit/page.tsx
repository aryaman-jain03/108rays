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

const HERO_IMG =
  "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1920&h=1080&fit=crop&auto=format";

const PILLARS = [
  {
    title: "Curated founder experiences.",
    desc: "Learn, play, and push yourself through golf, surfing, whiskey, and more.",
  },
  {
    title: "Deep war rooms.",
    desc: "Work intensively on one high-impact business theme with peers and facilitation.",
  },
  {
    title: "Wellness built in.",
    desc: "Daily movement and mindfulness to support better thinking and recovery.",
  },
  {
    title: "Cohort for life.",
    desc: "Small group, shared breakthroughs, long-term relationships.",
  },
];

const SUMMIT_TYPES = ["3-day", "7-day", "Either"];

const DESTINATIONS = [
  {
    name: "Spirits of the Himalayas",
    label: "5-Day Summit",
    dates: "Coming 2026",
    activities: ["Whiskey", "War Rooms", "Distilleries", "Culture"],
    status: "Accepting Interest",
    note: "Kasauli · Mashobra · 16–20 founders",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=700&fit=crop&auto=format",
    featured: true,
    href: "/summit/spirits-of-himalayas",
  },
];

const INDIA_SUMMITS = [
  {
    name: "Udaipur",
    label: "3-Day Summit",
    dates: "2027",
    activities: ["Lake Swimming", "Art", "Royal Immersion"],
    status: "Coming Soon",
    note: "Palaces, shimmering lakes, and the soul of Rajasthan",
    img: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&h=700&fit=crop&auto=format",
    featured: false,
  },
  {
    name: "Havelock Island, Andaman",
    label: "5-Day Summit",
    dates: "2027",
    activities: ["Diving", "Bioluminescence", "Fresh Catch", "Seafood"],
    status: "Coming Soon",
    note: "Radhanagar Beach · Pristine reefs · Zero signal",
    img: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=900&h=700&fit=crop&auto=format",
    featured: false,
  },
  {
    name: "Varkala",
    label: "3-Day Summit",
    dates: "2027",
    activities: ["Surfing", "Jungle Kayaking", "Sunsets"],
    status: "Coming Soon",
    note: "Cliff-top views, Kerala backwaters, and golden hours",
    img: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=900&h=700&fit=crop&auto=format",
    featured: false,
  },
  {
    name: "Ananda in the Himalayas",
    label: "4-Day Summit",
    dates: "2027",
    activities: ["Golf", "Wellness", "Mountain Vibes", "Clarity"],
    status: "Coming Soon",
    note: "Uttarakhand · Luxury wellness · Himalayan altitude",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&h=700&fit=crop&auto=format",
    featured: false,
  },
  {
    name: "Meghalaya",
    label: "4-Day Summit",
    dates: "2027",
    activities: ["Caves", "Tribes", "Culinary Delights", "Music"],
    status: "Coming Soon",
    note: "Living roots, monsoon forests, and ancient cultures",
    img: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=900&h=700&fit=crop&auto=format",
    featured: false,
  },
];

type DestinationItem = {
  name: string; label: string; dates: string; activities: string[];
  status: string; note: string; img: string; featured: boolean; href?: string;
};

/* ── Destination card — own inView ───────────────────────────── */
function DestCard({ d, i, aspect = "4/3" }: { d: DestinationItem; i: number; aspect?: string }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const card = (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl group ${"href" in d && d.href ? "cursor-pointer" : "cursor-default"} ${d.featured ? "lg:row-span-2" : ""}`}
      style={{ aspectRatio: aspect }}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: i * 0.1, ease: EXPO }}
    >
      {/* Image with hover zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
        style={{ backgroundImage: `url('${d.img}')` }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom, rgba(4,8,6,0.18) 0%, rgba(4,8,6,0.22) 40%, rgba(4,8,6,0.82) 80%, rgba(4,8,6,0.96) 100%)" }}
      />

      {/* Emerald glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(255,255,255,0.06) 0%, transparent 65%)" }}
      />

      {/* Top row */}
      <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
        <span
          className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
          style={{
            background: d.status === "Accepting Interest"
              ? "rgba(255,255,255,0.14)"
              : "rgba(255,255,255,0.08)",
            color: d.status === "Accepting Interest"
              ? "rgba(255,255,255,0.88)"
              : "rgba(255,255,255,0.5)",
            border: `1px solid ${d.status === "Accepting Interest" ? "rgba(255,255,255,0.28)" : "rgba(255,255,255,0.1)"}`,
          }}
        >
          {d.status}
        </span>
        <span
          className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
          style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {d.label}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
        <p className="font-[family-name:var(--font-inter)] text-[9px] font-normal tracking-[.18em] uppercase mb-2"
          style={{ color: "rgba(255,255,255,0.52)" }}>
          {d.dates}
        </p>
        <h3 className="font-[family-name:var(--font-urbanist)] font-semibold leading-tight tracking-[-0.03em] text-white mb-1.5"
          style={{ fontSize: "clamp(20px,2vw,26px)" }}>
          {d.name}
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[12px] font-normal mb-4 leading-snug"
          style={{ color: "rgba(255,255,255,0.42)" }}>
          {d.note}
        </p>
        {/* Activity tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {d.activities.map((a) => (
            <span key={a}
              className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.12em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.38)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {a}
            </span>
          ))}
        </div>
        {"href" in d && d.href && (
          <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[10px] font-semibold tracking-[.14em] uppercase transition-all duration-300 group-hover:gap-2.5"
            style={{ color: "rgba(255,255,255,0.72)" }}>
            View Summit <span className="transition-transform duration-300 group-hover:translate-x-0.5 inline-block">→</span>
          </span>
        )}
      </div>

      {/* Bottom border reveal on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 ease-out"
        style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)" }}
      />
    </motion.div>
  );
  return "href" in d && d.href ? <a href={d.href} className="block">{card}</a> : card;
}

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

/* ── Pillar card — own inView ────────────────────────────────── */
function PillarCard({ item, i }: { item: typeof PILLARS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  return (
    <motion.div
      ref={ref}
      className="relative p-8 rounded-2xl border overflow-hidden group"
      style={{ borderColor: "rgba(9,9,11,0.1)", background: "rgba(9,9,11,0.02)" }}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: i * 0.1, ease: EXPO }}
      whileHover={{ y: -4 }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(9,9,11,0.04) 0%, transparent 70%)" }}
      />
      {/* Number */}
      <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.2em] mb-5"
        style={{ color: "rgba(9,9,11,0.3)" }}>
        0{i + 1}
      </p>
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 h-px"
        style={{ background: "rgba(9,9,11,0.18)" }}
        initial={{ width: 0 }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 0.7, delay: i * 0.1 + 0.15, ease: EXPO }}
      />
      <div className="overflow-hidden mb-3">
        <motion.h3
          initial={{ y: "100%" }}
          animate={inView ? { y: "0%" } : {}}
          transition={{ duration: 0.7, delay: i * 0.1 + 0.1, ease: EXPO }}
          className="font-[family-name:var(--font-urbanist)] font-medium leading-snug tracking-[-0.025em]"
          style={{ fontSize: "clamp(17px,1.6vw,21px)", color: "#09090B" }}
        >
          {item.title}
        </motion.h3>
      </div>
      <motion.p
        className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.78] font-normal"
        style={{ color: "#71717A" }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: i * 0.1 + 0.25 }}
      >
        {item.desc}
      </motion.p>
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

/* ── Radio ───────────────────────────────────────────────────── */
function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <div onClick={onChange}
        className="w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200"
        style={{ borderColor: checked ? "#09090B" : "rgba(9,9,11,0.22)" }}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18 }}
            className="w-2 h-2 rounded-full"
            style={{ background: "#09090B" }}
          />
        )}
      </div>
      <span className="font-[family-name:var(--font-inter)] text-[13.5px] font-normal transition-colors duration-200"
        style={{ color: checked ? "#09090B" : "rgba(9,9,11,0.45)" }}>
        {label}
      </span>
    </label>
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
export default function SummitPage() {
  const heroRef    = useRef<HTMLElement>(null);
  const whatRef    = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const formRef    = useRef<HTMLElement>(null);

  const [summitType,   setSummitType]   = useState("3-day");
  const [privacy,      setPrivacy]      = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [submitting,   setSubmitting]   = useState(false);
  const [submitError,  setSubmitError]  = useState(false);

  useEffect(() => {
    if (submitted) formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  /* Hero parallax */
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity  = useTransform(heroScroll, [0, 0.85], [1, 0]);
  const heroY        = useTransform(heroScroll, [0, 1],    ["0%", "12%"]);
  const heroImgY     = useTransform(heroScroll, [0, 1],    ["0%", "22%"]); // image moves slower

  /* Section parallax */
  const { scrollYProgress: pricingScroll } = useScroll({ target: pricingRef, offset: ["start end", "end start"] });
  const pricingGlowY = useTransform(pricingScroll, [0, 1], ["-10%", "20%"]);

  const destRef    = useRef<HTMLElement>(null);

  const whatInView    = useInView(whatRef,    { once: true, amount: 0.12 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.12 });
  const destInView    = useInView(destRef,    { once: true, amount: 0.08 });
  const formInView    = useInView(formRef,    { once: true, amount: 0.08 });

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
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">

        {/* Parallax image */}
        <motion.div
          className="absolute inset-0"
          style={{ y: heroImgY }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('${HERO_IMG}')`,
              backgroundSize: "cover",
              backgroundPosition: "center 30%",
              scale: 1.12,
            }}
          />
        </motion.div>

        {/* Gradient overlays — dark at bottom for text legibility */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(5,5,8,0.35) 0%, rgba(5,5,8,0.15) 40%, rgba(5,5,8,0.72) 75%, rgba(5,5,8,0.95) 100%)" }}
        />
        {/* Left vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(5,5,8,0.5) 0%, transparent 55%)" }}
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
            The Summit · Curated Founder Experiences
          </motion.p>

          {/* Headline */}
          <div className="mb-8 max-w-3xl">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.22, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] text-white"
                style={{ fontSize: "clamp(14px,6vw,112px)" }}
              >
                Three to seven days.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.34, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] italic"
                style={{ fontSize: "clamp(14px,6vw,112px)", color: "rgba(255,255,255,0.45)" }}
              >
                One breakthrough.
              </motion.h1>
            </div>
          </div>


        </motion.div>
      </section>

      {/* ── What Is The Summit ───────────────────────────────── */}
      <section ref={whatRef} className="relative bg-surface overflow-hidden min-h-screen flex items-center">
        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />
        {/* Emerald glow top-right */}
        <div className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: "40vw", height: "40vw",
            background: "radial-gradient(circle, rgba(9,9,11,0.02) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-14">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-8">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(9,9,11,0.42)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={whatInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              What Is The Summit
            </motion.span>
            <motion.div className="flex-1 h-px"
              style={{ background: "rgba(9,9,11,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={whatInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          {/* Editorial intro */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-14 mb-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whatInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
            >
              <div className="overflow-hidden mb-4">
                <motion.h2
                  initial={{ y: "105%" }}
                  animate={whatInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.85, delay: 0.15, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.08] tracking-[-0.035em]"
                  style={{ fontSize: "clamp(28px,3.2vw,44px)", color: "#09090B" }}
                >
                  An immersive retreat for founders.
                </motion.h2>
              </div>
              <motion.div
                className="h-px mb-4"
                initial={{ width: 0 }}
                animate={whatInView ? { width: 40 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: EXPO }}
                style={{ background: "rgba(9,9,11,0.18)" }}
              />
            </motion.div>

            <motion.p
              className="font-[family-name:var(--font-inter)] text-[15.5px] leading-[1.85] font-normal self-end"
              style={{ color: "#71717A" }}
              initial={{ opacity: 0, y: 20 }}
              animate={whatInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.25, ease: EXPO }}
            >
              Each edition blends curated experiences like golf, surfing,
              whiskey appreciation, and more with deep business war rooms and
              wellness, so you return with Clarity, Capabilities, and Concrete
              Assets for both you and your business.
            </motion.p>
          </div>

          {/* Pillars 2×2 */}
          <div className="grid sm:grid-cols-2 gap-5">
            {PILLARS.map((item, i) => (
              <PillarCard key={item.title} item={item} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section ref={pricingRef} className="relative overflow-hidden min-h-screen flex items-center"
        style={{ background: "#06100D" }}
      >
        <div className="absolute inset-0 grid-bg-dark opacity-30 pointer-events-none" />

        {/* Emerald glow — parallax */}
        <motion.div className="absolute pointer-events-none"
          style={{
            top: "5%", left: "50%", x: "-50%",
            width: "60vw", height: "40vw",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 65%)",
            y: pricingGlowY,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-14">
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={pricingInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              Pricing
            </motion.span>
            <motion.div className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={pricingInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-6 max-w-2xl">
            {/* 3-day */}
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
                3-Day Summit
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}
                >
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.08em] mb-1"
                    style={{ color: "rgba(255,255,255,0.28)" }}>
                    from
                  </p>
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(32px,3.8vw,48px)" }}>
                    ₹1,00,000
                  </span>
                </motion.div>
              </div>
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-3 leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.42 }}
              >
                per founder<br />₹1,90,000 for co-founder pair
              </motion.p>
            </motion.div>

            {/* 7-day */}
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
                7-Day Summit
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div
                  initial={{ y: "110%" }}
                  animate={pricingInView ? { y: "0%" } : {}}
                  transition={{ duration: 0.75, delay: 0.38, ease: EXPO }}
                >
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.08em] mb-1"
                    style={{ color: "rgba(255,255,255,0.28)" }}>
                    from ~
                  </p>
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white"
                    style={{ fontSize: "clamp(32px,3.8vw,48px)" }}>
                    ₹1,50,000
                  </span>
                </motion.div>
              </div>
              <motion.p
                className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-3 leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }}
                animate={pricingInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                indicative<br />varies by experience and location
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Upcoming Summits ─────────────────────────────────── */}
      <section ref={destRef} className="relative overflow-hidden min-h-screen flex items-start"
        style={{ background: "linear-gradient(to bottom, #06100D, #040C09)" }}
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-14">
          {/* Label */}
          <div className="flex items-center gap-4 mb-4">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0, x: -16 }}
              animate={destInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, ease: EXPO }}
            >
              Upcoming Summits
            </motion.span>
            <motion.div className="flex-1 h-px"
              style={{ background: "rgba(255,255,255,0.1)" }}
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={destInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: EXPO }}
            />
          </div>

          {/* Heading + sub */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={destInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1, ease: EXPO }}
              className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(28px,3.5vw,46px)" }}
            >
              Places that change you.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={destInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.25 }}
              className="font-[family-name:var(--font-inter)] text-[13px] leading-[1.72] font-normal max-w-[320px] lg:text-right"
              style={{ color: "rgba(255,255,255,0.32)" }}
            >
              Every location is handpicked for the experience it unlocks — in
              business and in life. Nine founders. One destination.
            </motion.p>
          </div>

          {/* Spirits — full-width featured */}
          <div className="mb-4">
            <DestCard d={DESTINATIONS[0]} i={0} aspect="21/7" />
          </div>

          {/* India coming soon — 3 + 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {INDIA_SUMMITS.slice(0, 3).map((d, i) => (
              <DestCard key={d.name} d={d} i={i + 1} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 mx-auto">
            {INDIA_SUMMITS.slice(3).map((d, i) => (
              <DestCard key={d.name} d={d} i={i + 4} />
            ))}
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={destInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="font-[family-name:var(--font-inter)] text-[11.5px] leading-[1.7] font-normal text-center mt-10"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            Dates and locations are subject to change. Apply below to register your interest and receive updates.
          </motion.p>
        </div>
      </section>

      {/* ── Application form ─────────────────────────────────── */}
      <section ref={formRef} className="relative bg-surface overflow-hidden min-h-screen flex items-start">
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

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 w-full py-20">
          {/* Header */}
          <motion.div
            className="mb-10"
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
                Tell us what breakthrough you're after.
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.76] font-normal max-w-[500px] mb-5"
              style={{ color: "rgba(9,9,11,0.42)" }}
            >
              We'll be in touch with upcoming dates and next steps. No payment
              at this stage.
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
                All Summit participants receive the{" "}
                <a href="/founder-card" className="underline underline-offset-2 hover:text-ink transition-colors duration-200">
                  108 Rays Founder Card
                </a>.
              </p>
            </motion.div>
          </motion.div>

          {/* Form label */}
          <div className="flex items-center gap-4 mb-6">
            <motion.span
              className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
              style={{ color: "rgba(9,9,11,0.30)" }}
              initial={{ opacity: 0, x: -12 }}
              animate={formInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.22, ease: EXPO }}
            >
              Summit Application
            </motion.span>
            <motion.div className="flex-1 h-px"
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
                  We'll reach out with upcoming Summit dates and next steps
                  within 5 working days.
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
                <input type="hidden" name="_subject" value="New Application – The Summit" />
                <input type="hidden" name="summit_type" value={summitType} />
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                  <Field label="Full Name" name="full_name" />
                  <Field label="Email" type="email" name="email" />
                  <Field label="Mobile" type="tel" name="mobile" />
                  <Field label="City" name="city" />
                  <Field label="Company" name="company" />
                  <Field label="Website / LinkedIn" name="website_linkedin" />
                </div>

                {/* Summit type */}
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.2em] uppercase mb-5"
                    style={{ color: "rgba(9,9,11,0.35)" }}>
                    Which summit type interests you?
                  </p>
                  <div className="flex flex-wrap gap-6">
                    {SUMMIT_TYPES.map((t) => (
                      <Radio key={t} label={t} checked={summitType === t} onChange={() => setSummitType(t)} />
                    ))}
                  </div>
                </div>

                <Field label="What breakthrough are you seeking from this Summit?" textarea name="breakthrough" />

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
      <section className="relative overflow-hidden min-h-screen flex items-center" style={{ background: "#07070A" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-25 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full py-12">
          <div className="flex items-center gap-4 mb-8">
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
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
