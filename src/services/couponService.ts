// CouponService — Phase 5
// Reuses Phase 4 coupon logic. Server-side revalidation is mandatory before payment.

export interface CouponValidationResult {
  isValid: boolean;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;   // Percentage (0-100) or flat amount in ₹
  discountAmount: number;  // Computed discount in ₹ for this order
  message: string;
}

// Known valid coupons (demo only — replace with server API call)
// CRITICAL: Coupons must ALWAYS be revalidated server-side before creating a payment session.
// The backend must never trust coupon discounts sent from the browser.
const DEMO_COUPONS: Record<string, { type: 'percentage' | 'flat'; value: number }> = {
  WELLNESS10: { type: 'percentage', value: 10 },
  AYUR20: { type: 'percentage', value: 20 },
  FLAT100: { type: 'flat', value: 100 },
};

export async function validateCoupon(
  code: string,
  subtotal: number
): Promise<CouponValidationResult> {
  const trimmedCode = code.trim().toUpperCase();

  // Simulate network delay (will become a real API call)
  await new Promise((resolve) => setTimeout(resolve, 400));

  const coupon = DEMO_COUPONS[trimmedCode];

  if (!coupon) {
    return {
      isValid: false,
      code: trimmedCode,
      discountType: 'percentage',
      discountValue: 0,
      discountAmount: 0,
      message: 'Invalid coupon code.',
    };
  }

  const discountAmount =
    coupon.type === 'percentage'
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(coupon.value, subtotal);

  return {
    isValid: true,
    code: trimmedCode,
    discountType: coupon.type,
    discountValue: coupon.value,
    discountAmount,
    message:
      coupon.type === 'percentage'
        ? `${coupon.value}% off applied!`
        : `₹${coupon.value} off applied!`,
  };
}

export function removeCoupon(): CouponValidationResult {
  return {
    isValid: false,
    code: '',
    discountType: 'percentage',
    discountValue: 0,
    discountAmount: 0,
    message: '',
  };
}
