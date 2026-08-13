import type { Metadata } from "next";
import Link from "next/link";
import NavLogic from "@/components/NavLogic";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

import Footer from "@/components/Footer";
import AppPromoPopup from "@/components/AppPromoPopup";

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
      

      {/* Dynamic React Navbar */}
      <Navbar />
      
      <CartDrawer />

      <main>{children}</main>

      {/* Global Footer */}
      <Footer />
      
      {/* App Promotional Popup */}
      <AppPromoPopup />
    </>
  );
}
