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

        gsap.from(".founder-note", {
          opacity: 0,
          scale: 0.88,
          rotate: -4,
          duration: 0.7,
          delay: 0.55,
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
              deserves to be closed faster.
            </span>
          </h2>

          <p className={`${styles.subtext} final-text`}>
            Have a property worth showing differently?
          </p>

          {/* CTA + founder note area */}
          <div className={styles.ctaArea}>
            <button
              onClick={onContactClick}
              className={`btn btn--primary ${styles.ctaBtn} final-cta-btn`}
            >
              Get In Touch
            </button>

            {/* Founder annotation — below CTA on mobile, side on desktop */}
            <div className={`${styles.founderAnnotation} founder-note`}>
              {/* Red hand-drawn curved arrow pointing UP toward CTA */}
              <svg
                className={styles.founderArrow}
                viewBox="0 0 80 90"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                {/* Curved path from note area upward toward CTA */}
                <path
                  d="M40 82 C36 60, 28 42, 32 28 S40 14, 42 8"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Arrowhead pointing UP */}
                <path
                  d="M36 14L42 6L48 14"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>

              {/* The note card */}
              <div className={styles.noteCard}>
                <p className={styles.noteText}>
                  Taking on a small number of new properties this month.
                  If you&apos;re serious about showing yours differently,
                  let&apos;s talk.
                </p>
                <span className={styles.noteSignature}>
                  — the founder :)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle red glow */}
      <div className={styles.glowEffect} aria-hidden="true" />
    </section>
  );
}
