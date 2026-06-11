import type { ReactNode } from "react";
import ModalHeader from "./ModalHeader";
import styles from "./Window.module.css";

type WindowProps = {
  /** Title bar text, e.g. "telegram_auth.exe" */
  title: string;
  /** Title bar icon (path under /public) */
  iconSrc?: string;
  /** Right slot of the title bar (window controls) */
  actions?: ReactNode;
  className?: string;
  children: ReactNode;
};

export default function Window({ title, iconSrc, actions, className, children }: WindowProps) {
  return (
    <div
      role="dialog"
      aria-label={title}
      className={[styles.window, className].filter(Boolean).join(" ")}
    >
      <ModalHeader title={title} iconSrc={iconSrc} actions={actions} />
      {children}
    </div>
  );
}
