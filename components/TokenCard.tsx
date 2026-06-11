"use client";

import type { KeyboardEvent } from "react";
import ProgressBar from "./ProgressBar";
import TokenCardInfo from "./TokenCardInfo";
import styles from "./TokenCard.module.css";

type TokenCardProps = {
  name?: string;
  avatarSrc?: string;
  /** Progress fill, 0–100 */
  progress?: number;
  progressLabel?: string;
  softCap?: string;
  hardCap?: string;
  rows?: { label: string; value: string }[];
  statusText?: string;
  onAction?: () => void;
  className?: string;
};

export default function TokenCard({
  name = "zapyataya\ndureva",
  avatarSrc = "/ui/tokencard-ava-zpd.jpg",
  progress = 29,
  progressLabel = "39.72% of soft cap",
  softCap = "20.000 TON",
  hardCap = "50.000 TON",
  rows = [
    { label: "Token price", value: "0.0031 TON" },
    { label: "Offered", value: "770 000 000 ZPD" },
    { label: "Liquidity", value: "51%" },
  ],
  statusText = "active pre-sale",
  onAction,
  className,
}: TokenCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onAction?.();
    }
  };

  return (
    <div className={[styles.card, className].filter(Boolean).join(" ")}>
      <div className={styles.header}>
        <img alt={name} src={avatarSrc} className={styles.avatar} />
        <p className={styles.name}>{name}</p>
      </div>

      <div className={styles.panel}>
        <div className={styles.progressTitle}>
          <strong>Progress</strong>
          <span className={styles.dot} />
          <span>{progressLabel}</span>
        </div>
        <ProgressBar value={progress} className={styles.progressBar} />
        <div className={styles.caps}>
          <div className={styles.capsItem}>
            <span className={styles.capsSubtitle}>
              <span className={`${styles.capIcon} ${styles.capIconSoft}`} />
              soft cap
            </span>
            <span className={styles.capsValue}>{softCap}</span>
          </div>
          <div className={styles.capsItem}>
            <span className={styles.capsSubtitle}>
              <span className={styles.capIcon} />
              hard cap
            </span>
            <span className={styles.capsValue}>{hardCap}</span>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {rows.map((row, i) => (
          <div key={row.label} style={{ display: "contents" }}>
            {i > 0 && <div className={styles.divider} />}
            <TokenCardInfo label={row.label} value={row.value} />
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <div className={styles.status}>
          <img aria-hidden alt="" src="/ui/tokencard-raise.svg" className={styles.statusIcon} />
          {statusText}
        </div>
        <span
          role="button"
          tabIndex={0}
          aria-label="Open token"
          className={styles.arrow}
          onClick={onAction}
          onKeyDown={handleKeyDown}
        >
          <img aria-hidden alt="" src="/ui/tokencard-arrow.svg" className={styles.arrowIcon} />
        </span>
      </div>
    </div>
  );
}
