"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./CaseStudies.module.css";

interface CaseStudiesProps {
  gsapReady: boolean;
}

interface CaseStudy {
  id: number;
  property: string;
  location: string;
  value: string | null;
  problem: string;
  experience: string;
  result: string | null; // null = omit the result field entirely
  image: string;
  imageAlt: string;
}

const cases: CaseStudy[] = [
  {
    id: 1,
    property: "Emaar Beachfront",
    location: "Dubai Harbour, Dubai",
    value: null, // off-plan, no fixed price shown
    problem:
      "An off-plan luxury development on a private island at Dubai Harbour — buyers from overseas needed to understand the premium lifestyle, location, and views before they could commit to a property they'd never physically seen.",
    experience:
      "An immersive VR experience designed to let buyers fully visualize the development, surrounding amenities, and waterfront lifestyle — before they visit.",
    result: null, // project still in progress — field removed
    image: "/images/cases/emaar-beachfront.webp",
    imageAlt: "Emaar Beachfront aerial view, Dubai Harbour",
  },
  {
    id: 2,
    property: "Lodha Altamount",
    location: "South Mumbai",
    value: "$3.4M",
    problem:
      "Presiding over South Mumbai from the highest point of Altamount Road, Lodha Altamount required a digital experience that could communicate its extraordinary privacy, panoramic views of the Arabian Sea, and ultra-premium positioning to international buyers who couldn't easily visit.",
    experience:
      "A cinematic immersive experience capturing the 270° panoramic views across Haji Ali, the Queen's Necklace, the Arabian Sea, and the Mumbai skyline — letting buyers feel the elevation and exclusivity before stepping foot on site.",
    result: null,
    image: "/images/cases/lodha-altamount.webp",
    imageAlt: "Lodha Altamount luxury tower, South Mumbai",
  },
  {
    id: 3,
    property: "Orient Grand",
    location: "Bandra",
    value: null,
    problem:
      "A pre-launch G+24 uber-luxury development in Bandra with world-class fixtures, technology integration, and premium lifestyle amenities — the challenge was helping buyers experience the vision of the project before construction completed.",
    experience:
      "A comprehensive digital experience showcasing the architectural design, international-standard finishes, gated community lifestyle, and premium amenities — giving buyers a complete picture of the living experience they were investing in.",
    result: null,
    image: "/images/cases/orient-grand.webp",
    imageAlt: "Orient Grand luxury development, Bandra",
  },
];

export default function CaseStudies({ gsapReady }: CaseStudiesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // For infinite loop: duplicate the cards array (3 sets)
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

        setActiveIndex(closestIndex % totalOriginal);

        // Infinite loop reset
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

  // On mount: scroll to the middle set
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    requestAnimationFrame(() => {
      const cards = carousel.querySelectorAll<HTMLElement>(
        `.${styles.caseCard}`
      );
      if (cards.length > totalOriginal) {
        const targetCard = cards[totalOriginal];
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
      const targetCard = cards[totalOriginal + index];
      if (targetCard) {
        carousel.scrollTo({
          left: targetCard.offsetLeft - carousel.offsetLeft,
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
            {/* Property image */}
            <div className={styles.caseMedia}>
              <Image
                src={c.image}
                alt={c.imageAlt}
                fill
                className={styles.caseImage}
                style={{ objectFit: "cover", objectPosition: "center" }}
                sizes="(max-width: 768px) 85vw, 540px"
                priority={i === totalOriginal} // middle set's first card
              />
            </div>

            {/* Case details */}
            <div className={styles.caseDetails}>
              <div className={styles.caseMeta}>
                <span className={styles.caseProperty}>{c.property}</span>
                <span className={styles.caseDivider}>·</span>
                <span className={styles.caseLocation}>{c.location}</span>
                {c.value && (
                  <>
                    <span className={styles.caseDivider}>·</span>
                    <span className={styles.caseValue}>{c.value}</span>
                  </>
                )}
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
                {/* Only render result if it's provided */}
                {c.result !== null && (
                  <div className={styles.caseStep}>
                    <span className={styles.stepLabel}>The result</span>
                    <p className={`${styles.stepText} ${styles.resultText}`}>
                      {c.result}
                    </p>
                  </div>
                )}
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
