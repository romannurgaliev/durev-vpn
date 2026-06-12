import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Mono, Geist } from "next/font/google";
import "./globals.css";
import "@/components/tokens.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const monocraft = localFont({
  src: "../public/fonts/Monocraft.woff2",
  variable: "--font-monocraft",
  weight: "500",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Durev VPN",
  description: "Durev VPN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", monocraft.variable, robotoMono.variable, "font-sans", geist.variable)}
    >
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
