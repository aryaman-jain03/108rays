"use client";
import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import { Compass, Users, Mountain } from "lucide-react";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

/* ── Orbit geometry ─────────────────────────────────────────── */
const TILT  = 65 * (Math.PI / 180);
const PERSP = 520;
const R     = 172;                    // slightly larger orbit radius
const B     = R * Math.cos(TILT);     // SVG ellipse semi-minor

const BASE  = [90, 210, 330];         // node start angles (SVG y-down)

function orbitPos(baseAngle: number, rotDeg: number) {
  const rad   = ((baseAngle + rotDeg) * Math.PI) / 180;
  const x     = R * Math.cos(rad);
  const ySrc  = R * Math.sin(rad);
  const y3d   = ySrc * Math.cos(TILT);
  const z3d   = ySrc * Math.sin(TILT);
  const sf    = PERSP / (PERSP - z3d);
  const depth = (z3d / (R * Math.sin(TILT)) + 1) / 2; // 0=back, 1=front
  return { x: x * sf, y: y3d * sf, depth };
}

/* ── Node data ───────────────────────────────────────────────── */
const NODES = [
  { id: 0, Icon: Compass,  level: "Level 01", title: "The Compass",
    desc: "Growth sessions and curated learning formats that give founders clarity, direction, and momentum toward 10x.",
    href: "/compass" },
  { id: 1, Icon: Users,    level: "Level 02", title: "The Board of Nine",
    desc: "Intimate peer advisory boards of 9 founders. Structured, recurring, and designed for real breakthroughs.",
    href: "/board-of-nine" },
  { id: 2, Icon: Mountain, level: "Level 03", title: "The Summit",
    desc: "Curated founder retreats and experiences crafted for depth, connection, and breakthrough moments.",
    href: "/summit" },
];

