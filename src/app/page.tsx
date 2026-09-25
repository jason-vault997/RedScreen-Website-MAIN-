"use client";

import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import TrustLogos from "@/components/TrustLogos/TrustLogos";
import ImmediateProof from "@/components/ImmediateProof/ImmediateProof";
import SameMarketing from "@/components/SameMarketing/SameMarketing";
import ProofWall from "@/components/ProofWall/ProofWall";
import CaseStudies from "@/components/CaseStudies/CaseStudies";
import FinalCTA from "@/components/FinalCTA/FinalCTA";
import Footer from "@/components/Footer/Footer";
import ContactModal from "@/components/Contact/ContactModal";
import { useState, useEffect } from "react";

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  useEffect(() => {
    // Initialize GSAP + ScrollTrigger (deferred, non-blocking)
    const initGSAP = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      setGsapReady(true);
    };
    initGSAP();
  }, []);

  const openContact = () => setContactOpen(true);
  const closeContact = () => setContactOpen(false);

  const scrollToCases = () => {
    const el = document.getElementById("cases");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navigation
        onContactClick={openContact}
        onCaseStudiesClick={scrollToCases}
      />

      <main>
        {/* 1. HERO */}
        <Hero
          onContactClick={openContact}
          onCaseStudiesClick={scrollToCases}
          gsapReady={gsapReady}
        />

        {/* 2. TRUSTED BY INDUSTRY LEADERS */}
        <TrustLogos />

        {/* 3. TESTIMONIALS — Real Results From Real Clients */}
        <ImmediateProof gsapReady={gsapReady} />

        {/* 4. PROBLEM + SOLUTION */}
        <SameMarketing gsapReady={gsapReady} />

        {/* 5. EVIDENCE, NOT ADJECTIVES — Proof Room */}
        <ProofWall gsapReady={gsapReady} />

        {/* 6. CASE STUDIES — Horizontal Carousel */}
        <CaseStudies gsapReady={gsapReady} />

        {/* 7. FINAL CTA */}
        <FinalCTA onContactClick={openContact} gsapReady={gsapReady} />
      </main>

      <Footer />

      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </>
  );
}
