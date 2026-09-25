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
  const [figureReady, setFigureReady] = useState(false);
  const [figureVisible, setFigureVisible] = useState(false);
  const [headlineRevealed, setHeadlineRevealed] = useState(false);
  const [subRevealed, setSubRevealed] = useState(false);
  const [scribbleDrawn, setScribbleDrawn] = useState(false);
  const hasRevealedRef = useRef(false);

  // Trigger the full reveal sequence — called 500ms after figure is ready
  const startRevealSequence = useCallback(() => {
    if (hasRevealedRef.current) return;
    hasRevealedRef.current = true;

    // Figure fades from 0.1 → 1.0 + headline begins
    setFigureVisible(true);
    setHeadlineRevealed(true);

    // +500ms: scribble underline draws
    setTimeout(() => setScribbleDrawn(true), 500);

    // +800ms: supporting copy
    setTimeout(() => setSubRevealed(true), 800);
  }, []);

  // Called when the figure image fires onLoad — marks it ready
  const handleMobileFigureLoad = useCallback(() => {
    setFigureReady(true);
  }, []);

  const handleDesktopFigureLoad = useCallback(() => {
    setFigureReady(true);
  }, []);

  // Once figure is ready, wait 500ms then reveal
  useEffect(() => {
    if (!figureReady) return;
    const timer = setTimeout(() => {
      startRevealSequence();
    }, 500);
    return () => clearTimeout(timer);
  }, [figureReady, startRevealSequence]);

  // Absolute safety fallback — reveal after 3s no matter what
  useEffect(() => {
    const fallback = setTimeout(() => {
      startRevealSequence();
    }, 3000);
    return () => clearTimeout(fallback);
  }, [startRevealSequence]);

  // NO GSAP parallax on hero content — removing the scroll-y transform
  // that was causing text displacement + zoom effect on mobile
  // Only register GSAP if needed for other hero effects
  useEffect(() => {
    if (!gsapReady) return;
    // Intentionally left empty — hero content is scroll-stable
    // We do NOT apply any scroll-driven transform to .hero-content-wrap
  }, [gsapReady]);

  return (
    <section ref={sectionRef} className={styles.hero} id="hero">
      {/* ===== IMAGE LAYERS ===== */}
      <div className={styles.imageContainer}>
        {/* MOBILE composition — WebP, priority, no lazy */}
        <div className={styles.mobileImages}>
          <Image
            src="/images/hero/hero-mobile-crowd.webp"
            alt="Global crowd of potential property buyers"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={styles.crowdImage}
            style={{ objectFit: "cover", objectPosition: "center top" }}
          />
          <Image
            src="/images/hero/hero-mobile-figure.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={`${styles.figureImage} ${
              figureVisible ? styles.figureVisible : ""
            }`}
            style={{ objectFit: "cover", objectPosition: "center top" }}
            onLoad={handleMobileFigureLoad}
          />
        </div>

        {/* DESKTOP composition — WebP, priority, no lazy */}
        <div className={styles.desktopImages}>
          <Image
            src="/images/hero/hero-desktop-crowd.webp"
            alt="Global crowd of potential property buyers"
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={styles.crowdImage}
            style={{ objectFit: "cover", objectPosition: "center center" }}
          />
          <Image
            src="/images/hero/hero-desktop-figure.webp"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className={`${styles.figureImage} ${
              figureVisible ? styles.figureVisible : ""
            }`}
            style={{ objectFit: "cover", objectPosition: "center center" }}
            onLoad={handleDesktopFigureLoad}
          />
        </div>

        {/* Bottom gradient fade to black */}
        <div className={styles.bottomGradient} />
      </div>

      {/* ===== CONTENT OVERLAY ===== */}
      {/* No hero-content-wrap GSAP class — scroll must not move this */}
      <div className={styles.contentOverlay}>
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
              style={{ transitionDelay: "0.08s" }}
            >
              We help
            </span>
            <span
              className={`${styles.headlineLine} ${styles.headlineRed} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.16s" }}
            >
              million-dollar
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.24s" }}
            >
              properties
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.32s" }}
            >
              close
            </span>
            <span
              className={`${styles.headlineLine} ${
                headlineRevealed ? styles.revealed : ""
              }`}
              style={{ transitionDelay: "0.4s" }}
            >
              faster.
            </span>
          </h1>

          {/* "than ever." with scribble */}
          <div
            className={`${styles.fasterWrap} ${
              headlineRevealed ? styles.revealed : ""
            }`}
            style={{ transitionDelay: "0.5s" }}
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
    </section>
  );
}
