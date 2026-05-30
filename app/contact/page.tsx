"use client";

import { useEffect, useRef, useState } from "react";
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
const OFFERINGS_LIST = ["The Compass", "The Board of Nine", "The Summit"];

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

/* ── Shared field ────────────────────────────────────────────── */
function Field({
  label,
  type = "text",
  textarea = false,
  required = true,
  name,
}: {
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  name: string;
}) {
  const [focused, setFocused] = useState(false);
  const [filled, setFilled] = useState(false);
  const base =
    "w-full bg-transparent border-b font-[family-name:var(--font-inter)] text-[14px] font-normal text-ink outline-none transition-colors duration-300 resize-none placeholder-transparent peer";
  const borderColor = focused
    ? "rgba(9,9,11,0.55)"
    : "rgba(9,9,11,0.13)";

  return (
    <div className="relative pt-5 pb-1">
      {textarea ? (
        <textarea
          rows={4}
          name={name}
          required={required}
          placeholder={label}
          className={`${base} pt-1 leading-[1.7]`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setFilled(e.target.value.length > 0);
          }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      ) : (
        <input
          type={type}
          name={name}
          required={required}
          placeholder={label}
          className={`${base} h-9 pt-1`}
          style={{ borderColor }}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setFilled(e.target.value.length > 0);
          }}
          onChange={(e) => setFilled(e.target.value.length > 0)}
        />
      )}

      {/* Floating label */}
      <label
        className="absolute left-0 top-0 font-[family-name:var(--font-inter)] font-medium tracking-[.14em] uppercase transition-all duration-250 pointer-events-none"
        style={{
          fontSize: focused || filled ? "8.5px" : "11px",
          color: focused
            ? "rgba(9,9,11,0.55)"
            : filled
            ? "rgba(9,9,11,0.35)"
            : "rgba(9,9,11,0.28)",
          top: focused || filled ? 0 : textarea ? "24px" : "20px",
        }}
      >
        {label}
      </label>

      {/* Focus underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        animate={{ width: focused ? "100%" : "0%" }}
        transition={{ duration: 0.35, ease: EXPO }}
        style={{ background: "#09090B" }}
      />
    </div>
  );
}

/* ── Checkbox ────────────────────────────────────────────────── */
function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group select-none">
      <div
        className="w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all duration-200"
        style={{
          borderColor: checked ? "#09090B" : "rgba(9,9,11,0.22)",
          background: checked ? "#09090B" : "transparent",
        }}
        onClick={onChange}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18 }}
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
          >
            <path
              d="M1.5 4.5L3.5 6.5L7.5 2.5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </div>
      <span
        className="font-[family-name:var(--font-inter)] text-[13.5px] font-normal transition-colors duration-200"
        style={{ color: checked ? "#09090B" : "rgba(9,9,11,0.45)" }}
      >
        {label}
      </span>
    </label>
  );
}

