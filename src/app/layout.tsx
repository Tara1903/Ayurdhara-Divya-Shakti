import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/brand/site-footer";
import { SiteHeader } from "@/components/brand/site-header";
import { BRAND } from "@/lib/brand";
import { Providers } from "./providers";
import "./globals.css";

const displayFont = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${BRAND.name} | Premium Ayurvedic Nabhi Wellness Kits`,
  description:
    "Ancient Ayurvedic healing system for modern lifestyle problems. Explore premium 5+1 Nabhi Therapy wellness kits designed for stress, sleep, digestion, immunity, beauty, recovery, and daily balance.",
  openGraph: {
    title: `${BRAND.name} | Premium Ayurvedic Nabhi Wellness Kits`,
    description:
      "Premium Ayurvedic 5+1 Nabhi Therapy wellness kits for modern lifestyle healing.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-ink)]">
        <Providers>
          <div className="relative min-h-screen overflow-x-hidden">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
