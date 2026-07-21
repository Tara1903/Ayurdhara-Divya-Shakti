// Checkout Types — Phase 5
// State shape for the checkout flow

import type { Address } from './address';
import type { PaymentMethodType } from './payment';

export type CheckoutStep =
  | 'contact'
  | 'address'
  | 'shipping'
  | 'payment'
  | 'review';

export interface ContactInfo {
  fullName: string;
  mobile: string;
  email: string; // Optional — user can leave blank
}

export type ShippingMethodType = 'standard' | 'express' | 'free';

export interface ShippingMethod {
  id: ShippingMethodType;
  label: string;
  description: string;
  charge: number;
  estimatedDays: string;
  isFree: boolean;
}

export interface CheckoutValidation {
  contact: boolean;
  address: boolean;
  shipping: boolean;
  payment: boolean;
}

export interface CheckoutState {
  // Step management
  currentStep: CheckoutStep;
  completedSteps: CheckoutStep[];

  // Form data
  contact: ContactInfo;
  address: Partial<Address>;
  selectedShippingMethod: ShippingMethodType;
  selectedPaymentMethod: PaymentMethodType | null;

  // Applied coupon (from Phase 4 cart)
  appliedCouponCode: string;
  couponDiscount: number;

  // Pricing (computed, not authoritative — backend will validate)
  shippingCharge: number;

  // Submission state
  isSubmitting: boolean;
  submissionError: string | null;
  idempotencyKey: string;

  // Order result (after placement)
  placedOrderRef: string | null;
}
