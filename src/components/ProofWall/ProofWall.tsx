"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProofWall.module.css";

interface ProofWallProps {
  gsapReady: boolean;
}

/* ─────────────────────────────────────────
   TESTIMONIAL POOL
   Supplied usernames/text preserved exactly.
   Portraits from supplied Reference E photo sheet.
   ───────────────────────────────────────── */

const POOL = [
  {
    id: "alex",
    username: "alex.harrington.ae",
    avatar: "/images/proof/avatars/alex_harrington.webp",
    verified: true,
    time: "3h",
    text: "The 3D walkthrough completely changed how our international buyers view the property. We've had ",
    red: "4 serious offers",
    after: " in the first month. 🔥",
  },
  {
    id: "james",
    username: "jameswilsonre",
    avatar: "/images/proof/avatars/james_wilson.webp",
    verified: true,
    time: "1d",
    text: "Incredible work. Our enquiries from overseas have ",
    red: "increased massively",
    after: " since the site went live.",
  },
  {
    id: "daniel",
    username: "daniel.khaaan",
    avatar: "/images/proof/avatars/daniel_khaan.webp",
    verified: true,
    time: "6h",
    text: "Was skeptical at first, but this actually makes buyers feel like they've been to the property. ",
    red: "Game changer.",
    after: "",
  },
  {
    id: "sarah",
    username: "sarah.luxeliving",
    avatar: "/images/proof/avatars/sarah_luxeliving.webp",
    verified: false,
    time: "5h",
    text: "The attention to detail is next level. Our brand finally feels ",
    red: "premium",
    after: " online. 🙌",
  },
  {
    id: "priya",
    username: "priyamalik.realty",
    avatar: "/images/proof/avatars/priya_malik.webp",
    verified: false,
    time: "8h",
    text: "Our overseas viewings have ",
    red: "increased by 3x",
    after: ". The experience is unreal.",
  },
  {
    id: "luke",
    username: "lukemartin.au",
    avatar: "/images/proof/avatars/luke_martin.webp",
    verified: false,
    time: "12h",
    text: "Super smooth process and incredible results. The site looks ",
    red: "world class.",
    after: "",
  },
  {
    id: "natasha",
    username: "natashawilson.au",
    avatar: "/images/proof/avatars/natasha_wilson.webp",
    verified: false,
    time: "1d",
    text: "We've received ",
    red: "serious buyers",
    after: " from the UK and Singapore within days. This is on another level.",
  },
  {
    id: "matthew",
    username: "matthew.chen",
    avatar: "/images/proof/avatars/matthew_chen.webp",
    verified: false,
    time: "2d",
    text: "Clean design, fast and conversion focused. ",
    red: "Exactly what we needed.",
    after: "",
  },
  {
    id: "oliver",
    username: "olivergrant",
    avatar: "/images/proof/avatars/olivergrant.webp",
    verified: false,
    time: "2d",
    text: "Best investment we've made this year for ",
    red: "our brand.",
    after: "",
  },
  {
    id: "emma",
    username: "emma.clarke.re",
    avatar: "/images/proof/avatars/emma_clarke.webp",
    verified: false,
    time: "3d",
    text: "The walkthrough feels so real. Our clients ",
    red: "in Singapore love it.",
    after: "",
  },
  {
    id: "raymond",
    username: "raymondlee.property",
    avatar: "/images/proof/avatars/raymond_lee.webp",
    verified: false,
    time: "3d",
    text: "More qualified leads and better conversations. The ",
    red: "difference is obvious.",
    after: "",
  },
  {
    id: "chris",
    username: "chrisnguyen.re",
    avatar: "/images/proof/avatars/chris_nguyen.webp",
    verified: false,
    time: "2d",
    text: "This has completely ",
    red: "elevated our online",
    after: " presence. Loving the results.",
  },
];

/* Lane definitions: each card gets a lane with fixed x%, angle, scale tier */
interface Lane {
  x: number;          // % from left (card left edge)
  rotate: number;     // rotation in deg
  tier: "front" | "mid" | "back"; // visual depth
  driftX: number;     // px of horizontal drift per full animation cycle
  durationBase: number; // base seconds for one full rise
}

const LANES: Lane[] = [
  { x: 5,  rotate: -3.5, tier: "back",  driftX: 8,   durationBase: 18 },
  { x: 22, rotate:  2,   tier: "front", driftX: 5,   durationBase: 13 },
  { x: 40, rotate: -1.5, tier: "front", driftX: -6,  durationBase: 15 },
  { x: 58, rotate:  3,   tier: "mid",   driftX: -4,  durationBase: 16 },
  { x: 68, rotate: -4,   tier: "back",  driftX: -7,  durationBase: 20 },
  { x: 12, rotate:  1.5, tier: "mid",   driftX: 6,   durationBase: 14 },
  { x: 48, rotate: -2,   tier: "front", driftX: -3,  durationBase: 12 },
  // ── 3 additional lanes for denser field ──
  { x: 30, rotate:  1,   tier: "mid",   driftX: 4,   durationBase: 17 },
  { x: 54, rotate: -2.5, tier: "back",  driftX: -5,  durationBase: 22 },
  { x: 74, rotate:  3.5, tier: "front", driftX: -8,  durationBase: 11 },
];

