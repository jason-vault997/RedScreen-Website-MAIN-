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
            y: 28,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.06,
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
        {/* ═══════════════════════════════════
            ROADMAP — one continuous visual journey
            ═══════════════════════════════════ */}
        <div className={styles.roadmap}>

          {/* ── STOP 1: THE PROBLEM ── */}
          <div className={`${styles.stop} ${styles.stopProblem} ps-reveal`}>
            <h2 className={styles.problemHeading}>The Problem</h2>
          </div>

          {/* ── PATH SEGMENT 1: Problem → Fact ── */}
          <svg
            className={styles.pathSegment}
            viewBox="0 0 300 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M40 8 C60 8, 80 30, 120 42 S180 70, 220 78 S260 90, 280 92"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              strokeLinecap="round"
              fill="none"
            />
            {/* small arrowhead at end */}
            <path
              d="M274 86L281 93L276 98"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* ── STOP 2: UAE FACT ── */}
          <div className={`${styles.stop} ${styles.stopFact} ps-reveal`}>
            <p className={styles.factText}>
              UAE is the world&apos;s highest country with the most number of
              international buyers.
            </p>
            <div className={styles.factDate}>
              <span className={styles.dateText}>As of 2026</span>
              {/* Red hand-drawn double underline */}
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
                  opacity="0.55"
                />
              </svg>
            </div>
          </div>

          {/* ── PATH SEGMENT 2: Fact → Consequence ── */}
          <svg
            className={`${styles.pathSegment} ${styles.pathReverse}`}
            viewBox="0 0 300 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M260 8 C240 8, 220 28, 180 44 S120 68, 80 78 S50 88, 30 92"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M36 86L29 93L34 98"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* ── STOP 3: THE CONSEQUENCE ── */}
          <div className={`${styles.stop} ${styles.stopConsequence} ps-reveal`}>
            <p className={styles.consequenceText}>
              But these buyers don&apos;t move faster from photos, videos, and
              a listing{" "}
              <span className={styles.consequenceEmphasis}>alone.</span>
            </p>
          </div>

          {/* ── PATH SEGMENT 3: Consequence → Solution ── */}
          <svg
            className={styles.pathSegment}
            viewBox="0 0 300 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            <path
              d="M40 8 C70 12, 100 38, 140 52 S200 74, 240 82 S270 90, 280 92"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              strokeDasharray="8 5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M274 86L281 93L276 98"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* ── STOP 4: THE SOLUTION ── */}
          <div className={`${styles.stop} ${styles.stopSolution} ps-reveal`}>
            <p className={styles.solutionEyebrow}>The Solution</p>
            <h3 className={styles.solutionHeadline}>
              We made it possible for anyone to actually experience your
              property from{" "}
              <span className={styles.solutionHighlight}>
                anywhere in the world.
                {/* Straight red hand-drawn underline */}
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
            </h3>
            <p className={styles.solutionSub}>
              A buyer can sit at home in another country and experience your
              property even before they visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
