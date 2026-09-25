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
        // Stagger the reveals
        gsap.utils.toArray<HTMLElement>(".ps-reveal").forEach((el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
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
        {/* ── PROBLEM ── */}
        <p className={`${styles.eyebrow} ps-reveal`}>The problem</p>

        <h2 className={`${styles.headline} ps-reveal`}>
          Your buyers can&apos;t
          <br />
          experience{" "}
          <span className={styles.headlineRed}>
            the property from a distance.
          </span>
        </h2>

        <p className={`${styles.context} ps-reveal`}>
          An international buyer can see the photos. Read the listing.
          Watch a video. But they still haven&apos;t{" "}
          <em>experienced</em> the property.
        </p>

        {/* ── VISUAL PATHWAY: Problem → Insight → Solution ── */}
        <div className={styles.pathway}>
          {/* Compact problem flow */}
          <div className={`${styles.flowSteps} ps-reveal`}>
            <span className={styles.flowStep}>Photos</span>
            <span className={styles.flowArrow}>→</span>
            <span className={styles.flowStep}>Listing</span>
            <span className={styles.flowArrow}>→</span>
            <span className={styles.flowStep}>Video</span>
            <span className={styles.flowArrow}>→</span>
            <span className={`${styles.flowStep} ${styles.flowStepFade}`}>
              No experience
            </span>
          </div>

          {/* Curved dashed pathway SVG */}
          <svg
            className={`${styles.pathwaySvg} ps-reveal`}
            viewBox="0 0 300 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              d="M30 10 C80 10, 100 50, 150 60 S220 80, 270 110"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              fill="none"
            />
            {/* Red accent dot at midpoint */}
            <circle cx="150" cy="60" r="4" fill="var(--red)" opacity="0.7" />
            {/* Arrow at end */}
            <path
              d="M262 104L271 111L264 116"
              stroke="var(--red)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
          </svg>

          {/* Key fact / insight */}
          <div className={`${styles.insightCard} ps-reveal`}>
            <p className={styles.insightText}>
              UAE is the world&apos;s highest country with the most number of
              international buyers.
            </p>
            {/* Red scribble double underline */}
            <svg
              className={styles.scribbleDouble}
              viewBox="0 0 240 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              preserveAspectRatio="none"
            >
              <path
                d="M4 3C20 7 40 2 60 5C80 8 100 3 120 6C140 3 160 7 180 4C200 7 220 3 236 5"
                stroke="var(--red)"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M4 8C20 11 40 7 60 10C80 12 100 7 120 10C140 7 160 11 180 8C200 11 220 7 236 9"
                stroke="var(--red)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
            <span className={styles.insightSource}>
              Market insight · Prototype data
            </span>
          </div>
        </div>

        {/* ── SOLUTION ── */}
        <div className={`${styles.solutionBlock} ps-reveal`}>
          <p className={styles.eyebrow}>The solution</p>

          <h3 className={styles.solutionHeadline}>
            We make it possible for anyone to actually experience your
            property from{" "}
            <span className={styles.solutionHighlight}>
              anywhere in the world.
              <svg
                className={styles.scribbleSolution}
                viewBox="0 0 260 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 5C25 9 50 3 75 6C100 9 125 3 150 6C175 3 200 8 225 5C240 3 250 7 256 6"
                  stroke="var(--red)"
                  strokeWidth="2"
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
    </section>
  );
}
