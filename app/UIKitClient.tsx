"use client";

import { useState } from "react";
import type { CSSProperties, KeyboardEvent, ReactNode } from "react";

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import Button from "@/components/Button";
import IconButton from "@/components/IconButton";
import Switcher from "@/components/Switcher";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import Accordion from "@/components/Accordion";
import PadInput from "@/components/PadInput";
import Snackbar from "@/components/Snackbar";
import StatusLine from "@/components/StatusLine";
import Spinner from "@/components/Spinner";
import ProgressBar from "@/components/ProgressBar";
import QrPanel from "@/components/QrPanel";
import TokenCard from "@/components/TokenCard";
import Window from "@/components/Window";

// ── Nav structure ──────────────────────────────────────────────────────────────

const NAV: { group: string; items: { id: string; label: string }[] }[] = [
  {
    group: "Tokens",
    items: [{ id: "typography", label: "Typography" }],
  },
  {
    group: "Actions",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "IconButton" },
    ],
  },
  {
    group: "Forms",
    items: [
      { id: "input", label: "Input" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "switcher", label: "Switcher" },
    ],
  },
  {
    group: "Feedback",
    items: [
      { id: "snackbar", label: "Snackbar" },
      { id: "status-line", label: "StatusLine" },
      { id: "spinner", label: "Spinner" },
    ],
  },
  {
    group: "Display",
    items: [
      { id: "accordion", label: "Accordion" },
      { id: "qr-panel", label: "QrPanel" },
      { id: "window", label: "Window" },
    ],
  },
];

const ARCHIVE_NAV = [
  { id: "pad-input", label: "PadInput" },
  { id: "progress-bar", label: "ProgressBar" },
  { id: "token-card", label: "TokenCard" },
];

const TYPE_SCALE = [
  { token: "App/UI/Header",     size: "20px", weight: "500", face: "Monocraft" },
  { token: "App/UI/Button Pri", size: "18px", weight: "500", face: "Monocraft" },
  { token: "App/UI/Button Sec", size: "16px", weight: "500", face: "Monocraft" },
  { token: "App/UI/Tab",        size: "12px", weight: "500", face: "Monocraft" },
  { token: "App/Data/Large",    size: "20px", weight: "400", face: "Roboto Mono" },
  { token: "App/Text/Body",     size: "14px", weight: "400", face: "Roboto Mono" },
  { token: "App/Text/Caption",  size: "14px", weight: "500", face: "Roboto Mono" },
];

const COLOR_TOKENS = [
  { name: "w95-gray",       hex: "#c3c3c3" },
  { name: "w95-dark-blue",  hex: "#02007f" },
  { name: "w95-green",      hex: "#008584" },
  { name: "bevel-dark",     hex: "#262626" },
  { name: "bevel-mid",      hex: "#7e7e7e" },
  { name: "bevel-midlight", hex: "#b1b1b1" },
  { name: "bevel-light",    hex: "#f0f0f0" },
  { name: "black",          hex: "#000000" },
  { name: "white",          hex: "#ffffff" },
  { name: "dark-gray",      hex: "#9b9b9b" },
  { name: "azure-blue",     hex: "#0098ea" },
  { name: "blue",           hex: "#004aad" },
  { name: "red",            hex: "#f93939" },
  { name: "acid/accent",    hex: "#00ff00" },
  { name: "green",          hex: "#249f58" },
];

const ALPHABET = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz 0123456789 !@#$%^&*";

// ── Overview cards ─────────────────────────────────────────────────────────────

type OverviewItem = {
  id: string;
  label: string;
  desc: string;
  preview: ReactNode;
};

