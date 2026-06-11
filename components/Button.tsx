"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonVariant = "default" | "secondary" | "ghost" | "wallet" | "accent";

type ButtonProps = {
  variant?: ButtonVariant;
  selected?: boolean;
  disabled?: boolean;
  /** Dashed inner outline, as in the Figma `outline` boolean prop */
  outline?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  className?: string;
  children: ReactNode;
};

export default function Button({
  variant = "default",
  selected = false,
  disabled = false,
  outline = false,
  leftIcon,
  rightIcon,
  onClick,
  className,
  children,
}: ButtonProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-pressed={selected || undefined}
      className={[
        styles.button,
        styles[variant],
        selected && styles.selected,
        disabled && styles.disabled,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
    >
      {leftIcon}
      {children}
      {outline && <span aria-hidden className={styles.outline} />}
      {rightIcon}
    </span>
  );
}