/* Inline icons */
function IgIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={styles.igIcon}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={styles.badge}>
      <circle cx="12" cy="12" r="10" fill="#1D9BF0" />
      <path d="M8 12.5L11 15.5L16.5 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ProofWall({ gsapReady }: ProofWallProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !fieldRef.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let gsapInstance: typeof import("gsap").default | null = null;
    let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;
    let ctx: { revert: () => void } | null = null;
    let observer: IntersectionObserver | null = null;
    let animationsStarted = false;

    const startCardAnimations = () => {
      if (!gsapInstance || animationsStarted || !fieldRef.current) return;
      animationsStarted = true;

      const cards = fieldRef.current.querySelectorAll<HTMLElement>(".proof-stream-card");

      cards.forEach((card) => {
        const lane = parseInt(card.dataset.lane || "0", 10);
        const laneData = LANES[lane % LANES.length];
        const durationVariance = (Math.random() - 0.5) * 4; // ±2s variance
        const duration = laneData.durationBase + durationVariance;
        // Stagger start: some cards start mid-animation for immediate visual activity
        const initialProgress = parseFloat(card.dataset.initialProgress || "0");
        // Position: start below visible area, rise through, exit at top
        const fieldH = fieldRef.current!.offsetHeight;

        const tl = gsapInstance!.timeline({ repeat: -1 });

        // Card height approximately 120px, start from fieldH+20
        const startY = fieldH + 20;
        const endY = -160; // above field
        const totalTravel = startY - endY;

        // For immediately visible cards (mid-stream start), set initial position
        const startYForCard = startY - totalTravel * initialProgress;

        gsapInstance!.set(card, {
          y: startYForCard,
          x: laneData.driftX * initialProgress,
          opacity: 0,
          rotation: laneData.rotate,
        });

        tl.to(card, {
          y: startY,
          x: 0,
          opacity: 0,
          duration: 0,
        });

        // Rise from below: fade in as entering
        tl.to(card, {
          y: fieldH * 0.7,
          x: laneData.driftX * 0.4,
          opacity: laneData.tier === "back" ? 0.38 : laneData.tier === "mid" ? 0.7 : 1,
          duration: duration * 0.3,
          ease: "none",
        });

        // Mid rise: full opacity
        tl.to(card, {
          y: fieldH * 0.3,
          x: laneData.driftX * 0.7,
          opacity: laneData.tier === "back" ? 0.38 : laneData.tier === "mid" ? 0.7 : 1,
          duration: duration * 0.35,
          ease: "none",
        });

        // Upper fade: dissolve as exiting
        tl.to(card, {
          y: endY,
          x: laneData.driftX,
          opacity: 0,
          duration: duration * 0.35,
          ease: "none",
        });

        // Use initialProgress to start each card at a different point
        tl.progress(initialProgress);
        tl.play();
      });
    };

    const init = async () => {
      const gsapModule = await import("gsap");
      const { ScrollTrigger: ST } = await import("gsap/ScrollTrigger");
      gsapInstance = gsapModule.default;
      ScrollTrigger = ST;
      gsapInstance.registerPlugin(ScrollTrigger);

      ctx = gsapInstance.context(() => {
        // Header reveal
        gsapInstance!.from(".evidence-heading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        });

        // Dashboard reveal
        gsapInstance!.from(".proof-dashboard", {
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

      // PREACTIVATION: Start animations when section is 200px below viewport
      // so cards are already moving when user arrives
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              startCardAnimations();
              observer?.disconnect();
            }
          });
        },
        {
          // Negative rootMargin: trigger 200px BEFORE the element is in viewport
          rootMargin: "200px 0px 0px 0px",
          threshold: 0,
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }
    };

    init();

    return () => {
      ctx?.revert();
      observer?.disconnect();
    };
  }, [gsapReady]);

  // Build cards: each POOL item × LANES length positions
  // We create one card per lane and cycle through pool
  const streamCards = LANES.map((lane, laneIdx) => {
    const poolItem = POOL[laneIdx % POOL.length];
    // Spread initial progress so cards start at different heights
    const initialProgress = (laneIdx / LANES.length);
    return { ...poolItem, ...lane, laneIdx, initialProgress };
  });

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

        {/* ── Floating social proof stream ── */}
        <div ref={fieldRef} className={styles.proofField}>
          {streamCards.map((c) => (
            <div
              key={`${c.id}-${c.laneIdx}`}
              className={`${styles.proofCard} ${styles[`tier_${c.tier}`]} proof-stream-card`}
              data-lane={c.laneIdx}
              data-initial-progress={c.initialProgress.toFixed(3)}
              style={{
                left: `${c.x}%`,
                top: 0,            /* GSAP controls Y */
                transform: `rotate(${c.rotate}deg)`,
                position: "absolute",
              }}
            >
              {/* Header */}
              <div className={styles.cardHeader}>
                <Image
                  src={c.avatar}
                  alt=""
                  width={28}
                  height={28}
                  className={styles.cardAvatar}
                />
                <span className={styles.cardName}>{c.username}</span>
                {c.verified && <BadgeIcon />}
                <span className={styles.cardTime}>{c.time}</span>
                <IgIcon />
              </div>
              {/* Message */}
              <p className={styles.cardMsg}>
                {c.text}
                <span className={styles.cardRed}>{c.red}</span>
                {c.after}
              </p>
            </div>
          ))}
        </div>

        {/* ── Proof Dashboard ── */}
        <div className={`${styles.dashWrap} proof-dashboard`}>
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
