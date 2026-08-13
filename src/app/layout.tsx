import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReferralTracker from "@/components/ReferralTracker";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ayurdharadivyashakti.com'),
  title: "Ayurdhara Divya Shakti - Premium Ayurvedic Wellness",
  description: "Experience the pure essence of Ayurveda with Ayurdhara Divya Shakti.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-center" />
        <ReferralTracker />
        {children}
      </body>
    </html>
  );
}