const OVERVIEW: OverviewItem[] = [
  {
    id: "button",
    label: "Button",
    desc: "Primary action trigger in 5 variants",
    preview: (
      <div className="flex flex-wrap gap-2">
        <Button>default</Button>
        <Button variant="ghost">ghost</Button>
        <Button variant="accent">accent</Button>
      </div>
    ),
  },
  {
    id: "icon-button",
    label: "IconButton",
    desc: "Square icon-only action button",
    preview: (
      <div className="flex gap-2">
        <IconButton kind="plus" />
        <IconButton kind="cross" />
        <IconButton kind="conf" />
        <IconButton kind="update" />
      </div>
    ),
  },
  {
    id: "switcher",
    label: "Switcher",
    desc: "Toggle control for boolean settings",
    preview: (
      <div className="flex gap-4 bg-[#02007f] p-4">
        <Switcher aria-label="off" />
        <Switcher aria-label="on" defaultChecked />
      </div>
    ),
  },
  {
    id: "input",
    label: "Input",
    desc: "Text input with label, description and error",
    preview: <Input placeholder="ss://access-key" />,
  },
  {
    id: "checkbox",
    label: "Checkbox",
    desc: "Binary choice with optional indeterminate state",
    preview: (
      <div className="flex gap-4">
        <Checkbox defaultChecked label="Checked" onChange={() => {}} />
        <Checkbox label="Unchecked" onChange={() => {}} />
      </div>
    ),
  },
  {
    id: "radio",
    label: "Radio",
    desc: "Single selection within a group",
    preview: (
      <div className="flex flex-col gap-2">
        <Radio name="prev" defaultChecked label="Option A" />
        <Radio name="prev" label="Option B" />
      </div>
    ),
  },
  {
    id: "accordion",
    label: "Accordion",
    desc: "Collapsible content section",
    preview: (
      <div className="w-full max-w-xs">
        <Accordion title="Is VPN safe?" defaultOpen>
          Yes, absolutely.
        </Accordion>
      </div>
    ),
  },
  {
    id: "pad-input",
    label: "PadInput",
    desc: "Large numeric/token entry field",
    preview: <PadInput placeholder="0 TON" hint="max: 200 TON" />,
  },
  {
    id: "snackbar",
    label: "Snackbar",
    desc: "Inline status or toast notification",
    preview: (
      <div className="flex flex-col gap-2 w-full">
        <Snackbar variant="info">Key copied</Snackbar>
        <Snackbar variant="success">Connected</Snackbar>
      </div>
    ),
  },
  {
    id: "status-line",
    label: "StatusLine",
    desc: "Connection status indicator with timer",
    preview: (
      <div className="flex flex-col gap-2 w-full bg-[#c3c3c3] p-3">
        <StatusLine status="waiting" timer="2:58" />
        <StatusLine status="success" />
      </div>
    ),
  },
  {
    id: "spinner",
    label: "Spinner",
    desc: "Animated loading indicator",
    preview: <Spinner />,
  },
  {
    id: "progress-bar",
    label: "ProgressBar",
    desc: "Token sale progress with soft/hard caps",
    preview: (
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <ProgressBar value={42} />
        <ProgressBar value={100} />
      </div>
    ),
  },
  {
    id: "qr-panel",
    label: "QrPanel",
    desc: "QR code display for Telegram auth",
    preview: (
      <div className="flex gap-3 bg-[#c3c3c3] p-3">
        <QrPanel status="generating" />
        <QrPanel status="success" />
      </div>
    ),
  },
  {
    id: "token-card",
    label: "TokenCard",
    desc: "Token sale dashboard card",
    preview: (
      <div style={{ transform: "scale(0.55)", transformOrigin: "top left", width: "182%" }}>
        <TokenCard />
      </div>
    ),
  },
  {
    id: "window",
    label: "Window",
    desc: "Win95-style dialog window chrome",
    preview: (
      <div className="w-full bg-[#02007f] flex items-center justify-center p-3">
        <div style={{ transform: "scale(0.7)", transformOrigin: "top center" }}>
          <Window title="connect.exe" className="w-64">
            <div className="p-4">
              <Input placeholder="ss://key" />
            </div>
          </Window>
        </div>
      </div>
    ),
  },
];

// ── Variant grid helpers (FIX 3) ───────────────────────────────────────────────

const VARIANT_GRID: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
  gap: 24,
  width: "100%",
};

const FIGURE_STYLE: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  margin: 0,
};

const FIGCAPTION_STYLE: CSSProperties = {
  fontFamily: "system-ui, sans-serif",
  fontSize: 11,
  color: "#666666",
  textAlign: "center",
};

// ── PreviewCanvas — bg toggle (FIX 1) ─────────────────────────────────────────

const BG_OPTIONS = [
  { color: "#c3c3c3", label: "W95 Gray" },
  { color: "#ffffff", label: "White" },
  { color: "#1a1a1a", label: "Dark" },
] as const;

