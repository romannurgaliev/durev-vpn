import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  children?: ReactNode;
};

export default function Checkbox({ children, className, ...rest }: CheckboxProps) {
  return (
    <label className={[styles.checkbox, className].filter(Boolean).join(" ")}>
      <input type="checkbox" className={styles.native} {...rest} />
      <span className={styles.box}>
        <img aria-hidden alt="" src="/ui/checkbox-check.svg" className={styles.check} />
      </span>
      {children != null && <span className={styles.text}>{children}</span>}
    </label>
  );
}
