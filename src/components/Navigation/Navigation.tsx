"use client";

import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

interface NavigationProps {
  onContactClick: () => void;
  onCaseStudiesClick: () => void;
}

export default function Navigation({
  onContactClick,
  onCaseStudiesClick,
}: NavigationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky nav after scrolling past 80% of viewport
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`${styles.nav} ${visible ? styles.visible : ""}`}
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        <a href="#hero" className={styles.logoLink} aria-label="Back to top">
          <span className={styles.wordmark}>
            <span className={styles.wordmarkRed}>RedScreen</span>{" "}
            <span className={styles.wordmarkWhite}>Studios</span>
          </span>
        </a>

        <div className={styles.actions}>
          <button
            onClick={onCaseStudiesClick}
            className={styles.navBtn}
          >
            Case Studies
          </button>
          <button
            onClick={onContactClick}
            className={`${styles.navBtn} ${styles.navBtnGhost}`}
          >
            Get In Touch
          </button>
        </div>
      </div>
    </nav>
  );
}
