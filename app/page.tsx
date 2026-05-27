import Navbar         from "@/components/Navbar";
import ScrollProgress  from "@/components/ScrollProgress";
import Hero            from "@/components/sections/Hero";
import WhatIs          from "@/components/sections/WhatIs";
import Offerings       from "@/components/sections/Offerings";
import WhoFor          from "@/components/sections/WhoFor";
import CTA             from "@/components/sections/CTA";
import Footer          from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <WhatIs />
        <Offerings />
        <WhoFor />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
