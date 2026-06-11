import TelegramAuthModal, { type TelegramAuthState } from "@/components/TelegramAuthModal";

const STATES: TelegramAuthState[] = ["enabled", "expired", "refreshing", "success"];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--mono-100)] p-8">
      <div className="flex flex-wrap gap-8 items-start justify-center">
        {STATES.map((state) => (
          <div key={state} className="flex flex-col items-center gap-3">
            <span
              style={{
                fontFamily: "Monocraft, monospace",
                fontSize: 12,
                color: "var(--text-primary)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {state}
            </span>
            <TelegramAuthModal state={state} />
          </div>
        ))}
      </div>
    </div>
  );
}
