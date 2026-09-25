"use client";

import { useEffect, useRef } from "react";
import styles from "./CaseStudies.module.css";

interface CaseStudiesProps {
  gsapReady: boolean;
}

const cases = [
  {
    id: 1,
    property: "[PROPERTY NAME]",
    location: "[LOCATION]",
    value: "[PROPERTY VALUE]",
    problem: "[The challenge this property faced in the market]",
    experience: "[The immersive experience RedScreen created]",
    result: "[REAL OUTCOME]",
  },
  {
    id: 2,
    property: "[PROPERTY NAME]",
    location: "[LOCATION]",
    value: "[PROPERTY VALUE]",
    problem: "[The challenge this property faced in the market]",
    experience: "[The immersive experience RedScreen created]",
    result: "[REAL OUTCOME]",
  },
  {
    id: 3,
    property: "[PROPERTY NAME]",
    location: "[LOCATION]",
    value: "[PROPERTY VALUE]",
    problem: "[The challenge this property faced in the market]",
    experience: "[The immersive experience RedScreen created]",
    result: "[REAL OUTCOME]",
  },
];

export default function CaseStudies({ gsapReady }: CaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".cases-heading", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        gsap.utils.toArray<HTMLElement>(".case-card").forEach((el, i) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.15,
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
    <section ref={sectionRef} className={styles.section} id="cases">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={`${styles.label} cases-heading`}>Case studies</p>
          <h2 className={`${styles.heading} cases-heading`}>
            Real properties.
            <br />
            Real outcomes.
          </h2>
        </div>

        <div className={styles.caseList}>
          {cases.map((c) => (
            <article key={c.id} className={`${styles.caseCard} case-card`}>
              {/* Image placeholder */}
              <div className={styles.caseMedia}>
                <div className={styles.mediaPlaceholder}>
                  <span className={styles.mediaLabel}>
                    PROPERTY VISUAL
                  </span>
                </div>
              </div>

              {/* Case details */}
              <div className={styles.caseDetails}>
                <div className={styles.caseMeta}>
                  <span className={styles.caseProperty}>{c.property}</span>
                  <span className={styles.caseDivider}>·</span>
                  <span className={styles.caseLocation}>{c.location}</span>
                  <span className={styles.caseDivider}>·</span>
                  <span className={styles.caseValue}>{c.value}</span>
                </div>

                <div className={styles.caseFlow}>
                  <div className={styles.caseStep}>
                    <span className={styles.stepLabel}>The challenge</span>
                    <p className={styles.stepText}>{c.problem}</p>
                  </div>
                  <div className={styles.caseStep}>
                    <span className={styles.stepLabel}>The experience</span>
                    <p className={styles.stepText}>{c.experience}</p>
                  </div>
                  <div className={styles.caseStep}>
                    <span className={styles.stepLabel}>The result</span>
                    <p className={`${styles.stepText} ${styles.resultText}`}>
                      {c.result}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
