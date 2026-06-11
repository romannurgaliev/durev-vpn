import type { ReactNode } from "react";
import styles from "./TokenCardInfo.module.css";

type TokenCardInfoProps = {
  label: ReactNode;
  value: ReactNode;
  className?: string;
};

export default function TokenCardInfo({ label, value, className }: TokenCardInfoProps) {
  return (
    <div className={[styles.row, className].filter(Boolean).join(" ")}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
