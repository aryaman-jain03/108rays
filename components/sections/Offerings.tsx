"use client";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Compass, Users, Mountain } from "lucide-react";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const offerings = [
  {
    num: "01", Icon: Compass,
    title:    "The Compass",
    sublabel: "Growth & Network Sessions",
    oneliner: "Clarity. Growth. Network.",
    desc:     "Monthly masterclasses and curated connections for ambitious founders.",
    img:      "https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=280&fit=crop&auto=format",
    cta:      "Join Now",
    href:     "/compass",
  },
  {
    num: "02", Icon: Users,
    title:    "The Board of Nine",
    sublabel: "Peer Advisory for Growth",
    oneliner: "Your personal board, without giving up equity.",
    desc:     "Monthly peer advisory boards of nine founders for deep problem-solving and accountability.",
    img:      "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=600&h=280&fit=crop&auto=format",
    cta:      "Apply",
    href:     "/board-of-nine",
  },
  {
    num: "03", Icon: Mountain,
    title:    "The Summit",
    sublabel: "Curated Founder Experiences",
    oneliner: "Three to seven days. One breakthrough.",
    desc:     "Immersive retreats that blend curated founder experiences, deep war rooms, and wellness.",
    img:      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=280&fit=crop&auto=format",
    cta:      "Apply",
    href:     "/summit",
  },
];

export default function Offerings() {
  const title = (
    <div className="text-left max-w-7xl mx-auto px-6 lg:px-10 w-full">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EXPO }}
        className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-accent/75 uppercase mb-4"
      >
        Three ways to plug in
      </motion.p>
      <div className="flex items-end justify-between gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: EXPO, delay: 0.08 }}
          className="font-[family-name:var(--font-urbanist)] font-medium tracking-[-0.035em] leading-[1.08] text-ink"
          style={{ fontSize: "clamp(32px,3.8vw,50px)" }}
        >
          Choose your altitude.
        </motion.h2>
        <motion.a
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          href="/offerings"
          className="hidden sm:flex items-center gap-2 font-[family-name:var(--font-inter)] text-[12px] font-medium tracking-[.08em] text-accent hover:gap-4 transition-all duration-300 pb-1 flex-shrink-0"
        >
          VIEW ALL <span>→</span>
        </motion.a>
      </div>
    </div>
  );

  const cards = (
    <div className="h-full w-full grid grid-cols-1 sm:grid-cols-3 gap-px bg-black/[0.04] p-3 sm:p-5">
      {offerings.map((o, i) => (
        <motion.div
          key={o.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.1, ease: EXPO }}
          className="group relative flex flex-col bg-white border border-black/[0.06] hover:border-black/20 transition-all duration-500 cursor-default overflow-hidden rounded-lg"
        >
          {/* Stock image */}
          <div className="relative h-40 overflow-hidden flex-shrink-0">
            <img
              src={o.img}
              alt={o.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20" />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6 sm:p-7">
            {/* Glow corner */}
            <div className="absolute top-0 right-0 w-36 h-36 rounded-full -translate-y-1/2 translate-x-1/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                 style={{ background: "radial-gradient(circle, rgba(9,9,11,.06) 0%, transparent 65%)" }} />

            <div className="flex items-center justify-between mb-4">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-normal tracking-[.2em] text-accent/40">
                {o.num}
              </span>
              {/* Icon badge */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                {/* Outer dashed ring — slow spin */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48" style={{ animation: "spin-cw 14s linear infinite" }}>
                  <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(9,9,11,0.14)" strokeWidth="1" strokeDasharray="4 5" strokeLinecap="round" />
                </svg>
                {/* Inner solid ring — counter-spin */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48" style={{ animation: "spin-ccw 9s linear infinite" }}>
                  <circle cx="24" cy="24" r="16" fill="none" stroke="rgba(9,9,11,0.10)" strokeWidth="1" strokeDasharray="2 8" strokeLinecap="round" />
                </svg>
                {/* Gradient filled disc */}
                <div
                  className="relative z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300"
                  style={{ background: "linear-gradient(135deg, #18181B 0%, #09090B 100%)" }}
                >
                  <o.Icon size={17} className="text-white" strokeWidth={1.8} />
                </div>
                {/* Glow behind disc */}
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"
                     style={{ background: "radial-gradient(circle, rgba(9,9,11,0.20) 0%, transparent 70%)" }} />
              </div>
            </div>

            <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.18em] text-accent/55 uppercase mb-1">
              {o.sublabel}
            </p>
            <h3 className="font-[family-name:var(--font-urbanist)] text-[20px] font-semibold text-ink leading-snug tracking-[-0.02em] mb-2">
              {o.title}
            </h3>
            <p className="font-[family-name:var(--font-urbanist)] text-[13.5px] font-medium text-ink/70 tracking-[-0.01em] mb-3 italic">
              {o.oneliner}
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] leading-[1.72] text-ink/50 font-normal mb-6">
              {o.desc}
            </p>

            <a
              href={o.href}
              className="mt-auto inline-flex items-center gap-2 self-start font-[family-name:var(--font-inter)] text-[12px] font-semibold tracking-[.12em] uppercase px-5 py-2.5 rounded-full border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink transition-all duration-300"
            >
              {o.cta} <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-accent/0 via-accent to-accent/0 transition-all duration-700 ease-out" />
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="offerings" className="relative bg-surface">
      <div className="absolute right-[-18%] top-[55%] -translate-y-1/2 w-[660px] h-[660px] rounded-full border border-accent/04 pointer-events-none"
           style={{ animation: "spin-cw 100s linear infinite" }} />
      <ContainerScroll titleComponent={title}>
        {cards}
      </ContainerScroll>
    </section>
  );
}
