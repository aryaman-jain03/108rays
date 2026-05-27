"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct(el.scrollTop / (el.scrollHeight - window.innerHeight) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[9999] bg-gradient-to-r from-gold-dark via-gold to-gold-light shadow-[0_0_10px_rgba(200,169,110,.6)]"
      style={{ width: `${pct}%`, transition: "width .05s linear" }}
    />
  );
}
