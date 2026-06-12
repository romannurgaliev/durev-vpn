import { createHighlighter } from "shiki";
import UIKitClient from "./UIKitClient";

// Raw code snippets keyed by section ID
const RAW_CODE: Record<string, string> = {
  button: `import Button from "@/components/Button";

<Button variant="accent" onClick={handleConnect}>
  Connect
</Button>

<Button disabled>Disabled</Button>

<Button outline>Confirm</Button>`,

  "icon-button": `import IconButton from "@/components/IconButton";

<IconButton kind="plus" aria-label="Add key" onClick={handleAdd} />
<IconButton kind="cross" aria-label="Delete" onClick={handleDelete} />`,

  switcher: `import Switcher from "@/components/Switcher";

const [enabled, setEnabled] = useState(false);

<Switcher
  checked={enabled}
  onChange={setEnabled}
  aria-label="Enable VPN"
/>`,

  input: `import Input from "@/components/Input";

<Input
  label="Access Key"
  description="Paste your Shadowsocks URL"
  placeholder="ss://access-key"
  error={validationError}
  onChange={(e) => setValue(e.target.value)}
/>`,

  checkbox: `import Checkbox from "@/components/Checkbox";

const [agreed, setAgreed] = useState(false);

<Checkbox
  checked={agreed}
  onChange={setAgreed}
  label="I agree to terms"
  description="Read our privacy policy"
/>`,

  radio: `import Radio from "@/components/Radio";

const [plan, setPlan] = useState("basic");

<Radio
  name="plan"
  value="basic"
  label="Basic Plan"
  description="1 device, 10 GB/mo"
  checked={plan === "basic"}
  onChange={setPlan}
/>
<Radio
  name="plan"
  value="pro"
  label="Pro Plan"
  checked={plan === "pro"}
  onChange={setPlan}
/>`,

  accordion: `import Accordion from "@/components/Accordion";

<Accordion title="Is VPN safe for my device?" defaultOpen>
  Absolutely! We use the safest protocols available.
</Accordion>

<Accordion title="How do I cancel?">
  Go to Settings → Subscription → Cancel.
</Accordion>`,

  "pad-input": `import PadInput from "@/components/PadInput";

<PadInput
  placeholder="0 TON"
  hint="max: 200 TON"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  error={amountError}
/>`,

  snackbar: `import Snackbar from "@/components/Snackbar";

<Snackbar variant="success">
  VPN connected successfully
</Snackbar>

<Snackbar variant="info">
  Key copied to clipboard
</Snackbar>`,

  "status-line": `import StatusLine from "@/components/StatusLine";

<StatusLine status="waiting" timer="2:58" />
<StatusLine status="expired" timer="0:00" />
<StatusLine status="generating" />
<StatusLine status="success" />`,

  spinner: `import Spinner from "@/components/Spinner";

{isLoading && <Spinner />}`,

  "progress-bar": `import ProgressBar from "@/components/ProgressBar";

<ProgressBar value={65} softCapAt={50} hardCapAt={100} />`,

  "qr-panel": `import QrPanel from "@/components/QrPanel";

<QrPanel
  status={qrStatus}
  qrSrc={qrImageUrl}
  onRefresh={handleRefresh}
/>`,

  "token-card": `import TokenCard from "@/components/TokenCard";

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
  onAction={handleBuy}
/>`,

  window: `import Window from "@/components/Window";

<Window title="login.exe">
  <div className="flex flex-col gap-3 p-5">
    <Input placeholder="ss://access-key" />
    <Button outline className="w-full">
      Confirm
    </Button>
  </div>
</Window>`,
};

let highlighterInstance: Awaited<ReturnType<typeof createHighlighter>> | null = null;

async function getHighlighter() {
  if (!highlighterInstance) {
    highlighterInstance = await createHighlighter({
      themes: ["github-light"],
      langs: ["tsx"],
    });
  }
  return highlighterInstance;
}

export default async function Page() {
  const hl = await getHighlighter();

  const highlighted: Record<string, string> = {};
  for (const [id, code] of Object.entries(RAW_CODE)) {
    highlighted[id] = hl.codeToHtml(code, {
      lang: "tsx",
      theme: "github-light",
      transformers: [
        {
          pre(node) {
            node.properties = {
              ...node.properties,
              style:
                "background-color:#1a1a1a;color:#f0f0f0;padding:16px;margin:0;" +
                "overflow-x:auto;font-family:'Roboto Mono',monospace;font-size:13px;line-height:1.6;",
            };
          },
        },
      ],
    });
  }

  return <UIKitClient highlighted={highlighted} rawCode={RAW_CODE} />;
}
