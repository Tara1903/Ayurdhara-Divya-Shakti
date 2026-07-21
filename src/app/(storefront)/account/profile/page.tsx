'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      setMobile(user.mobile);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setSuccessMsg('');

    const { user: updatedUser, error } = await authService.updateProfile(user.id, {
      fullName,
      mobile
    });

    if (updatedUser) {
      setUser(updatedUser);
      setSuccessMsg('Profile updated successfully.');
    }
    setLoading(false);
  };

  return (
    <div className="account-main">
      <div className="account-header" style={{ marginBottom: '2rem' }}>
        <h1 className="account-title">Profile</h1>
        <p className="account-subtitle">Manage your personal information and preferences.</p>
      </div>

      <div className="account-card" style={{ maxWidth: '600px' }}>
        {successMsg && (
          <div style={{ background: 'rgba(92, 107, 79, 0.1)', color: 'var(--olive)', padding: '0.875rem 1rem', borderRadius: '8px', fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid rgba(92, 107, 79, 0.2)' }}>
            {successMsg}
          </div>
        )}
        
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--charcoal)' }}>Email</label>
            <input 
              type="email" 
              value={user?.email || ''} 
              disabled 
              style={{ padding: '0.875rem', border: '1.5px solid var(--sand)', borderRadius: '8px', background: 'var(--ivory)', color: 'var(--stone)' }} 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--stone)' }}>Email cannot be changed directly. Please contact support.</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--charcoal)' }}>Full Name</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={{ padding: '0.875rem', border: '1.5px solid var(--sand)', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--charcoal)' }}>Mobile Number</label>
            <input 
              type="tel" 
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              style={{ padding: '0.875rem', border: '1.5px solid var(--sand)', borderRadius: '8px' }} 
            />
          </div>

          <div style={{ borderTop: '1px solid var(--sand)', margin: '1rem 0', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1rem', color: 'var(--charcoal)', fontWeight: 600 }}>Preferences</h4>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--charcoal)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: 'var(--olive)' }} />
              Receive order updates via SMS
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--charcoal)', cursor: 'pointer' }}>
              <input type="checkbox" style={{ accentColor: 'var(--olive)' }} />
              Subscribe to wellness newsletter and exclusive offers
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '0.875rem 1.5rem', background: 'var(--charcoal)', color: 'white', border: 'none', 
              borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '1rem', alignSelf: 'flex-start'
            }}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
