"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Window from "@/components/Window";
import ModalHeader from "@/components/ModalHeader";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Checkbox from "@/components/Checkbox";
import Radio from "@/components/Radio";
import Accordion from "@/components/Accordion";
import Switcher from "@/components/Switcher";
import IconButton from "@/components/IconButton";
import Spinner from "@/components/Spinner";
import ProgressBar from "@/components/ProgressBar";
import StatusLine from "@/components/StatusLine";
import Snackbar from "@/components/Snackbar";
import PadInput from "@/components/PadInput";
import QrPanel from "@/components/QrPanel";
import TokenCard from "@/components/TokenCard";

// ─── Nav structure ────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    id: "actions",
    label: "Actions",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "IconButton" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    items: [
      { id: "input", label: "Input" },
      { id: "checkbox", label: "Checkbox" },
      { id: "radio", label: "Radio" },
      { id: "switcher", label: "Switcher" },
      { id: "pad-input", label: "PadInput" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    items: [
      { id: "snackbar", label: "Snackbar" },
      { id: "status-line", label: "StatusLine" },
      { id: "spinner", label: "Spinner" },
      { id: "progress-bar", label: "ProgressBar" },
    ],
  },
  {
    id: "display",
    label: "Display",
    items: [
      { id: "accordion", label: "Accordion" },
      { id: "qr-panel", label: "QrPanel" },
      { id: "token-card", label: "TokenCard" },
      { id: "window", label: "Window" },
    ],
  },
] as const;

// ─── Overview cards ───────────────────────────────────────────────────────────

