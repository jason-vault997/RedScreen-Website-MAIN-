"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // For infinite loop: duplicate the cards array (3 sets: original + clone + clone)
  // We place 3 copies so we can seamlessly reset scroll position
  const loopedCases = [...cases, ...cases, ...cases];
  const totalOriginal = cases.length;

  // Detect active card via scroll
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = carousel.querySelectorAll<HTMLElement>(
          `.${styles.caseCard}`
        );
        if (!cards.length) return;

        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width * 0.4;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, i) => {
          const cardRect = card.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2;
          const distance = Math.abs(cardCenter - containerCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = i;
          }
        });

        // Map back to original index
        setActiveIndex(closestIndex % totalOriginal);

        // Infinite loop: if we've scrolled into the 3rd set, jump back to 2nd set
        // If we're in the 1st set, jump forward to 2nd set
        if (closestIndex >= totalOriginal * 2) {
          const targetIndex = closestIndex - totalOriginal;
          const targetCard = cards[targetIndex];
          if (targetCard) {
            carousel.scrollTo({
              left: targetCard.offsetLeft - carousel.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        } else if (closestIndex < totalOriginal) {
          const targetIndex = closestIndex + totalOriginal;
          const targetCard = cards[targetIndex];
          if (targetCard) {
            carousel.scrollTo({
              left: targetCard.offsetLeft - carousel.offsetLeft,
              behavior: "instant" as ScrollBehavior,
            });
          }
        }
      }, 120);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [totalOriginal]);

  // On mount: scroll to the middle set so infinite loop works in both directions
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    requestAnimationFrame(() => {
      const cards = carousel.querySelectorAll<HTMLElement>(
        `.${styles.caseCard}`
      );
      if (cards.length > totalOriginal) {
        const targetCard = cards[totalOriginal]; // first card of middle set
        if (targetCard) {
          carousel.scrollTo({
            left: targetCard.offsetLeft - carousel.offsetLeft,
            behavior: "instant" as ScrollBehavior,
          });
        }
      }
    });
  }, [totalOriginal]);

  // GSAP scroll reveals
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
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  // Pagination dot click
  const scrollToCard = useCallback(
    (index: number) => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const cards = carousel.querySelectorAll<HTMLElement>(
        `.${styles.caseCard}`
      );
      // Scroll to the middle set's card
      const targetCard = cards[totalOriginal + index];
      if (targetCard) {
        carousel.scrollTo({
          left:
            targetCard.offsetLeft -
            carousel.offsetLeft,
          behavior: "smooth",
        });
      }
    },
    [totalOriginal]
  );

  return (
    <section ref={sectionRef} className={styles.section} id="cases">
      <div className={styles.headerContainer}>
        <div className={styles.header}>
          <p className={`${styles.label} cases-heading`}>Case studies</p>
          <h2 className={`${styles.heading} cases-heading`}>
            Real properties.
            <br />
            Real outcomes.
          </h2>
        </div>
      </div>

      {/* Horizontal swipe carousel */}
      <div ref={carouselRef} className={styles.carousel}>
        {loopedCases.map((c, i) => (
          <article
            key={`${c.id}-${i}`}
            className={`${styles.caseCard} ${
              i % totalOriginal === activeIndex
                ? styles.cardActive
                : styles.cardInactive
            }`}
          >
            {/* Image placeholder */}
            <div className={styles.caseMedia}>
              <div className={styles.mediaPlaceholder}>
                <span className={styles.mediaLabel}>PROPERTY VISUAL</span>
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

      {/* Pagination dots */}
      <div className={styles.pagination}>
        {cases.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${
              i === activeIndex ? styles.dotActive : ""
            }`}
            onClick={() => scrollToCard(i)}
            aria-label={`Go to case study ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
