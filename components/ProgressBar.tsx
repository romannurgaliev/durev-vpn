import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  /** Fill, 0–100 */
  value: number;
  /** Soft-cap marker position, % of width */
  softCapAt?: number;
  /** Hard-cap marker position, % of width */
  hardCapAt?: number;
  className?: string;
};

export default function ProgressBar({
  value,
  softCapAt = 56,
  hardCapAt = 96,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={[styles.bar, className].filter(Boolean).join(" ")}
    >
      <div className={styles.track} />
      <div className={styles.fill} style={{ width: `${pct}%` }}>
        <div className={styles.stripes} />
      </div>
      <div
        className={[styles.cap, styles.capSoft, pct >= softCapAt && styles.capReached]
          .filter(Boolean)
          .join(" ")}
        style={{ left: `${softCapAt}%` }}
      />
      <div
        className={[styles.cap, pct >= hardCapAt && styles.capReached].filter(Boolean).join(" ")}
        style={{ left: `${hardCapAt}%` }}
      />
    </div>
  );
}
