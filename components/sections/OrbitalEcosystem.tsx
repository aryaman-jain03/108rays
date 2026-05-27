"use client";
import { motion } from "framer-motion";
import { Compass, Users, Mountain } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id:         1,
    title:      "The Compass",
    date:       "Level 01",
    content:    "Growth sessions and curated learning formats that give founders clarity, direction, and momentum toward 10x.",
    category:   "Entry",
    icon:       Compass,
    relatedIds: [2],
    status:     "completed" as const,
    energy:     88,
  },
  {
    id:         2,
    title:      "The Board of Nine",
    date:       "Level 02",
    content:    "Intimate peer advisory boards of 9 founders. Structured, recurring, and designed for real breakthroughs.",
    category:   "Core",
    icon:       Users,
    relatedIds: [1, 3],
    status:     "in-progress" as const,
    energy:     95,
  },
  {
    id:         3,
    title:      "The Summit",
    date:       "Level 03",
    content:    "Curated founder retreats and experiences crafted for depth, connection, and breakthrough moments.",
    category:   "Premium",
    icon:       Mountain,
    relatedIds: [2],
    status:     "pending" as const,
    energy:     100,
  },
];

export default function OrbitalEcosystem() {
  return (
    <section className="relative bg-ink py-24 overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: "linear-gradient(rgba(200,169,110,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,.04) 1px,transparent 1px)",
             backgroundSize: "80px 80px",
             maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%,black 40%,transparent 100%)",
           }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: [0.19, 1, 0.22, 1] }}
          className="text-center mb-4"
        >
          <p className="font-[family-name:var(--font-montserrat)] text-[10.5px] font-bold tracking-[.26em] text-gold mb-4">
            THE ECOSYSTEM
          </p>
          <h2
            className="font-[family-name:var(--font-montserrat)] font-black leading-[1.06] tracking-[-0.025em] text-white"
            style={{ fontSize: "clamp(34px,3.8vw,50px)" }}
          >
            Three orbits. One circle.
          </h2>
        </motion.div>
      </div>

      <RadialOrbitalTimeline timelineData={timelineData} />
    </section>
  );
}
