"use client";

import { useEffect, useRef } from "react";
import styles from "./SameMarketing.module.css";

interface SameMarketingProps {
  gsapReady: boolean;
}

export default function SameMarketing({ gsapReady }: SameMarketingProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".ps-reveal").forEach((el, i) => {
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          });
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* ── THE PROBLEM HEADING ── */}
        <h2 className={`${styles.problemHeading} ps-reveal`}>The Problem</h2>

        {/* ══════════════════════════════════════
            ROADMAP — textured cards + red dashed paths
            ══════════════════════════════════════ */}

        {/* ── CARD 1: FACTUAL REALITY ── */}
        <div className={`${styles.card} ${styles.card1} ps-reveal`}>
          <div className={styles.cardNoise} aria-hidden="true" />
          {/* Social profile header */}
          <div className={styles.cardHeader}>
            <div className={styles.avatarCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.35)" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.25)" />
              </svg>
            </div>
            <div className={styles.metaBars}>
              <div className={styles.metaBar} style={{ width: "70%" }} />
              <div className={styles.metaBar} style={{ width: "45%" }} />
            </div>
          </div>
          {/* Fact content */}
          <p className={styles.cardText}>
            UAE is the world&apos;s highest country with the most number of
            international buyers.
          </p>
          <div className={styles.dateArea}>
            <span className={styles.dateLabel}>AS OF 2026</span>
            {/* Red double underline */}
            <svg
              className={styles.dateUnderline}
              viewBox="0 0 90 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                d="M4 3C12 5 24 2 36 4C48 6 60 3 72 5C80 3 86 4 88 3"
                stroke="var(--red)"
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M4 7C14 9 28 6 40 8C52 9 64 6 76 8C82 7 86 8 88 7"
                stroke="var(--red)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>

        {/* ── RED DASHED PATH 1: Card 1 → Card 2 ── */}
        <svg
          className={`${styles.roadmapPath} ps-reveal`}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M60 6 C80 6, 110 20, 130 35 S155 55, 145 68"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          {/* arrowhead */}
          <path
            d="M140 62L146 70L152 64"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.75"
          />
        </svg>

        {/* ── CARD 2: THE ACTUAL PROBLEM ── */}
        <div className={`${styles.card} ${styles.card2} ps-reveal`}>
          <div className={styles.cardNoise} aria-hidden="true" />
          {/* Social profile header */}
          <div className={styles.cardHeader}>
            <div className={styles.avatarCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.35)" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.25)" />
              </svg>
            </div>
            <div className={styles.metaBars}>
              <div className={styles.metaBar} style={{ width: "60%" }} />
              <div className={styles.metaBar} style={{ width: "40%" }} />
            </div>
          </div>
          {/* Problem statement */}
          <p className={styles.problemStatement}>
            But these buyers don&apos;t move faster from photos, videos, and a
            listing{" "}
            <span className={styles.redEmphasis}>alone.</span>
          </p>
        </div>

        {/* ── RED DASHED PATH 2: Card 2 → Card 3 ── */}
        <svg
          className={`${styles.roadmapPath} ${styles.pathFlip} ps-reveal`}
          viewBox="0 0 200 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M140 6 C120 6, 90 22, 70 38 S50 56, 58 70"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeDasharray="8 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.75"
          />
          {/* arrowhead */}
          <path
            d="M52 64L57 72L64 66"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.75"
          />
        </svg>

        {/* ── CARD 3: THE SOLUTION ── */}
        <div className={`${styles.card} ${styles.card3} ps-reveal`}>
          <div className={styles.cardNoise} aria-hidden="true" />
          {/* Social profile header */}
          <div className={styles.cardHeader}>
            <div className={styles.avatarCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="8" r="4" fill="rgba(255,255,255,0.35)" />
                <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.25)" />
              </svg>
            </div>
            <div className={styles.metaBars}>
              <div className={styles.metaBar} style={{ width: "55%" }} />
              <div className={styles.metaBar} style={{ width: "35%" }} />
            </div>
          </div>
          {/* Solution */}
          <p className={styles.solutionEyebrow}>The Solution</p>
          <p className={styles.solutionText}>
            We made it possible for anyone to actually experience your property{" "}
            <span className={styles.solutionHighlight}>
              from anywhere in the world.
              <svg
                className={styles.straightUnderline}
                viewBox="0 0 220 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 3C30 4 60 2 90 3.5C120 2.5 150 4 180 3C200 3.5 210 2.8 218 3"
                  stroke="var(--red)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </p>
          <p className={styles.solutionSub}>
            A buyer can sit at home in another country and experience your
            property even before they visit.
          </p>
        </div>
      </div>
    </section>
  );
}
