"use client";

import { useRef, useState } from "react";
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
const EM  = (a: number) => `rgba(255,255,255,${a})`;   // dark-section neutral
const EML = (a: number) => `rgba(9,9,11,${a})`;        // light-section neutral

const HERO_IMG =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&h=1080&fit=crop&auto=format";

const WAR_STEPS = [
  { num: "01", title: "Discovery",         desc: "Unfold your business and find the real constraints." },
  { num: "02", title: "Strategy",          desc: "Design actionable moves with peers and facilitators." },
  { num: "03", title: "Execution Design",  desc: "Turn ideas into clear steps and assets." },
  { num: "04", title: "Accountability",    desc: "Set a simple system with your cohort for the next 90 days." },
];

const HIGHLIGHTS = [
  "Tour Asia's oldest operating distillery (est. 1828) in Kasauli.",
  "Taste Solan No. 1, Asia's only Himalayan single malt.",
  "Visit a family-run fruit winery in apple country.",
  "Sample rhododendron wine made from Himalayan flowers.",
  "Forage wild botanicals and build your own mountain cocktail.",
  "Discover Angoori (GI-protected grape brandy) and Chulli (wild apricot spirit) from Kinnaur.",
  "Attend a curated alcohol masterclass in the mountains.",
  "Feast on a traditional Himachali Dham on leaf plates, paired with local wines and Angoori.",
  "Drive through apple orchards at 2,100m in valley and hill-view resorts.",
  "Build and take home a strategic roadmap for one core business challenge.",
];

const DAYS = [
  {
    day: "Day 1", sub: "Delhi → Kasauli",
    bullets: ["Scenic drive from Delhi, orientation, first founder circles.", "War room: icebreakers & intentions."],
    highlight: "Indian single malts by the hills.",
  },
  {
    day: "Day 2", sub: "Kasauli",
    bullets: ["Walk Asia's oldest operating distillery, taste Solan No. 1.", "War room: discovery of your current challenges."],
    highlight: "Inside a working 1828 distillery.",
  },
  {
    day: "Day 3", sub: "Mashobra",
    bullets: ["Drive deeper into the mountains, visit a boutique fruit winery.", "War room: Strategy — turn insights into actionable plans."],
    highlight: "Forage wild botanicals and build your own cocktail.",
  },
  {
    day: "Day 4", sub: "Mashobra",
    bullets: ["Slow morning in the orchard hills; tribal spirits from Kinnaur (Angoori, Chulli).", "War room: execution design — shape concrete steps and assets."],
    highlight: "Taste spirits most people have never heard of.",
  },
  {
    day: "Day 5", sub: "Mashobra",
    bullets: ["Alcohol masterclass: production, pairing, building your collection.", "Evening Himachali Dham paired with local wines and Angoori.", "War room: accountability & next 90 days."],
    highlight: "Dham on pattals under the Himalayan sky.",
  },
];

const WHO_FOR = [
  "Founders who want to appreciate alcohol as a craft, not just consumption.",
  "Ambitious founders in the multi-crore band who feel they've hit a growth ceiling.",
  "People who prefer intimate cohorts (16–20) and deep conversations over big conferences.",
  "Those comfortable with structured sessions by day and thoughtful tastings by evening — no chaos, no forced partying.",
];

const INCLUDED = [
  "Twin-share accommodation (5 nights) across Kasauli and Mashobra.",
  "All ground transport – Delhi → Kasauli → Mashobra → Delhi.",
  "Welcome lunch on Day 1; breakfast every day.",
  "Himachali Dham dinner on Day 5.",
  "All curated alcohol experiences (distillery, winery, tastings, foraging, tribal session, masterclass).",
  "Expert alcohol facilitator and on-trip experience host.",
  "Business war room facilitation on all working days.",
];

const EXCLUDED = [
  "Travel to/from Delhi (flights/train).",
  "Lunches and dinners other than those mentioned.",
  "Personal alcohol purchases beyond curated sessions.",
  "Travel insurance, gratuities, and personal expenses.",
  "Fines/medical expenses due to personal conduct.",
  "Shopping, local purchases, and any tools/devices for work sessions.",
];

