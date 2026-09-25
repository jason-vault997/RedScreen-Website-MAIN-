"use client";

import { useEffect, useRef } from "react";
import styles from "./FinalCTA.module.css";

interface FinalCTAProps {
  onContactClick: () => void;
  gsapReady: boolean;
}

export default function FinalCTA({ onContactClick, gsapReady }: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".final-text", {
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });

        gsap.from(".final-cta-btn", {
          y: 20,
          opacity: 0,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={`${styles.heading} final-text`}>
            Your next multi-million-dollar listing
            <br />
            <span className={styles.headingRed}>
              deserves more than a listing.
            </span>
          </h2>

          <p className={`${styles.subtext} final-text`}>
            Have a property worth showing differently?
          </p>

          <button
            onClick={onContactClick}
            className={`btn btn--primary ${styles.ctaBtn} final-cta-btn`}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Subtle red glow */}
      <div className={styles.glowEffect} aria-hidden="true" />
    </section>
  );
}
