"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProofWall.module.css";

interface ProofWallProps {
  gsapReady: boolean;
}

/* ─────────────────────────────────────────
   SUPPLIED TESTIMONIAL DATA
   From user-provided reference material.
   Usernames are preserved exactly.
   Portraits are synthetic/non-identifiable.
   ───────────────────────────────────────── */

const testimonials = [
  {
    id: "alex",
    username: "alex.harrington.ae",
    avatar: "/images/proof/avatars/alex_harrington.webp",
    verified: true,
    time: "3h",
    text: "The 3D walkthrough completely changed how our international buyers view the property. We've had ",
    highlight: "4 serious offers",
    textAfter: " in the first month. 🔥",
    layer: "front" as const,
    x: 28,
    y: 15,
    rotate: 2,
  },
  {
    id: "james",
    username: "jameswilsonre",
    avatar: "/images/proof/avatars/james_wilson.webp",
    verified: true,
    time: "1d",
    text: "Incredible work. Our enquiries from overseas have ",
    highlight: "increased massively",
    textAfter: " since the site went live.",
    layer: "front" as const,
    x: 2,
    y: 32,
    rotate: -3,
  },
  {
    id: "daniel",
    username: "daniel.khaaan",
    avatar: "/images/proof/avatars/daniel_khaan.webp",
    verified: true,
    time: "6h",
    text: "Was skeptical at first, but this actually makes buyers feel like they've been to the property. ",
    highlight: "Game changer.",
    textAfter: "",
    layer: "front" as const,
    x: 25,
    y: 48,
    rotate: 1.5,
  },
  {
    id: "sarah",
    username: "sarah.luxeliving",
    avatar: "/images/proof/avatars/sarah_luxeliving.webp",
    verified: false,
    time: "5h",
    text: "The attention to detail is next level. Our brand finally feels ",
    highlight: "premium",
    textAfter: " online. 🙌",
    layer: "front" as const,
    x: 55,
    y: 36,
    rotate: 3,
  },
  {
    id: "priya",
    username: "priyamalik.realty",
    avatar: "/images/proof/avatars/priya_malik.webp",
    verified: false,
    time: "8h",
    text: "Our overseas viewings have ",
    highlight: "increased by 3x",
    textAfter: ". The experience is unreal. Clients spend way more time on the site now.",
    layer: "front" as const,
    x: 5,
    y: 62,
    rotate: -2,
  },
  {
    id: "luke",
    username: "lukemartin.au",
    avatar: "/images/proof/avatars/luke_martin.webp",
    verified: false,
    time: "12h",
    text: "Super smooth process and incredible results. The site looks ",
    highlight: "world class.",
    textAfter: "",
    layer: "front" as const,
    x: 52,
    y: 58,
    rotate: 2.5,
  },
  {
    id: "natasha",
    username: "natashawilson.au",
    avatar: "/images/proof/avatars/natasha_wilson.webp",
    verified: false,
    time: "1d",
    text: "We've received ",
    highlight: "serious buyers",
    textAfter: " from the UK and Singapore within days. This is on another level.",
    layer: "front" as const,
    x: 20,
    y: 76,
    rotate: -1,
  },
  /* ── Background / edge cards ── */
  {
    id: "matthew",
    username: "matthew.chen",
    avatar: "/images/proof/avatars/matthew_chen.webp",
    verified: false,
    time: "2d",
    text: "Clean design, fast and conversion focused. ",
    highlight: "Exactly what we needed.",
    textAfter: "",
    layer: "back" as const,
    x: -8,
    y: 10,
    rotate: -4,
  },
  {
    id: "oliver",
    username: "olivergrant",
    avatar: "/images/proof/avatars/olivergrant.webp",
    verified: false,
    time: "2d",
    text: "Best investment we've made this year for ",
    highlight: "our brand.",
    textAfter: "",
    layer: "back" as const,
    x: 68,
    y: 8,
    rotate: 4,
  },
  {
    id: "emma",
    username: "emma.clarke.re",
    avatar: "/images/proof/avatars/emma_clarke.webp",
    verified: false,
    time: "3d",
    text: "The walkthrough feels so real. Our clients ",
    highlight: "in Singapore love it.",
    textAfter: "",
    layer: "back" as const,
    x: -5,
    y: 82,
    rotate: -3,
  },
  {
    id: "raymond",
    username: "raymondlee.property",
    avatar: "/images/proof/avatars/raymond_lee.webp",
    verified: false,
    time: "3d",
    text: "More qualified leads and better conversations. ",
    highlight: "The difference is obvious.",
    textAfter: "",
    layer: "back" as const,
    x: 18,
    y: 90,
    rotate: 2,
  },
  {
    id: "chris",
    username: "chrisnguyen.re",
    avatar: "/images/proof/avatars/chris_nguyen.webp",
    verified: false,
    time: "2d",
    text: "This has completely ",
    highlight: "elevated our online",
    textAfter: " presence. Loving the results.",
    layer: "back" as const,
    x: 72,
    y: 78,
    rotate: 3,
  },
];

