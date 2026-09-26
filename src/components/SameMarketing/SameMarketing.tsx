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
            y: 40,
            opacity: 0,
            duration: 1,
            delay: i * 0.1,
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
        {/* ── THE PROBLEM heading ── */}
        <h2 className={`${styles.problemHeading} ps-reveal`}>The Problem</h2>

        {/* ═══════════════════════════════════════════
            CARD 1 — FACTUAL REALITY
            Dark textured card with social header
            ═══════════════════════════════════════════ */}
        <div className={`${styles.card} ${styles.card1} ps-reveal`}>
          {/* Noise/grain texture overlay */}
          <div className={styles.cardGrain} aria-hidden="true" />
          <div className={styles.cardInner}>
            {/* Social profile header */}
            <div className={styles.profileHeader}>
              <div className={styles.avatarPlaceholder}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4.5" fill="rgba(255,255,255,0.3)" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <div className={styles.metaLines}>
                <div className={styles.metaLine} style={{ width: "65%" }} />
                <div className={styles.metaLine} style={{ width: "42%" }} />
              </div>
            </div>

            {/* Fact text */}
            <p className={styles.factText}>
              UAE is the world&apos;s highest country with the most number of
              international buyers.
            </p>

            {/* AS OF 2026 + red double underline */}
            <div className={styles.dateBlock}>
              <span className={styles.dateText}>AS OF 2026</span>
              <svg
                className={styles.dateUnderline}
                viewBox="0 0 90 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 3.5C10 5 22 2 34 4.5C46 6 58 3 70 5.5C78 3 85 4.5 87 3.5"
                  stroke="var(--red)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                />
                <path
                  d="M4 8C12 10 26 7 38 9C50 10 62 7 74 9C80 8 85 9 87 8"
                  stroke="var(--red)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.55"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RED DASHED ROADMAP — Card 1 → Card 2
            Curves from bottom-center of card 1,
            swings right, then curves down-left to card 2
            ═══════════════════════════════════════════ */}
        <svg
          className={`${styles.roadmapSvg} ps-reveal`}
          viewBox="0 0 240 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M70 4 C85 8, 120 18, 145 35 S170 60, 155 78"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeDasharray="9 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          {/* Arrowhead */}
          <path
            d="M149 72L156 80L163 74"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
        </svg>

        {/* ═══════════════════════════════════════════
            CARD 2 — THE ACTUAL PROBLEM
            ═══════════════════════════════════════════ */}
        <div className={`${styles.card} ${styles.card2} ps-reveal`}>
          <div className={styles.cardGrain} aria-hidden="true" />
          <div className={styles.cardInner}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarPlaceholder}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4.5" fill="rgba(255,255,255,0.3)" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <div className={styles.metaLines}>
                <div className={styles.metaLine} style={{ width: "58%" }} />
                <div className={styles.metaLine} style={{ width: "36%" }} />
              </div>
            </div>

            <p className={styles.problemText}>
              But these buyers don&apos;t move faster from photos, videos, and a
              listing{" "}
              <span className={styles.aloneEmphasis}>alone.</span>
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════════
            RED DASHED ROADMAP — Card 2 → Card 3
            Curves from bottom of card 2,
            swings left, then curves down to card 3
            ═══════════════════════════════════════════ */}
        <svg
          className={`${styles.roadmapSvg} ${styles.roadmapFlip} ps-reveal`}
          viewBox="0 0 240 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M165 4 C150 10, 115 22, 95 38 S75 60, 85 80"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeDasharray="9 6"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M79 74L84 82L91 76"
            stroke="var(--red)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            opacity="0.7"
          />
        </svg>

        {/* ═══════════════════════════════════════════
            CARD 3 — THE SOLUTION
            ═══════════════════════════════════════════ */}
        <div className={`${styles.card} ${styles.card3} ps-reveal`}>
          <div className={styles.cardGrain} aria-hidden="true" />
          <div className={styles.cardInner}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarPlaceholder}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4.5" fill="rgba(255,255,255,0.3)" />
                  <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.2)" />
                </svg>
              </div>
              <div className={styles.metaLines}>
                <div className={styles.metaLine} style={{ width: "52%" }} />
                <div className={styles.metaLine} style={{ width: "32%" }} />
              </div>
            </div>

            <p className={styles.solutionLabel}>The Solution</p>
            <p className={styles.solutionBody}>
              We made it possible for anyone to actually experience your
              property{" "}
              <span className={styles.solutionRedPhrase}>
                from anywhere in the world.
                <svg
                  className={styles.phraseUnderline}
                  viewBox="0 0 220 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M4 3C28 4.5 56 2 84 3.5C112 2 140 4.5 168 3C196 3.5 210 2.5 218 3"
                    stroke="var(--red)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </p>
            <p className={styles.solutionCaption}>
              A buyer can sit at home in another country and experience your
              property even before they visit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
