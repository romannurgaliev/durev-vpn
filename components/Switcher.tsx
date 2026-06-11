"use client";

import { useState, type KeyboardEvent } from "react";
import styles from "./Switcher.module.css";

type SwitcherProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  "aria-label"?: string;
  className?: string;
};

export default function Switcher({
  checked,
  defaultChecked = false,
  onChange,
  "aria-label": ariaLabel,
  className,
}: SwitcherProps) {
  const [internal, setInternal] = useState(defaultChecked);
  const isOn = checked ?? internal;

  const toggle = () => {
    setInternal(!isOn);
    onChange?.(!isOn);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    <span
      role="switch"
      tabIndex={0}
      aria-checked={isOn}
      aria-label={ariaLabel}
      className={[styles.switcher, isOn && styles.on, className].filter(Boolean).join(" ")}
      onClick={toggle}
      onKeyDown={handleKeyDown}
    >
      <span className={styles.dot} />
    </span>
  );
}
