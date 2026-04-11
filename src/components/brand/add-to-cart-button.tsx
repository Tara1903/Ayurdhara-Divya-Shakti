"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [label, setLabel] = useState("Add to Cart");

  return (
    <Button
      type="button"
      onClick={() => {
        addItem(product);
        setLabel("Added");
        window.setTimeout(() => setLabel("Add to Cart"), 1400);
      }}
      className="w-full gap-2"
    >
      <ShoppingBag className="h-4 w-4" />
      {label}
    </Button>
  );
}
