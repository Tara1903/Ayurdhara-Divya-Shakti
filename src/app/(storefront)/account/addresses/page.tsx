'use client';

import { useAuthStore } from '@/store/authStore';

export default function AddressesPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="account-main">
      <div className="account-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="account-title">Saved Addresses</h1>
          <p className="account-subtitle">Manage your delivery locations.</p>
        </div>
        <button style={{ padding: '0.625rem 1rem', background: 'var(--charcoal)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
          + Add New Address
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Empty State for Demo */}
        <div className="account-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center', gridColumn: '1 / -1', background: 'transparent', borderStyle: 'dashed' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--stone)" strokeWidth="1" style={{ marginBottom: '1rem' }}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p style={{ fontSize: '0.9rem', color: 'var(--stone)' }}>You haven't saved any addresses yet.</p>
        </div>
      </div>
    </div>
  );
}
