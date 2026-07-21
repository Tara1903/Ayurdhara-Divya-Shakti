// Payment Types — Phase 5
// Provider-independent payment abstractions

export type PaymentMethodType =
  | 'upi'
  | 'card'
  | 'net_banking'
  | 'wallet'
  | 'cod';

export type PaymentStatus =
  | 'created'
  | 'pending'
  | 'processing'
  | 'authorized'
  | 'paid'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

export interface PaymentMethod {
  type: PaymentMethodType;
  label: string;
  description: string;
  icon: string; // SVG path or emoji fallback
  isAvailable: boolean;
  requiresRedirect?: boolean; // For future gateway integration
}

export interface PaymentSession {
  sessionId: string;
  orderId: string;
  amount: number;           // In paise (smallest unit), set by backend
  currency: string;         // 'INR'
  method: PaymentMethodType;
  status: PaymentStatus;
  idempotencyKey: string;   // Prevents duplicate sessions
  expiresAt: string;        // ISO timestamp
  gatewaySessionData?: Record<string, unknown>; // Reserved for custom gateway
}

export interface PaymentResult {
  paymentId: string;
  sessionId: string;
  orderId: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  amount: number;
  transactionRef?: string;
  failureReason?: string;
  timestamp: string;
}

export interface PaymentAttempt {
  id: string;
  orderId: string;
  paymentId?: string;
  method: PaymentMethodType;
  status: PaymentStatus;
  amount: number;
  attemptedAt: string;
  completedAt?: string;
  failureReason?: string;
  gatewayRef?: string;
}
