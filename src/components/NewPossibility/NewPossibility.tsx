"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./NewPossibility.module.css";

interface NewPossibilityProps {
  gsapReady: boolean;
}

export default function NewPossibility({ gsapReady }: NewPossibilityProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading reveal
        gsap.from(".possibility-heading", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        // Parallax depth on the scene
        const bgLayer = sectionRef.current?.querySelector(".parallax-bg");
        const fgLayer = sectionRef.current?.querySelector(".parallax-fg");

        if (bgLayer) {
          gsap.to(bgLayer, {
            y: -60,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        if (fgLayer) {
          gsap.to(fgLayer, {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        // Feature items staggered
        gsap.utils.toArray<HTMLElement>(".possibility-feature").forEach((el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.12,
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
        <div className={styles.textContent}>
          <p className={`${styles.label} possibility-heading`}>
            A different approach
          </p>
          <h2 className={`${styles.heading} possibility-heading`}>
            What if your highest-value property{" "}
            <span className={styles.accent}>felt</span> like what it&apos;s
            worth?
          </h2>
          <p className={`${styles.description} possibility-heading`}>
            An immersive digital experience that lets serious buyers understand
            the property deeply — before they ever step inside.
          </p>
        </div>

        {/* Parallax scene */}
        <div className={styles.scene}>
          <div className={`${styles.sceneLayer} ${styles.sceneBg} parallax-bg`}>
            <Image
              src="/images/property/luxury-interior.jpg"
              alt="Premium property interior — cinematic experience"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className={styles.sceneImage}
              loading="lazy"
            />
          </div>
          <div className={`${styles.sceneLayer} ${styles.sceneFg} parallax-fg`}>
            <div className={styles.deviceFrame}>
              <div className={styles.deviceScreen}>
                <Image
                  src="/images/demo/phone-experience.jpg"
                  alt="Immersive property experience on mobile"
                  fill
                  sizes="30vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className={styles.features}>
          <div className={`${styles.feature} possibility-feature`}>
            <span className={styles.featureNum}>01</span>
            <div>
              <h3 className={styles.featureTitle}>Emotional connection</h3>
              <p className={styles.featureDesc}>
                Buyers feel the space, not just see it. Every detail is designed
                to create an experience, not a slideshow.
              </p>
            </div>
          </div>

          <div className={`${styles.feature} possibility-feature`}>
            <span className={styles.featureNum}>02</span>
            <div>
              <h3 className={styles.featureTitle}>Remote confidence</h3>
              <p className={styles.featureDesc}>
                International buyers understand the property fully — from
                architecture to neighbourhood — without being there.
              </p>
            </div>
          </div>

          <div className={`${styles.feature} possibility-feature`}>
            <span className={styles.featureNum}>03</span>
            <div>
              <h3 className={styles.featureTitle}>Faster decisions</h3>
              <p className={styles.featureDesc}>
                When buyers truly understand a property, they move faster. From
                enquiry to inspection to offer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
