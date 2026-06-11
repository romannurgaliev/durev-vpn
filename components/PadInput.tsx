import type { InputHTMLAttributes } from "react";
import styles from "./PadInput.module.css";

type PadInputProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Right-side hint, e.g. "max: 200 TON" */
  hint?: string;
  /** Error message below the field; also paints the red border */
  error?: string;
};

export default function PadInput({ hint, error, className, ...rest }: PadInputProps) {
  return (
    <div className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <div className={[styles.field, error && styles.fieldError].filter(Boolean).join(" ")}>
        <input className={styles.input} aria-invalid={Boolean(error) || undefined} {...rest} />
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
      {error && <span className={styles.message}>{error}</span>}
    </div>
  );
}
