"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const EXPO: [number, number, number, number] = [0.19, 1, 0.22, 1];

export default function PaymentConfirmation() {
  return (
    <main className="relative min-h-screen bg-surface flex items-center justify-center px-6 overflow-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg opacity-60 pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          transform: "translate(-50%,-50%)",
          width: "60vw",
          height: "40vw",
          background: "radial-gradient(ellipse, rgba(9,9,11,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center py-32">
        {/* Tick */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: EXPO }}
          className="mx-auto mb-10 w-16 h-16 rounded-full border flex items-center justify-center"
          style={{ borderColor: "rgba(9,9,11,0.12)" }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#09090B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: EXPO }}
          className="font-[family-name:var(--font-inter)] text-[10px] font-medium tracking-[.22em] uppercase mb-6"
          style={{ color: "rgba(9,9,11,0.38)" }}
        >
          Payment Confirmed
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EXPO }}
          className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.08] tracking-[-0.04em] text-ink mb-6"
          style={{ fontSize: "clamp(28px,4vw,52px)" }}
        >
          You&apos;re in.
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.35, ease: EXPO }}
          className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.78] mb-12 max-w-sm mx-auto"
          style={{ color: "#71717A" }}
        >
          Your payment has been received and your spot is confirmed. Check your
          email for a receipt and next-step details from the 108 Rays team.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.48, ease: EXPO }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full bg-ink text-white transition-all duration-300 hover:bg-ink/85"
          >
            Back to Home
          </Link>
          <Link
            href="/offerings"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full border text-ink transition-all duration-300 hover:bg-ink/5"
            style={{ borderColor: "rgba(9,9,11,0.15)" }}
          >
            Explore More
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-16 font-[family-name:var(--font-inter)] text-[11px]"
          style={{ color: "rgba(9,9,11,0.28)" }}
        >
          Questions?{" "}
          <a href="mailto:info@108rays.com" className="underline underline-offset-2 hover:text-ink transition-colors duration-200">
            info@108rays.com
          </a>
        </motion.p>
      </div>
    </main>
  );
}
