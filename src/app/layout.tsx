import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
        {children}
      </body>
    </html>
  );
}