function PreviewCanvas({ children }: { children: ReactNode }) {
  const [bg, setBg] = useState("#c3c3c3");

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          zIndex: 10,
          display: "flex",
          gap: 4,
        }}
      >
        {BG_OPTIONS.map(({ color, label }) => (
          <span
            key={color}
            role="button"
            tabIndex={0}
            aria-label={label}
            title={label}
            onClick={() => setBg(color)}
            onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
              if (e.key === "Enter" || e.key === " ") setBg(color);
            }}
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              backgroundColor: color,
              outline: color === bg ? "2px solid #000000" : "1px solid #888888",
              outlineOffset: color === bg ? 1 : 0,
              cursor: "pointer",
              flexShrink: 0,
            }}
          />
        ))}
      </div>
      <div
        style={{
          border: "1px solid #e5e5e5",
          padding: 32,
          minHeight: 120,
          backgroundColor: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── CopyButton (FIX 5) ────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [label, setLabel] = useState("Copy");

  const doCopy = () => {
    void navigator.clipboard.writeText(code);
    setLabel("Copied!");
    setTimeout(() => setLabel("Copy"), 2000);
  };

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={doCopy}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter" || e.key === " ") doCopy();
      }}
      style={{
        position: "absolute",
        top: 8,
        right: 8,
        fontFamily: "system-ui, sans-serif",
        fontSize: 11,
        color: "#aaaaaa",
        cursor: "pointer",
        userSelect: "none",
        padding: "2px 6px",
        border: "1px solid #444444",
        lineHeight: "16px",
        zIndex: 10,
      }}
    >
      {label}
    </span>
  );
}

// ── Section wrapper (FIX 1 + FIX 4 + FIX 5) ──────────────────────────────────

