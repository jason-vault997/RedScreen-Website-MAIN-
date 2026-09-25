"use client";

import { useEffect, useRef } from "react";
import styles from "./ProofWall.module.css";

interface ProofWallProps {
  gsapReady: boolean;
}

const proofSlots = [
  { id: 1, type: "whatsapp", label: "WHATSAPP CLIENT MESSAGE", size: "tall" },
  { id: 2, type: "dashboard", label: "SALES DASHBOARD", size: "wide" },
  { id: 3, type: "email", label: "CLIENT EMAIL", size: "normal" },
  { id: 4, type: "screenshot", label: "PROPERTY EXPERIENCE SCREENSHOT", size: "wide" },
  { id: 5, type: "message", label: "CLIENT FEEDBACK", size: "normal" },
  { id: 6, type: "whatsapp", label: "CLIENT MESSAGE", size: "tall" },
  { id: 7, type: "dashboard", label: "ENQUIRY RESULTS", size: "normal" },
  { id: 8, type: "screenshot", label: "BEFORE / AFTER COMPARISON", size: "wide" },
  { id: 9, type: "message", label: "POST-PROJECT FEEDBACK", size: "normal" },
];

export default function ProofWall({ gsapReady }: ProofWallProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".evidence-heading", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        gsap.utils.toArray<HTMLElement>(".evidence-item").forEach((el, i) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            scale: 0.97,
            duration: 0.7,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
            },
          });
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.section} id="evidence">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={`${styles.label} evidence-heading`}>
            Evidence, not adjectives
          </p>
          <h2 className={`${styles.heading} evidence-heading`}>
            The proof room.
          </h2>
          <p className={`${styles.subtext} evidence-heading`}>
            Real messages. Real dashboards. Real client feedback. Real property
            results.
          </p>
        </div>

        <div className={styles.grid}>
          {proofSlots.map((slot) => (
            <div
              key={slot.id}
              className={`${styles.proofCard} ${
                styles[`size_${slot.size}`]
              } evidence-item`}
            >
              <div className={styles.cardInner}>
                <div className={styles.typeTag}>
                  {slot.type === "whatsapp" && (
                    <span className={styles.tagIcon}>💬</span>
                  )}
                  {slot.type === "dashboard" && (
                    <span className={styles.tagIcon}>📊</span>
                  )}
                  {slot.type === "email" && (
                    <span className={styles.tagIcon}>✉️</span>
                  )}
                  {slot.type === "screenshot" && (
                    <span className={styles.tagIcon}>🖥️</span>
                  )}
                  {slot.type === "message" && (
                    <span className={styles.tagIcon}>💬</span>
                  )}
                  <span className={styles.tagText}>REAL CLIENT PROOF</span>
                </div>
                <p className={styles.slotLabel}>{slot.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
