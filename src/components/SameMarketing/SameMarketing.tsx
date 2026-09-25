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
        // Problem headline
        gsap.from(".ps-headline", {
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });

        // Problem points staggered
        gsap.utils.toArray<HTMLElement>(".ps-point").forEach((el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.3 + i * 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
            },
          });
        });

        // Solution block
        gsap.from(".ps-solution", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".ps-solution",
            start: "top 75%",
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
        {/* ── PROBLEM ── */}
        <div className={styles.problemBlock}>
          <p className={`${styles.sectionLabel} ps-headline`}>The problem</p>
          <h2 className={`${styles.headline} ps-headline`}>
            Your buyers can&apos;t experience
            <br />
            <span className={styles.headlineRed}>
              the property from a distance.
            </span>
          </h2>

          <p className={`${styles.problemText} ps-point`}>
            An international buyer can see the photos. Read the listing. Watch a
            video. But they still haven&apos;t experienced the property.
          </p>

          <div className={styles.problemGrid}>
            <div className={`${styles.problemItem} ps-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Scroll through photos</p>
            </div>
            <div className={`${styles.problemItem} ps-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Read the listing</p>
            </div>
            <div className={`${styles.problemItem} ps-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Watch a video</p>
            </div>
            <div className={`${styles.problemItem} ps-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Leave without taking the next step</p>
            </div>
          </div>
        </div>

        {/* ── SOLUTION ── */}
        <div className={`${styles.solutionBlock} ps-solution`}>
          <p className={styles.solutionLabel}>The solution</p>
          <h3 className={styles.solutionHeadline}>
            We let buyers experience the property
            <br />
            <span className={styles.headlineRed}>
              from anywhere in the world.
            </span>
          </h3>

          <p className={styles.solutionText}>
            A buyer can sit at home, in another country, and experience your
            property before they visit.
          </p>

          {/* Outcome */}
          <div className={styles.outcomeBlock}>
            <div className={styles.outcomeItem}>
              <span className={styles.outcomeDot} />
              <p>Better understanding of the property</p>
            </div>
            <div className={styles.outcomeItem}>
              <span className={styles.outcomeDot} />
              <p>More confidence before visiting</p>
            </div>
            <div className={styles.outcomeItem}>
              <span className={styles.outcomeDot} />
              <p>Faster decisions</p>
            </div>
            <div className={styles.outcomeItem}>
              <span className={styles.outcomeDot} />
              <p>Faster movement from enquiry to viewing to offer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
