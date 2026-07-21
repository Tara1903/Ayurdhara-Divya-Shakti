'use client';

import { useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import type { ContactInfo } from '@/types/checkout';

function validateContact(contact: ContactInfo) {
  const errors: Partial<Record<keyof ContactInfo, string>> = {};
  if (!contact.fullName.trim()) errors.fullName = 'Full name is required.';
  if (!contact.mobile.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^[6-9]\d{9}$/.test(contact.mobile.trim())) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  }
  if (contact.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email)) {
    errors.email = 'Enter a valid email address.';
  }
  return errors;
}

export default function ContactForm() {
  const { contact, setContact, completeStep, completedSteps } = useCheckoutStore();
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInfo, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInfo, boolean>>>({});

  const isCompleted = completedSteps.includes('contact');

  const handleBlur = (field: keyof ContactInfo) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateContact(contact);
    setErrors(newErrors);
  };

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setContact({ [field]: value });
    if (touched[field]) {
      const newErrors = validateContact({ ...contact, [field]: value });
      setErrors(newErrors);
    }
  };

  const handleContinue = () => {
    setTouched({ fullName: true, mobile: true, email: true });
    const newErrors = validateContact(contact);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      completeStep('contact');
    }
  };

  if (isCompleted) {
    return (
      <div className="checkout-section">
        <div className="checkout-section-header">
          <span className="checkout-section-title">
            <span style={{ color: 'var(--olive)', marginRight: '0.5rem' }}>✓</span>
            Contact Information
          </span>
          <button
            className="checkout-section-edit"
            onClick={() => useCheckoutStore.getState().goToStep('contact')}
          >
            Edit
          </button>
        </div>
        <div className="checkout-section-body">
          <div className="confirmed-value">
            {contact.fullName}
            {contact.email && <span> · {contact.email}</span>}
          </div>
          <div className="confirmed-value" style={{ marginTop: '0.25rem' }}>
            +91 {contact.mobile}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-title">Contact Information</span>
        <span className="checkout-section-badge">Step 1</span>
      </div>
      <div className="checkout-section-body">
        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          <div className="checkout-form-row">
            <div className="checkout-field full-width">
              <label htmlFor="contact-name" className="checkout-label">Full Name *</label>
              <input
                id="contact-name"
                type="text"
                className={`checkout-input ${touched.fullName && errors.fullName ? 'error' : touched.fullName && !errors.fullName ? 'success' : ''}`}
                placeholder="e.g. Priya Sharma"
                value={contact.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                autoComplete="name"
                aria-describedby={errors.fullName ? 'name-error' : undefined}
                aria-invalid={!!errors.fullName}
              />
              {touched.fullName && errors.fullName && (
                <span className="checkout-field-error" id="name-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  {errors.fullName}
                </span>
              )}
            </div>
          </div>

          <div className="checkout-form-row">
            <div className="checkout-field">
              <label htmlFor="contact-mobile" className="checkout-label">Mobile Number *</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 0.875rem',
                  background: 'var(--ivory)',
                  border: '1.5px solid var(--sand)',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  color: 'var(--stone)',
                  fontWeight: 500,
                  flexShrink: 0,
                }}>+91</span>
                <input
                  id="contact-mobile"
                  type="tel"
                  className={`checkout-input ${touched.mobile && errors.mobile ? 'error' : touched.mobile && !errors.mobile ? 'success' : ''}`}
                  placeholder="98765 43210"
                  value={contact.mobile}
                  onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  onBlur={() => handleBlur('mobile')}
                  autoComplete="tel-national"
                  inputMode="numeric"
                  aria-describedby={errors.mobile ? 'mobile-error' : 'mobile-hint'}
                  aria-invalid={!!errors.mobile}
                />
              </div>
              {touched.mobile && errors.mobile ? (
                <span className="checkout-field-error" id="mobile-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  {errors.mobile}
                </span>
              ) : (
                <span className="checkout-field-hint" id="mobile-hint">We'll send order updates to this number</span>
              )}
            </div>

            <div className="checkout-field">
              <label htmlFor="contact-email" className="checkout-label">
                Email Address
                <span style={{ fontWeight: 400, marginLeft: '0.3rem', color: 'var(--stone)' }}>(optional)</span>
              </label>
              <input
                id="contact-email"
                type="email"
                className={`checkout-input ${touched.email && errors.email ? 'error' : touched.email && contact.email && !errors.email ? 'success' : ''}`}
                placeholder="priya@example.com"
                value={contact.email}
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                autoComplete="email"
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
              />
              {touched.email && errors.email && (
                <span className="checkout-field-error" id="email-error" role="alert">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="place-order-btn"
            style={{ marginTop: '0.5rem' }}
          >
            Continue to Delivery
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
