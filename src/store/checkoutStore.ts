// CheckoutStore — Phase 5
// Manages all checkout state in a single Zustand store.
// Separate from cartStore — does not duplicate cart data.

import { create } from 'zustand';
import { generateIdempotencyKey } from '@/services/orderService';
import type { CheckoutStep, ContactInfo, ShippingMethodType, CheckoutState } from '@/types/checkout';
import type { Address } from '@/types/address';
import type { PaymentMethodType } from '@/types/payment';

interface CheckoutStore extends CheckoutState {
  // Step navigation
  goToStep: (step: CheckoutStep) => void;
  completeStep: (step: CheckoutStep) => void;
  goBack: () => void;

  // Form setters
  setContact: (contact: Partial<ContactInfo>) => void;
  setAddress: (address: Partial<Address>) => void;
  setShippingMethod: (method: ShippingMethodType, charge: number) => void;
  setPaymentMethod: (method: PaymentMethodType) => void;

  // Coupon
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;

  // Submission
  setSubmitting: (isSubmitting: boolean) => void;
  setSubmissionError: (error: string | null) => void;
  setPlacedOrderRef: (ref: string) => void;

  // Reset
  resetCheckout: () => void;
}

const STEP_ORDER: CheckoutStep[] = ['contact', 'address', 'shipping', 'payment', 'review'];

const initialState: CheckoutState = {
  currentStep: 'contact',
  completedSteps: [],
  contact: { fullName: '', mobile: '', email: '' },
  address: {
    fullName: '',
    mobile: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pinCode: '',
    city: '',
    state: '',
    country: 'India',
    addressType: 'home',
  },
  selectedShippingMethod: 'standard',
  selectedPaymentMethod: null,
  appliedCouponCode: '',
  couponDiscount: 0,
  shippingCharge: 99,
  isSubmitting: false,
  submissionError: null,
  idempotencyKey: generateIdempotencyKey(),
  placedOrderRef: null,
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  ...initialState,

  goToStep: (step) => {
    set({ currentStep: step });
  },

  completeStep: (step) => {
    const { completedSteps } = get();
    if (!completedSteps.includes(step)) {
      // Move to next step
      const currentIndex = STEP_ORDER.indexOf(step);
      const nextStep = STEP_ORDER[currentIndex + 1];
      set({
        completedSteps: [...completedSteps, step],
        currentStep: nextStep || step,
      });
    } else {
      // Already completed — just navigate forward
      const currentIndex = STEP_ORDER.indexOf(step);
      const nextStep = STEP_ORDER[currentIndex + 1];
      if (nextStep) set({ currentStep: nextStep });
    }
  },

  goBack: () => {
    const { currentStep } = get();
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    if (currentIndex > 0) {
      set({ currentStep: STEP_ORDER[currentIndex - 1] });
    }
  },

  setContact: (contact) => {
    set((state) => ({ contact: { ...state.contact, ...contact } }));
  },

  setAddress: (address) => {
    set((state) => ({ address: { ...state.address, ...address } }));
  },

  setShippingMethod: (method, charge) => {
    set({ selectedShippingMethod: method, shippingCharge: charge });
  },

  setPaymentMethod: (method) => {
    set({ selectedPaymentMethod: method });
  },

  applyCoupon: (code, discount) => {
    set({ appliedCouponCode: code, couponDiscount: discount });
  },

  removeCoupon: () => {
    set({ appliedCouponCode: '', couponDiscount: 0 });
  },

  setSubmitting: (isSubmitting) => {
    set({ isSubmitting });
  },

  setSubmissionError: (error) => {
    set({ submissionError: error });
  },

  setPlacedOrderRef: (ref) => {
    set({ placedOrderRef: ref });
  },

  resetCheckout: () => {
    set({
      ...initialState,
      idempotencyKey: generateIdempotencyKey(), // Fresh key for new checkout
    });
  },
}));
