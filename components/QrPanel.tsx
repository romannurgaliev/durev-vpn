import Button from "./Button";
import Spinner from "./Spinner";
import styles from "./QrPanel.module.css";

export type QrStatus = "qr" | "expired" | "generating" | "success";

type QrPanelProps = {
  status: QrStatus;
  /** QR image for status="qr" */
  qrSrc?: string;
  onRefresh?: () => void;
  className?: string;
};

/* Pixel-art check, 12x10 grid, no curves */
function PixelCheck() {
  const cells = [
    [10, 0], [11, 0],
    [9, 1], [10, 1],
    [8, 2], [9, 2],
    [7, 3], [8, 3],
    [0, 4], [1, 4], [6, 4], [7, 4],
    [1, 5], [2, 5], [5, 5], [6, 5],
    [2, 6], [3, 6], [4, 6], [5, 6],
    [3, 7], [4, 7],
  ];
  return (
    <svg aria-hidden className={styles.check} viewBox="0 0 12 10" xmlns="http://www.w3.org/2000/svg">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="var(--status-success)" />
      ))}
    </svg>
  );
}

export default function QrPanel({ status, qrSrc, onRefresh, className }: QrPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {status === "qr" && <img alt="QR code for Telegram login" src={qrSrc} className={styles.qrImg} />}

      {status === "expired" && (
        <>
          <span aria-hidden className={styles.glyph}>X</span>
          <span className={styles.text}>code expired</span>
          <Button onClick={onRefresh}>refresh</Button>
        </>
      )}

      {status === "generating" && (
        <>
          <Spinner />
          <span className={styles.text}>{"generating\nnew code"}</span>
        </>
      )}

      {status === "success" && (
        <>
          <PixelCheck />
          <span className={styles.successText}>
            <span>you&rsquo;re in</span>
            <span className={styles.text}>{"redirecting to\ncabinet"}</span>
          </span>
        </>
      )}
    </div>
  );
}
