"use client";

import { useEffect, useState, type CSSProperties } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────

export type TelegramAuthState = "enabled" | "expired" | "refreshing" | "success";

export interface TelegramAuthModalProps {
  state?: TelegramAuthState;
  onBack?: () => void;
  onRefresh?: () => void;
  onOpenTelegram?: () => void;
}

// ─── Style constants (reference tokens.css custom properties) ───────────────

const FONT_MONO: CSSProperties = { fontFamily: "Monocraft, monospace" };
const FONT_BODY: CSSProperties = { fontFamily: "'Roboto Mono', monospace", fontWeight: 400 };

// W95 raised bevel — modal outer shell, default buttons
// outer: light top-left, dark bottom-right; inner: opposite
const SHADOW_OUT: CSSProperties = { boxShadow: "var(--w95-button-default-shadow)" };
// W95 sunken inset — QR area, status bar
const SHADOW_IN: CSSProperties  = { boxShadow: "var(--w95-button-in-shadow)" };


// ─── Fix 3: Spinner — no explicit color; inherits from nearest parent ────────
// Set the desired color on the *parent* element so the spinner matches context.

const FRAMES = ["\\", "|", "/", "—"] as const;

function Spinner() {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % FRAMES.length), 150);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      aria-hidden
      style={{
        ...FONT_MONO,
        display: "inline-block",
        width: 16,
        textAlign: "center",
        fontSize: 16,
        lineHeight: "24px",
        flexShrink: 0,
        color: "inherit",   // ← explicitly inherit; parent sets the right color
      }}
    >
      {FRAMES[frame]}
    </span>
  );
}

// ─── QR Code Placeholder ────────────────────────────────────────────────────
// Static visual mock — not scannable. Uses 21×21 unit grid scaled to 230px.

const QR_DATA_CELLS: [number, number][] = [
  // Timing patterns
  [8, 6], [10, 6], [12, 6],
  [6, 8], [6, 10], [6, 12],
  // Data area (centre)
  [8, 8], [9, 8], [11, 8], [13, 8],
  [8, 9], [10, 9], [12, 9],
  [9, 10], [11, 10], [13, 10],
  [8, 11], [10, 11], [12, 11],
  [9, 12], [11, 12], [13, 12],
  // Data area (right of top-right finder)
  [14, 8], [16, 8], [18, 8], [20, 8],
  [15, 9], [17, 9], [19, 9],
  [14, 10], [16, 10], [18, 10], [20, 10],
  [15, 11], [17, 11], [19, 11],
  [14, 12], [16, 12], [18, 12], [20, 12],
  // Data area (bottom-right)
  [14, 14], [16, 14], [18, 14], [20, 14],
  [15, 15], [17, 15], [19, 15],
  [14, 16], [16, 16], [18, 16], [20, 16],
  [15, 17], [17, 17], [19, 17],
  [14, 18], [16, 18], [18, 18], [20, 18],
  [14, 20], [16, 20], [18, 20], [20, 20],
  // Data area (below bottom-left finder)
  [8, 14], [10, 14], [12, 14],
  [9, 15], [11, 15], [13, 15],
  [8, 16], [10, 16], [12, 16],
  [9, 17], [11, 17], [13, 17],
  [8, 18], [10, 18], [12, 18],
  [8, 20], [9, 20], [11, 20], [13, 20],
];

function QrCodePlaceholder() {
  return (
    <svg
      width={230}
      height={230}
      viewBox="0 0 21 21"
      shapeRendering="crispEdges"
      style={{ display: "block" }}
      aria-label="QR code"
    >
      <rect width={21} height={21} fill="white" />

      {/* Top-left finder */}
      <rect x={0} y={0} width={7} height={7} fill="black" />
      <rect x={1} y={1} width={5} height={5} fill="white" />
      <rect x={2} y={2} width={3} height={3} fill="black" />

      {/* Top-right finder */}
      <rect x={14} y={0} width={7} height={7} fill="black" />
      <rect x={15} y={1} width={5} height={5} fill="white" />
      <rect x={16} y={2} width={3} height={3} fill="black" />

      {/* Bottom-left finder */}
      <rect x={0} y={14} width={7} height={7} fill="black" />
      <rect x={1} y={15} width={5} height={5} fill="white" />
      <rect x={2} y={16} width={3} height={3} fill="black" />

      {/* Data + timing cells */}
      {QR_DATA_CELLS.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={1} height={1} fill="black" />
      ))}
    </svg>
  );
}

