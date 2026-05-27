"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const links = [
  { label: "Offerings",    href: "/offerings"    },
  { label: "Founder Card", href: "/founder-card" },
  { label: "About",        href: "/about"        },
  { label: "FAQs",         href: "/faqs"         },
  { label: "Contact",      href: "/contact"      },
];

interface NavbarProps {
  /** "dark" = page starts on a dark background; navbar text is white until scrolled */
  variant?: "light" | "dark";
}

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);
  const isDark = variant === "dark";

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* When unscrolled on a dark page, flip all text to white */
  const unscrolledDark = isDark && !scrolled;

  return (
    <>
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0,   opacity: 1  }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
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
            {links.map((l) => (
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
            ))}
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
