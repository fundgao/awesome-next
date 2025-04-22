import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // title: "FundOS - The Operating System for Fund",
  // description: "FundOS is an open-source protocol for autonomous Fund.",
  keywords: "Crypto | AIGC | Stock | X",
  openGraph: {
    type: "website",
    url: "https://av16z.vercel.app/",
    title: "FundOS - The Operating System for Fund",
    description: "FundOS is an open-source protocol for autonomous Fund.",
    siteName: "FundOS",
    images: [
      {
        url: "https://example.com/og.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://av16z.vercel.app/",
    creator: "@FundGao",
    images: "https://example.com/og.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " relative"}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
