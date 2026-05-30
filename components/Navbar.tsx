"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Compass, Users, Mountain } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

const OFFERING_ITEMS = [
  { label: "The Compass",       sub: "Growth & Network Sessions",   href: "/compass",       Icon: Compass  },
  { label: "The Board of Nine", sub: "Peer Advisory for Growth",    href: "/board-of-nine", Icon: Users    },
  { label: "The Summit",        sub: "Curated Founder Experiences", href: "/summit",        Icon: Mountain },
];

const links = [
  { label: "Offerings",    href: "/offerings",    hasDropdown: true  },
  { label: "Founder Card", href: "/founder-card", hasDropdown: false },
  { label: "About",        href: "/about",        hasDropdown: false },
  { label: "FAQs",         href: "/faqs",         hasDropdown: false },
  { label: "Contact",      href: "/contact",      hasDropdown: false },
];

interface NavbarProps {
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [scrolled,          setScrolled]          = useState(false);
  const [open,              setOpen]              = useState(false);
  const [offeringsOpen,     setOfferingsOpen]     = useState(false);
  const offeringsRef = useRef<HTMLDivElement>(null);
  const closeTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDark        = variant === "dark";
  const unscrolledDark = isDark && !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const openDropdown  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOfferingsOpen(true);  };
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setOfferingsOpen(false), 120); };

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.6, ease: EXPO }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 bg-[#FAFAFA]/88 backdrop-blur-2xl border-b border-accent/8 shadow-[0_1px_24px_rgba(9,9,11,.06)]"
            : isDark
              ? "py-5 bg-transparent border-b border-white/08"
              : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center gap-10">
          {/* Logo */}
          <a
            href="/"
            className={`font-[family-name:var(--font-montserrat)] text-[16px] font-bold tracking-[.2em] flex-shrink-0 uppercase transition-colors duration-300 ${
              unscrolledDark ? "text-white" : "text-accent-static"
            }`}
          >
            108 RAYS
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex gap-8 flex-1 justify-center">
            {links.map((l) =>
              l.hasDropdown ? (
                /* ── Offerings with dropdown ── */
                <div
                  key={l.href}
                  ref={offeringsRef}
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <a
                    href={l.href}
                    className={`relative flex items-center gap-1 text-[13px] font-[family-name:var(--font-inter)] font-normal tracking-[.01em] transition-colors duration-200 group ${
                      unscrolledDark
                        ? "text-white/60 hover:text-white"
                        : "text-ink/55 hover:text-ink"
                    }`}
                  >
                    {l.label}
                    {/* Chevron */}
                    <motion.svg
                      animate={{ rotate: offeringsOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: EXPO }}
                      width="10" height="10" viewBox="0 0 10 10" fill="none"
                      className="mt-px opacity-50"
                    >
                      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                    <span
                      className={`absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300 ease-out ${
                        unscrolledDark ? "bg-white/40" : "bg-accent/50"
                      }`}
                    />
                  </a>

                  {/* Dropdown panel */}
                  <AnimatePresence>
                    {offeringsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.22, ease: EXPO }}
                        onMouseEnter={openDropdown}
                        onMouseLeave={closeDropdown}
                        className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[240px] rounded-xl bg-[#FAFAFA]/97 backdrop-blur-2xl border border-ink/08 shadow-[0_8px_32px_rgba(9,9,11,0.10)] overflow-hidden p-1.5"
                      >
                        {/* Arrow notch */}
                        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[10px] h-[10px] rotate-45 bg-[#FAFAFA] border-l border-t border-ink/08" />

                        {OFFERING_ITEMS.map((item) => (
                          <a
                            key={item.href}
                            href={item.href}
                            onClick={() => setOfferingsOpen(false)}
                            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-ink/[0.04] transition-colors duration-150 group/item"
                          >
                            {/* Icon */}
                            <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 bg-ink/[0.05] group-hover/item:bg-ink/[0.09] transition-colors duration-150">
                              <item.Icon size={12} className="text-ink/55" strokeWidth={1.7} />
                            </div>
                            <div>
                              <p className="font-[family-name:var(--font-urbanist)] text-[12px] font-semibold text-ink leading-snug tracking-[-0.01em]">
                                {item.label}
                              </p>
                              <p className="font-[family-name:var(--font-inter)] text-[10px] text-ink/38 leading-snug mt-px">
                                {item.sub}
                              </p>
                            </div>
                          </a>
                        ))}

                        {/* View all */}
                        <div className="mx-1.5 mt-1 mb-0.5 pt-1.5 border-t border-ink/07">
                          <a
                            href="/offerings"
                            onClick={() => setOfferingsOpen(false)}
                            className="flex items-center justify-between px-2 py-1 text-[10px] font-[family-name:var(--font-inter)] font-medium tracking-[.08em] uppercase text-ink/30 hover:text-ink transition-colors duration-150"
                          >
                            View all
                            <span>→</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Regular link ── */
                <a
                  key={l.href}
                  href={l.href}
                  className={`relative text-[13px] font-[family-name:var(--font-inter)] font-normal tracking-[.01em] transition-colors duration-200 group ${
                    unscrolledDark
                      ? "text-white/60 hover:text-white"
                      : "text-ink/55 hover:text-ink"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 w-0 group-hover:w-full h-px transition-all duration-300 ease-out ${
                      unscrolledDark ? "bg-white/40" : "bg-accent/50"
                    }`}
                  />
                </a>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="/contact"
              className={`inline-flex items-center justify-center h-9 px-5 rounded-full border font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] transition-all duration-300 ${
                unscrolledDark
                  ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                  : "border-ink/20 text-ink bg-white hover:bg-ink hover:text-white hover:border-ink"
              }`}
            >
              APPLY
            </a>
          </div>

          {/* Burger */}
          <button
            className={`lg:hidden ml-auto transition-colors ${
              unscrolledDark ? "text-white/70 hover:text-white" : "text-ink/70 hover:text-ink"
            }`}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1,  y: 0  }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="fixed top-[60px] inset-x-0 z-40 bg-[#FAFAFA]/97 backdrop-blur-2xl border-b border-accent/10 px-6 py-8 flex flex-col gap-0"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-inter)] text-[15px] text-ink/70 hover:text-ink py-4 border-b border-ink/06 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-6">
              <a href="/contact">
                <LiquidButton
                  size="sm"
                  className="font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] text-ink"
                >
                  APPLY
                </LiquidButton>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
