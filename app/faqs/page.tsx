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
import { Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const FAQS = [
  {
    category: "Eligibility",
    items: [
      {
        q: "Is 108 Rays right for me?",
        a: "108 Rays is designed for founders building products, services, D2C, SaaS, and more, typically targeting the multi-crore revenue range, who want deeper conversations, peer advisory, and curated experiences.",
      },
      {
        q: "Do I have to be at a specific revenue level?",
        a: "We tend to work best with founders in the ₹3–10 Cr range and above, but we look at intent and fit more than just numbers.",
      },
      {
        q: "Can non-founders apply?",
        a: "108 Rays is designed primarily for founders. In select cases, senior leaders with strong strategic ownership may be considered for certain experiences based on fit and internal evaluation.",
      },
    ],
  },
  {
    category: "Offerings",
    items: [
      {
        q: "What's the difference between The Compass, The Board of Nine, and The Summit?",
        a: "The Compass is your monthly growth and network session. The Board of Nine is an intimate peer advisory board. The Summit is an immersive retreat designed for step-change breakthroughs.",
      },
      {
        q: "Can I join directly into The Board of Nine or The Summit?",
        a: "You're welcome to apply directly to the Board of Nine or The Summit. The selection is always based on fit and our internal evaluation, and exploring The Compass first helps us get to know you better and meaningfully increases your chances of being approved for these deeper offerings.",
      },
    ],
  },
  {
    category: "Payments & Logistics",
    items: [
      {
        q: "How does payment work?",
        a: "For The Compass, you register and pay online using our payment gateway. For The Board of Nine and The Summit, you apply first; payment happens later after acceptance.",
      },
      {
        q: "What is the 108 Rays Founder Card?",
        a: "It's a physical card we give to our paying members that unlocks benefits at selected partners such as cafés, coworking spaces, hotels and more!",
      },
      {
        q: "Is 108 Rays affiliated with any organisation?",
        a: "108 Rays is an initiative led by Raycreate. We also collaborate with SMEs, experience providers and partner venues.",
      },
      {
        q: "Is there an online community or login area?",
        a: "Right now, 108 Rays is focused on in-person and high-touch experiences. Member logins and digital layers may be added later.",
      },
    ],
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
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 999,
        background: "#09090B",
      }}
    />
  );
}

/* ── Single FAQ item ─────────────────────────────────────────── */
function FaqItem({
  q,
  a,
  index,
  groupInView,
}: {
  q: string;
  a: string;
  index: number;
  groupInView: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={groupInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: EXPO }}
      className="border-b"
      style={{ borderColor: "rgba(9,9,11,0.08)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span
          className="font-[family-name:var(--font-urbanist)] font-medium leading-snug transition-colors duration-200 group-hover:text-accent"
          style={{ fontSize: "clamp(15px,1.4vw,18px)", color: "#09090B" }}
        >
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: EXPO }}
          className="flex-shrink-0 mt-1 text-ink/30 group-hover:text-ink/60 transition-colors duration-200"
        >
          <Plus size={18} strokeWidth={1.5} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.38, ease: EXPO }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.82] font-normal pb-7"
              style={{ color: "#71717A" }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── FAQ group ───────────────────────────────────────────────── */
function FaqGroup({
  category,
  items,
  groupIndex,
}: {
  category: string;
  items: (typeof FAQS)[0]["items"];
  groupIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="mb-16 lg:mb-20">
      {/* Category label */}
      <motion.div
        className="flex items-center gap-4 mb-8"
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: groupIndex * 0.06, ease: EXPO }}
      >
        <span
          className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.22em] uppercase"
          style={{ color: "rgba(9,9,11,0.32)" }}
        >
          {category}
        </span>
        <div className="flex-1 h-px" style={{ background: "rgba(9,9,11,0.07)" }} />
      </motion.div>

      {/* Items */}
      <div>
        {items.map((item, i) => (
          <FaqItem
            key={item.q}
            q={item.q}
            a={item.a}
            index={i}
            groupInView={inView}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function FaqsPage() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "14%"]);

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden bg-surface"
      style={{ scrollBehavior: "smooth" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center overflow-hidden bg-ink-2"
        style={{ minHeight: "56vh" }}
      >
        {/* Grid bg */}
        <div className="absolute inset-0 grid-bg-dark opacity-50 pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(255,255,255,0.032) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 w-full max-w-4xl mx-auto px-6 lg:px-10 pt-36 pb-20 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.24em] text-white/38 uppercase mb-9 flex items-center gap-3"
          >
            <span className="inline-block w-6 h-px bg-white/20" />
            FAQs
            <span className="inline-block w-6 h-px bg-white/20" />
          </motion.p>

          {/* Headline */}
          <div className="overflow-hidden mb-6 w-full">
            <motion.h1
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
              className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.04em] text-white"
              style={{ fontSize: "clamp(14px,5.5vw,88px)" }}
            >
              Questions, answered.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.38, ease: EXPO }}
            className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.76] font-normal text-white/38 max-w-[420px]"
          >
            Quick answers on eligibility, selection, payments, and what to
            expect.
          </motion.p>
        </motion.div>


      </section>

      {/* ── FAQ body ─────────────────────────────────────────── */}
      <section className="relative bg-surface overflow-hidden">
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(9,9,11,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        {/* Smooth dark→light edge blend */}
        <div
          className="absolute top-0 inset-x-0 h-16 pointer-events-none z-10"
          style={{ background: "linear-gradient(to bottom, rgba(250,250,250,0.0), rgba(250,250,250,1))" }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
          {FAQS.map((group, i) => (
            <FaqGroup
              key={group.category}
              category={group.category}
              items={group.items}
              groupIndex={i}
            />
          ))}

          {/* Still have questions CTA */}
          <motion.div
            className="mt-4 pt-16 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, ease: EXPO }}
          >
            <div
              className="w-px h-10 mb-8"
              style={{ background: "linear-gradient(to bottom, rgba(9,9,11,0.12), transparent)" }}
            />
            <p
              className="font-[family-name:var(--font-inter)] text-[13px] font-normal tracking-[.01em] mb-6"
              style={{ color: "rgba(9,9,11,0.38)" }}
            >
              Still have questions?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-6 py-3 rounded-full border border-ink/18 text-ink transition-all duration-300 hover:bg-ink hover:text-white hover:border-ink"
            >
              Get in touch
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
