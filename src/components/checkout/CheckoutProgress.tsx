'use client';

import type { CheckoutStep } from '@/types/checkout';
import { useCheckoutStore } from '@/store/checkoutStore';

const STEPS: { id: CheckoutStep; label: string }[] = [
  { id: 'contact', label: 'Contact' },
  { id: 'address', label: 'Delivery' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

export default function CheckoutProgress() {
  const { currentStep, completedSteps, goToStep } = useCheckoutStore();

  const getStepStatus = (stepId: CheckoutStep) => {
    if (completedSteps.includes(stepId)) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'upcoming';
  };

  return (
    <div className="checkout-progress" role="navigation" aria-label="Checkout steps">
      {STEPS.map((step, index) => {
        const status = getStepStatus(step.id);
        return (
          <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            <button
              className={`checkout-progress-step ${status}`}
              onClick={() => status === 'completed' && goToStep(step.id)}
              aria-current={status === 'active' ? 'step' : undefined}
              aria-label={`${step.label} — ${status}`}
              style={{ background: 'transparent', border: 'none', fontFamily: 'inherit', padding: '0.25rem 0.5rem', cursor: status === 'completed' ? 'pointer' : 'default' }}
            >
              <span className={`checkout-progress-dot ${status}`} aria-hidden="true">
                {status === 'completed' ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>
              <span>{step.label}</span>
            </button>
            {index < STEPS.length - 1 && (
              <div className="checkout-progress-divider" aria-hidden="true" />
            )}
          </div>
        );
      })}
    </div>
  );
}
