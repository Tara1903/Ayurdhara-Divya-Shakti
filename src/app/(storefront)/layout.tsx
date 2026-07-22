import type { Metadata } from "next";
import Link from "next/link";
import NavLogic from "@/components/NavLogic";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";
import AnnouncementBar from "@/components/AnnouncementBar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Ayurdhara Divya Shakti - Premium Ayurvedic Wellness",
  description: "Experience the pure essence of Ayurveda with Ayurdhara Divya Shakti.",
};

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavLogic />
      
      {/* Universal Announcement Bar */}
      <AnnouncementBar />

      {/* Dynamic React Navbar */}
      <Navbar />
      
      <CartDrawer />

      <main>{children}</main>

      {/* Global Footer */}
      <Footer />
    </>
  );
}
