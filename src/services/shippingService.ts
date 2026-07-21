// ShippingService — Phase 5
// Abstract interface for PIN-code serviceability and shipping method resolution.
// Currently returns demo data — plug in real delivery partner API here.

import type { PinServiceabilityResult } from '@/types/address';
import type { ShippingMethod } from '@/types/checkout';

/**
 * Check if a PIN code is serviceable.
 * DEMO MODE: All PINs return serviceable.
 * Replace this implementation when connecting to a real delivery API
 * (e.g. Shiprocket, Delhivery, Dunzo, or a custom backend).
 */
export async function checkPinServiceability(
  pinCode: string
): Promise<PinServiceabilityResult> {
  // Validate PIN format (6-digit Indian PIN)
  if (!/^\d{6}$/.test(pinCode)) {
    return {
      pinCode,
      isServiceable: false,
      message: 'Please enter a valid 6-digit PIN code.',
    };
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // DEMO: All valid 6-digit PINs are serviceable
  // TODO: Replace with real API call to delivery partner
  return {
    pinCode,
    isServiceable: true,
    estimatedDeliveryDays: 4,
    estimatedDeliveryDate: getEstimatedDeliveryDate(4),
    isCodAvailable: true,
    shippingCharge: 0, // Will be overridden by ShippingService
    message: 'Delivery available to this PIN code.',
  };
}

/**
 * Get available shipping methods for an order.
 * Eventually driven by PIN code, order value, weight, and product restrictions.
 */
export function getShippingMethods(subtotal: number): ShippingMethod[] {
  const isFreeShipping = subtotal >= 2000;

  return [
    {
      id: 'standard',
      label: 'Standard Delivery',
      description: 'Delivered in 4–6 business days',
      charge: isFreeShipping ? 0 : 99,
      estimatedDays: '4–6 business days',
      isFree: isFreeShipping,
    },
    {
      id: 'express',
      label: 'Express Delivery',
      description: 'Delivered in 1–2 business days',
      charge: 199,
      estimatedDays: '1–2 business days',
      isFree: false,
    },
  ];
}

function getEstimatedDeliveryDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });
}