// ─── Checkmark icon ──────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width={40} height={40} viewBox="0 0 40 40" fill="none" aria-hidden>
      <polyline
        points="8,22 17,31 33,11"
        stroke="#37aa1a"
        strokeWidth={4}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TelegramAuthModal({
  state = "enabled",
  onBack,
  onRefresh,
  onOpenTelegram,
}: TelegramAuthModalProps) {
  const ctaActive = state === "enabled";

  // ── Status bar values per state
  const statusText = {
    enabled:    "Waiting for confirmation...",
    expired:    "Code expired",
    refreshing: "Generating new code…",
    success:    "Login complete",
  }[state];

  const statusColor =
    state === "enabled"    ? "var(--text-primary)" :
    state === "expired"    ? "#800000" :
    state === "success"    ? "#37aa1a" :
    /* refreshing */         "var(--text-disabled)";

  const timerText =
    state === "enabled" ? "2:58" :
    state === "expired" ? "0:00" :
    "--:--";

  const timerColor =
    state === "enabled" ? "var(--main-blue)" :
    state === "expired" ? "#800000" :
    "var(--text-disabled)";

  return (
    <div
      style={{
        width: 460,
        backgroundColor: "var(--button-default-surface)",
        ...SHADOW_OUT,
        display: "flex",
        flexDirection: "column",
        padding: 4,
        ...FONT_MONO,
        // Fix 2 & 3: anchor text to --text-primary (black) so spinner and all
        // inherited text aren't overridden by the dark-mode body foreground.
        color: "var(--text-primary)",
      }}
    >
      {/* ── Title Bar ───────────────────────────────────────────────────── */}
      <div
        style={{
          backgroundColor: "var(--w95-dark-blue)",
          height: 40,
          display: "flex",
          alignItems: "center",
          paddingLeft: 8,
          paddingRight: 2,
          gap: 10,
          flexShrink: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/icons/keys.png" alt="" width={32} height={32} style={{ imageRendering: "pixelated" }} />
        <span
          style={{
            ...FONT_MONO,
            color: "var(--text-inverse)",
            fontSize: 20,
            lineHeight: "28px",
          }}
        >
          telegram_auth.exe
        </span>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          padding: 20,
        }}
      >
        {/* Title block */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span
            style={{ ...FONT_MONO, fontSize: 20, lineHeight: "28px", color: "var(--text-primary)" }}
          >
            scan QR code
          </span>
          <span
            style={{ ...FONT_BODY, fontSize: 14, lineHeight: "22px", color: "var(--text-primary)" }}
          >
            {state === "success" ? "authorization complete" : "open your phone camera"}
          </span>
        </div>

        {/* QR area — 250×250, content changes by state */}
        <div
          style={{
            width: 250,
            height: 250,
            ...SHADOW_IN,
            backgroundColor:
              state === "enabled" ? "var(--mono-white)" : "var(--button-default-surface)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            gap: 10,
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          {/* enabled — QR code */}
          {state === "enabled" && <QrCodePlaceholder />}

          {/* expired — error + refresh button */}
          {state === "expired" && (
            <>
              <span style={{ ...FONT_MONO, fontSize: 18, lineHeight: "28px", color: "var(--text-primary)" }}>
                X
              </span>
              <span style={{ ...FONT_MONO, fontSize: 18, lineHeight: "28px", color: "var(--text-primary)" }}>
                code expired
              </span>
              <button
                onClick={onRefresh}
                style={{
                  height: 50,
                  paddingLeft: 18,
                  paddingRight: 18,
                  backgroundColor: "var(--button-default-surface)",
                  ...SHADOW_OUT,
                  border: "none",
                  cursor: "pointer",
                  ...FONT_MONO,
                  fontSize: 18,
                  lineHeight: "28px",
                  color: "var(--button-default-text)",
                }}
              >
                refresh
              </button>
            </>
          )}

          {/* refreshing — spinner + label */}
          {state === "refreshing" && (
            <>
              <Spinner />
              <span
                style={{
                  ...FONT_MONO,
                  fontSize: 18,
                  lineHeight: "28px",
                  color: "var(--text-primary)",
                  textAlign: "center",
                }}
              >
                generating
                <br />
                new code
              </span>
            </>
          )}

          {/* success — checkmark + messages */}
          {state === "success" && (
            <>
              <CheckIcon />
              <span
                style={{
                  ...FONT_MONO,
                  fontSize: 18,
                  lineHeight: "28px",
                  color: "var(--text-primary)",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {"you're in"}
              </span>
              <span
                style={{
                  ...FONT_MONO,
                  fontSize: 16,
                  lineHeight: "24px",
                  color: "var(--text-primary)",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                redirecting to cabinet
              </span>
            </>
          )}
        </div>

        {/* CTA button — active only in "enabled" state */}
        <button
          onClick={ctaActive ? onOpenTelegram : undefined}
          style={{
            width: 300,
            height: 50,
            backgroundColor: "var(--button-wallet-surface)",
            ...SHADOW_OUT,
            border: "none",
            cursor: ctaActive ? "pointer" : "default",
            ...FONT_MONO,
            fontSize: 18,
            lineHeight: "28px",
            color: ctaActive ? "var(--button-wallet-text)" : "var(--main-opacity-white-40)",
            flexShrink: 0,
          }}
        >
          open in telegram
        </button>

        {/* Status bar */}
        <div
          style={{
            width: "100%",
            padding: 15,
            ...SHADOW_IN,
            backgroundColor: "var(--button-default-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxSizing: "border-box",
          }}
        >
          {/* color on parent div → Spinner inherits it, no extra prop needed */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: statusColor }}>
            {state === "expired" ? (
              <span
                style={{
                  ...FONT_MONO,
                  fontSize: 16,
                  lineHeight: "24px",
                  display: "inline-block",
                  width: 24,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                X
              </span>
            ) : (
              <Spinner />
            )}
            <span style={{ ...FONT_MONO, fontSize: 16, lineHeight: "24px" }}>
              {statusText}
            </span>
          </div>
          <span style={{ ...FONT_MONO, fontSize: 16, lineHeight: "24px", color: timerColor }}>
            {timerText}
          </span>
        </div>

        {/* Footer note */}
        <p
          style={{
            ...FONT_MONO,
            fontSize: 12,
            lineHeight: "16px",
            color: "var(--text-primary)",
            textAlign: "center",
            margin: 0,
            width: "100%",
          }}
        >
          once confirmed in Telegram,
          <br />
          {"you'll be redirected to the next step"}
          <br />
          automatically
        </p>

        {/* Back link */}
        <button
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            ...FONT_MONO,
            fontSize: 16,
            lineHeight: "24px",
            color: "var(--text-primary)",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          back
        </button>
      </div>
    </div>
  );
}