/* ─────────────────────────────────────────────────────────────── */
export default function WhatIs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Raw rotation: 0° → -240° over full scroll */
  const rotRaw = useTransform(scrollYProgress, [0, 1], [0, -240]);

  /* Spring-smooth the rotation — makes the orbit glide, not snap */
  const rotMV = useSpring(rotRaw, { stiffness: 85, damping: 22, mass: 0.7 });

  /* Active index from raw progress (not spring — we want instant text switch) */
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(Math.floor(v * 3), 2));
  });

  /* ── Per-node MotionValues (hooks must be at top level, not in a loop) ── */
  /* These update the DOM directly — zero React re-renders for orbit motion */
  const n0left    = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[0], d).x}px)`);
  const n0top     = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[0], d).y}px)`);
  const n0opacity = useTransform(rotMV, (d) => 0.22 + 0.78 * orbitPos(BASE[0], d).depth);

  const n1left    = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[1], d).x}px)`);
  const n1top     = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[1], d).y}px)`);
  const n1opacity = useTransform(rotMV, (d) => 0.22 + 0.78 * orbitPos(BASE[1], d).depth);

  const n2left    = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[2], d).x}px)`);
  const n2top     = useTransform(rotMV, (d) => `calc(50% + ${orbitPos(BASE[2], d).y}px)`);
  const n2opacity = useTransform(rotMV, (d) => 0.22 + 0.78 * orbitPos(BASE[2], d).depth);

  const nodeMotion = [
    { left: n0left, top: n0top, opacity: n0opacity },
    { left: n1left, top: n1top, opacity: n1opacity },
    { left: n2left, top: n2top, opacity: n2opacity },
  ];

  const active     = NODES[activeIdx];
  const ActiveIcon = active.Icon;


  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* ── Sticky viewport ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        {/* Dot-grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle, rgba(9,9,11,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 100%)",
        }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

            {/* ── LEFT ──────────────────────────────────────── */}
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.22em] text-accent/75 uppercase mb-5">
                What is 108 Rays?
              </p>
              <h2
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.1] tracking-[-0.035em] text-ink mb-10"
                style={{ fontSize: "clamp(30px,3.4vw,46px)" }}
              >
                More than a network.<br />A circle that<br />compounds.
              </h2>

              {/* Animated info panel */}
              <div className="relative min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5, ease: EXPO }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: "linear-gradient(135deg,#18181B,#09090B)" }}
                      >
                        <ActiveIcon size={16} className="text-white" strokeWidth={1.8} />
                      </div>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.2em] text-accent/55 uppercase">
                        {active.level}
                      </span>
                    </div>

                    <h3
                      className="font-[family-name:var(--font-urbanist)] font-semibold text-ink tracking-[-0.025em] leading-snug mb-3"
                      style={{ fontSize: "clamp(22px,2.2vw,28px)" }}
                    >
                      {active.title}
                    </h3>

                    {/* Explicit color — text-muted resolves to near-white in this theme */}
                    <p
                      className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.78] font-normal mb-6"
                      style={{ color: "#52525B" }}
                    >
                      {active.desc}
                    </p>

                    <a
                      href={active.href}
                      className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11.5px] font-semibold tracking-[.12em] uppercase px-5 py-2.5 rounded-full border border-ink/15 text-ink hover:bg-ink hover:text-white hover:border-ink transition-all duration-300 group w-fit"
                    >
                      Explore {active.title}
                      <span className="transition-transform duration-300 group-hover:translate-x-1 inline-block">→</span>
                    </a>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress pills */}
              <div className="flex items-center gap-3 mt-8">
                {NODES.map((_, i) => (
                  <motion.div
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    animate={{ width: i === activeIdx ? 28 : 8, opacity: i === activeIdx ? 1 : 0.28 }}
                    transition={{ duration: 0.38 }}
                    className="h-[7px] rounded-full bg-accent cursor-pointer"
                    whileHover={{ opacity: 0.7 }}
                  />
                ))}
                <span className="ml-2 font-[family-name:var(--font-inter)] text-[11px] tracking-wide"
                      style={{ color: "#A1A1AA" }}>
                  scroll to explore
                </span>
              </div>
            </div>

            {/* ── RIGHT: 3D orbit ──────────────────────────── */}
            <div className="flex items-center justify-center">
              <div className="relative" style={{ width: 420, height: 420, overflow: "visible" }}>

                {/* SVG orbit rings */}
                <svg
                  className="absolute inset-0"
                  width="420" height="420"
                  viewBox="-220 -220 440 440"
                  style={{ overflow: "visible" }}
                >
                  {/* Outer ambient ring */}
                  <ellipse cx="0" cy="0" rx={R + 36} ry={(R + 36) * Math.cos(TILT)}
                    fill="none" stroke="rgba(9,9,11,0.05)" strokeWidth="1" />
                  {/* Back half — dashed */}
                  <path
                    d={`M ${-R},0 A ${R},${B.toFixed(2)} 0 0 0 ${R},0`}
                    fill="none" stroke="rgba(9,9,11,0.12)" strokeWidth="1.5"
                    strokeDasharray="4 9" strokeLinecap="round"
                  />
                  {/* Front half — solid */}
                  <path
                    d={`M ${-R},0 A ${R},${B.toFixed(2)} 0 0 1 ${R},0`}
                    fill="none" stroke="rgba(9,9,11,0.32)" strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Centre orb */}
                  <circle cx="0" cy="0" r="10"
                    fill="none" stroke="rgba(9,9,11,0.18)" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="5" fill="#09090B" />
                  <circle cx="0" cy="0" r="5" fill="#09090B" opacity="0.35"
                    className="animate-ping" />
                </svg>

                {/* Nodes — positions driven by MotionValues, no React re-renders */}
                {NODES.map((node, i) => {
                  const { Icon }  = node;
                  const mv        = nodeMotion[i];
                  const isActive  = i === activeIdx;

                  return (
                    <motion.div
                      key={node.id}
                      onClick={() => setActiveIdx(i)}
                      style={{
                        position: "absolute",
                        left: mv.left,
                        top:  mv.top,
                        opacity: mv.opacity,
                        translateX: "-50%",
                        translateY: "-50%",
                        zIndex: isActive ? 50 : 10,
                        cursor: "pointer",
                      }}
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.22 }}
                    >
                      {/* Glow bloom on active */}
                      {isActive && (
                        <div className="absolute rounded-full pointer-events-none" style={{
                          inset: -18,
                          background: "radial-gradient(circle, rgba(9,9,11,0.08) 0%, transparent 68%)",
                          animation: "orb-breathe 2.8s ease-in-out infinite",
                        }} />
                      )}

                      {/* Node disc */}
                      <motion.div
                        className="rounded-full flex items-center justify-center"
                        animate={{
                          width:     isActive ? 50 : 36,
                          height:    isActive ? 50 : 36,
                          boxShadow: isActive
                            ? "0 8px 28px rgba(9,9,11,0.22)"
                            : "0 2px 10px rgba(0,0,0,0.08)",
                        }}
                        transition={{ duration: 0.45, ease: EXPO }}
                        style={{
                          background: isActive
                            ? "linear-gradient(135deg,#18181B,#09090B)"
                            : "rgba(255,255,255,0.96)",
                          border: isActive ? "none" : "1.5px solid rgba(9,9,11,0.15)",
                        }}
                      >
                        <motion.div
                          animate={{ scale: isActive ? 1 : 0.85 }}
                          transition={{ duration: 0.45, ease: EXPO }}
                        >
                          <Icon
                            size={isActive ? 20 : 15}
                            style={{ color: isActive ? "#fff" : "#09090B", strokeWidth: 1.8 }}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Label */}
                      <motion.div
                        className="absolute left-1/2 whitespace-nowrap font-[family-name:var(--font-inter)]"
                        animate={{
                          top:      isActive ? "calc(100% + 10px)" : "calc(100% + 7px)",
                          fontSize: isActive ? "12px" : "10px",
                          fontWeight: isActive ? 600 : 400,
                          color:    isActive ? "#09090B" : "rgba(9,9,11,0.42)",
                          translateX: "-50%",
                        }}
                        transition={{ duration: 0.45, ease: EXPO }}
                        style={{ letterSpacing: "0.03em" }}
                      >
                        {node.title}
                      </motion.div>
                    </motion.div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
