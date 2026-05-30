"use client";
import { motion } from "framer-motion";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function Footer() {
  return (
    <footer className="relative bg-ink-2 pt-20 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[160px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.04) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.85, ease: EXPO }}
          className="grid lg:grid-cols-[1.65fr_1fr] gap-10 lg:gap-16 pb-14 border-b border-white/06"
        >
          {/* Brand */}
          <div>
            <p className="font-[family-name:var(--font-urbanist)] text-[17px] font-semibold tracking-[.2em] text-white uppercase mb-5">
              108 RAYS
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.78] text-white/60 max-w-[360px] mb-6 font-normal">
              A curated ecosystem for ambitious founders. Peer boards, growth
              sessions, and curated founder experiences.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[8.5px] font-normal tracking-[.28em] text-white/55 uppercase">
              Built for founders. Designed for visionaries worldwide
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { head: "OFFERINGS", links: [
                  { label: "The Compass",      href: "/compass"   },
                  { label: "The Board of Nine", href: "/board-of-nine" },
                  { label: "The Summit",        href: "/summit"    },
                  { label: "Founder Card",      href: "/founder-card" },
              ]},
              { head: "COMPANY", links: [
                  { label: "About",   href: "/about" },
                  { label: "FAQs",    href: "/faqs"  },
                  { label: "Contact", href: "/contact" },
              ]},
            ].map((col) => (
              <div key={col.head}>
                <h4 className="font-[family-name:var(--font-inter)] text-[9.5px] font-medium tracking-[.2em] text-white/65 uppercase mb-5">
                  {col.head}
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="font-[family-name:var(--font-inter)] text-[13.5px] font-normal text-white/60 hover:text-white transition-colors duration-250">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-6">
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 font-normal">
            © 2026 108 Rays. An initiative by{" "}
            <a href="https://letsraycreate.com" target="_blank" rel="noopener noreferrer" className="text-white/45 hover:text-pink-400 transition-colors duration-200">Raycreate</a>.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[9.5px] font-normal tracking-[.2em] text-white/55 uppercase">
            Curated · Considered · Crafted
          </p>
        </div>
      </div>
    </footer>
  );
}
