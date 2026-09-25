"use client";

import { useEffect, useRef } from "react";
import styles from "./Mechanism.module.css";

interface MechanismProps {
  gsapReady: boolean;
}

const steps = [
  {
    num: "01",
    title: "Study the property",
    desc: "We study the property, its market position, the buyer profile, and the decision they need to make.",
  },
  {
    num: "02",
    title: "Build the narrative",
    desc: "Every high-value property has a story. We structure it around the buyer journey — from first impression to confident enquiry.",
  },
  {
    num: "03",
    title: "Create the experience",
    desc: "Cinematic visuals, interactive storytelling, immersive presentation — built around one property, one buyer, one decision.",
  },
  {
    num: "04",
    title: "Engineer the close",
    desc: "Every element exists to move a serious buyer from curiosity to confidence to action.",
  },
];

export default function Mechanism({ gsapReady }: MechanismProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".mechanism-heading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        gsap.utils.toArray<HTMLElement>(".mechanism-step").forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.8,
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
    <section ref={sectionRef} className={styles.section} id="process">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={`${styles.label} mechanism-heading`}>The process</p>
          <h2 className={`${styles.heading} mechanism-heading`}>
            How we build it.
          </h2>
        </div>

        <div className={styles.timeline}>
          {steps.map((step) => (
            <div key={step.num} className={`${styles.step} mechanism-step`}>
              <div className={styles.stepLine}>
                <span className={styles.stepNum}>{step.num}</span>
                <div className={styles.stepConnector} />
              </div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
