"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Image
              src="/images/brand/logo.png"
              alt="RedScreen Studios"
              width={56}
              height={56}
              style={{ objectFit: "contain" }}
              loading="lazy"
            />
          </div>

          <div className={styles.locations}>
            <div className={styles.location}>
              <span className={styles.locationLabel}>Dubai</span>
              <span className={styles.locationCity}>United Arab Emirates</span>
            </div>
            <div className={styles.location}>
              <span className={styles.locationLabel}>Australia</span>
              <span className={styles.locationCity}>Sydney · Melbourne</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copyright}>
            © {new Date().getFullYear()} RedScreen Studios. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
