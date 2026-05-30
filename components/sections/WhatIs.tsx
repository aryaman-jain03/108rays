"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const PILLARS = [
  { num: "01", title: "Curated peers",      desc: "Serious founders, not mass signups." },
  { num: "02", title: "Structured formats", desc: "Clear agendas, not random meetups." },
  { num: "03", title: "Real outcomes",      desc: "Better decisions, better systems, a better life." },
];

export default function WhatIs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* Parallax: watermark drifts left as you scroll */
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["8%", "-6%"]);
  /* Left column rises slightly */
  const leftY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 lg:py-44 overflow-hidden bg-surface">

      {/* Watermark — parallax drift */}
      <motion.span
        aria-hidden
        style={{ x: watermarkX, fontSize: "clamp(180px,28vw,400px)", letterSpacing: "-0.06em" }}
        className="pointer-events-none select-none absolute right-0 top-1/2 -translate-y-1/2 font-[family-name:var(--font-urbanist)] font-bold leading-none text-ink/[0.03]"
      >
        108
      </motion.span>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT ── subtle parallax lift */}
          <motion.div style={{ y: leftY }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: EXPO }}
              className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-accent/75 uppercase mb-6"
            >
              What is 108 Rays?
            </motion.p>

            {/* Headline — stagger via parent variants */}
            <motion.div
              className="mb-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{ show: { transition: { staggerChildren: 0.09 } } }}
            >
              {["More than", "a network.", "A circle that", "compounds."].map((line, i) => (
                <div key={line} className="overflow-hidden leading-[1.15]">
                  <motion.span
                    variants={{
                      hidden: { y: "105%" },
                      show:   { y: "0%", transition: { duration: 0.72, ease: EXPO } },
                    }}
                    className={`block font-[family-name:var(--font-urbanist)] font-medium tracking-[-0.04em]${i >= 2 ? " text-accent-gradient" : " text-ink"}`}
                    style={{ fontSize: "clamp(30px,3.8vw,54px)" }}
                  >
                    {line}
                  </motion.span>
                </div>
              ))}
            </motion.div>

            {/* Rule animates width */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.35, ease: EXPO }}
              className="h-px bg-ink/20 mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, delay: 0.45, ease: EXPO }}
              className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.85] font-normal max-w-[420px]"
              style={{ color: "#52525B" }}
            >
              108 Rays is a curated ecosystem for founders who want more than another
              networking group. We bring together ambitious founders in intimate formats
              that combine learning, peer advisory, and experiences that create real
              breakthroughs.
            </motion.p>
          </motion.div>

          {/* ── RIGHT: pillars ── */}
          <div className="lg:pt-[72px]">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, delay: i * 0.13, ease: EXPO }}
                whileHover="hover"
                className="group"
              >
                {/* Animated top rule — expands on hover */}
                <div className="relative w-full h-px bg-ink/10 mb-6 overflow-hidden">
                  <motion.div
                    variants={{ hover: { scaleX: 1 } }}
                    initial={{ scaleX: 0 }}
                    transition={{ duration: 0.5, ease: EXPO }}
                    className="absolute inset-0 bg-ink/30 origin-left"
                    style={{ transformOrigin: "left" }}
                  />
                </div>

                <div className="flex items-start gap-6 pb-8">
                  {/* Number — slides right on hover */}
                  <motion.span
                    variants={{ hover: { x: 4, color: "#09090B" } }}
                    transition={{ duration: 0.35, ease: EXPO }}
                    className="font-[family-name:var(--font-urbanist)] font-semibold leading-none flex-shrink-0 text-ink/15"
                    style={{ fontSize: "clamp(28px,2.8vw,38px)", letterSpacing: "-0.04em", marginTop: "2px" }}
                  >
                    {p.num}
                  </motion.span>

                  <div>
                    {/* Title — shifts up subtly on hover */}
                    <motion.h3
                      variants={{ hover: { y: -2 } }}
                      transition={{ duration: 0.35, ease: EXPO }}
                      className="font-[family-name:var(--font-urbanist)] font-semibold text-ink tracking-[-0.02em] leading-snug mb-2"
                      style={{ fontSize: "clamp(18px,1.6vw,22px)" }}
                    >
                      {p.title}
                    </motion.h3>

                    {/* Description — fades in more on hover */}
                    <motion.p
                      variants={{ hover: { opacity: 1, y: 0 } }}
                      initial={{ opacity: 0.7, y: 2 }}
                      transition={{ duration: 0.35, ease: EXPO }}
                      className="font-[family-name:var(--font-inter)] text-[14.5px] leading-[1.72] font-normal"
                      style={{ color: "#71717A" }}
                    >
                      {p.desc}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Bottom rule */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="w-full h-px bg-ink/10"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
