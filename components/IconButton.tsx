"use client";

import type { KeyboardEvent, MouseEvent } from "react";
import styles from "./IconButton.module.css";

export type IconButtonKind = "plus" | "cross" | "conf" | "update";

const ICONS: Record<IconButtonKind, { src: string; label: string; small?: boolean }> = {
  plus: { src: "/ui/icon-plus.svg", label: "Add" },
  cross: { src: "/ui/icon-cross.svg", label: "Close" },
  conf: { src: "/ui/icon-conf.svg", label: "Settings" },
  update: { src: "/ui/icon-update.svg", label: "Update", small: true },
};

type IconButtonProps = {
  kind?: IconButtonKind;
  "aria-label"?: string;
  onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
  className?: string;
};

export default function IconButton({
  kind = "plus",
  "aria-label": ariaLabel,
  onClick,
  className,
}: IconButtonProps) {
  const icon = ICONS[kind];

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? icon.label}
      className={[styles.iconButton, className].filter(Boolean).join(" ")}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <img
        aria-hidden
        alt=""
        src={icon.src}
        className={[styles.icon, icon.small && styles.iconSmall].filter(Boolean).join(" ")}
      />
    </span>
  );
}
