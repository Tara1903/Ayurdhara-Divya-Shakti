'use client';

import { useState } from 'react';
import { useCheckoutStore } from '@/store/checkoutStore';
import { checkPinServiceability } from '@/services/shippingService';
import { getShippingCharge } from '@/services/pricingService';
import { useCartStore } from '@/store/cartStore';
import { INDIAN_STATES } from '@/types/address';
import type { Address, AddressType } from '@/types/address';

type AddressErrors = Partial<Record<keyof Address | 'form', string>>;

function validateAddress(address: Partial<Address>): AddressErrors {
  const errors: AddressErrors = {};
  if (!address.fullName?.trim()) errors.fullName = 'Full name is required.';
  if (!address.mobile?.trim()) {
    errors.mobile = 'Mobile number is required.';
  } else if (!/^[6-9]\d{9}$/.test(address.mobile.trim())) {
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  }
  if (!address.addressLine1?.trim()) errors.addressLine1 = 'Address is required.';
  if (!address.pinCode?.trim()) {
    errors.pinCode = 'PIN code is required.';
  } else if (!/^\d{6}$/.test(address.pinCode.trim())) {
    errors.pinCode = 'Enter a valid 6-digit PIN code.';
  }
  if (!address.city?.trim()) errors.city = 'City is required.';
  if (!address.state?.trim()) errors.state = 'State is required.';
  return errors;
}

