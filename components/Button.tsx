"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";

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

const BASE =
  "relative inline-flex items-center justify-center gap-[10px] h-[50px] " +
  "px-[18px] py-1.5 font-monocraft text-[18px] " +
  "font-medium leading-7 whitespace-nowrap select-none";

const DARK_HOVER =
  "hover:[background-image:linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2))]";
const LIGHT_HOVER =
  "hover:[background-image:linear-gradient(rgba(255,255,255,0.2),rgba(255,255,255,0.2))]";

const VARIANTS: Record<
  ButtonVariant,
  { surface: string; text: string; hover: string }
> = {
  default:   { surface: "bg-btn-default-surface",   text: "text-btn-default-text",   hover: DARK_HOVER },
  secondary: { surface: "bg-btn-secondary-surface", text: "text-btn-secondary-text", hover: DARK_HOVER },
  ghost:     { surface: "bg-btn-ghost-surface",     text: "text-btn-ghost-text",     hover: LIGHT_HOVER },
  wallet:    { surface: "bg-btn-wallet-surface",    text: "text-btn-wallet-text",    hover: LIGHT_HOVER },
  accent:    { surface: "bg-btn-accent-surface",    text: "text-btn-accent-text",    hover: DARK_HOVER },
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

  const { surface, text, hover } = VARIANTS[variant];

  const cls = [
    BASE,
    surface,
    // Text + cursor: disabled overrides variant text to avoid Tailwind class-order conflicts
    disabled ? "text-text-disabled cursor-default" : `${text} cursor-pointer`,
    // Shadow: selected (and enabled) → pressed inset, otherwise default raised
    !disabled && selected ? "shadow-w95-in" : "shadow-w95-default",
    // Interactive states — omitted entirely when disabled so no active/focus styles fire
    !disabled &&
      [
        !selected && hover,
        !selected && "active:[background-image:none] active:shadow-w95-in",
        selected &&
          "[background-image:var(--w95-dither-image)] [background-size:var(--w95-dither-size)]",
        "focus-visible:outline-none focus-visible:shadow-w95-focused",
      ]
        .filter(Boolean)
        .join(" "),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-pressed={selected || undefined}
      className={cls}
      onClick={disabled ? undefined : onClick}
      onKeyDown={disabled ? undefined : handleKeyDown}
    >
      {leftIcon}
      {children}
      {outline && (
        <span
          aria-hidden
          className="absolute inset-1.5 border border-dashed border-border-primary pointer-events-none"
        />
      )}
      {rightIcon}
    </span>
  );
}
