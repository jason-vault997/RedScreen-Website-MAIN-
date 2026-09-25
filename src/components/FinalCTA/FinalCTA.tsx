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
          scale: 0.85,
          rotate: -5,
          duration: 0.7,
          delay: 0.5,
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

            {/* Founder sticky-note annotation */}
            <div className={`${styles.stickyNote} founder-note`}>
              {/* Red hand-drawn arrow pointing toward CTA */}
              <svg
                className={styles.stickyArrow}
                viewBox="0 0 60 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M50 42C45 25 32 14 12 8"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M18 3L11 8L16 14"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>

              <div className={styles.stickyCard}>
                <p className={styles.stickyText}>
                  Taking on a small number of new
                  <br />
                  properties this month. If you&apos;re serious
                  <br />
                  about showing yours differently,
                  <br />
                  let&apos;s talk.
                </p>
                <span className={styles.stickySignature}>
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