export default function AddressForm() {
  const { address, setAddress, completeStep, completedSteps, goToStep, contact } = useCheckoutStore();
  const { getCartSubtotal } = useCartStore();
  const [errors, setErrors] = useState<AddressErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Address, boolean>>>({});
  const [pinChecking, setPinChecking] = useState(false);
  const [pinResult, setPinResult] = useState<{ serviceable: boolean; message: string } | null>(null);

  const isCompleted = completedSteps.includes('address');

  const handleBlur = (field: keyof Address) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateAddress(address);
    setErrors(newErrors);
  };

  const handleChange = (field: keyof Address, value: string) => {
    setAddress({ [field]: value });
    if (touched[field]) {
      const newErrors = validateAddress({ ...address, [field]: value });
      setErrors(newErrors);
    }
    if (field === 'pinCode' && value.length !== 6) {
      setPinResult(null);
    }
  };

  const handlePinCheck = async (pin: string) => {
    if (!/^\d{6}$/.test(pin)) return;
    setPinChecking(true);
    const result = await checkPinServiceability(pin);
    setPinResult({ serviceable: result.isServiceable, message: result.message || '' });
    setPinChecking(false);
  };

  const handleAddressType = (type: AddressType) => {
    setAddress({ addressType: type });
  };

  const handleSameAsContact = () => {
    setAddress({ fullName: contact.fullName, mobile: contact.mobile });
  };

  const handleContinue = async () => {
    const allTouched = Object.keys(address).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {} as Partial<Record<keyof Address, boolean>>
    );
    setTouched(allTouched);
    const newErrors = validateAddress(address);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Final PIN check
    if (address.pinCode && !/^\d{6}$/.test(address.pinCode)) {
      setErrors({ pinCode: 'Enter a valid 6-digit PIN code.' });
      return;
    }

    // Set shipping charge based on subtotal
    const subtotal = getCartSubtotal();
    const charge = getShippingCharge(subtotal);
    useCheckoutStore.getState().setShippingMethod('standard', charge);

    completeStep('address');
  };

  if (isCompleted) {
    return (
      <div className="checkout-section">
        <div className="checkout-section-header">
          <span className="checkout-section-title">
            <span style={{ color: 'var(--olive)', marginRight: '0.5rem' }}>✓</span>
            Delivery Address
          </span>
          <button className="checkout-section-edit" onClick={() => goToStep('address')}>
            Edit
          </button>
        </div>
        <div className="checkout-section-body">
          <div className="confirmed-value">
            {address.fullName} · {address.mobile}
          </div>
          <div className="confirmed-value" style={{ marginTop: '0.25rem' }}>
            {address.addressLine1}
            {address.addressLine2 && `, ${address.addressLine2}`}
          </div>
          <div className="confirmed-value">
            {address.city}, {address.state} — {address.pinCode}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-section">
      <div className="checkout-section-header">
        <span className="checkout-section-title">Delivery Address</span>
        <span className="checkout-section-badge">Step 2</span>
      </div>
      <div className="checkout-section-body">
        <form className="checkout-form" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
          {/* Address Type */}
          <div className="checkout-field">
            <span className="checkout-label">Address Type</span>
            <div className="address-type-group" role="group" aria-label="Address type">
              {(['home', 'work', 'other'] as AddressType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`address-type-option ${address.addressType === type ? 'selected' : ''}`}
                  onClick={() => handleAddressType(type)}
                  aria-pressed={address.addressType === type}
                >
                  {type === 'home' && '🏠'}
                  {type === 'work' && '🏢'}
                  {type === 'other' && '📍'}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Same as contact */}
          {(contact.fullName || contact.mobile) && (
            <button
              type="button"
              onClick={handleSameAsContact}
              style={{
                background: 'var(--ivory)',
                border: '1px dashed var(--sand)',
                borderRadius: '8px',
                padding: '0.6rem 1rem',
                fontSize: '0.8rem',
                color: 'var(--olive)',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontWeight: 500,
                textAlign: 'left',
              }}
            >
              + Same as contact ({contact.fullName})
            </button>
          )}

          {/* Name & Mobile */}
          <div className="checkout-form-row">
            <div className="checkout-field">
              <label htmlFor="addr-name" className="checkout-label">Full Name *</label>
              <input
                id="addr-name"
                type="text"
                className={`checkout-input ${touched.fullName && errors.fullName ? 'error' : touched.fullName && !errors.fullName ? 'success' : ''}`}
                placeholder="Name on delivery"
                value={address.fullName || ''}
                onChange={(e) => handleChange('fullName', e.target.value)}
                onBlur={() => handleBlur('fullName')}
                autoComplete="name"
              />
              {touched.fullName && errors.fullName && (
                <span className="checkout-field-error" role="alert">{errors.fullName}</span>
              )}
            </div>
            <div className="checkout-field">
              <label htmlFor="addr-mobile" className="checkout-label">Mobile Number *</label>
              <input
                id="addr-mobile"
                type="tel"
                className={`checkout-input ${touched.mobile && errors.mobile ? 'error' : touched.mobile && !errors.mobile ? 'success' : ''}`}
                placeholder="98765 43210"
                value={address.mobile || ''}
                onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => handleBlur('mobile')}
                autoComplete="tel-national"
                inputMode="numeric"
              />
              {touched.mobile && errors.mobile && (
                <span className="checkout-field-error" role="alert">{errors.mobile}</span>
              )}
            </div>
          </div>

          {/* Address Line 1 */}
          <div className="checkout-field">
            <label htmlFor="addr-line1" className="checkout-label">Address Line 1 *</label>
            <input
              id="addr-line1"
              type="text"
              className={`checkout-input ${touched.addressLine1 && errors.addressLine1 ? 'error' : touched.addressLine1 && !errors.addressLine1 ? 'success' : ''}`}
              placeholder="House/Flat no., Building, Street"
              value={address.addressLine1 || ''}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
              onBlur={() => handleBlur('addressLine1')}
              autoComplete="address-line1"
            />
            {touched.addressLine1 && errors.addressLine1 && (
              <span className="checkout-field-error" role="alert">{errors.addressLine1}</span>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="checkout-field">
            <label htmlFor="addr-line2" className="checkout-label">
              Address Line 2
              <span style={{ fontWeight: 400, marginLeft: '0.3rem', color: 'var(--stone)' }}>(optional)</span>
            </label>
            <input
              id="addr-line2"
              type="text"
              className="checkout-input"
              placeholder="Area, Colony, Locality"
              value={address.addressLine2 || ''}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
              autoComplete="address-line2"
            />
          </div>

          {/* Landmark */}
          <div className="checkout-field">
            <label htmlFor="addr-landmark" className="checkout-label">
              Landmark
              <span style={{ fontWeight: 400, marginLeft: '0.3rem', color: 'var(--stone)' }}>(optional)</span>
            </label>
            <input
              id="addr-landmark"
              type="text"
              className="checkout-input"
              placeholder="Near school, mall, etc."
              value={address.landmark || ''}
              onChange={(e) => handleChange('landmark', e.target.value)}
            />
          </div>

          {/* PIN & City */}
          <div className="checkout-form-row">
            <div className="checkout-field">
              <label htmlFor="addr-pin" className="checkout-label">PIN Code *</label>
              <input
                id="addr-pin"
                type="text"
                className={`checkout-input ${touched.pinCode && errors.pinCode ? 'error' : touched.pinCode && !errors.pinCode ? 'success' : ''}`}
                placeholder="400001"
                value={address.pinCode || ''}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  handleChange('pinCode', val);
                  if (val.length === 6) handlePinCheck(val);
                }}
                onBlur={() => handleBlur('pinCode')}
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={6}
              />
              {pinChecking && (
                <span className="checkout-field-hint">Checking serviceability...</span>
              )}
              {!pinChecking && pinResult && (
                <div className={`pin-check-result ${pinResult.serviceable ? 'serviceable' : 'not-serviceable'}`}>
                  {pinResult.serviceable ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  )}
                  {pinResult.message}
                </div>
              )}
              {touched.pinCode && errors.pinCode && (
                <span className="checkout-field-error" role="alert">{errors.pinCode}</span>
              )}
            </div>
            <div className="checkout-field">
              <label htmlFor="addr-city" className="checkout-label">City *</label>
              <input
                id="addr-city"
                type="text"
                className={`checkout-input ${touched.city && errors.city ? 'error' : touched.city && !errors.city ? 'success' : ''}`}
                placeholder="Mumbai"
                value={address.city || ''}
                onChange={(e) => handleChange('city', e.target.value)}
                onBlur={() => handleBlur('city')}
                autoComplete="address-level2"
              />
              {touched.city && errors.city && (
                <span className="checkout-field-error" role="alert">{errors.city}</span>
              )}
            </div>
          </div>

          {/* State & Country */}
          <div className="checkout-form-row">
            <div className="checkout-field">
              <label htmlFor="addr-state" className="checkout-label">State *</label>
              <select
                id="addr-state"
                className={`checkout-select ${touched.state && errors.state ? 'error' : touched.state && !errors.state ? 'success' : ''}`}
                value={address.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                onBlur={() => handleBlur('state')}
                autoComplete="address-level1"
              >
                <option value="">Select State</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {touched.state && errors.state && (
                <span className="checkout-field-error" role="alert">{errors.state}</span>
              )}
            </div>
            <div className="checkout-field">
              <label htmlFor="addr-country" className="checkout-label">Country</label>
              <input
                id="addr-country"
                type="text"
                className="checkout-input"
                value="India"
                readOnly
                style={{ background: 'var(--ivory)', color: 'var(--stone)' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              type="button"
              onClick={() => goToStep('contact')}
              className="btn-outline-small"
              style={{ flex: '0 0 auto', padding: '0.875rem 1.25rem' }}
            >
              ← Back
            </button>
            <button type="submit" className="place-order-btn" style={{ flex: 1, marginTop: 0 }}>
              Continue to Shipping
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
