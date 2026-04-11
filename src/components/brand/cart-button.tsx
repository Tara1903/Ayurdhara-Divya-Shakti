"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";

export function CartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur md:border-[var(--color-line)] md:bg-white/75 md:text-[var(--color-forest)]"
    >
      <ShoppingBag className="h-4 w-4" />
      <span>Cart</span>
      <span className="rounded-full bg-[var(--color-gold)] px-2 py-0.5 text-xs font-semibold text-white">
        {totalItems}
      </span>
    </Link>
  );
}
