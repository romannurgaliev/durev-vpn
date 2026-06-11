"use client";

import { useEffect, useState } from "react";
import styles from "./Spinner.module.css";

const FRAMES = ["\\", "/", "-"];
const FRAME_MS = 150;

export default function Spinner({ className }: { className?: string }) {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), FRAME_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <span aria-label="Loading" role="status" className={[styles.spinner, className].filter(Boolean).join(" ")}>
      {FRAMES[frame]}
    </span>
  );
}
