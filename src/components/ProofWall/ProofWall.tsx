"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ProofWall.module.css";

interface ProofWallProps {
  gsapReady: boolean;
}

/* ─────────────────────────────────────────
   10 FICTIONAL PROTOTYPE MESSAGES
   ─────────────────────────────────────────
   These are temporary placeholder testimonials.
   Replace this array with real client messages later.
   All names are fictional. No real people are represented. */

const messages = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Property Developer · Mumbai",
    initials: "AM",
    color: "#6B4C3B",
    message:
      "Honestly, this made the property feel way more real than the normal walkthrough we were using. Buyers started asking questions we normally only get after a site visit.",
    highlight: "way more real than the normal walkthrough",
  },
  {
    id: 2,
    name: "Sarah Thompson",
    role: "Real Estate Agent · Sydney",
    initials: "ST",
    color: "#3B5B6B",
    message:
      "I had buyers in another country asking questions we normally get only after a site visit. That's never happened before with just a listing.",
    highlight: "asking questions we normally get only after a site visit",
  },
  {
    id: 3,
    name: "Hassan Al-Rashid",
    role: "Investment Advisor · Dubai",
    initials: "HR",
    color: "#5B3B6B",
    message:
      "This is the first time I felt like someone could actually understand the property without standing inside it. My clients made decisions faster.",
    highlight: "understand the property without standing inside it",
  },
  {
    id: 4,
    name: "Priya Kapoor",
    role: "Luxury Brokerage · Delhi",
    initials: "PK",
    color: "#6B3B4C",
    message:
      "The new experience gave us a much better conversation with serious buyers. Less explaining, more closing.",
    highlight: "Less explaining, more closing",
  },
  {
    id: 5,
    name: "Daniel Whitmore",
    role: "Property Consultant · Melbourne",
    initials: "DW",
    color: "#3B6B5B",
    message:
      "You can immediately tell this isn't just another property listing. The quality speaks before you even read the copy.",
    highlight: "isn't just another property listing",
  },
  {
    id: 6,
    name: "Aisha Rahman",
    role: "Sales Director · Abu Dhabi",
    initials: "AR",
    color: "#6B5B3B",
    message:
      "We showed the experience to three HNI buyers overseas. Two of them booked a viewing within a week. That turnaround time is unheard of for us.",
    highlight: "Two of them booked a viewing within a week",
  },
  {
    id: 7,
    name: "Rohan Desai",
    role: "Developer · Bangalore",
    initials: "RD",
    color: "#4C3B6B",
    message:
      "Our existing video tours were getting skipped. This actually held attention. The enquiry quality improved immediately.",
    highlight: "The enquiry quality improved immediately",
  },
  {
    id: 8,
    name: "Chloe Bennett",
    role: "Marketing Lead · Brisbane",
    initials: "CB",
    color: "#3B4C6B",
    message:
      "I was sceptical at first, but the feedback from our international leads completely changed my mind. They felt like they'd been to the property.",
    highlight: "felt like they'd been to the property",
  },
  {
    id: 9,
    name: "Vikram Singh",
    role: "Portfolio Manager · Pune",
    initials: "VS",
    color: "#5B6B3B",
    message:
      "The whole process from inquiry to offer shortened. We couldn't figure out why at first — then we realised it was the experience doing the work.",
    highlight: "the experience doing the work",
  },
  {
    id: 10,
    name: "Maya Fernandes",
    role: "Broker · Goa",
    initials: "MF",
    color: "#6B3B3B",
    message:
      "A client in London told me he felt confident enough to make an offer without visiting. That's never happened with a regular listing.",
    highlight: "make an offer without visiting",
  },
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

        gsap.from(".proof-visual", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".proof-visual",
            start: "top 80%",
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  // Render highlighted message text
  const renderMessage = (msg: string, highlight: string) => {
    const idx = msg.indexOf(highlight);
    if (idx === -1) return msg;
    const before = msg.slice(0, idx);
    const after = msg.slice(idx + highlight.length);
    return (
      <>
        {before}
        <span className={styles.msgHighlight}>{highlight}</span>
        {after}
      </>
    );
  };

  // Duplicate messages for seamless CSS animation loop
  const streamMessages = [...messages, ...messages];

  return (
    <section ref={sectionRef} className={styles.section} id="evidence">
      <div className={styles.container}>
        {/* Header */}
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

        {/* Flowing message stream */}
        <div className={styles.streamContainer}>
          {/* Top/bottom fade masks */}
          <div className={styles.streamFadeTop} />
          <div className={styles.streamFadeBottom} />

          <div className={styles.streamTrack}>
            {streamMessages.map((msg, i) => (
              <div key={`${msg.id}-${i}`} className={styles.msgCard}>
                <p className={styles.msgText}>
                  &ldquo;{renderMessage(msg.message, msg.highlight)}&rdquo;
                </p>
                <div className={styles.msgAuthor}>
                  {/* Initials avatar */}
                  <div
                    className={styles.avatar}
                    style={{ background: msg.color }}
                  >
                    <span className={styles.avatarInitials}>
                      {msg.initials}
                    </span>
                  </div>
                  <div>
                    <span className={styles.authorName}>{msg.name}</span>
                    <span className={styles.authorRole}>{msg.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proof dashboard visual */}
        <div className={`${styles.proofVisual} proof-visual`}>
          <Image
            src="/images/proof/proof-dashboard.webp"
            alt="Sales dashboard showing closed property deals and buyer engagement metrics"
            width={1200}
            height={700}
            className={styles.proofImage}
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
