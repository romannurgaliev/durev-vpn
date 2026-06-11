"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./Accordion.module.css";

type AccordionProps = {
  title: string;
  defaultOpen?: boolean;
  className?: string;
  children: ReactNode;
};

export default function Accordion({
  title,
  defaultOpen = false,
  className,
  children,
}: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleKeyDown = (event: KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((o) => !o);
    }
  };

  return (
    <div className={[styles.accordion, open && styles.open, className].filter(Boolean).join(" ")}>
      <span
        role="button"
        tabIndex={0}
        aria-expanded={open}
        className={styles.header}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.title}>{title}</span>
        <img aria-hidden alt="" src="/ui/accordion-chevron.svg" className={styles.chevron} />
      </span>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  );
}
