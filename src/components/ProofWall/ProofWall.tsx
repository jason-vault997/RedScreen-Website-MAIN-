"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProofWall.module.css";

interface ProofWallProps {
  gsapReady: boolean;
}

/* ─────────────────────────────────────────
   SUPPLIED TESTIMONIALS — real text, exact usernames
   Portraits from the user-supplied photo sheet (Ref E)
   ───────────────────────────────────────── */

interface Testimonial {
  id: string;
  username: string;
  avatar: string;
  verified: boolean;
  time: string;
  text: string;
  highlight: string;
  textAfter: string;
  layer: "front" | "mid" | "back";
  startX: number;   // % from left
  startY: number;   // % from top (starting position)
  rotate: number;
  driftX: number;    // px horizontal drift during rise
  speed: number;     // multiplier (1 = normal, <1 = slower)
}

const testimonials: Testimonial[] = [
  {
    id: "alex",
    username: "alex.harrington.ae",
    avatar: "/images/proof/avatars/alex_harrington.webp",
    verified: true,
    time: "3h",
    text: "The 3D walkthrough completely changed how our international buyers view the property. We've had ",
    highlight: "4 serious offers",
    textAfter: " in the first month. 🔥",
    layer: "front",
    startX: 22,
    startY: 20,
    rotate: 2,
    driftX: 8,
    speed: 1,
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
    layer: "front",
    startX: -2,
    startY: 32,
    rotate: -3,
    driftX: -5,
    speed: 0.85,
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
    layer: "front",
    startX: 20,
    startY: 45,
    rotate: 1,
    driftX: 6,
    speed: 0.92,
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
    layer: "front",
    startX: 52,
    startY: 33,
    rotate: 3.5,
    driftX: -4,
    speed: 1.1,
  },
  {
    id: "priya",
    username: "priyamalik.realty",
    avatar: "/images/proof/avatars/priya_malik.webp",
    verified: false,
    time: "8h",
    text: "Our overseas viewings have ",
    highlight: "increased by 3x",
    textAfter: ". The experience is unreal.",
    layer: "front",
    startX: 2,
    startY: 58,
    rotate: -2,
    driftX: 10,
    speed: 0.78,
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
    layer: "front",
    startX: 48,
    startY: 56,
    rotate: 2.5,
    driftX: -8,
    speed: 0.95,
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
    layer: "front",
    startX: 18,
    startY: 72,
    rotate: -1.5,
    driftX: 5,
    speed: 0.88,
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
    layer: "back",
    startX: -10,
    startY: 8,
    rotate: -5,
    driftX: 4,
    speed: 0.55,
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
    layer: "back",
    startX: 65,
    startY: 5,
    rotate: 4,
    driftX: -3,
    speed: 0.5,
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
    layer: "back",
    startX: -8,
    startY: 78,
    rotate: -3,
    driftX: 6,
    speed: 0.6,
  },
  {
    id: "raymond",
    username: "raymondlee.property",
    avatar: "/images/proof/avatars/raymond_lee.webp",
    verified: false,
    time: "3d",
    text: "More qualified leads and better conversations. The ",
    highlight: "difference is obvious.",
    textAfter: "",
    layer: "back",
    startX: 15,
    startY: 88,
    rotate: 2,
    driftX: -5,
    speed: 0.65,
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
    layer: "back",
    startX: 68,
    startY: 75,
    rotate: 3.5,
    driftX: -4,
    speed: 0.58,
  },
];

/* Instagram icon */
function IgIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className={styles.igIcon}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

/* Verified badge */
function VerifiedBadge() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className={styles.badge}>
      <circle cx="12" cy="12" r="10" fill="#1D9BF0" />
      <path d="M8 12.5L11 15.5L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProofWall({ gsapReady }: ProofWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gsapReady || !sectionRef.current || !fieldRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Heading reveal
        gsap.from(".evidence-heading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        if (!prefersReduced) {
          // Each card: independent slow rise + horizontal drift + subtle rotation
          gsap.utils.toArray<HTMLElement>(".proof-card").forEach((card) => {
            const speed = parseFloat(card.dataset.speed || "1");
            const driftX = parseFloat(card.dataset.driftx || "0");
            const baseRotate = parseFloat(card.dataset.rotate || "0");
            const duration = 12 + (1 - speed) * 10 + Math.random() * 6;
            const delay = Math.random() * 4;

            // Primary: slow upward rise
            gsap.to(card, {
              y: `-=${45 + Math.random() * 25}`,
              x: `+=${driftX}`,
              rotation: baseRotate + (Math.random() > 0.5 ? 1.5 : -1.5),
              duration,
              ease: "none",
              repeat: -1,
              yoyo: true,
              delay,
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
          {/* Top/bottom fade masks via CSS pseudo-elements */}
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`${styles.proofCard} ${styles[`layer_${t.layer}`]} proof-card`}
              data-speed={t.speed}
              data-driftx={t.driftX}
              data-rotate={t.rotate}
              style={{
                left: `${t.startX}%`,
                top: `${t.startY}%`,
                transform: `rotate(${t.rotate}deg)`,
              }}
            >
              <div className={styles.pcHeader}>
                <Image
                  src={t.avatar}
                  alt=""
                  width={36}
                  height={36}
                  className={styles.pcAvatar}
                />
                <span className={styles.pcName}>{t.username}</span>
                {t.verified && <VerifiedBadge />}
                <span className={styles.pcTime}>{t.time}</span>
                <IgIcon />
              </div>
              <p className={styles.pcMsg}>
                {t.text}
                <span className={styles.pcRed}>{t.highlight}</span>
                {t.textAfter}
              </p>
            </div>
          ))}
        </div>

        {/* ── Proof Dashboard ── */}
        <div className={`${styles.dashboardWrap} proof-dashboard`}>
          <Image
            src="/images/proof/proof-dashboard.webp"
            alt="Sales dashboard showing closed property deals and buyer engagement metrics"
            width={1200}
            height={700}
            className={styles.dashImage}
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
