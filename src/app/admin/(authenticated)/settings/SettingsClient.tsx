'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Store, Truck, Info } from 'lucide-react';

export function SettingsClient({ settings }: { settings: Record<string, any> }) {
  const [store, setStore] = useState({
    name: settings.store_name || 'Ayurdhara Divya Shakti',
    tagline: settings.store_tagline || 'Healthy Life Wellness Therapy',
    email: settings.store_email || '',
    phone: settings.store_phone || '',
  });
  const [shipping, setShipping] = useState({
    threshold: Number(settings.free_shipping_threshold) || 2000,
    charge: Number(settings.standard_shipping_charge) || 99,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    await Promise.all([
      fetch('/api/admin/site-settings/store_name', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(store.name) }),
      fetch('/api/admin/site-settings/store_tagline', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(store.tagline) }),
      fetch('/api/admin/site-settings/store_email', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(store.email) }),
      fetch('/api/admin/site-settings/store_phone', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(store.phone) }),
      fetch('/api/admin/site-settings/free_shipping_threshold', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(shipping.threshold) }),
      fetch('/api/admin/site-settings/standard_shipping_charge', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(shipping.charge) }),
    ]);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    router.refresh();
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your store configuration.</p>
      </div>

      {/* Store Details */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Store size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Store Details</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
            <input value={store.name} onChange={e => setStore(s => ({...s, name: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <input value={store.tagline} onChange={e => setStore(s => ({...s, tagline: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input type="email" value={store.email} onChange={e => setStore(s => ({...s, email: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input value={store.phone} onChange={e => setStore(s => ({...s, phone: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Truck size={18} className="text-emerald-600" />
          <h3 className="font-semibold text-gray-900">Shipping Configuration</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (₹)</label>
            <input type="number" value={shipping.threshold} onChange={e => setShipping(s => ({...s, threshold: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
            <p className="text-xs text-gray-400 mt-1">Orders above this amount get free shipping</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Standard Shipping Charge (₹)</label>
            <input type="number" value={shipping.charge} onChange={e => setShipping(s => ({...s, charge: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
          </div>
        </div>
      </div>

      <button onClick={handleSave} disabled={loading} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg">
        <Save size={16} />{saved ? 'Saved!' : loading ? 'Saving...' : 'Save All Settings'}
      </button>
    </div>
  );
}
