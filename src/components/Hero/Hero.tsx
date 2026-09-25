"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Hero.module.css";

interface HeroProps {
  onContactClick: () => void;
  onCaseStudiesClick: () => void;
  gsapReady: boolean;
}

export default function Hero({
  onContactClick,
  onCaseStudiesClick,
  gsapReady,
}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [figureLoaded, setFigureLoaded] = useState(false);
  const [figureVisible, setFigureVisible] = useState(false);
  const [headlineRevealed, setHeadlineRevealed] = useState(false);
  const [subRevealed, setSubRevealed] = useState(false);
  const [scribbleDrawn, setScribbleDrawn] = useState(false);
  const hasRevealedRef = useRef(false);

  // Called when the illuminated figure image finishes loading/decoding
  const handleFigureLoad = useCallback(() => {
    setFigureLoaded(true);
  }, []);

  // Core automatic intro sequence — purely time-driven, NO scroll dependency
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const startRevealSequence = () => {
      if (hasRevealedRef.current) return;
      hasRevealedRef.current = true;

      // Immediately: figure fades in + headline begins
      setFigureVisible(true);
      setHeadlineRevealed(true);

      // +500ms: scribble underline
      timers.push(
        setTimeout(() => {
          setScribbleDrawn(true);
        }, 500)
      );

      // +1000ms: supporting copy
      timers.push(
        setTimeout(() => {
          setSubRevealed(true);
        }, 1000)
      );
    };

    // Start at T=800ms if figure is already loaded, otherwise wait for load
    const initialTimer = setTimeout(() => {
      if (figureLoaded) {
        startRevealSequence();
      }
    }, 800);
    timers.push(initialTimer);

    // Absolute max wait: 3s — reveal even if image hasn't loaded (fallback)
    const maxWaitTimer = setTimeout(() => {
      startRevealSequence();
    }, 3000);
    timers.push(maxWaitTimer);

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // If figure loads after the 800ms timer already fired, reveal immediately
  useEffect(() => {
    if (figureLoaded && !hasRevealedRef.current) {
      // Image loaded but timer hasn't fired yet — wait for timer
      return;
    }
    if (figureLoaded && !figureVisible) {
      // Timer already fired but was waiting for image — reveal now
      hasRevealedRef.current = true;
      setFigureVisible(true);
      setHeadlineRevealed(true);
      setTimeout(() => setScribbleDrawn(true), 500);
      setTimeout(() => setSubRevealed(true), 1000);
    }
  }, [figureLoaded, figureVisible]);

  // GSAP parallax on scroll (does NOT control initial reveal)
  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.to(".hero-content-wrap", {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }, sectionRef);
    };

    init();
    return () => ctx?.revert();
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* ===== IMAGE LAYERS ===== */}
      <div className={styles.imageContainer}>
        {/* MOBILE composition */}
        <div className={styles.mobileImages}>
          <Image
            src="/images/hero/hero-mobile-crowd.png"
            alt="Global crowd of potential property buyers"
            fill
            priority
            sizes="100vw"
            className={styles.crowdImage}
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <Image
            src="/images/hero/hero-mobile-figure.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.figureImage} ${
              figureVisible ? styles.figureVisible : ""
            }`}
            style={{ objectFit: "cover", objectPosition: "center top" }}
            onLoad={handleFigureLoad}
          />
        </div>

        {/* DESKTOP composition */}
        <div className={styles.desktopImages}>
          <Image
            src="/images/hero/hero-desktop-crowd-new.png"
            alt="Global crowd of potential property buyers"
            fill
            priority
            sizes="100vw"
            className={styles.crowdImage}
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <Image
            src="/images/hero/hero-desktop-figure.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className={`${styles.figureImage} ${
              figureVisible ? styles.figureVisible : ""
            }`}
            style={{ objectFit: "cover", objectPosition: "center center" }}
            onLoad={handleFigureLoad}
          />
        </div>

        {/* Bottom gradient fade to black */}
        <div className={styles.bottomGradient} />
      </div>

      {/* ===== CONTENT OVERLAY ===== */}
      <div className={`${styles.contentOverlay} hero-content-wrap`}>
        {/* Navigation bar in hero */}
        <header className={styles.heroNav}>
          <a href="#" className={styles.logoLink} aria-label="RedScreen Studios Home">
            <span className={styles.wordmark}>
              <span className={styles.wordmarkRed}>RedScreen</span>{" "}
              <span className={styles.wordmarkWhite}>Studios</span>
            </span>
          </a>
          <div className={styles.heroActions}>
            <button
              onClick={onCaseStudiesClick}
              className={styles.heroBtn}
            >
              Case Studies
            </button>
            <button
              onClick={onContactClick}
              className={`${styles.heroBtn} ${styles.heroBtnGhost}`}
            >
              Get In Touch
            </button>
          </div>
        </header>

        {/* Headline area */}
        <div className={styles.headlineArea}>
          {/* Red micro-label / eyebrow */}
          <p
            className={`${styles.microLabel} ${
              headlineRevealed ? styles.revealed : ""
            }`}
          >
            Looking For Global HNI Buyers?
          </p>

          {/* Main headline — explicit line breaks for mobile */}
          <h1 className={styles.headline}>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              We help
            </span>
            <span
              className={`${styles.headlineLine} ${styles.headlineRed} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              million-dollar
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              properties
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              close
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.5s" }}
            >
              faster.
            </span>
          </h1>

          {/* "than ever." with scribble */}
          <div
            className={`${styles.fasterWrap} ${
              headlineRevealed ? styles.revealed : ""
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <span className={styles.fasterText}>
              than ever.
              <svg
                className={`${styles.scribbleUnderline} ${
                  scribbleDrawn ? styles.scribbleDrawn : ""
                }`}
                viewBox="0 0 200 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9C15 4 28 12 42 7C56 3 68 11 82 8C96 5 108 12 122 6C136 3 150 10 164 7C178 4 190 9 197 7"
                  stroke="var(--red)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  className={styles.scribblePath}
                />
              </svg>
            </span>
          </div>

          {/* Supporting copy */}
          <p
            className={`${styles.subhead} ${
              subRevealed ? styles.revealed : ""
            }`}
          >
            Let buyers experience your property from
            <br />
            anywhere in the world.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`${styles.scrollIndicator} ${
          subRevealed ? styles.revealed : ""
        }`}
        aria-hidden="true"
      >
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
