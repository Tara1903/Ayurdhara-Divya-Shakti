// Order Types — Phase 5
// DB-ready interfaces — separates order status from payment status

import type { Address } from './address';
import type { PaymentStatus, PaymentMethodType, PaymentAttempt } from './payment';

export type OrderStatus =
  | 'pending'
  | 'payment_pending'
  | 'paid'
  | 'payment_failed'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderItem {
  productId: string;
  productSlug: string;
  name: string;
  variant: string;           // e.g. "10 ml"
  image: string;
  quantity: number;
  unitPrice: number;         // Server-validated price per unit
  originalUnitPrice: number;
  lineTotal: number;         // unitPrice × quantity
}

export interface OrderPricing {
  subtotal: number;          // Sum of all line totals
  itemDiscount: number;      // originalTotal - subtotal
  couponCode?: string;
  couponDiscount: number;
  shippingCharge: number;
  finalTotal: number;        // Authoritative — set by backend
}

export interface Order {
  id: string;                       // Internal DB ID (not exposed in URL)
  orderRef: string;                 // Customer-friendly: AYD-2026-000123
  customerId?: string;              // Phase 6 addition
  guestEmail?: string;
  guestMobile?: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  pricing: OrderPricing;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentAttempts: PaymentAttempt[];
  idempotencyKey: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  estimatedDelivery?: string;
}

// For creating a new order — sent to backend
export interface CreateOrderPayload {
  customerId?: string;
  items: Array<{
    productId: string;
    variant: string;
    quantity: number;
  }>;
  shippingAddress: Address;
  paymentMethod: PaymentMethodType;
  couponCode?: string;
  idempotencyKey: string;
  guestEmail?: string;
  guestMobile?: string;
}

// Lightweight order summary for confirmation page
export interface OrderConfirmation {
  orderRef: string;
  customerName: string;
  email?: string;
  mobile: string;
  shippingAddress: Address;
  items: OrderItem[];
  pricing: OrderPricing;
  paymentMethod: PaymentMethodType;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  estimatedDelivery?: string;
  createdAt: string;
}
