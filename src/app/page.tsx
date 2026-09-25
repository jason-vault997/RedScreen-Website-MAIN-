"use client";

import Hero from "@/components/Hero/Hero";
import Navigation from "@/components/Navigation/Navigation";
import TrustLogos from "@/components/TrustLogos/TrustLogos";
import ImmediateProof from "@/components/ImmediateProof/ImmediateProof";
import SameMarketing from "@/components/SameMarketing/SameMarketing";
import NewPossibility from "@/components/NewPossibility/NewPossibility";
import Mechanism from "@/components/Mechanism/Mechanism";
import ProofWall from "@/components/ProofWall/ProofWall";
import PropertyDemo from "@/components/PropertyDemo/PropertyDemo";
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
        {/* ACT I: Cinematic Opening */}
        <Hero
          onContactClick={openContact}
          onCaseStudiesClick={scrollToCases}
          gsapReady={gsapReady}
        />

        {/* Trusted By Industry Leaders */}
        <TrustLogos />

        {/* ACT II: Immediate Evidence */}
        <ImmediateProof gsapReady={gsapReady} />

        {/* ACT III: The Problem */}
        <SameMarketing gsapReady={gsapReady} />

        {/* ACT IV: The New Possibility */}
        <NewPossibility gsapReady={gsapReady} />

        {/* ACT V: How We Do It */}
        <Mechanism gsapReady={gsapReady} />

        {/* ACT VI: Evidence Room */}
        <ProofWall gsapReady={gsapReady} />

        {/* ACT VII: Experience the Product */}
        <PropertyDemo gsapReady={gsapReady} />

        {/* ACT VIII: Real Cases */}
        <CaseStudies gsapReady={gsapReady} />

        {/* ACT IX: Take Action */}
        <FinalCTA onContactClick={openContact} gsapReady={gsapReady} />
      </main>

      <Footer />

      <ContactModal isOpen={contactOpen} onClose={closeContact} />
    </>
  );
}
