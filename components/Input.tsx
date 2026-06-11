import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export default function Input({ error = false, className, ...rest }: InputProps) {
  return (
    <input
      className={[styles.input, error && styles.error, className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