/* Instagram icon SVG inline */
function IgIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={styles.igIcon}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* Verification badge */
function VerifiedBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={styles.verifiedBadge}>
      <circle cx="12" cy="12" r="10" fill="#1D9BF0" />
      <path d="M8 12.5L11 15.5L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProofWall({ gsapReady }: ProofWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Header reveal
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

        // Animate floating cards with independent motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (!prefersReduced) {
          gsap.utils.toArray<HTMLElement>(".proof-card").forEach((card) => {
            const layer = card.dataset.layer;
            const speed = layer === "back" ? 0.3 : 0.6;
            const dirX = Math.random() > 0.5 ? 1 : -1;
            const dirY = Math.random() > 0.5 ? 1 : -1;
            const rangeX = 8 + Math.random() * 12;
            const rangeY = 4 + Math.random() * 8;

            // Continuous floating motion
            gsap.to(card, {
              x: `+=${dirX * rangeX}`,
              y: `+=${dirY * rangeY}`,
              duration: 6 + Math.random() * 4,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: Math.random() * 2,
            });

            // Scroll-driven parallax
            gsap.to(card, {
              y: `+=${layer === "back" ? -30 : -15}`,
              ease: "none",
              scrollTrigger: {
                trigger: fieldRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: speed,
              },
            });
          });
        }

        // Dashboard reveal
        gsap.from(".proof-dashboard", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proof-dashboard",
            start: "top 80%",
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.section} id="evidence">
      <div className={styles.container}>
        {/* ── Header ── */}
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

        {/* ── Floating social proof field ── */}
        <div ref={fieldRef} className={styles.proofField}>
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`${styles.proofCard} ${
                t.layer === "back" ? styles.cardBack : styles.cardFront
              } proof-card`}
              data-layer={t.layer}
              style={{
                left: `${t.x}%`,
                top: `${t.y}%`,
                transform: `rotate(${t.rotate}deg)`,
              }}
            >
              {/* Card header: avatar + username + verified + time + ig icon */}
              <div className={styles.pcHeader}>
                <Image
                  src={t.avatar}
                  alt=""
                  width={32}
                  height={32}
                  className={styles.pcAvatar}
                />
                <span className={styles.pcUsername}>{t.username}</span>
                {t.verified && <VerifiedBadge />}
                <span className={styles.pcTime}>{t.time}</span>
                <IgIcon />
              </div>
              {/* Card message */}
              <p className={styles.pcText}>
                {t.text}
                <span className={styles.pcHighlight}>{t.highlight}</span>
                {t.textAfter}
              </p>
            </div>
          ))}
        </div>

        {/* ── Proof Dashboard Visual ── */}
        <div className={`${styles.dashboardWrap} proof-dashboard`}>
          <Image
            src="/images/proof/proof-dashboard.webp"
            alt="Sales dashboard showing closed property deals and buyer engagement metrics"
            width={1200}
            height={700}
            className={styles.dashboardImage}
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