const UPCOMING_CARDS = [
  {
    name: "Tuscany, Italy",        label: "3-Day Summit", dates: "April 2027",
    desc: "Wine, countryside, and renaissance thinking.",
    img:  "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "Kyoto, Japan",          label: "7-Day Summit", dates: "May 2027",
    desc: "Zen, tea ceremony, and founder strategy.",
    img:  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=400&fit=crop&auto=format",
  },
  {
    name: "The Maldives",          label: "3-Day Summit", dates: "Sep 2027",
    desc: "Overwater villas, coral reefs, and deep work with zero distractions.",
    img:  "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=400&fit=crop&auto=format",
  },
];

/* ── Scroll progress bar ─────────────────────────────────────── */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div style={{ scaleX, transformOrigin: "left", position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 999, background: EM(0.8) }} />
  );
}

/* ── Field ───────────────────────────────────────────────────── */
function Field({ label, type = "text", textarea = false }: { label: string; type?: string; textarea?: boolean }) {
  const [focused, setFocused] = useState(false);
  const [filled,  setFilled]  = useState(false);
  const base = "w-full bg-transparent border-b font-[family-name:var(--font-inter)] text-[14px] font-normal text-ink outline-none transition-colors duration-300 resize-none placeholder-transparent";
  const borderColor = focused ? "rgba(9,9,11,0.55)" : "rgba(9,9,11,0.13)";
  return (
    <div className="relative pt-5 pb-1">
      {textarea ? (
        <textarea rows={4} placeholder={label} className={`${base} pt-1 leading-[1.7]`} style={{ borderColor }}
          onFocus={() => setFocused(true)} onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)} />
      ) : (
        <input type={type} placeholder={label} className={`${base} h-9 pt-1`} style={{ borderColor }}
          onFocus={() => setFocused(true)} onBlur={(e) => { setFocused(false); setFilled(e.target.value.length > 0); }}
          onChange={(e) => setFilled(e.target.value.length > 0)} />
      )}
      <label className="absolute left-0 font-[family-name:var(--font-inter)] font-medium tracking-[.14em] uppercase transition-all duration-250 pointer-events-none"
        style={{ fontSize: focused || filled ? "8.5px" : "11px", color: focused ? "rgba(9,9,11,0.55)" : filled ? "rgba(9,9,11,0.35)" : "rgba(9,9,11,0.28)", top: focused || filled ? 0 : textarea ? "24px" : "20px" }}>
        {label}
      </label>
      <motion.div className="absolute bottom-0 left-0 h-px" animate={{ width: focused ? "100%" : "0%" }} transition={{ duration: 0.35, ease: EXPO }} style={{ background: "#09090B" }} />
    </div>
  );
}

/* ── Checkbox ────────────────────────────────────────────────── */
function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-start gap-3 cursor-pointer select-none">
      <div onClick={onChange} className="w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all duration-200 mt-0.5"
        style={{ borderColor: checked ? "#09090B" : "rgba(9,9,11,0.22)", background: checked ? "#09090B" : "transparent" }}>
        {checked && (
          <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.18 }} width="9" height="9" viewBox="0 0 9 9" fill="none">
            <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        )}
      </div>
      <span className="font-[family-name:var(--font-inter)] text-[13.5px] leading-snug font-normal transition-colors duration-200" style={{ color: checked ? "#09090B" : "rgba(9,9,11,0.45)" }}>
        {label}
      </span>
    </label>
  );
}

/* ── Day row — own inView ────────────────────────────────────── */
function DayRow({ d, i }: { d: typeof DAYS[0]; i: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  return (
    <motion.div ref={ref}
      className="group grid lg:grid-cols-[140px_1fr_260px] gap-6 lg:gap-10 py-9 border-b relative cursor-default"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: i * 0.07, ease: EXPO }}
      whileHover={{ backgroundColor: EM(0.03) }}>
      {/* Animated left border */}
      <motion.div className="absolute left-0 top-0 w-px" style={{ background: EM(0.4) }}
        initial={{ height: 0 }} animate={inView ? { height: "100%" } : {}}
        transition={{ duration: 0.5, delay: i * 0.07 + 0.1, ease: EXPO }} />
      <div className="pl-4">
        <p className="font-[family-name:var(--font-urbanist)] font-semibold text-white text-[15px]">{d.day}</p>
        <p className="font-[family-name:var(--font-inter)] text-[11.5px] font-normal mt-0.5" style={{ color: EM(0.65) }}>{d.sub}</p>
      </div>
      <ul className="space-y-2.5">
        {d.bullets.map((b, bi) => (
          <li key={bi} className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.72] font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>
            <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: EM(0.45) }} />{b}
          </li>
        ))}
      </ul>
      <div className="flex items-start">
        <motion.div className="px-4 py-3 rounded-xl w-full transition-colors duration-300"
          style={{ background: EM(0.06), border: `1px solid ${EM(0.14)}` }}
          whileHover={{ backgroundColor: EM(0.11), borderColor: EM(0.28), y: -2 }}>
          <p className="font-[family-name:var(--font-inter)] text-[8.5px] font-medium tracking-[.18em] uppercase mb-1.5" style={{ color: EM(0.6) }}>Highlight</p>
          <p className="font-[family-name:var(--font-inter)] text-[12.5px] font-normal leading-snug" style={{ color: "rgba(255,255,255,0.68)" }}>{d.highlight}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Section label + expanding line ─────────────────────────── */