/* ── Apply form ──────────────────────────────────────────────── */
function ApplyForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (submitted) containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  const toggle = (o: string) =>
    setSelected((prev) =>
      prev.includes(o) ? prev.filter((x) => x !== o) : [...prev, o]
    );

  if (submitted) {
    return (
      <div ref={containerRef} className="scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}
          className="py-20 text-center"
        >
          <p
            className="font-[family-name:var(--font-urbanist)] font-medium text-[22px] tracking-[-0.02em] mb-3"
            style={{ color: "#09090B" }}
          >
            Application received.
          </p>
          <p
            className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75]"
            style={{ color: "#71717A" }}
          >
            We'll review your application and get back to you within 5 working
            days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(false);
        const data = new FormData(e.currentTarget);
        try {
          const res = await fetch("https://formspree.io/f/maqkvwdo", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) { setSubmitted(true); } else { setSubmitError(true); }
        } catch { setSubmitError(true); }
        setSubmitting(false);
      }}
      className="space-y-8"
    >
      <input type="hidden" name="_subject" value="New Application – 108 Rays" />
      <input type="hidden" name="interested_in" value={selected.join(", ")} />

      {/* Offerings checkboxes */}
      <div>
        <p
          className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.2em] uppercase mb-5"
          style={{ color: "rgba(9,9,11,0.35)" }}
        >
          What are you interested in?
        </p>
        <div className="flex flex-col gap-3.5">
          {OFFERINGS_LIST.map((o) => (
            <Checkbox
              key={o}
              label={o}
              checked={selected.includes(o)}
              onChange={() => toggle(o)}
            />
          ))}
        </div>
        <p
          className="mt-3 font-[family-name:var(--font-inter)] text-[11px] leading-[1.6]"
          style={{ color: "rgba(9,9,11,0.28)" }}
        >
          Tick all that apply. We'll help you choose the right altitude to start
          if required.
        </p>
      </div>

      {/* Fields */}
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
        <Field label="Full Name" name="full_name" />
        <Field label="Email" type="email" name="email" />
        <Field label="Mobile" type="tel" name="mobile" />
        <Field label="City" name="city" />
        <Field label="Company" name="company" />
        <Field label="Website / LinkedIn" name="website_linkedin" />
      </div>
      <Field
        label="Tell us briefly about your business and what you're looking for"
        textarea
        name="message"
      />

      {/* Privacy */}
      <Checkbox
        label="I agree to 108 Rays' Privacy Policy and Terms."
        checked={privacy}
        onChange={() => setPrivacy(!privacy)}
      />

      {submitError && (
        <p className="font-[family-name:var(--font-inter)] text-[13px]" style={{ color: "#B91C1C" }}>
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:info@108rays.com" style={{ textDecoration: "underline" }}>info@108rays.com</a>.
        </p>
      )}

      {/* Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={!privacy || selected.length === 0 || submitting}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full border border-ink/18 text-ink transition-all duration-300 hover:bg-ink hover:text-white hover:border-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:border-ink/18"
        >
          {submitting ? "Sending…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}

/* ── General Enquiry form ────────────────────────────────────── */
function EnquiryForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [privacy, setPrivacy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (submitted) containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [submitted]);

  if (submitted) {
    return (
      <div ref={containerRef} className="scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EXPO }}
          className="py-20 text-center"
        >
          <p
            className="font-[family-name:var(--font-urbanist)] font-medium text-[22px] tracking-[-0.02em] mb-3"
            style={{ color: "#09090B" }}
          >
            Message received.
          </p>
          <p
            className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.75]"
            style={{ color: "#71717A" }}
          >
            We typically respond within 2 to 3 working days.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(false);
        const data = new FormData(e.currentTarget);
        try {
          const res = await fetch("https://formspree.io/f/maqkvwdo", {
            method: "POST",
            body: data,
            headers: { Accept: "application/json" },
          });
          if (res.ok) { setSubmitted(true); } else { setSubmitError(true); }
        } catch { setSubmitError(true); }
        setSubmitting(false);
      }}
      className="space-y-8"
    >
      <input type="hidden" name="_subject" value="General Enquiry – 108 Rays" />
      <div className="grid sm:grid-cols-2 gap-x-10 gap-y-2">
        <Field label="Full Name" name="full_name" />
        <Field label="Email" type="email" name="email" />
        <Field label="Mobile" type="tel" name="mobile" />
        <Field label="City" name="city" />
        <Field label="Company" name="company" />
        <Field label="Website / LinkedIn" name="website_linkedin" />
      </div>
      <Field
        label="Tell us briefly about your business and what you're looking for"
        textarea
        name="message"
      />

      <Checkbox
        label="I agree to be contacted by 108 Rays and accept the privacy terms."
        checked={privacy}
        onChange={() => setPrivacy(!privacy)}
      />

      {submitError && (
        <p className="font-[family-name:var(--font-inter)] text-[13px]" style={{ color: "#B91C1C" }}>
          Something went wrong. Please try again or email us at{" "}
          <a href="mailto:info@108rays.com" style={{ textDecoration: "underline" }}>info@108rays.com</a>.
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={!privacy || submitting}
          className="inline-flex items-center gap-2 font-[family-name:var(--font-urbanist)] font-semibold tracking-[.12em] uppercase text-[11px] px-8 py-3.5 rounded-full border border-ink/18 text-ink transition-all duration-300 hover:bg-ink hover:text-white hover:border-ink disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-ink disabled:hover:border-ink/18"
        >
          {submitting ? "Sending…" : "Send Enquiry"}
        </button>
      </div>
    </form>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function ContactPage() {
  const heroRef  = useRef<HTMLElement>(null);
  const formRef  = useRef<HTMLDivElement>(null);
  const [tab, setTab] = useState<"apply" | "enquiry">("apply");

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroY       = useTransform(heroScroll, [0, 1], ["0%", "14%"]);

  const formInView = useInView(formRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      className="min-h-screen overflow-x-hidden bg-surface"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ScrollProgressBar />
      <Navbar variant="dark" />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative overflow-hidden bg-ink-2"
        style={{ minHeight: "72vh" }}
      >
        <div className="absolute inset-0 grid-bg-dark opacity-50 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 55%, rgba(255,255,255,0.032) 0%, transparent 70%)",
          }}
        />

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 pb-24"
        >
          <div className="grid lg:grid-cols-[1fr_auto] gap-16 items-end">

            {/* Left: headline */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-[family-name:var(--font-inter)] text-[10.5px] font-medium tracking-[.24em] text-white/38 uppercase mb-9 flex items-center gap-3"
              >
                <span className="inline-block w-6 h-px bg-white/20" />
                Take the next step
              </motion.p>

              <div className="overflow-hidden mb-7">
                <motion.h1
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.95, delay: 0.2, ease: EXPO }}
                  className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.04] tracking-[-0.04em] text-white"
                  style={{ fontSize: "clamp(28px,7vw,100px)" }}
                >
                  Let's talk.
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.38, ease: EXPO }}
                className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.78] font-normal text-white/38 max-w-[400px]"
              >
                Whether you're ready to join or just exploring, we'd love to
                hear from you.
              </motion.p>
            </div>

            {/* Right: contact info cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: EXPO }}
              className="flex flex-col gap-8 lg:pb-1"
            >
              {/* Reach us */}
              <div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Reach us
                </p>
                <a
                  href="mailto:info@108rays.com"
                  className="font-[family-name:var(--font-inter)] text-[15px] font-normal text-white/70 hover:text-white transition-colors duration-200"
                >
                  info@108rays.com
                </a>
              </div>

              {/* Divider */}
              <div className="w-full h-px" style={{ background: "rgba(255,255,255,0.08)" }} />

              {/* Response */}
              <div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Response
                </p>
                <p
                  className="font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.72] font-normal max-w-[240px]"
                  style={{ color: "rgba(255,255,255,0.42)" }}
                >
                  Most enquiries are answered within 2 to 3 working days.
                  Applications are reviewed within 5 working days.
                </p>
              </div>
            </motion.div>

          </div>
        </motion.div>


      </section>

      {/* ── Offerings navigation strip ───────────────────────── */}
      <section className="bg-surface border-b border-ink/[0.05] py-12">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p
            className="font-[family-name:var(--font-inter)] text-[9px] font-medium tracking-[.22em] uppercase mb-7"
            style={{ color: "rgba(9,9,11,0.28)" }}
          >
            Not sure where to start? Explore our offerings first
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "The Compass",       desc: "Growth sessions & curated learning formats.", href: "/compass"      },
              { title: "The Board of Nine", desc: "Intimate peer advisory boards of 9 founders.", href: "/board-of-nine" },
              { title: "The Summit",        desc: "Curated founder retreats & experiences.",      href: "/summit"       },
            ].map((o) => (
              <a
                key={o.title}
                href={o.href}
                className="group flex flex-col justify-between p-5 rounded-xl border transition-all duration-300"
                style={{ borderColor: "rgba(9,9,11,0.08)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(9,9,11,0.2)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "rgba(9,9,11,0.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(9,9,11,0.08)";
                  (e.currentTarget as HTMLAnchorElement).style.background  = "transparent";
                }}
              >
                <div>
                  <p className="font-[family-name:var(--font-urbanist)] font-semibold text-[14.5px] tracking-[-0.02em] text-ink mb-1.5">
                    {o.title}
                  </p>
                  <p
                    className="font-[family-name:var(--font-inter)] text-[12px] leading-[1.65] font-normal"
                    style={{ color: "rgba(9,9,11,0.42)" }}
                  >
                    {o.desc}
                  </p>
                </div>
                <p
                  className="font-[family-name:var(--font-inter)] text-[11px] font-medium tracking-[.06em] mt-4 flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5"
                  style={{ color: "rgba(9,9,11,0.4)" }}
                >
                  Explore <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form section ─────────────────────────────────────── */}
      <section className="relative bg-surface overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(9,9,11,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 90% 90% at 50% 50%, black 40%, transparent 100%)",
          }}
        />

        <div
          className="absolute top-0 inset-x-0 h-16 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(250,250,250,0.0), rgba(250,250,250,1))",
          }}
        />

        <div
          ref={formRef}
          className="relative z-10 max-w-3xl mx-auto px-6 lg:px-10 py-24 lg:py-32"
        >
          {/* Form header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: EXPO }}
            className="mb-12"
          >
            <div className="overflow-hidden mb-3">
              <motion.h2
                initial={{ y: "105%" }}
                animate={formInView ? { y: "0%" } : {}}
                transition={{ duration: 0.85, delay: 0.08, ease: EXPO }}
                className="font-[family-name:var(--font-urbanist)] font-medium leading-[1.06] tracking-[-0.03em]"
                style={{ fontSize: "clamp(28px,3.2vw,44px)", color: "#09090B" }}
              >
                Apply to 108 Rays
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={formInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.65, delay: 0.22 }}
              className="font-[family-name:var(--font-inter)] text-[14px]"
              style={{ color: "rgba(9,9,11,0.38)" }}
            >
              Tell us a little about you.
            </motion.p>
          </motion.div>

          {/* Tab switcher */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.18, ease: EXPO }}
            className="flex gap-1 mb-12 p-1 rounded-full self-start w-fit"
            style={{ background: "rgba(9,9,11,0.06)" }}
          >
            {(
              [
                { key: "apply",   label: "Apply to 108 Rays" },
                { key: "enquiry", label: "General Enquiry"    },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="relative px-5 py-2 rounded-full font-[family-name:var(--font-inter)] text-[12.5px] font-medium transition-colors duration-200 z-10"
                style={{
                  color: tab === key ? "#09090B" : "rgba(9,9,11,0.38)",
                }}
              >
                {tab === key && (
                  <motion.div
                    layoutId="tab-bg"
                    className="absolute inset-0 rounded-full bg-white shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </button>
            ))}
          </motion.div>

          {/* Form body */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.28, ease: EXPO }}
          >
            <AnimatePresence mode="wait">
              {tab === "apply" ? (
                <motion.div
                  key="apply"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.32, ease: EXPO }}
                >
                  <ApplyForm />
                </motion.div>
              ) : (
                <motion.div
                  key="enquiry"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.32, ease: EXPO }}
                >
                  <EnquiryForm />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