const OVERVIEW_CARDS: Array<{ id: string; label: string; desc: string; preview: ReactNode }> = [
  {
    id: "button",
    label: "Button",
    desc: "Primary and variant action triggers",
    preview: (
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <Button variant="default">default</Button>
        <Button variant="accent">accent</Button>
        <Button variant="ghost">ghost</Button>
      </div>
    ),
  },
  {
    id: "icon-button",
    label: "IconButton",
    desc: "Icon-only compact action trigger",
    preview: (
      <div className="flex gap-3 items-center">
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
    desc: "Toggle boolean on/off settings",
    preview: (
      <div className="flex gap-6 items-center">
        <Switcher aria-label="off" />
        <Switcher aria-label="on" defaultChecked />
      </div>
    ),
  },
  {
    id: "input",
    label: "Input",
    desc: "Text field with label and validation",
    preview: (
      <div className="w-[190px]">
        <Input label="Server key" placeholder="ss://access-key" />
      </div>
    ),
  },
  {
    id: "checkbox",
    label: "Checkbox",
    desc: "Multi-select option control",
    preview: (
      <div className="flex flex-col gap-2">
        <Checkbox label="Split tunneling" checked onChange={() => {}} />
        <Checkbox label="Auto-reconnect" />
        <Checkbox label="Indeterminate" indeterminate />
      </div>
    ),
  },
  {
    id: "radio",
    label: "Radio",
    desc: "Single-select from a group",
    preview: (
      <div className="flex flex-col gap-2">
        <Radio label="VPN Standard" name="ov-plan" checked onChange={() => {}} />
        <Radio label="VPN Pro" name="ov-plan" />
        <Radio label="Enterprise" name="ov-plan" disabled />
      </div>
    ),
  },
  {
    id: "accordion",
    label: "Accordion",
    desc: "Collapsible content sections",
    preview: (
      <div className="w-full overflow-hidden" style={{ maxHeight: 90 }}>
        <Accordion title="How does it work?" defaultOpen>
          <span className="font-roboto-mono text-[10px] p-2 block text-text-primary">
            Encrypted tunnel via TON network.
          </span>
        </Accordion>
      </div>
    ),
  },
  {
    id: "pad-input",
    label: "PadInput",
    desc: "Token amount input with cap hint",
    preview: (
      <div className="w-full max-w-[200px]">
        <PadInput placeholder="0.00" hint="max: 200 TON" />
      </div>
    ),
  },
  {
    id: "snackbar",
    label: "Snackbar",
    desc: "Transient status notifications",
    preview: (
      <div className="flex flex-col gap-2 w-full">
        <Snackbar variant="success">VPN tunnel active</Snackbar>
        <Snackbar variant="info">Key copied</Snackbar>
      </div>
    ),
  },
  {
    id: "status-line",
    label: "StatusLine",
    desc: "Auth and connection status row",
    preview: (
      <div className="w-full flex flex-col gap-2">
        <StatusLine status="waiting" timer="1:30" />
        <StatusLine status="success" />
      </div>
    ),
  },
  {
    id: "spinner",
    label: "Spinner",
    desc: "ASCII-frame loading indicator",
    preview: (
      <div className="flex items-center gap-3">
        <Spinner />
        <span className="font-roboto-mono text-xs text-text-secondary">loading...</span>
      </div>
    ),
  },
  {
    id: "progress-bar",
    label: "ProgressBar",
    desc: "Token sale funding progress bar",
    preview: (
      <div className="w-full flex flex-col gap-3">
        <ProgressBar value={29} />
        <ProgressBar value={65} />
        <ProgressBar value={100} />
      </div>
    ),
  },
  {
    id: "qr-panel",
    label: "QrPanel",
    desc: "QR code display for Telegram auth",
    preview: (
      <div className="flex gap-4 items-start">
        <QrPanel status="success" />
        <QrPanel status="expired" onRefresh={() => {}} />
      </div>
    ),
  },
  {
    id: "token-card",
    label: "TokenCard",
    desc: "Token sale card with live progress",
    preview: (
      <div style={{ overflow: "hidden", height: 96, width: "100%" }}>
        <div style={{ transform: "scale(0.34)", transformOrigin: "top left", width: "294%" }}>
          <TokenCard />
        </div>
      </div>
    ),
  },
  {
    id: "window",
    label: "Window",
    desc: "Win95 dialog chrome shell",
    preview: (
      <div style={{ transform: "scale(0.72)", transformOrigin: "top center" }}>
        <Window title="dialog.exe" iconSrc="/ui/icon-keys.png">
          <div className="p-3 bg-bg-window font-roboto-mono text-[10px] text-text-primary w-[210px]">
            Window body content
          </div>
        </Window>
      </div>
    ),
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto bg-[#0c0c0c] text-[#c0c0c0] font-roboto-mono text-[11px] leading-[1.65] p-4 shadow-w95-input whitespace-pre">
      {code.trim()}
    </pre>
  );
}

function Section({
  id,
  title,
  demo,
  code,
}: {
  id: string;
  title: string;
  demo: ReactNode;
  code: string;
}) {
  return (
    <section id={id} className="scroll-mt-4">
      <Window title={`${title}.tsx`} iconSrc="/ui/icon-keys.png">
        <div className="flex flex-col xl:flex-row gap-[4px]">
          <div className="flex-1 bg-bg-window p-6 flex flex-wrap gap-4 items-center justify-center min-h-[120px]">
            {demo}
          </div>
          <div className="xl:w-[400px] shrink-0 flex flex-col">
            <div className="bg-bg-main px-3 py-[5px] font-monocraft text-[11px] text-text-inverse shrink-0">
              code snippet
            </div>
            <div className="flex-1">
              <CodeBlock code={code} />
            </div>
          </div>
        </div>
      </Window>
    </section>
  );
}

// ─── Overview card ────────────────────────────────────────────────────────────

function OverviewCard({
  id,
  label,
  desc,
  preview,
}: {
  id: string;
  label: string;
  desc: string;
  preview: ReactNode;
}) {
  return (
    <a href={`#${id}`} className="block group" style={{ textDecoration: "none" }}>
      <div className="flex flex-col shadow-w95-out bg-[#c0c0c0] relative overflow-hidden">
        {/* Title bar — revealed on hover */}
        <div
          className="absolute inset-x-0 top-0 z-10 bg-[#000080] px-2 py-[3px] font-monocraft text-[11px] text-white opacity-0 group-hover:opacity-100"
          style={{ transition: "none" }}
        >
          {label}
        </div>
        {/* Preview — pointer-events-none keeps inner interactive elements purely visual */}
        <div className="flex items-center justify-center p-4 min-h-[120px] bg-[#c0c0c0] overflow-hidden pointer-events-none">
          {preview}
        </div>
        {/* Info */}
        <div
          className="p-3 bg-[#c0c0c0]"
          style={{ borderTop: "1px solid #808080", boxShadow: "inset 0 1px 0 #ffffff" }}
        >
          <p className="font-monocraft text-[12px] font-bold text-black leading-none mb-[5px]">
            {label}
          </p>
          <p className="font-roboto-mono text-[11px] leading-tight" style={{ color: "#808080" }}>
            {desc}
          </p>
        </div>
      </div>
    </a>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  activeId,
  onSelect,
}: {
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const [openSections, setOpenSections] = useState(
    new Set<string>(["actions", "forms", "feedback", "display"])
  );

  const toggle = (id: string) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const linkCls = (id: string) =>
    [
      "block py-[5px] font-monocraft text-[11px] select-none",
      activeId === id
        ? "bg-[#000080] text-white"
        : "text-black hover:bg-[#000080] hover:text-white",
    ].join(" ");

  return (
    <aside
      className="hidden lg:flex w-[220px] shrink-0 flex-col bg-[#c0c0c0] overflow-y-auto"
      style={{ borderRight: "2px solid #808080" }}
    >
      {/* Sidebar title bar */}
      <div className="bg-[#000080] px-2 py-[5px] font-monocraft text-[11px] font-bold text-white shrink-0 select-none">
        Components
      </div>

      {/* Overview link */}
      <a
        href="#overview"
        onClick={() => onSelect("overview")}
        className={linkCls("overview") + " px-3"}
        style={{ borderBottom: "1px solid #808080" }}
      >
        Overview
      </a>

      {/* Collapsible sections */}
      {NAV_SECTIONS.map((section) => {
        const isOpen = openSections.has(section.id);
        return (
          <div key={section.id}>
            <span
              role="button"
              tabIndex={0}
              onClick={() => toggle(section.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(section.id);
                }
              }}
              className="flex items-center gap-[6px] w-full px-2 py-[5px] font-monocraft text-[11px] font-bold text-black select-none cursor-pointer hover:bg-[#000080] hover:text-white"
              style={{ borderBottom: "1px solid #808080" }}
            >
              <span className="w-3 shrink-0 text-[9px] leading-none">{isOpen ? "▾" : "▸"}</span>
              {section.label}
            </span>

            {isOpen &&
              section.items.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => onSelect(item.id)}
                  className={linkCls(item.id)}
                  style={{ paddingLeft: 20, paddingRight: 8, borderBottom: "1px solid #d4d0c8" }}
                >
                  {item.label}
                </a>
              ))}
          </div>
        );
      })}
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UIKitPage() {
  const [btnSelected, setBtnSelected] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [radioValue, setRadioValue] = useState("plan-1");
  const [activeNavId, setActiveNavId] = useState<string | null>("overview");

  const mobileTabs = [
    { id: "overview", label: "Overview" },
    ...NAV_SECTIONS.map((s) => ({ id: s.items[0].id, label: s.label })),
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* ── Sidebar (lg+) ── */}
      <Sidebar activeId={activeNavId} onSelect={setActiveNavId} />

      {/* ── Right column ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile tab strip (below lg) */}
        <div
          className="lg:hidden flex overflow-x-auto shrink-0 bg-[#c0c0c0]"
          style={{ borderBottom: "2px solid #808080" }}
        >
          {mobileTabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setActiveNavId(tab.id)}
              className={[
                "shrink-0 px-4 py-[7px] font-monocraft text-[11px] select-none whitespace-nowrap",
                activeNavId === tab.id
                  ? "bg-[#000080] text-white"
                  : "text-black hover:bg-[#000080] hover:text-white",
              ].join(" ")}
              style={{ borderRight: "1px solid #808080" }}
            >
              {tab.label}
            </a>
          ))}
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto bg-bg-main p-4 md:p-6">
          <div className="mx-auto max-w-6xl flex flex-col gap-4">

            {/* ── Overview ── */}
            <section id="overview" className="scroll-mt-4">
              <Window title="overview — component library" iconSrc="/ui/icon-keys.png">
                <div className="p-4 bg-bg-window">
                  <p className="font-roboto-mono text-xs text-text-secondary mb-4">
                    {OVERVIEW_CARDS.length} components&nbsp;·&nbsp;Tailwind CSS
                    v4&nbsp;·&nbsp;Win95 Design System
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {OVERVIEW_CARDS.map((card) => (
                      <OverviewCard key={card.id} {...card} />
                    ))}
                  </div>
                </div>
              </Window>
            </section>

            {/* ── Button ── */}
            <Section
              id="button"
              title="Button"
              demo={
                <div className="flex flex-wrap gap-3 items-center justify-center">
                  <Button variant="default">default</Button>
                  <Button variant="secondary">secondary</Button>
                  <Button variant="ghost">ghost</Button>
                  <Button variant="wallet">wallet</Button>
                  <Button variant="accent">accent</Button>
                  <Button
                    variant="default"
                    selected={btnSelected}
                    onClick={() => setBtnSelected((v) => !v)}
                  >
                    {btnSelected ? "selected" : "click me"}
                  </Button>
                  <Button variant="default" disabled>
                    disabled
                  </Button>
                  <Button variant="default" outline>
                    outline
                  </Button>
                </div>
              }
              code={`<Button variant="default">default</Button>
<Button variant="secondary">secondary</Button>
<Button variant="ghost">ghost</Button>
<Button variant="wallet">wallet</Button>
<Button variant="accent">accent</Button>

<Button variant="default" selected>selected</Button>
<Button variant="default" disabled>disabled</Button>
<Button variant="default" outline>outline</Button>

// With icons:
<Button variant="default" leftIcon={<Icon />}>
  connect
</Button>`}
            />

            {/* ── Input ── */}
            <Section
              id="input"
              title="Input"
              demo={
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Input placeholder="plain input" />
                  <Input
                    label="Label"
                    description="Helper text below the label"
                    placeholder="with label + description"
                  />
                  <Input
                    label="Error state"
                    error="Something went wrong"
                    defaultValue="bad input"
                  />
                  <Input label="Disabled" placeholder="can't touch this" disabled />
                </div>
              }
              code={`<Input placeholder="plain input" />

<Input
  label="Label"
  description="Helper text"
  placeholder="with label"
/>

<Input
  label="Error state"
  error="Something went wrong"
  defaultValue="bad input"
/>

<Input label="Disabled" disabled />`}
            />

            {/* ── Checkbox ── */}
            <Section
              id="checkbox"
              title="Checkbox"
              demo={
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  <Checkbox
                    label="Interactive"
                    description="Click to toggle"
                    checked={checkboxChecked}
                    onChange={setCheckboxChecked}
                  />
                  <Checkbox label="Checked" checked onChange={() => {}} />
                  <Checkbox label="Indeterminate" indeterminate />
                  <Checkbox label="Disabled" disabled />
                  <Checkbox
                    label="Disabled + checked"
                    checked
                    disabled
                    onChange={() => {}}
                  />
                </div>
              }
              code={`// Controlled
<Checkbox
  label="Interactive"
  description="Click to toggle"
  checked={checked}
  onChange={setChecked}
/>

// Static states:
<Checkbox label="Checked" checked onChange={() => {}} />
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Disabled" disabled />`}
            />

            {/* ── Radio ── */}
            <Section
              id="radio"
              title="Radio"
              demo={
                <div className="flex flex-col gap-3 w-full max-w-xs">
                  {(
                    [
                      { val: "plan-0", label: "VPN Standard" },
                      { val: "plan-1", label: "VPN Pro" },
                      { val: "plan-2", label: "VPN Enterprise" },
                    ] as const
                  ).map(({ val, label }) => (
                    <Radio
                      key={val}
                      label={label}
                      name="plan-demo"
                      value={val}
                      checked={radioValue === val}
                      onChange={() => setRadioValue(val)}
                    />
                  ))}
                  <Radio
                    label="Unavailable plan"
                    name="plan-demo"
                    value="plan-disabled"
                    disabled
                  />
                </div>
              }
              code={`const [plan, setPlan] = useState("plan-1");

<Radio
  label="VPN Standard"
  name="plan"
  value="plan-0"
  checked={plan === "plan-0"}
  onChange={() => setPlan("plan-0")}
/>
<Radio
  label="VPN Pro"
  name="plan"
  value="plan-1"
  checked={plan === "plan-1"}
  onChange={() => setPlan("plan-1")}
/>
<Radio label="Unavailable" name="plan" disabled />`}
            />

            {/* ── Switcher ── */}
            <Section
              id="switcher"
              title="Switcher"
              demo={
                <div className="flex flex-wrap gap-10 items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Switcher aria-label="VPN off" />
                    <span className="font-roboto-mono text-[10px] text-text-secondary">
                      default off
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Switcher defaultChecked aria-label="VPN on" />
                    <span className="font-roboto-mono text-[10px] text-text-secondary">
                      default on
                    </span>
                  </div>
                </div>
              }
              code={`<Switcher aria-label="Toggle VPN" />

<Switcher
  defaultChecked
  aria-label="Toggle VPN"
/>

// Controlled:
<Switcher
  checked={isOn}
  onChange={setIsOn}
  aria-label="Toggle VPN"
/>`}
            />

            {/* ── Accordion ── */}
            <Section
              id="accordion"
              title="Accordion"
              demo={
                <div className="w-full max-w-sm flex flex-col gap-3">
                  <Accordion title="What is Durev VPN?" defaultOpen>
                    <p className="font-roboto-mono text-xs text-text-primary p-3">
                      A retro-styled VPN service built on Win95 aesthetics and TON blockchain.
                    </p>
                  </Accordion>
                  <Accordion title="How do I connect?">
                    <p className="font-roboto-mono text-xs text-text-primary p-3">
                      Scan the QR code with Telegram and authenticate in one click.
                    </p>
                  </Accordion>
                </div>
              }
              code={`<Accordion title="What is Durev VPN?" defaultOpen>
  <p>Open by default</p>
</Accordion>

<Accordion title="How do I connect?">
  <p>Collapsed by default</p>
</Accordion>`}
            />

            {/* ── IconButton ── */}
            <Section
              id="icon-button"
              title="IconButton"
              demo={
                <div className="flex flex-wrap gap-6 items-center justify-center">
                  {(["plus", "cross", "conf", "update"] as const).map((kind) => (
                    <div key={kind} className="flex flex-col items-center gap-2">
                      <IconButton kind={kind} />
                      <span className="font-roboto-mono text-[10px] text-text-secondary">
                        {kind}
                      </span>
                    </div>
                  ))}
                </div>
              }
              code={`<IconButton kind="plus" />
<IconButton kind="cross" />
<IconButton kind="conf" />
<IconButton kind="update" />

// With custom accessible label:
<IconButton
  kind="plus"
  aria-label="Add new server"
  onClick={handleAdd}
/>`}
            />

            {/* ── Spinner ── */}
            <Section
              id="spinner"
              title="Spinner"
              demo={
                <div className="flex items-center gap-6">
                  <Spinner />
                  <span className="font-roboto-mono text-xs text-text-secondary">
                    ASCII frame animation — \&nbsp;/&nbsp;-
                  </span>
                </div>
              }
              code={`<Spinner />

// Used inside status text:
<span role="status">
  <Spinner /> Connecting...
</span>`}
            />

            {/* ── ProgressBar ── */}
            <Section
              id="progress-bar"
              title="ProgressBar"
              demo={
                <div className="flex flex-col gap-5 w-full max-w-sm">
                  {[20, 55, 85, 100].map((v) => (
                    <div key={v} className="flex flex-col gap-1">
                      <span className="font-roboto-mono text-[10px] text-text-secondary">
                        {v}%
                      </span>
                      <ProgressBar value={v} />
                    </div>
                  ))}
                </div>
              }
              code={`<ProgressBar value={20} />
<ProgressBar value={55} />
<ProgressBar value={85} />
<ProgressBar value={100} />

// Custom cap markers:
<ProgressBar
  value={70}
  softCapAt={50}
  hardCapAt={90}
/>`}
            />

            {/* ── StatusLine ── */}
            <Section
              id="status-line"
              title="StatusLine"
              demo={
                <div className="flex flex-col gap-2 w-full max-w-sm">
                  <StatusLine status="waiting" timer="2:58" />
                  <StatusLine status="generating" />
                  <StatusLine status="expired" timer="0:00" />
                  <StatusLine status="success" />
                </div>
              }
              code={`<StatusLine status="waiting" timer="2:58" />
<StatusLine status="generating" />
<StatusLine status="expired" timer="0:00" />
<StatusLine status="success" />

// Custom text override:
<StatusLine
  status="waiting"
  text="Waiting for your device..."
  timer="1:30"
/>`}
            />

            {/* ── Snackbar ── */}
            <Section
              id="snackbar"
              title="Snackbar"
              demo={
                <div className="flex flex-col gap-3 w-full max-w-sm">
                  <Snackbar variant="default">Default notification message</Snackbar>
                  <Snackbar variant="info">Connection established via TON</Snackbar>
                  <Snackbar variant="success">VPN tunnel active — you&apos;re protected</Snackbar>
                </div>
              }
              code={`<Snackbar variant="default">
  Default notification
</Snackbar>

<Snackbar variant="info">
  Connection established via TON
</Snackbar>

<Snackbar variant="success">
  VPN tunnel active
</Snackbar>`}
            />

            {/* ── PadInput ── */}
            <Section
              id="pad-input"
              title="PadInput"
              demo={
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <PadInput placeholder="0.00" />
                  <PadInput placeholder="0.00" hint="max: 200 TON" />
                  <PadInput
                    defaultValue="999"
                    hint="max: 200 TON"
                    error="Amount exceeds hard cap"
                  />
                </div>
              }
              code={`<PadInput placeholder="0.00" />

<PadInput
  placeholder="0.00"
  hint="max: 200 TON"
/>

<PadInput
  defaultValue="999"
  hint="max: 200 TON"
  error="Amount exceeds hard cap"
/>`}
            />

            {/* ── QrPanel ── */}
            <Section
              id="qr-panel"
              title="QrPanel"
              demo={
                <div className="flex flex-wrap gap-6 items-start justify-center">
                  <QrPanel status="qr" qrSrc="/ui/qr-demo.png" />
                  <QrPanel status="expired" onRefresh={() => {}} />
                  <QrPanel status="generating" />
                  <QrPanel status="success" />
                </div>
              }
              code={`<QrPanel status="qr" qrSrc="/path/to/qr.png" />

<QrPanel
  status="expired"
  onRefresh={handleRefresh}
/>

<QrPanel status="generating" />

<QrPanel status="success" />`}
            />

            {/* ── TokenCard ── */}
            <Section
              id="token-card"
              title="TokenCard"
              demo={<TokenCard onAction={() => {}} />}
              code={`<TokenCard
  name="zapyataya dureva"
  avatarSrc="/ui/tokencard-ava-zpd.jpg"
  progress={29}
  progressLabel="39.72% of soft cap"
  softCap="20.000 TON"
  hardCap="50.000 TON"
  rows={[
    { label: "Token price", value: "0.0031 TON" },
    { label: "Offered",     value: "770 000 000 ZPD" },
    { label: "Liquidity",   value: "51%" },
  ]}
  statusText="active pre-sale"
  onAction={handleOpen}
/>`}
            />

            {/* ── Window / ModalHeader ── */}
            <Section
              id="window"
              title="Window"
              demo={
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  <Window title="example.exe" iconSrc="/ui/icon-keys.png">
                    <div className="p-5 bg-bg-window">
                      <p className="font-roboto-mono text-xs text-text-primary">
                        ModalHeader + 4px bevel padding. Used as the outer shell for every dialog
                        in the app.
                      </p>
                    </div>
                  </Window>
                  <div className="bg-bg-window shadow-w95-default">
                    <ModalHeader
                      title="standalone header"
                      iconSrc="/ui/icon-keys.png"
                      actions={<IconButton kind="cross" />}
                    />
                  </div>
                </div>
              }
              code={`// Full window:
<Window
  title="dialog.exe"
  iconSrc="/ui/icon-keys.png"
  actions={<IconButton kind="cross" />}
>
  <div className="p-6 bg-bg-window">
    content
  </div>
</Window>

// Header only:
<ModalHeader
  title="login.exe"
  iconSrc="/ui/icon-keys.png"
  actions={<IconButton kind="cross" />}
/>`}
            />

            {/* Footer */}
            <div className="pb-2 pt-2 text-center">
              <p className="font-roboto-mono text-[10px] text-[#0e0b5a]">
                durev_ui_kit.exe v0.1.0 — {OVERVIEW_CARDS.length} components documented
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