function SLabel({ text, inView, dark = true }: { text: string; inView: boolean; dark?: boolean }) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <motion.span className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase whitespace-nowrap"
        style={{ color: dark ? EM(0.55) : EML(0.38) }}
        initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.55, ease: EXPO }}>
        {text}
      </motion.span>
      <motion.div className="flex-1 h-px" style={{ background: dark ? EM(0.12) : EML(0.09) }}
        initial={{ scaleX: 0, transformOrigin: "left" }} animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.15, ease: EXPO }} />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function SpiritsOfHimalayasPage() {
  const heroRef       = useRef<HTMLElement>(null);
  const whatRef       = useRef<HTMLElement>(null);
  const warRef        = useRef<HTMLElement>(null);
  const highlightsRef = useRef<HTMLElement>(null);
  const itineraryRef  = useRef<HTMLElement>(null);
  const whoRef        = useRef<HTMLElement>(null);
  const investRef     = useRef<HTMLElement>(null);
  const inclusionsRef = useRef<HTMLElement>(null);
  const safetyRef     = useRef<HTMLElement>(null);
  const applyRef      = useRef<HTMLElement>(null);
  const upcomingRef   = useRef<HTMLElement>(null);

  const [privacy,      setPrivacy]      = useState(false);
  const [drinkingAge,  setDrinkingAge]  = useState(false);
  const [alcoholLevel, setAlcoholLevel] = useState<number | null>(null);
  const [submitted,    setSubmitted]    = useState(false);

  const { scrollYProgress: heroScroll    } = useScroll({ target: heroRef,    offset: ["start start", "end start"] });
  const { scrollYProgress: warScroll     } = useScroll({ target: warRef,     offset: ["start end", "end start"] });
  const { scrollYProgress: investScroll  } = useScroll({ target: investRef,  offset: ["start end", "end start"] });
  const { scrollYProgress: upcomingScroll} = useScroll({ target: upcomingRef,offset: ["start end", "end start"] });

  const heroOpacity   = useTransform(heroScroll,     [0, 0.85], [1, 0]);
  const heroY         = useTransform(heroScroll,     [0, 1],    ["0%", "12%"]);
  const heroImgY      = useTransform(heroScroll,     [0, 1],    ["0%", "22%"]);
  const warGlowY      = useTransform(warScroll,      [0, 1],    ["-15%", "25%"]);
  const investGlowY   = useTransform(investScroll,   [0, 1],    ["-10%", "22%"]);
  const upcomingGlowY = useTransform(upcomingScroll, [0, 1],    ["-10%", "18%"]);

  const whatInView       = useInView(whatRef,       { once: true, amount: 0.1  });
  const warInView        = useInView(warRef,        { once: true, amount: 0.1  });
  const highlightsInView = useInView(highlightsRef, { once: true, amount: 0.08 });
  const itineraryInView  = useInView(itineraryRef,  { once: true, amount: 0.06 });
  const whoInView        = useInView(whoRef,        { once: true, amount: 0.12 });
  const investInView     = useInView(investRef,     { once: true, amount: 0.1  });
  const inclusionsInView = useInView(inclusionsRef, { once: true, amount: 0.08 });
  const safetyInView     = useInView(safetyRef,     { once: true, amount: 0.3  });
  const applyInView      = useInView(applyRef,      { once: true, amount: 0.06 });
  const upcomingInView   = useInView(upcomingRef,   { once: true, amount: 0.1  });

  return (
    <motion.div className="min-h-screen overflow-x-hidden bg-surface" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EXPO }}>
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroImgY }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url('${HERO_IMG}')`, backgroundSize: "cover", backgroundPosition: "center 30%", scale: 1.12 }} />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(4,8,6,0.28) 0%, rgba(4,8,6,0.1) 35%, rgba(4,8,6,0.78) 72%, rgba(4,8,6,0.97) 100%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(4,8,6,0.55) 0%, transparent 60%)" }} />

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-20">
          <motion.p initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.26em] uppercase mb-10 flex items-center gap-3"
            style={{ color: EM(0.85) }}>
            <motion.span className="inline-block h-px" initial={{ width: 0 }} animate={{ width: 24 }} transition={{ duration: 0.6, delay: 0.2, ease: EXPO }} style={{ background: EM(0.6) }} />
            The Summit · Spirits of the Himalayas
          </motion.p>

          <div className="mb-8 max-w-4xl">
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.22, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] text-white"
                style={{ fontSize: "clamp(44px,6.5vw,96px)" }}>
                Five days in the hills.
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1 initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, delay: 0.34, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.02] tracking-[-0.045em] italic"
                style={{ fontSize: "clamp(44px,6.5vw,96px)", color: "rgba(255,255,255,0.38)" }}>
                One breakthrough in your business.
              </motion.h1>
            </div>
          </div>

          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.46, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[15.5px] leading-[1.8] font-normal max-w-[540px] mb-5"
            style={{ color: "rgba(255,255,255,0.6)" }}>
            A founder retreat in Himachal Pradesh that blends alcohol appreciation, culture, and a deep war room on your biggest growth glass ceiling.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.58 }}
            className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.2em] uppercase mb-10"
            style={{ color: "rgba(255,255,255,0.26)" }}>
            Kasauli · Mashobra · 5 days · 16–20 founders
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.65, ease: EXPO }}
            className="flex flex-wrap items-center gap-4">
            <a href="#apply"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-7 py-3.5 rounded-full transition-all duration-300"
              style={{ background: "rgba(255,255,255,0.96)", color: "#09090B" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,1)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.96)"}>
              Apply
            </a>
            <a href="#itinerary"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-7 py-3.5 rounded-full border transition-all duration-300 hover:text-white"
              style={{ borderColor: "rgba(255,255,255,0.22)", color: "rgba(255,255,255,0.6)" }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.4)"}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.22)"}>
              View Itinerary
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 1 }} className="mt-16 flex items-center gap-4">
            <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, ${EM(0.5)}, transparent)`, animation: "scroll-drip 2.4s ease-in-out infinite" }} />
            <span className="font-[family-name:var(--font-inter)] text-[9px] tracking-[.22em] uppercase" style={{ color: "rgba(255,255,255,0.28)" }}>Scroll</span>
          </motion.div>
        </motion.div>
      </section>

      {/* ── What Is This ─────────────────────────────────────── */}
      <section ref={whatRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="What Is This" inView={whatInView} dark={false} />
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24 mt-10">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={whatInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.08, ease: EXPO }}>
              <div className="overflow-hidden mb-6">
                <motion.h2 initial={{ y: "105%" }} animate={whatInView ? { y: "0%" } : {}} transition={{ duration: 0.85, delay: 0.14, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(24px,2.8vw,38px)", color: "#09090B" }}>
                  What is "Spirits of the Himalayas"?
                </motion.h2>
              </div>
              <motion.div className="h-px" initial={{ width: 0 }} animate={whatInView ? { width: 40 } : {}} transition={{ duration: 0.6, delay: 0.3, ease: EXPO }} style={{ background: EML(0.18) }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={whatInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.22, ease: EXPO }}
              className="space-y-5 font-[family-name:var(--font-inter)] text-[15.5px] leading-[1.85] font-normal" style={{ color: "#52525B" }}>
              <p>This edition of The Summit is a five-day immersion in Himachal Pradesh for founders who want to deepen their relationship with what's in their glass and with their own growth.</p>
              <p>Across two hill towns, you'll explore historic distilleries, fruit wines, and tribal spirits from the Kinnaur valleys, while working in a focused war room to break your growth glass ceiling and clear the bottlenecks that have held your business back.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── War Room ─────────────────────────────────────────── */}
      <section ref={warRef} className="relative overflow-hidden py-24 lg:py-32" style={{ background: "#06100D" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-25 pointer-events-none" />
        <motion.div className="absolute top-0 right-0 pointer-events-none" style={{ width: "45vw", height: "45vw", background: `radial-gradient(circle, ${EM(0.07)} 0%, transparent 65%)`, y: warGlowY }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="War Room" inView={warInView} />
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 mt-10 mb-14">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={warInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EXPO }}>
              <div className="overflow-hidden">
                <motion.h2 initial={{ y: "105%" }} animate={warInView ? { y: "0%" } : {}} transition={{ duration: 0.85, delay: 0.1, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.08] tracking-[-0.03em] text-white"
                  style={{ fontSize: "clamp(22px,2.6vw,36px)" }}>
                  Break Your Growth<br />Glass Ceiling
                </motion.h2>
              </div>
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={warInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.2, ease: EXPO }}
              className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.82] font-normal self-end"
              style={{ color: "rgba(255,255,255,0.4)" }}>
              Alongside the tastings and mountain air, this Summit runs a structured war room over four focused sessions — helping you surface the real constraints in your business, identify and clear the bottlenecks, and leave with a concrete roadmap you actually believe in.
            </motion.p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WAR_STEPS.map((s, i) => (
              <motion.div key={s.num}
                className="relative rounded-xl p-6 border overflow-hidden group"
                style={{ borderColor: EM(0.12), background: EM(0.04) }}
                initial={{ opacity: 0, y: 28 }} animate={warInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EXPO }}
                whileHover={{ y: -6, borderColor: EM(0.28), backgroundColor: EM(0.08), boxShadow: `0 14px 40px rgba(255,255,255,0.07)` }}>
                <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: `linear-gradient(to right, transparent, ${EM(0.4)}, transparent)` }} />
                <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.2em] uppercase mb-4" style={{ color: EM(0.55) }}>{s.num}</p>
                <p className="font-[family-name:var(--font-urbanist)] font-semibold text-white text-[16px] tracking-[-0.02em] mb-2">{s.title}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[1.72]" style={{ color: "rgba(255,255,255,0.36)" }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Highlights ───────────────────────────────────────── */}
      <section ref={highlightsRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="On This Summit" inView={highlightsInView} dark={false} />
          <div className="grid lg:grid-cols-[240px_1fr] gap-12 lg:gap-20 mt-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={highlightsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease: EXPO }}>
              <div className="overflow-hidden mb-3">
                <motion.h2 initial={{ y: "105%" }} animate={highlightsInView ? { y: "0%" } : {}} transition={{ duration: 0.85, delay: 0.1, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(22px,2.5vw,34px)", color: "#09090B" }}>
                  On this Summit
                </motion.h2>
              </div>
              <motion.p initial={{ opacity: 0 }} animate={highlightsInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.22 }}
                className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.7]" style={{ color: "#71717A" }}>
                Alcohol appreciation as a craft.<br />Growth as a practice.
              </motion.p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-x-12">
              {HIGHLIGHTS.map((h, i) => (
                <motion.div key={i} className="flex items-start gap-3 py-3.5 border-b" style={{ borderColor: "rgba(9,9,11,0.07)" }}
                  initial={{ opacity: 0, x: -10 }} animate={highlightsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.06 + i * 0.055, ease: EXPO }}
                  whileHover={{ x: 5, backgroundColor: EML(0.04) }}
                  style={{ borderRadius: "6px", paddingLeft: "2px", marginLeft: "-2px" }}>
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: EML(0.28) }} />
                  <p className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.72]" style={{ color: "#52525B" }}>{h}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5-Day Arc ────────────────────────────────────────── */}
      <section ref={itineraryRef} id="itinerary" className="relative overflow-hidden py-24 lg:py-32" style={{ background: "#06100D" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="The 5-Day Arc" inView={itineraryInView} />
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={itineraryInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.1, ease: EXPO }}
            className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.035em] text-white mt-4 mb-14"
            style={{ fontSize: "clamp(24px,2.8vw,40px)" }}>
            Five days. Every one counts.
          </motion.h2>
          <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {DAYS.map((d, i) => <DayRow key={d.day} d={d} i={i} />)}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={itineraryInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
            className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-8 pl-4" style={{ color: "rgba(255,255,255,0.2)" }}>
            Day 6 — Return to Delhi
          </motion.p>
        </div>
      </section>

      {/* ── Who It's For ─────────────────────────────────────── */}
      <section ref={whoRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="Who It's For" inView={whoInView} dark={false} />
          <div className="grid lg:grid-cols-[200px_1fr] gap-12 lg:gap-20 mt-10">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={whoInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EXPO }}>
              <div className="overflow-hidden">
                <motion.h2 initial={{ y: "105%" }} animate={whoInView ? { y: "0%" } : {}} transition={{ duration: 0.8, delay: 0.1, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(20px,2.2vw,30px)", color: "#09090B" }}>
                  Who this Summit is for
                </motion.h2>
              </div>
            </motion.div>
            <ul className="space-y-5">
              {WHO_FOR.map((w, i) => (
                <motion.li key={i} className="flex items-start gap-4 cursor-default"
                  initial={{ opacity: 0, x: -12 }} animate={whoInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.08 + i * 0.08, ease: EXPO }}
                  whileHover={{ x: 6 }}>
                  <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: EML(0.25) }} />
                  <p className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.78]" style={{ color: "#52525B" }}>{w}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Investment ───────────────────────────────────────── */}
      <section ref={investRef} className="relative overflow-hidden py-24 lg:py-32" style={{ background: "#06100D" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-25 pointer-events-none" />
        <motion.div className="absolute pointer-events-none" style={{ top: "5%", left: "50%", x: "-50%", width: "55vw", height: "38vw", background: `radial-gradient(ellipse, ${EM(0.07)} 0%, transparent 65%)`, y: investGlowY }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="Investment & Cohort" inView={investInView} />
          <motion.div initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-wrap gap-8 mt-6 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[12.5px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Edition: <span style={{ color: "rgba(255,255,255,0.62)" }}>The Summit: Spirits of the Himalayas (5 days)</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[12.5px]" style={{ color: "rgba(255,255,255,0.3)" }}>
              Cohort: <span style={{ color: "rgba(255,255,255,0.62)" }}>16–20 founders + 2 facilitators</span>
            </p>
          </motion.div>
          <div className="grid lg:grid-cols-2 gap-6 max-w-2xl">
            {/* Early Bird */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={investInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: EXPO }}
              whileHover={{ y: -6, scale: 1.02, borderColor: EM(0.35), backgroundColor: EM(0.07) }}
              className="rounded-2xl p-8 border relative overflow-hidden cursor-default transition-colors duration-300"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${EM(0.1)} 0%, transparent 70%)` }} />
              <motion.p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-8" style={{ color: EM(0.65) }}
                initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                Early Bird
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div initial={{ y: "110%" }} animate={investInView ? { y: "0%" } : {}} transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.08em] mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>from</p>
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white" style={{ fontSize: "clamp(32px,3.8vw,48px)" }}>₹1,00,000</span>
                </motion.div>
              </div>
              <motion.p className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-3 leading-[1.65]" style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.42 }}>
                per founder · limited seats
              </motion.p>
            </motion.div>
            {/* Standard */}
            <motion.div initial={{ opacity: 0, y: 32 }} animate={investInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.12, ease: EXPO }}
              whileHover={{ y: -6, scale: 1.02, borderColor: EM(0.35), backgroundColor: EM(0.07) }}
              className="rounded-2xl p-8 border relative overflow-hidden cursor-default transition-colors duration-300"
              style={{ borderColor: "rgba(255,255,255,0.08)", background: "transparent" }}>
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(ellipse 80% 40% at 50% 0%, ${EM(0.1)} 0%, transparent 70%)` }} />
              <motion.p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-8" style={{ color: "rgba(255,255,255,0.3)" }}
                initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }}>
                Standard
              </motion.p>
              <div className="overflow-hidden mb-1">
                <motion.div initial={{ y: "110%" }} animate={investInView ? { y: "0%" } : {}} transition={{ duration: 0.75, delay: 0.38, ease: EXPO }}>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.08em] mb-1" style={{ color: "rgba(255,255,255,0.28)" }}>from</p>
                  <span className="font-[family-name:var(--font-urbanist)] font-semibold leading-none text-white" style={{ fontSize: "clamp(32px,3.8vw,48px)" }}>₹1,25,000</span>
                </motion.div>
              </div>
              <motion.p className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-3" style={{ color: "rgba(255,255,255,0.28)" }}
                initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.5 }}>
                per founder
              </motion.p>
            </motion.div>
          </div>
          <motion.p initial={{ opacity: 0 }} animate={investInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.55 }}
            className="font-[family-name:var(--font-inter)] text-[11.5px] font-normal mt-5" style={{ color: "rgba(255,255,255,0.2)" }}>
            Single-occupancy rooms available at an additional cost.
          </motion.p>
        </div>
      </section>

      {/* ── Inclusions ───────────────────────────────────────── */}
      <section ref={inclusionsRef} className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute top-0 inset-x-0 h-24 pointer-events-none z-10" style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0), rgba(250,250,250,1))" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <SLabel text="What's Included" inView={inclusionsInView} dark={false} />
              <ul className="mt-8 space-y-4">
                {INCLUDED.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-3.5 cursor-default"
                    initial={{ opacity: 0, x: -12 }} animate={inclusionsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.04 + i * 0.06, ease: EXPO }}
                    whileHover={{ x: 5 }}>
                    <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: EML(0.3) }} />
                    <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.72]" style={{ color: "#52525B" }}>{item}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <SLabel text="What's Not Included" inView={inclusionsInView} dark={false} />
              <ul className="mt-8 space-y-4">
                {EXCLUDED.map((item, i) => (
                  <motion.li key={i} className="flex items-start gap-3.5 cursor-default"
                    initial={{ opacity: 0, x: -12 }} animate={inclusionsInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.22 + i * 0.06, ease: EXPO }}
                    whileHover={{ x: 5 }}>
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "rgba(9,9,11,0.18)" }} />
                    <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.72]" style={{ color: "#71717A" }}>{item}</p>
                  </motion.li>
                ))}
              </ul>
              <motion.p initial={{ opacity: 0 }} animate={inclusionsInView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.7 }}
                className="font-[family-name:var(--font-inter)] text-[12px] font-normal mt-6" style={{ color: "rgba(9,9,11,0.3)" }}>
                Single room pricing on request. Additional meals and extras payable directly to providers.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Alcohol Safety ───────────────────────────────────── */}
      <section ref={safetyRef} className="bg-surface border-t py-14" style={{ borderColor: "rgba(9,9,11,0.06)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[260px_1fr] gap-10 items-start">
            <motion.p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase pt-0.5" style={{ color: EML(0.38) }}
              initial={{ opacity: 0 }} animate={safetyInView ? { opacity: 1 } : {}} transition={{ duration: 0.55 }}>
              Alcohol, safely and respectfully
            </motion.p>
            <motion.p className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.82] font-normal" style={{ color: "#52525B" }}
              initial={{ opacity: 0, y: 10 }} animate={safetyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}>
              This Summit is built around appreciation, not excess. Tastings are structured, paced, and always optional. We respect local laws, cultural contexts, and individual limits. If you don't drink, you're still welcome — you'll be fully included in the cultural, culinary, and business parts of the experience, and we'll adapt tastings where needed.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── Apply ────────────────────────────────────────────── */}
      <section ref={applyRef} id="apply" className="relative bg-surface overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)", backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)" }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10">
          <motion.div className="mb-14" initial={{ opacity: 0, y: 20 }} animate={applyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EXPO }}>
            <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase mb-5" style={{ color: "rgba(9,9,11,0.32)" }}>Apply</p>
            <div className="overflow-hidden mb-3">
              <motion.h2 initial={{ y: "105%" }} animate={applyInView ? { y: "0%" } : {}} transition={{ duration: 0.85, delay: 0.08, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.03em]"
                style={{ fontSize: "clamp(24px,2.8vw,40px)", color: "#09090B" }}>
                Apply for Spirits of the Himalayas
              </motion.h2>
            </div>
            <motion.p initial={{ opacity: 0 }} animate={applyInView ? { opacity: 1 } : {}} transition={{ duration: 0.65, delay: 0.2 }}
              className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.76] font-normal max-w-[500px]"
              style={{ color: "rgba(9,9,11,0.42)" }}>
              This edition is capped at 16–20 founders. Share a few details and we'll get back to you with next steps. No payment at this stage.
            </motion.p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EXPO }} className="py-16 text-center">
                <p className="font-[family-name:var(--font-urbanist)] font-medium text-[22px] tracking-[-0.02em] mb-3" style={{ color: "#09090B" }}>Application received.</p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75]" style={{ color: "#71717A" }}>We'll reach out within 5 working days with next steps.</p>
              </motion.div>
            ) : (
              <motion.form key="form" initial={{ opacity: 0, y: 16 }} animate={applyInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay: 0.3, ease: EXPO }}
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
                  <Field label="Full Name" />
                  <Field label="Email" type="email" />
                  <Field label="Mobile" type="tel" />
                  <Field label="City" />
                  <Field label="Company" />
                  <Field label="Website / LinkedIn" />
                </div>

                {/* Alcohol familiarity */}
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.2em] uppercase mb-4" style={{ color: "rgba(9,9,11,0.35)" }}>
                    How familiar are you with alcohol (1–5)? It's okay if you're a beginner.
                  </p>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setAlcoholLevel(n)}
                        className="w-10 h-10 rounded-full border font-[family-name:var(--font-inter)] text-[13px] font-medium transition-all duration-200"
                        style={{
                          borderColor: alcoholLevel === n ? "#09090B" : "rgba(9,9,11,0.18)",
                          background: alcoholLevel === n ? "#09090B" : "transparent",
                          color: alcoholLevel === n ? "#fff" : "rgba(9,9,11,0.55)",
                        }}>
                        {n}
                      </button>
                    ))}
                    <span className="self-center font-[family-name:var(--font-inter)] text-[11px] ml-2" style={{ color: "rgba(9,9,11,0.3)" }}>
                      {alcoholLevel === 1 ? "Beginner" : alcoholLevel === 5 ? "Connoisseur" : ""}
                    </span>
                  </div>
                </div>

                <Field label="Any dietary or alcohol-related preferences we should know about?" textarea />
                <Field label="What breakthrough are you seeking from this Summit?" textarea />

                <Checkbox label="I confirm I am of legal drinking age (21+ or as applicable in my state)." checked={drinkingAge} onChange={() => setDrinkingAge(!drinkingAge)} />
                <Checkbox label="I agree to 108 Rays' Privacy Policy and Terms." checked={privacy} onChange={() => setPrivacy(!privacy)} />

                <div className="pt-2">
                  <button type="submit" disabled={!privacy || !drinkingAge}
                    className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full bg-ink text-white transition-all duration-300 hover:bg-ink/85 disabled:opacity-30 disabled:cursor-not-allowed">
                    Submit Application
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── More Upcoming Summits ────────────────────────────── */}
      <section ref={upcomingRef} className="relative overflow-hidden py-20 lg:py-28" style={{ background: "#06100D" }}>
        <div className="absolute inset-0 grid-bg-dark opacity-20 pointer-events-none" />
        <motion.div className="absolute top-0 left-1/2 pointer-events-none" style={{ x: "-50%", width: "60vw", height: "40vw", background: `radial-gradient(ellipse, ${EM(0.06)} 0%, transparent 65%)`, y: upcomingGlowY }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <SLabel text="More Upcoming Summits" inView={upcomingInView} />
          <motion.h3 initial={{ opacity: 0, y: 16 }} animate={upcomingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EXPO }}
            className="font-[family-name:var(--font-urbanist)] font-medium tracking-[-0.03em] text-white mt-3 mb-12"
            style={{ fontSize: "clamp(20px,2.2vw,30px)" }}>
            Where we're going next.
          </motion.h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {UPCOMING_CARDS.map((c, i) => (
              <motion.div key={c.name} className="relative rounded-2xl overflow-hidden group cursor-default" style={{ aspectRatio: "4/3" }}
                initial={{ opacity: 0, y: 24 }} animate={upcomingInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease: EXPO }}
                whileHover={{ y: -5, boxShadow: `0 20px 50px rgba(255,255,255,0.07)` }}>
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${c.img}')` }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(4,8,6,0.18) 0%, rgba(4,8,6,0.88) 100%)" }} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 100%, ${EM(0.1)} 0%, transparent 65%)` }} />
                {/* Bottom border reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" style={{ background: `linear-gradient(to right, ${EM(0.6)}, ${EM(0.2)})` }} />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.18em] uppercase mb-1" style={{ color: EM(0.75) }}>{c.dates} · {c.label}</p>
                  <p className="font-[family-name:var(--font-urbanist)] font-semibold text-white text-[17px] tracking-[-0.02em] mb-1">{c.name}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] leading-snug mb-3" style={{ color: "rgba(255,255,255,0.36)" }}>{c.desc}</p>
                  <span className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.16em] uppercase px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.28)", border: "1px solid rgba(255,255,255,0.08)" }}>Coming Soon</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
