"use client";

import type { ButtonHTMLAttributes } from "react";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function AddToCartButton({
  product,
  compact = false,
  className,
  label = "Add to Cart",
  ...props
}: {
  product: Product;
  compact?: boolean;
  className?: string;
  label?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const { addItem } = useCart();
  const [buttonLabel, setButtonLabel] = useState(label);

  return (
    <Button
      type="button"
      {...props}
      onClick={() => {
        addItem(product);
        setButtonLabel("Added");
        window.setTimeout(() => setButtonLabel(label), 1400);
      }}
      className={cn("w-full gap-2", compact && "px-4 py-2.5", className)}
    >
      <ShoppingBag className="h-4 w-4" />
      {buttonLabel}
    </Button>
  );
}
