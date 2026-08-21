import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';

export default async function AddressesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth');
  }

  const { data: addresses } = await supabase
    .from('addresses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="account-main">
      <div className="account-header" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="account-title">Saved Addresses</h1>
          <p className="account-subtitle">Manage your delivery locations.</p>
        </div>
        <button style={{ padding: '0.625rem 1rem', background: 'var(--charcoal)', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} /> Add New Address
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {!addresses || addresses.length === 0 ? (
          <div className="account-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center', gridColumn: '1 / -1', background: 'transparent', borderStyle: 'dashed' }}>
            <MapPin size={40} className="text-stone-400 mb-4" />
            <p style={{ fontSize: '0.9rem', color: 'var(--stone)' }}>You haven't saved any addresses yet.</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div key={address.id} className="account-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--charcoal)', margin: 0 }}>{address.full_name}</h3>
                <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'var(--sand)', color: 'var(--olive)', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase' }}>
                  {address.address_type || 'HOME'}
                </span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--stone)', marginBottom: '0.5rem', fontWeight: 500 }}>{address.mobile}</p>
              
              <div style={{ fontSize: '0.85rem', color: 'var(--charcoal)', lineHeight: 1.5, flex: 1 }}>
                <p>{address.address_line_1}</p>
                {address.address_line_2 && <p>{address.address_line_2}</p>}
                {address.landmark && <p>Landmark: {address.landmark}</p>}
                <p>{address.city}, {address.state} {address.pincode}</p>
                <p>{address.country || 'India'}</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid #eee', paddingTop: '1rem' }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--forest)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Edit2 size={14} /> Edit
                </button>
                <button style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
