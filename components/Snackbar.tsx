import type { ReactNode } from "react";
import styles from "./Snackbar.module.css";

export type SnackbarVariant = "info" | "success" | "default";

type SnackbarProps = {
  variant?: SnackbarVariant;
  className?: string;
  children?: ReactNode;
};

export default function Snackbar({ variant = "default", className, children }: SnackbarProps) {
  return (
    <div
      role="status"
      className={[styles.snackbar, styles[variant], className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
}
