"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./SameMarketing.module.css";

interface SameMarketingProps {
  gsapReady: boolean;
}

/* Reusable social header mock */
function CardHeader({ lineWidths = [68, 44] }: { lineWidths?: number[] }) {
  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarCircle}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="8" r="4.5" fill="rgba(255,255,255,0.25)" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="rgba(255,255,255,0.15)" />
        </svg>
      </div>
      <div className={styles.metaLines}>
        {lineWidths.map((w, i) => (
          <div key={i} className={styles.metaLine} style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  );
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
            y: 36,
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
      {/* ════════════════════════════════════════
          MOBILE: Supplied final design image
          Replaces the HTML/CSS card implementation.
          Image already contains THE PROBLEM heading,
          all 3 cards, roadmap arrows, and solution.
          ════════════════════════════════════════ */}
      <div className={`${styles.mobileImage} ps-reveal`}>
        <Image
          src="/images/problem-section-mobile.webp"
          alt="The Problem: UAE is the world's highest country with international buyers. Buyers don't move faster from photos, videos, and a listing alone. The Solution: We made it possible for anyone to experience your property from anywhere in the world."
          width={1206}
          height={2006}
          className={styles.mobileImg}
          style={{ width: "100%", height: "auto" }}
          priority={false}
          loading="lazy"
        />
      </div>

      {/* ════════════════════════════════════════
          DESKTOP: Keep existing HTML/CSS cards
          ════════════════════════════════════════ */}
      <div className={styles.desktopCards}>
        <div className={styles.container}>

          {/* ── THE PROBLEM heading ── */}
          <h2 className={`${styles.problemHeading} ps-reveal`}>The Problem</h2>

          {/* ── CARD 1 ── */}
          <div className={`${styles.card} ${styles.card1} ps-reveal`}>
            <div className={styles.cardInner}>
              <CardHeader lineWidths={[62, 40]} />
              <p className={styles.factText}>
                UAE is the world&apos;s highest country with the most number of
                international buyers.
              </p>
              <div className={styles.dateBlock}>
                <span className={styles.dateText}>AS OF 2026</span>
                <svg
                  className={styles.dateUnderlineSvg}
                  viewBox="0 0 90 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M3 3.5C14 5.5 28 2 42 4C56 5.5 70 2.5 84 4C86 3.8 88 3.5 88 3.5"
                    stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" fill="none"
                  />
                  <path
                    d="M3 7C16 9 32 6.5 46 8C60 9 72 7 85 8"
                    stroke="var(--red)" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* ── ROADMAP 1 → 2 ── */}
          <svg className={`${styles.roadmapSvg} ps-reveal`} viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <path d="M60 5 C75 12, 110 22, 135 42 C155 58, 158 80, 148 98" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="8 5.5" strokeLinecap="round" fill="none" opacity="0.72" />
            <path d="M141 93 L149 100 L157 94" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.72" />
          </svg>

          {/* ── CARD 2 ── */}
          <div className={`${styles.card} ${styles.card2} ps-reveal`}>
            <div className={styles.cardInner}>
              <CardHeader lineWidths={[55, 35]} />
              <p className={styles.problemText}>
                But these buyers don&apos;t move faster from photos, videos, and a
                listing{" "}
                <span className={styles.aloneEmphasis}>alone.</span>
              </p>
            </div>
          </div>

          {/* ── ROADMAP 2 → 3 ── */}
          <svg className={`${styles.roadmapSvg} ps-reveal`} viewBox="0 0 200 110" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
            <path d="M140 5 C125 12, 95 22, 75 40 C58 55, 55 78, 65 98" stroke="var(--red)" strokeWidth="1.8" strokeDasharray="8 5.5" strokeLinecap="round" fill="none" opacity="0.72" />
            <path d="M58 93 L65 101 L72 94" stroke="var(--red)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.72" />
          </svg>

          {/* ── CARD 3 ── */}
          <div className={`${styles.card} ${styles.card3} ps-reveal`}>
            <div className={styles.cardInner}>
              <CardHeader lineWidths={[48, 30]} />
              <p className={styles.solutionLabel}>The Solution</p>
              <p className={styles.solutionBody}>
                We made it possible for anyone to actually experience your
                property{" "}
                <span className={styles.solutionRedPhrase}>
                  from anywhere in the world.
                  <svg
                    className={styles.phraseUnderlineSvg}
                    viewBox="0 0 210 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M3 2.5C30 3.5 60 2 90 2.8C120 2 150 3.2 178 2.5C190 2.8 205 2.5 208 2.5"
                      stroke="var(--red)" strokeWidth="2.2" strokeLinecap="round" fill="none"
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
      </div>
    </section>
  );
}
