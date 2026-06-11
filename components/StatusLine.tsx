import Spinner from "./Spinner";
import styles from "./StatusLine.module.css";

export type StatusLineStatus = "waiting" | "expired" | "generating" | "success";

const DEFAULT_TEXT: Record<StatusLineStatus, string> = {
  waiting: "Waiting for confirmation...",
  expired: "Code expired",
  generating: "Generating new code...",
  success: "Login complete",
};

type StatusLineProps = {
  status: StatusLineStatus;
  /** Overrides the default status message */
  text?: string;
  /** e.g. "2:58"; falls back to "--:--" */
  timer?: string;
  className?: string;
};

export default function StatusLine({ status, text, timer = "--:--", className }: StatusLineProps) {
  const animated = status === "waiting" || status === "generating";

  return (
    <div
      role="status"
      className={[styles.line, styles[status], className].filter(Boolean).join(" ")}
    >
      <span aria-hidden className={styles.glyph}>
        {animated ? <Spinner /> : status === "expired" ? "X" : "\\"}
      </span>
      <span className={styles.text}>{text ?? DEFAULT_TEXT[status]}</span>
      <span className={styles.timer}>{timer}</span>
    </div>
  );
}
