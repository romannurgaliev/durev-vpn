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
import Accordion from "@/components/Accordion";
import Button from "@/components/Button";
import Checkbox from "@/components/Checkbox";
import IconButton from "@/components/IconButton";
import Input from "@/components/Input";
import PadInput from "@/components/PadInput";
import ProgressBar from "@/components/ProgressBar";
import Radio from "@/components/Radio";
import Snackbar from "@/components/Snackbar";
import Spinner from "@/components/Spinner";
import Switcher from "@/components/Switcher";
import TokenCard from "@/components/TokenCard";
import TokenCardInfo from "@/components/TokenCardInfo";
import Window from "@/components/Window";
import QrPanel from "@/components/QrPanel";
import StatusLine from "@/components/StatusLine";

const sectionTitle = "font-bold text-[13px] uppercase tracking-widest text-black/60";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#c3c3c3] p-10 flex flex-col gap-10">
      <h1 className="text-2xl font-bold text-black">Durev VPN — UI Kit (Win95)</h1>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Button</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button>button</Button>
          <Button variant="secondary">button</Button>
          <Button variant="ghost">button</Button>
          <Button variant="wallet">button</Button>
          <Button variant="accent">button</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Button selected>selected</Button>
          <Button disabled>disabled</Button>
          <Button outline>outline</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Icon Button</h2>
        <div className="flex items-center gap-4">
          <IconButton kind="plus" />
          <IconButton kind="cross" />
          <IconButton kind="conf" />
          <IconButton kind="update" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Switcher</h2>
        <div className="flex items-center gap-4 bg-[#02007f] p-5 w-fit">
          <Switcher aria-label="Off" />
          <Switcher aria-label="On" defaultChecked />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Input</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Input placeholder="ss://access-key" />
          <Input defaultValue="ss://access-key" />
          <Input defaultValue="ss://access-key" error />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Radio</h2>
        <div className="flex flex-wrap items-center gap-6">
          <Radio name="demo" defaultChecked>Radio button text</Radio>
          <Radio name="demo">Radio button text</Radio>
          <Radio name="demo-disabled" defaultChecked disabled>Radio button text</Radio>
          <Radio name="demo-disabled2" disabled>Radio button text</Radio>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Checkbox</h2>
        <div className="flex items-center gap-6">
          <Checkbox defaultChecked />
          <Checkbox />
          <Checkbox defaultChecked>With label</Checkbox>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Snackbar</h2>
        <div className="flex flex-col items-start gap-4">
          <Snackbar variant="info">Key copied</Snackbar>
          <Snackbar variant="success">Connected</Snackbar>
          <Snackbar>Plain message</Snackbar>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Spinner</h2>
        <Spinner />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Progress Bar (Token/Bar)</h2>
        <div className="flex flex-col gap-4 bg-[#ededed] p-4 rounded-2xl w-[340px]">
          <ProgressBar value={29} />
          <ProgressBar value={100} />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Accordion</h2>
        <div className="max-w-[877px]">
          <Accordion title="Is VPN safety for my device?" defaultOpen>
            Absolutely! We based on the saftest protocols ever. Developed by best developers.
            Founded by best of the best.
          </Accordion>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Pad / Input</h2>
        <div className="flex flex-col gap-4">
          <PadInput placeholder="O TON" hint="max: 200 TON" />
          <PadInput defaultValue="220 TON" hint="max: 200 TON" error="Oh noooo, too much TONs" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>TokenCard / Info</h2>
        <div className="bg-[#ededed] rounded-2xl w-[320px]">
          <TokenCardInfo label="Token price" value="0.0031 TON" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>TokenCard</h2>
        <TokenCard />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>Window + ModalHeader</h2>
        <Window title="login.exe" className="w-[460px]">
          <div className="flex flex-col items-center gap-[10px] p-5 w-full">
            <Input placeholder="ss://access-key" />
            <Button outline className="w-full">confirm</Button>
          </div>
        </Window>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>QrPanel</h2>
        <div className="flex flex-wrap gap-4">
          <QrPanel status="qr" qrSrc="/ui/qr-demo.png" />
          <QrPanel status="expired" />
          <QrPanel status="generating" />
          <QrPanel status="success" />
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className={sectionTitle}>StatusLine</h2>
        <div className="flex flex-col gap-4 w-[420px]">
          <StatusLine status="waiting" timer="2:58" />
          <StatusLine status="expired" timer="0:00" />
          <StatusLine status="generating" />
          <StatusLine status="success" />
        </div>
      </section>
    </main>
  );
}
