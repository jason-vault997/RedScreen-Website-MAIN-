"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./PropertyDemo.module.css";

interface PropertyDemoProps {
  gsapReady: boolean;
}

export default function PropertyDemo({ gsapReady }: PropertyDemoProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading
        gsap.from(".demo-title", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });

        // Immersive frame scale reveal
        const frame = sectionRef.current?.querySelector(".demo-frame");
        if (frame) {
          gsap.from(frame, {
            scale: 0.9,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 75%",
            },
          });
        }

        // Parallax layers
        const layerBg = sectionRef.current?.querySelector(".demo-layer-bg");
        const layerMid = sectionRef.current?.querySelector(".demo-layer-mid");
        const layerFg = sectionRef.current?.querySelector(".demo-layer-fg");

        if (layerBg) {
          gsap.to(layerBg, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          });
        }

        if (layerMid) {
          gsap.to(layerMid, {
            y: -80,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          });
        }

        if (layerFg) {
          gsap.to(layerFg, {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Features
        gsap.utils.toArray<HTMLElement>(".demo-feature").forEach((el, i) => {
          gsap.from(el, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
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
    <section ref={sectionRef} className={styles.section} id="experience-demo">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={`${styles.label} demo-title`}>See the difference</p>
          <h2 className={`${styles.heading} demo-title`}>
            Not a listing.
            <br />
            <span className={styles.headingRed}>An experience.</span>
          </h2>
        </div>

        {/* Immersive parallax scene */}
        <div className={`${styles.immersiveFrame} demo-frame`}>
          {/* Background layer — property environment */}
          <div className={`${styles.layer} ${styles.layerBg} demo-layer-bg`}>
            <Image
              src="/images/property/luxury-interior.jpg"
              alt="Premium property interior"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              className={styles.bgImage}
              loading="lazy"
            />
          </div>

          {/* Midground layer — exterior property */}
          <div className={`${styles.layer} ${styles.layerMid} demo-layer-mid`}>
            <Image
              src="/images/property/luxury-exterior.jpg"
              alt="Premium property exterior at night"
              fill
              sizes="40vw"
              style={{ objectFit: "cover" }}
              className={styles.midImage}
              loading="lazy"
            />
          </div>

          {/* Foreground layer — phone experience */}
          <div className={`${styles.layer} ${styles.layerFg} demo-layer-fg`}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <Image
                  src="/images/demo/phone-experience.jpg"
                  alt="Immersive property experience on mobile device"
                  fill
                  sizes="25vw"
                  style={{ objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Experience features */}
        <div className={styles.experienceFeatures}>
          <div className={`${styles.expFeature} demo-feature`}>
            <h3 className={styles.expTitle}>Interactive walkthrough</h3>
            <p className={styles.expDesc}>
              Not a video tour. A guided experience that adapts to each
              buyer&apos;s interests.
            </p>
          </div>
          <div className={`${styles.expFeature} demo-feature`}>
            <h3 className={styles.expTitle}>Cinematic presentation</h3>
            <p className={styles.expDesc}>
              Every visual, every transition, every detail is designed to
              communicate the value of the property.
            </p>
          </div>
          <div className={`${styles.expFeature} demo-feature`}>
            <h3 className={styles.expTitle}>Built to convert</h3>
            <p className={styles.expDesc}>
              The experience is engineered to move serious buyers from
              interest to inspection to offer.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