function Section({
  id,
  title,
  description,
  props: propsList,
  preview,
  highlightedCode,
  rawCode,
  archived = false,
}: {
  id: string;
  title: string;
  description: string;
  props: string[];
  preview: ReactNode;
  highlightedCode: string;
  rawCode: string;
  archived?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-6 flex flex-col gap-4">
      {archived && (
        <div
          style={{
            background: "#ffff99",
            border: "2px solid #000000",
            padding: "8px 12px",
            fontFamily: "system-ui, sans-serif",
            fontSize: 12,
          }}
        >
          ⚠ Archived — not in active development. API may change.
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold text-[#111] tracking-tight">{title}</h2>
        <p className="text-sm text-[#666] mt-1">{description}</p>
      </div>

      <Card className="rounded-none overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-[#e5e5e5]">
          <div className="flex items-start gap-4">
            <p className="text-sm font-semibold text-[#111] shrink-0">{title}</p>
            <div className="flex flex-wrap gap-1.5">
              {propsList.map((p) => (
                <Badge key={p} variant="outline" className="font-mono text-[11px]">
                  {p}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="px-5 py-4">
          <Tabs defaultValue="preview">
            <TabsList variant="line" className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
            <TabsContent value="preview">
              <PreviewCanvas>{preview}</PreviewCanvas>
            </TabsContent>
            <TabsContent value="code">
              <div style={{ position: "relative", border: "2px solid #000000", overflowX: "auto" }}>
                <CopyButton code={rawCode} />
                <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </section>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────

type Props = {
  highlighted: Record<string, string>;
  rawCode: Record<string, string>;
};

// ── Main client component ──────────────────────────────────────────────────────

export default function UIKitClient({ highlighted, rawCode }: Props) {
  const [btnSelected, setBtnSelected] = useState(false);
  const [switcherOn, setSwitcherOn] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("plan-a");

  return (
    <div className="doc-chrome flex h-screen overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex w-60 shrink-0 flex-col bg-[#111] overflow-y-auto">
        <div className="px-4 py-5 border-b border-white/10">
          <p className="text-white font-semibold text-sm tracking-tight">Durev VPN</p>
          <p className="text-white/40 text-xs mt-0.5">UI Kit · 15 components</p>
        </div>

        <a
          href="#overview"
          className="px-4 py-2.5 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors border-b border-white/5"
        >
          Overview
        </a>

        <nav className="flex-1 py-2">
          {NAV.map((group) => (
            <div key={group.group} className="mb-4">
              <p className="px-4 py-1.5 text-[10px] font-semibold text-white/30 uppercase tracking-widest">
                {group.group}
              </p>
              {group.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center px-4 py-2 text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          ))}
        </nav>

        <div className="border-t border-white/5 pt-2 pb-4">
          <p className="px-4 py-1.5 text-[10px] font-semibold text-[#666] uppercase tracking-widest">
            Archive
          </p>
          {ARCHIVE_NAV.map((item) => (
            <span
              key={item.id}
              title="Not in production · design paused"
              className="flex items-center px-4 py-2 text-xs text-[#555] line-through cursor-default select-none"
            >
              {item.label}
            </span>
          ))}
        </div>
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 bg-[#111] border-b border-white/10 overflow-x-auto flex shrink-0">
        {[{ id: "overview", label: "Overview" }, ...NAV.flatMap((g) => g.items)].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="shrink-0 px-4 py-3 text-xs text-white/60 hover:text-white whitespace-nowrap border-r border-white/5"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 min-h-0 overflow-y-auto bg-[#f5f5f5] pt-12 lg:pt-0">
        <div className="max-w-4xl mx-auto px-6 py-10 flex flex-col gap-12">

          {/* Overview */}
          <section id="overview" className="scroll-mt-6">
            <h1 className="text-2xl font-semibold text-[#111] tracking-tight mb-1">
              Component Library
            </h1>
            <p className="text-sm text-[#666] mb-6">
              Windows 95 design system · 15 components
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
              {OVERVIEW.map((item) => (
                <a key={item.id} href={`#${item.id}`} className="group flex no-underline">
                  <Card className="flex flex-col h-full w-full rounded-none transition-shadow group-hover:shadow-md overflow-hidden">
                    <div className="flex-1 flex items-center justify-center bg-[#f9f9f9] border-b border-[#e5e5e5] p-6 min-h-[160px] max-h-[160px] pointer-events-none overflow-hidden">
                      {item.preview}
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm font-semibold text-[#111]">{item.label}</p>
                      <p className="text-xs text-[#888] mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </Card>
                </a>
              ))}
            </div>
          </section>

          {/* ── Typography ── */}
          <section id="typography" className="scroll-mt-6 flex flex-col gap-8">
            <div>
              <h1 className="text-2xl font-semibold text-[#111] tracking-tight mb-1">Typography</h1>
              <p className="text-sm text-[#666]">Type scale, typefaces, and color tokens from the W95 design system</p>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#111] mb-3">Type Scale</h2>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#ddd] text-[#888] text-left">
                    <th className="pb-2 font-medium pr-6">Token</th>
                    <th className="pb-2 font-medium pr-4">Size</th>
                    <th className="pb-2 font-medium pr-4">Weight</th>
                    <th className="pb-2 font-medium pr-6">Face</th>
                    <th className="pb-2 font-medium">Sample</th>
                  </tr>
                </thead>
                <tbody>
                  {TYPE_SCALE.map((row) => (
                    <tr key={row.token} className="border-b border-[#eee]">
                      <td className="py-2.5 pr-6 text-[#666] font-mono">{row.token}</td>
                      <td className="py-2.5 pr-4 text-[#444]">{row.size}</td>
                      <td className="py-2.5 pr-4 text-[#444]">{row.weight}</td>
                      <td className="py-2.5 pr-6 text-[#888]">{row.face}</td>
                      <td className="py-2.5">
                        <span
                          className={`${row.face === "Monocraft" ? "font-monocraft" : "font-roboto-mono"} text-[#111]`}
                          style={{ fontSize: row.size }}
                        >
                          The quick fox
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#111] mb-4">Typefaces</h2>
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-[#111]">Monocraft</span>
                  <span className="text-xs text-[#888]">UI · Code · All W95 elements</span>
                </div>
                <p className="font-monocraft text-[16px] text-[#111] break-all leading-relaxed border border-[#e5e5e5] bg-white p-4">
                  {ALPHABET}
                </p>
              </div>
              <div className="mb-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-[#111]">Roboto Mono</span>
                  <span className="text-xs text-[#888]">Data · Numeric values</span>
                </div>
                <p className="font-roboto-mono text-[16px] text-[#111] break-all leading-relaxed border border-[#e5e5e5] bg-white p-4">
                  {ALPHABET}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-[#111]">System UI</span>
                  <span className="text-xs text-[#888]">Documentation chrome only</span>
                </div>
                <p
                  className="text-[16px] text-[#111] break-all leading-relaxed border border-[#e5e5e5] bg-white p-4"
                  style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}
                >
                  {ALPHABET}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#111] mb-4">Color Tokens</h2>
              <div className="flex flex-wrap gap-4">
                {COLOR_TOKENS.map((c) => (
                  <div key={c.name} className="flex flex-col items-center gap-1.5">
                    <div
                      className="w-12 h-12 border border-[#ddd]"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[10px] text-[#888] font-mono text-center leading-tight max-w-[52px]">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-[#aaa] font-mono">{c.hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <Separator />

          {/* ── Button (FIX 3: variant grid) ── */}
          <Section
            id="button"
            title="Button"
            description="Primary action trigger. 5 variants: default, secondary, ghost, accent, wallet. Supports selected, disabled, and outline states."
            props={["variant?", "selected?", "disabled?", "outline?", "leftIcon?", "rightIcon?", "onClick?", "children"]}
            highlightedCode={highlighted["button"] ?? ""}
            rawCode={rawCode["button"] ?? ""}
            preview={
              <div style={VARIANT_GRID}>
                <figure style={FIGURE_STYLE}>
                  <Button>default</Button>
                  <figcaption style={FIGCAPTION_STYLE}>default</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button variant="secondary">secondary</Button>
                  <figcaption style={FIGCAPTION_STYLE}>secondary</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button variant="ghost">ghost</Button>
                  <figcaption style={FIGCAPTION_STYLE}>ghost</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button variant="accent">accent</Button>
                  <figcaption style={FIGCAPTION_STYLE}>accent</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button variant="wallet">wallet</Button>
                  <figcaption style={FIGCAPTION_STYLE}>wallet</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button selected={btnSelected} onClick={() => setBtnSelected((v) => !v)}>
                    {btnSelected ? "selected ✓" : "click me"}
                  </Button>
                  <figcaption style={FIGCAPTION_STYLE}>selected</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button disabled>disabled</Button>
                  <figcaption style={FIGCAPTION_STYLE}>disabled</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Button outline>outline</Button>
                  <figcaption style={FIGCAPTION_STYLE}>outline</figcaption>
                </figure>
              </div>
            }
          />

          {/* ── IconButton (FIX 3: variant grid) ── */}
          <Section
            id="icon-button"
            title="IconButton"
            description="Square icon-only button. 4 kinds: plus, cross, conf, update."
            props={["kind?", "aria-label?", "onClick?"]}
            highlightedCode={highlighted["icon-button"] ?? ""}
            rawCode={rawCode["icon-button"] ?? ""}
            preview={
              <div style={VARIANT_GRID}>
                {(["plus", "cross", "conf", "update"] as const).map((kind) => (
                  <figure key={kind} style={FIGURE_STYLE}>
                    <IconButton kind={kind} aria-label={kind} />
                    <figcaption style={FIGCAPTION_STYLE}>{kind}</figcaption>
                  </figure>
                ))}
              </div>
            }
          />

          {/* ── Switcher ── */}
          <Section
            id="switcher"
            title="Switcher"
            description="Toggle control for boolean settings. Designed for use on dark backgrounds."
            props={["checked?", "defaultChecked?", "onChange?"]}
            highlightedCode={highlighted["switcher"] ?? ""}
            rawCode={rawCode["switcher"] ?? ""}
            preview={
              <div className="flex gap-6 bg-[#02007f] px-8 py-5">
                <Switcher aria-label="off" checked={false} onChange={() => {}} />
                <Switcher aria-label="on" checked={switcherOn} onChange={setSwitcherOn} />
              </div>
            }
          />

          {/* ── Input (FIX 3: variant grid) ── */}
          <Section
            id="input"
            title="Input"
            description="Standard text input. Supports label, description, error message, and disabled state."
            props={["label?", "description?", "error?", "disabled?"]}
            highlightedCode={highlighted["input"] ?? ""}
            rawCode={rawCode["input"] ?? ""}
            preview={
              <div style={{ ...VARIANT_GRID, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
                <figure style={FIGURE_STYLE}>
                  <Input placeholder="ss://access-key" />
                  <figcaption style={FIGCAPTION_STYLE}>default</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Input defaultValue="ss://my-key" label="Access Key" />
                  <figcaption style={FIGCAPTION_STYLE}>with label</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Input
                    defaultValue="invalid"
                    label="Access Key"
                    description="Paste your Shadowsocks URL"
                    error="Invalid access key format"
                  />
                  <figcaption style={FIGCAPTION_STYLE}>with error</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Input placeholder="Disabled" disabled />
                  <figcaption style={FIGCAPTION_STYLE}>disabled</figcaption>
                </figure>
              </div>
            }
          />

          {/* ── Checkbox (FIX 3: variant grid) ── */}
          <Section
            id="checkbox"
            title="Checkbox"
            description="Binary choice control. Supports label, description, indeterminate state, and disabled."
            props={["label?", "description?", "checked?", "indeterminate?", "disabled?", "onChange?"]}
            highlightedCode={highlighted["checkbox"] ?? ""}
            rawCode={rawCode["checkbox"] ?? ""}
            preview={
              <div style={VARIANT_GRID}>
                <figure style={FIGURE_STYLE}>
                  <Checkbox checked={checkboxChecked} onChange={setCheckboxChecked} label="Remember device" />
                  <figcaption style={FIGCAPTION_STYLE}>checked</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Checkbox checked={false} onChange={() => {}} label="Send analytics" description="Help improve" />
                  <figcaption style={FIGCAPTION_STYLE}>with description</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Checkbox indeterminate label="Indeterminate" onChange={() => {}} />
                  <figcaption style={FIGCAPTION_STYLE}>indeterminate</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Checkbox disabled label="Disabled" onChange={() => {}} />
                  <figcaption style={FIGCAPTION_STYLE}>disabled</figcaption>
                </figure>
              </div>
            }
          />

          {/* ── Radio (FIX 3: variant grid) ── */}
          <Section
            id="radio"
            title="Radio"
            description="Single selection within a named group. onChange fires the string value."
            props={["label?", "description?", "disabled?", "onChange?"]}
            highlightedCode={highlighted["radio"] ?? ""}
            rawCode={rawCode["radio"] ?? ""}
            preview={
              <div style={VARIANT_GRID}>
                <figure style={FIGURE_STYLE}>
                  <Radio
                    name="plan-demo"
                    value="plan-a"
                    label="Plan A — Basic"
                    description="1 device, 10 GB/mo"
                    checked={radioValue === "plan-a"}
                    onChange={setRadioValue}
                  />
                  <figcaption style={FIGCAPTION_STYLE}>checked</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Radio
                    name="plan-demo"
                    value="plan-b"
                    label="Plan B — Pro"
                    description="5 devices, unlimited"
                    checked={radioValue === "plan-b"}
                    onChange={setRadioValue}
                  />
                  <figcaption style={FIGCAPTION_STYLE}>unchecked</figcaption>
                </figure>
                <figure style={FIGURE_STYLE}>
                  <Radio name="plan-demo" value="plan-c" label="Disabled option" disabled />
                  <figcaption style={FIGCAPTION_STYLE}>disabled</figcaption>
                </figure>
              </div>
            }
          />

          {/* ── Accordion ── */}
          <Section
            id="accordion"
            title="Accordion"
            description="Collapsible content section with a click-to-toggle title row."
            props={["title", "defaultOpen?", "children"]}
            highlightedCode={highlighted["accordion"] ?? ""}
            rawCode={rawCode["accordion"] ?? ""}
            preview={
              <div className="flex flex-col gap-2 w-full max-w-lg">
                <Accordion title="Is VPN safe for my device?" defaultOpen>
                  Absolutely. Durev VPN is built on the safest protocols ever devised.
                </Accordion>
                <Accordion title="How do I connect?">
                  Paste your access key and press Connect.
                </Accordion>
              </div>
            }
          />

          {/* ── PadInput (FIX 4: archived banner) ── */}
          <Section
            id="pad-input"
            title="PadInput"
            description="Large numeric / token entry field with optional hint and error message."
            props={["hint?", "error?", "+ InputHTMLAttributes"]}
            archived
            highlightedCode={highlighted["pad-input"] ?? ""}
            rawCode={rawCode["pad-input"] ?? ""}
            preview={
              <div className="flex flex-col gap-4 w-full max-w-xs">
                <PadInput placeholder="0 TON" hint="max: 200 TON" />
                <PadInput defaultValue="220 TON" hint="max: 200 TON" error="Amount exceeds hard cap" />
              </div>
            }
          />

          {/* ── Snackbar ── */}
          <Section
            id="snackbar"
            title="Snackbar"
            description="Inline status message. Variants: info, success, default."
            props={["variant?", "children?"]}
            highlightedCode={highlighted["snackbar"] ?? ""}
            rawCode={rawCode["snackbar"] ?? ""}
            preview={
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <Snackbar variant="info">Access key copied to clipboard</Snackbar>
                <Snackbar variant="success">VPN connected successfully</Snackbar>
                <Snackbar>Plain notification</Snackbar>
              </div>
            }
          />

          {/* ── StatusLine ── */}
          <Section
            id="status-line"
            title="StatusLine"
            description="Connection status indicator. 4 statuses: waiting, expired, generating, success."
            props={["status", "text?", "timer?"]}
            highlightedCode={highlighted["status-line"] ?? ""}
            rawCode={rawCode["status-line"] ?? ""}
            preview={
              <div className="flex flex-col gap-3 w-full max-w-sm">
                <StatusLine status="waiting" timer="2:58" />
                <StatusLine status="expired" timer="0:00" />
                <StatusLine status="generating" />
                <StatusLine status="success" />
              </div>
            }
          />

          {/* ── Spinner ── */}
          <Section
            id="spinner"
            title="Spinner"
            description="Animated loading indicator for async operations."
            props={["className?"]}
            highlightedCode={highlighted["spinner"] ?? ""}
            rawCode={rawCode["spinner"] ?? ""}
            preview={<Spinner />}
          />

          {/* ── ProgressBar (FIX 4: archived banner) ── */}
          <Section
            id="progress-bar"
            title="ProgressBar"
            description="Horizontal progress bar for token sale progress. Supports soft and hard cap markers."
            props={["value", "softCapAt?", "hardCapAt?"]}
            archived
            highlightedCode={highlighted["progress-bar"] ?? ""}
            rawCode={rawCode["progress-bar"] ?? ""}
            preview={
              <div className="flex flex-col gap-4 w-full max-w-sm">
                <ProgressBar value={29} />
                <ProgressBar value={65} softCapAt={50} />
                <ProgressBar value={100} />
              </div>
            }
          />

          {/* ── QrPanel ── */}
          <Section
            id="qr-panel"
            title="QrPanel"
            description="QR code panel for Telegram auth. 4 statuses: qr, expired, generating, success."
            props={["status", "qrSrc?", "onRefresh?"]}
            highlightedCode={highlighted["qr-panel"] ?? ""}
            rawCode={rawCode["qr-panel"] ?? ""}
            preview={
              <div className="flex flex-wrap gap-4 justify-center">
                <QrPanel status="qr" qrSrc="/ui/qr-demo.png" />
                <QrPanel status="expired" />
                <QrPanel status="generating" />
                <QrPanel status="success" />
              </div>
            }
          />

          {/* ── TokenCard (FIX 4: archived banner) ── */}
          <Section
            id="token-card"
            title="TokenCard"
            description="Token sale dashboard card with progress, stats rows, and action button."
            props={["name?", "avatarSrc?", "progress?", "progressLabel?", "softCap?", "hardCap?", "rows?", "statusText?", "onAction?"]}
            archived
            highlightedCode={highlighted["token-card"] ?? ""}
            rawCode={rawCode["token-card"] ?? ""}
            preview={
              <div className="w-full max-w-xs">
                <TokenCard
                  name="DRV"
                  progress={42}
                  progressLabel="42% funded"
                  softCap="500K TON"
                  hardCap="2M TON"
                  rows={[
                    { label: "Token price", value: "0.0031 TON" },
                    { label: "Your stake", value: "120 TON" },
                  ]}
                  statusText="Sale ends in 3d 14h"
                />
              </div>
            }
          />

          {/* ── Window ── */}
          <Section
            id="window"
            title="Window"
            description="Windows 95-style dialog window chrome with title bar, icons, and body slot."
            props={["title", "iconSrc?", "actions?", "children"]}
            highlightedCode={highlighted["window"] ?? ""}
            rawCode={rawCode["window"] ?? ""}
            preview={
              <Window title="login.exe" className="w-80">
                <div className="flex flex-col items-center gap-3 p-5 w-full">
                  <Input placeholder="ss://access-key" />
                  <Button outline className="w-full">confirm</Button>
                </div>
              </Window>
            }
          />

        </div>
      </main>
    </div>
  );
}
