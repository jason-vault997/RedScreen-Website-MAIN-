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
        // Statement reveal
        gsap.from(".problem-statement", {
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
        gsap.utils.toArray<HTMLElement>(".problem-point").forEach((el, i) => {
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
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        {/* The big statement */}
        <div className={styles.statementBlock}>
          <h2 className={`${styles.statement} problem-statement`}>
            Multi-million-dollar properties
            <br />
            <span className={styles.statementRed}>deserve more than a listing.</span>
          </h2>
        </div>

        {/* The problem */}
        <div className={styles.problemContent}>
          <div className={styles.problemIntro}>
            <p className={`${styles.problemText} problem-point`}>
              A property worth $5M receives the same digital experience as a
              property worth $500K. The same grid of photos. The same scrollable
              description. The same passive browsing experience.
            </p>
          </div>

          <div className={styles.problemGrid}>
            <div className={`${styles.problemItem} problem-point`}>
              <span className={styles.problemDash}>—</span>
              <p>The buyer scrolls through images</p>
            </div>
            <div className={`${styles.problemItem} problem-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Reads a description</p>
            </div>
            <div className={`${styles.problemItem} problem-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Maybe watches a video</p>
            </div>
            <div className={`${styles.problemItem} problem-point`}>
              <span className={styles.problemDash}>—</span>
              <p>Then leaves</p>
            </div>
          </div>

          <p className={`${styles.conclusion} problem-point`}>
            That experience does not communicate the full value of the property.
            It does not build confidence. It does not differentiate.
          </p>
        </div>
      </div>
    </section>
  );
}
