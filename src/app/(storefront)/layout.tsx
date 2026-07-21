import type { Metadata } from "next";
import Link from "next/link";
import NavLogic from "@/components/NavLogic";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/cart/CartDrawer";

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

        {/* Exact Original Footer */}
        <div dangerouslySetInnerHTML={{ __html: `<footer class="footer-chapter">
        <div class="container">
          <div class="grid md:grid-cols-4 gap-48 mb-64">
            <div class="col-span-1">
              <span class="text-overline text-ivory block mb-24">Ayurdhara Divya Shakti</span>
              <p class="text-caption text-stone">Elevating Ayurvedic wellness for the modern era.</p>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#philosophy" class="text-body">Philosophy</a>
              <a href="/collections" class="text-body">Collections</a>
              <a href="#ingredients" class="text-body">Ingredients</a>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#craft" class="text-body">Craft</a>
              <a href="#journal" class="text-body">Journal</a>
              <a href="#circle" class="text-body">Circle</a>
            </div>
            <div class="footer-nav flex-col gap-16">
              <a href="#" class="text-body">Contact</a>
              <a href="#" class="text-body">Shipping & Returns</a>
              <a href="#" class="text-body">Terms of Service</a>
            </div>
          </div>
          <div class="flex justify-between items-center pt-32 border-t border-subtle">
            <span class="text-caption text-stone">&copy; 2026 Ayurdhara Divya Shakti. All rights reserved.</span>
            <div class="flex gap-16">
              <!-- Social Icons -->
              <a href="#" class="text-stone hover:text-ivory">IG</a>
              <a href="#" class="text-stone hover:text-ivory">PT</a>
            </div>
          </div>
        </div>
      </footer>` }} />
      </>
  );
}
