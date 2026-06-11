import type { ReactNode } from "react";
import styles from "./ModalHeader.module.css";

type ModalHeaderProps = {
  /** Window title, e.g. "login.exe" */
  title: string;
  /** Title bar icon, 32px (path under /public) */
  iconSrc?: string;
  /** Right slot for window controls */
  actions?: ReactNode;
  className?: string;
};

export default function ModalHeader({
  title,
  iconSrc = "/ui/icon-keys.png",
  actions,
  className,
}: ModalHeaderProps) {
  return (
    <div className={[styles.header, className].filter(Boolean).join(" ")}>
      <div className={styles.left}>
        <img aria-hidden alt="" src={iconSrc} className={styles.icon} />
        <span className={styles.title}>{title}</span>
      </div>
      {actions != null && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
