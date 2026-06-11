import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Radio.module.css";

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children: ReactNode;
};

export default function Radio({ children, className, ...rest }: RadioProps) {
  return (
    <label className={[styles.radio, className].filter(Boolean).join(" ")}>
      <input type="radio" className={styles.native} {...rest} />
      <img aria-hidden alt="" src="/ui/radio-checked.svg" className={`${styles.icon} ${styles.iconChecked}`} />
      <img aria-hidden alt="" src="/ui/radio-checked-disabled.svg" className={`${styles.icon} ${styles.iconCheckedDisabled}`} />
      <img aria-hidden alt="" src="/ui/radio-unchecked.svg" className={`${styles.icon} ${styles.iconUnchecked}`} />
      <img aria-hidden alt="" src="/ui/radio-unchecked-disabled.svg" className={`${styles.icon} ${styles.iconUncheckedDisabled}`} />
      <span className={styles.text}>{children}</span>
    </label>
  );
}
