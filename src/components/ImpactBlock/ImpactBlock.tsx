"use client";

import styles from "./ImpactBlock.module.css";

export default function ImpactBlock() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Handwritten heading */}
        <h2 className={styles.heading}>See the impact we create</h2>

        {/* Metric row: left + right */}
        <div className={styles.metricRow}>
          <div className={styles.metric}>
            <span className={styles.metricNumber}>226</span>
            <span className={styles.metricLabel}>Collaborations</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricNumber}>$22M+</span>
            <span className={styles.metricLabel}>Total Properties</span>
          </div>
        </div>

        {/* Centered lower metric */}
        <div className={styles.metricCenter}>
          <span className={styles.metricNumberLg}>$8.08M</span>
          <span className={styles.metricLabel}>
            Highest Individual Project Value
          </span>
        </div>
      </div>
    </section>
  );
}
