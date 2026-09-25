"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./ImmediateProof.module.css";

interface ImmediateProofProps {
  gsapReady: boolean;
}

interface WistiaPlayer {
  play: () => void;
  pause: () => void;
  time: (t?: number) => number;
  mute: () => void;
  unmute: () => void;
  isMuted: () => boolean;
  volume: (v?: number) => number;
  state: () => string;
  bind: (event: string, callback: (...args: unknown[]) => void) => void;
  unbind: (event: string, callback: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    _wq?: Array<{ id: string; onReady: (video: WistiaPlayer) => void }>;
    Wistia?: {
      api: (mediaId: string) => WistiaPlayer | undefined;
    };
  }
}

const testimonials = [
  { id: 1, mediaId: "ej2egdh2au" },
  { id: 2, mediaId: "r7xa6u7rpn" },
];

export default function ImmediateProof({ gsapReady }: ImmediateProofProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const wistiaLoaded = useRef(false);
  const hasEnteredViewport = useRef(false);
  const playersRef = useRef<Map<string, WistiaPlayer>>(new Map());

  const [activeIndex, setActiveIndex] = useState(0);
  const [userEnabledSound, setUserEnabledSound] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load Wistia player scripts
  useEffect(() => {
    if (wistiaLoaded.current) return;
    wistiaLoaded.current = true;

    // Initialize _wq queue for player ready callbacks
    window._wq = window._wq || [];

    // Main player.js
    const playerScript = document.createElement("script");
    playerScript.src = "https://fast.wistia.com/player.js";
    playerScript.async = true;
    document.head.appendChild(playerScript);

    // Individual media embed scripts
    testimonials.forEach((t) => {
      const mediaScript = document.createElement("script");
      mediaScript.src = `https://fast.wistia.com/embed/${t.mediaId}.js`;
      mediaScript.async = true;
      mediaScript.type = "module";
      document.head.appendChild(mediaScript);
    });

    // Register player ready callbacks via _wq
    testimonials.forEach((t) => {
      window._wq!.push({
        id: t.mediaId,
        onReady: (video: WistiaPlayer) => {
          playersRef.current.set(t.mediaId, video);
        },
      });
    });
  }, []);

  // IntersectionObserver: start first video when section enters viewport
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasEnteredViewport.current) {
            hasEnteredViewport.current = true;

            // Start video 1 from 0:00, muted
            const startFirstVideo = () => {
              const player = playersRef.current.get(testimonials[0].mediaId);
              if (player) {
                player.time(0);
                player.mute();
                player.play();
                setIsPlaying(true);
              } else {
                // Player not ready yet — retry
                setTimeout(startFirstVideo, 300);
              }
            };
            startFirstVideo();
          }
        });
      },
      {
        rootMargin: "100px 0px",
        threshold: 0.1,
      }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle active slide changes — mute/unmute and manage playback
  useEffect(() => {
    if (!hasEnteredViewport.current) return;

    const activeMediaId = testimonials[activeIndex].mediaId;
    const inactiveMediaId = testimonials[activeIndex === 0 ? 1 : 0].mediaId;

    const activePlayer = playersRef.current.get(activeMediaId);
    const inactivePlayer = playersRef.current.get(inactiveMediaId);

    // Mute inactive
    if (inactivePlayer) {
      inactivePlayer.mute();
    }

    // Play active and handle sound state
    if (activePlayer) {
      activePlayer.play();
      if (userEnabledSound) {
        activePlayer.unmute();
        setIsMuted(false);
      } else {
        activePlayer.mute();
        setIsMuted(true);
      }
    }
  }, [activeIndex, userEnabledSound]);

  // Handle sound button click
  const handleSoundToggle = useCallback(() => {
    const activeMediaId = testimonials[activeIndex].mediaId;
    const player = playersRef.current.get(activeMediaId);

    if (!userEnabledSound) {
      // First time enabling sound
      setUserEnabledSound(true);
      setIsMuted(false);
      if (player) {
        player.unmute();
      }
    } else {
      // Toggle mute/unmute
      if (player) {
        if (player.isMuted()) {
          player.unmute();
          setIsMuted(false);
        } else {
          player.mute();
          setIsMuted(true);
        }
      }
    }
  }, [activeIndex, userEnabledSound]);

  // Handle carousel scroll to detect active slide
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const cards = carousel.querySelectorAll<HTMLElement>(
          `.${styles.testimonialCard}`
        );
        if (!cards.length) return;

        const containerRect = carousel.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

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

        if (closestIndex !== activeIndex) {
          setActiveIndex(closestIndex);
        }
      }, 80);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeIndex]);

  // GSAP scroll reveals
  useEffect(() => {
    if (!gsapReady || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    const init = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(".proof-intro-heading", {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        gsap.utils.toArray<HTMLElement>(".proof-card").forEach((el, i) => {
          gsap.from(el, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.15,
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
    <section ref={sectionRef} className={styles.section} id="proof">
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={`${styles.sectionLabel} proof-intro-heading`}>
            Real results from real clients
          </p>
          <h2 className={`${styles.heading} proof-intro-heading`}>
            Don&apos;t take our word for it.
          </h2>
        </div>

        <div className={styles.carouselWrap}>
          {/* Sound control overlay */}
          {isPlaying && (
            <button
              className={styles.soundControl}
              onClick={handleSoundToggle}
              aria-label={isMuted ? "Click for sound" : "Mute sound"}
            >
              {isMuted ? (
                <>
                  <span className={styles.soundLabel}>Click for sound</span>
                  <svg
                    className={styles.soundIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                </>
              ) : (
                <svg
                  className={styles.soundIconOnly}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              )}
            </button>
          )}

          <div ref={carouselRef} className={styles.testimonialCarousel}>
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`${styles.testimonialCard} ${
                  index === activeIndex ? styles.cardActive : styles.cardInactive
                } proof-card`}
              >
                <div className={styles.videoFrame}>
                  {/* Wistia swatch placeholder for CLS prevention */}
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                        wistia-player[media-id='${t.mediaId}']:not(:defined) {
                          background: center / contain no-repeat
                            url('https://fast.wistia.com/embed/medias/${t.mediaId}/swatch');
                          display: block;
                          filter: blur(5px);
                          padding-top: 177.78%;
                        }
                      `,
                    }}
                  />
                  {/* @ts-expect-error — wistia-player is a web component */}
                  <wistia-player
                    media-id={t.mediaId}
                    aspect="0.5625"
                    silent-auto-play="allow"
                    wistia-popover="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
