// OrderService — Phase 5
// Order lifecycle management — provider-independent
// Backend integration point: replace the demo implementations with real API calls.

import type { CreateOrderPayload, Order, OrderConfirmation } from '@/types/order';
import type { PaymentMethodType } from '@/types/payment';
import { processServerOrder } from '@/actions/orderActions';

/**
 * Generate a customer-friendly order reference.
 * Format: AYD-YYYY-NNNNNN
 * In production, this should be generated server-side to ensure uniqueness.
 */
export function generateOrderRef(): string {
  const year = new Date().getFullYear();
  const seq = Math.floor(100000 + Math.random() * 900000);
  return `AYD-${year}-${seq}`;
}

/**
 * Generate a UUID v4 for idempotency keys.
 * Prevents duplicate orders from double-clicks or network retries.
 */
export function generateIdempotencyKey(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Create a pending order.
 * DEMO MODE: Returns a mock order for UI development.
 * 
 * PRODUCTION: Replace this with a POST to your backend API.
 * The backend must:
 *   1. Validate all cart items against current product prices
 *   2. Validate quantities against inventory
 *   3. Validate coupon codes
 *   4. Calculate shipping charges
 *   5. Compute the authoritative finalTotal
 *   6. Create a pending order record
 *   7. Return the order with a generated orderRef
 *
 * The frontend NEVER trusts its own calculated total for payment creation.
 */
export async function createPendingOrder(
  payload: CreateOrderPayload
): Promise<Order> {
  // If Supabase is configured, use the secure backend action
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { order, error } = await processServerOrder(payload);
    if (error || !order) {
      throw new Error(error || 'Failed to create order');
    }
    // Cache it locally so fetchCustomerOrders fallback works temporarily
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`order_${order.orderRef}`, JSON.stringify(order));
    }
    return order;
  }

  // DEMO MODE: Simulate backend processing delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const orderRef = generateOrderRef();
  const now = new Date().toISOString();

  // DEMO order object — backend would return the validated version
  const order: Order = {
    id: `order_${Date.now()}`,
    orderRef,
    customerId: payload.customerId, // Map customerId if present
    guestMobile: payload.guestMobile,
    guestEmail: payload.guestEmail,
    items: [], // Populated by the backend from validated cart items
    shippingAddress: payload.shippingAddress,
    pricing: {
      subtotal: 0,     // Set by backend
      itemDiscount: 0, // Set by backend
      couponCode: payload.couponCode,
      couponDiscount: 0, // Re-validated by backend
      shippingCharge: 0, // Calculated by backend
      finalTotal: 0,     // AUTHORITATIVE — set by backend only
    },
    paymentMethod: payload.paymentMethod,
    paymentStatus: 'created',
    orderStatus: 'pending',
    paymentAttempts: [],
    idempotencyKey: payload.idempotencyKey,
    createdAt: now,
    updatedAt: now,
  };

  return order;
}

export async function fetchCustomerOrders(customerId: string): Promise<Order[]> {
  // In a real app: fetch from API /orders?customerId=...
  // Demo mock: we'll check localStorage/sessionStorage for any orders that have this customerId
  try {
    const allKeys = Object.keys(sessionStorage).filter(k => k.startsWith('order_'));
    const orders: Order[] = [];
    for (const key of allKeys) {
      const o = JSON.parse(sessionStorage.getItem(key) || '{}');
      if (o.customerId === customerId) {
        orders.push(o as Order);
      }
    }
    return orders;
  } catch {
    return [];
  }
}

/**
 * Confirm a COD order.
 * COD orders skip payment processing but still require backend confirmation.
 */
export async function confirmCodOrder(orderId: string): Promise<OrderConfirmation> {
  // Simulate backend processing
  await new Promise((resolve) => setTimeout(resolve, 800));

  // DEMO: Return a mock confirmation
  // PRODUCTION: POST to /api/orders/{orderId}/confirm-cod
  const now = new Date().toISOString();
  return {
    orderRef: orderId,
    customerName: '',
    mobile: '',
    shippingAddress: {
      fullName: '',
      mobile: '',
      addressLine1: '',
      pinCode: '',
      city: '',
      state: '',
      country: 'India',
      addressType: 'home',
    },
    items: [],
    pricing: {
      subtotal: 0,
      itemDiscount: 0,
      couponDiscount: 0,
      shippingCharge: 0,
      finalTotal: 0,
    },
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    orderStatus: 'confirmed',
    estimatedDelivery: getEstimatedDeliveryDate(5),
    createdAt: now,
  };
}

function getEstimatedDeliveryDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get an order by its public order reference (AYD-XXXX-XXXXXX).
 * DEMO MODE: Retrieves from sessionStorage.
 * PRODUCTION: GET /api/orders/{orderRef}
 */
export async function getOrderByRef(orderRef: string): Promise<OrderConfirmation | null> {
  try {
    const stored = sessionStorage.getItem(`order_${orderRef}`);
    if (stored) {
      return JSON.parse(stored) as OrderConfirmation;
    }
  } catch {
    // sessionStorage not available (SSR)
  }
  return null;
}

export type { CreateOrderPayload, Order };
