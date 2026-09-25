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

        gsap.from(".final-doodle", {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          delay: 0.6,
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

          {/* CTA area with doodle */}
          <div className={styles.ctaArea}>
            <button
              onClick={onContactClick}
              className={`btn btn--primary ${styles.ctaBtn} final-cta-btn`}
            >
              Get In Touch
            </button>

            {/* Red hand-drawn doodle arrow + founder note */}
            <div className={`${styles.doodleWrap} final-doodle`}>
              {/* Curved arrow SVG — hand-drawn style */}
              <svg
                className={styles.doodleArrow}
                viewBox="0 0 80 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M8 52C12 28 28 12 56 8"
                  stroke="var(--red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="2 0"
                />
                {/* Arrow head */}
                <path
                  d="M48 4L57 8L50 15"
                  stroke="var(--red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <p className={styles.founderNote}>
                The founder may speak
                <br />
                if you qualify :)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle red glow */}
      <div className={styles.glowEffect} aria-hidden="true" />
    </section>
  );
}
