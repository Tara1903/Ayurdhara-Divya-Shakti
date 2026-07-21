// PricingService — Phase 5
// Centralized, reusable price calculation
// IMPORTANT: This is CLIENT-SIDE only for display purposes.
// The authoritative final total is always calculated server-side before payment.

import type { CartItem } from '@/store/cartStore';

export interface PricingSummary {
  subtotal: number;          // Sum of (price × qty)
  originalTotal: number;     // Sum of (originalPrice × qty)
  itemDiscount: number;      // originalTotal - subtotal
  couponDiscount: number;
  shippingCharge: number;
  finalTotal: number;        // Displayed total — NOT authoritative for payment
}

export const FREE_SHIPPING_THRESHOLD = 2000; // ₹2,000

/**
 * Calculate a display-only pricing summary from cart items.
 * The backend will recalculate this independently before creating a payment session.
 */
export function calculatePricing(
  items: CartItem[],
  couponDiscount: number,
  shippingCharge: number
): PricingSummary {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const originalTotal = items.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0
  );
  const itemDiscount = originalTotal - subtotal;
  const finalTotal = Math.max(0, subtotal - couponDiscount + shippingCharge);

  return {
    subtotal,
    originalTotal,
    itemDiscount,
    couponDiscount,
    shippingCharge,
    finalTotal,
  };
}

/**
 * Determine shipping charge based on order subtotal.
 * This logic is mirrored server-side for validation.
 */
export function getShippingCharge(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99;
}

/**
 * Format a number as Indian Rupee with commas.
 * e.g. 1234567 => ₹12,34,567
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
