"use client";

import Image from "next/image";
import styles from "./TrustLogos.module.css";

const logos = [
  { src: "/images/trust/trust-logo-1.png", alt: "Partner company 1" },
  { src: "/images/trust/trust-logo-2.png", alt: "Partner company 2" },
  { src: "/images/trust/trust-logo-3.png", alt: "Partner company 3" },
  { src: "/images/trust/trust-logo-4.png", alt: "Partner company 4" },
  { src: "/images/trust/trust-logo-5.png", alt: "Partner company 5" },
];

export default function TrustLogos() {
  // Triplicate logos for truly seamless infinite loop:
  // We translate from 0 → one-set-width, then reset invisibly
  const trackLogos = [...logos, ...logos, ...logos];

  return (
    <section className={styles.section} aria-label="Trusted by industry leaders">
      <p className={styles.heading}>Trusted By Industry Leaders</p>
      <div className={styles.marqueeContainer}>
        {/* Left/right edge fade masks */}
        <div className={styles.edgeFadeLeft} />
        <div className={styles.edgeFadeRight} />
        <div className={styles.marqueeTrack} aria-hidden="true">
          {trackLogos.map((logo, i) => (
            <div key={i} className={styles.logoItem}>
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={60}
                className={styles.logoImage}
                style={{ width: "auto" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
