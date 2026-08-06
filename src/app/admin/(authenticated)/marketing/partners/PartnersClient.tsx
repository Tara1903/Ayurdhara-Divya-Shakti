'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit2, Trash2, Users } from 'lucide-react';

interface Partner {
  id: string; 
  code: string; 
  name: string;
  type: string;
  status: string;
  referral_reward_rate_trial: number;
  referral_reward_rate_gold: number;
  referral_reward_rate_premium: number;
  customer_discount_rate: number;
}

export function PartnersClient({ partners }: { partners: Partner[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [form, setForm] = useState({ 
    code: '', 
    name: '',
    type: 'wellness_partner',
    status: 'active',
    referral_reward_rate_trial: 10,
    referral_reward_rate_gold: 12,
    referral_reward_rate_premium: 15,
    customer_discount_rate: 2
  });

  const resetForm = () => { 
    setForm({ 
      code: '', name: '', type: 'wellness_partner', status: 'active', 
      referral_reward_rate_trial: 10, referral_reward_rate_gold: 12, 
      referral_reward_rate_premium: 15, customer_discount_rate: 2 
    }); 
    setEditing(null); 
    setShowForm(false); 
  };

  const openEdit = (p: Partner) => {
    setEditing(p);
    setForm({ 
      code: p.code, name: p.name, type: p.type, status: p.status, 
      referral_reward_rate_trial: p.referral_reward_rate_trial,
      referral_reward_rate_gold: p.referral_reward_rate_gold,
      referral_reward_rate_premium: p.referral_reward_rate_premium,
      customer_discount_rate: p.customer_discount_rate
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    setLoading(true);
    const url = editing ? `/api/admin/partners/${editing.id}` : '/api/admin/partners';
    const method = editing ? 'PUT' : 'POST';
    const res = await fetch(url, { 
      method, 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(form) 
    });
    setLoading(false);
    if (res.ok) { 
      resetForm(); 
      router.refresh(); 
    } else {
      const errorData = await res.json().catch(()=>null);
      alert(errorData?.error || 'Failed to save partner');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this partner?')) return;
    await fetch(`/api/admin/partners/${id}`, { method: 'DELETE' });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Partners</h1>
          <p className="text-gray-500 mt-1">Manage Wellness Circle and Retail partners.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg">
          <Plus size={16} /> New Partner
        </button>
      </div>

      <div className="space-y-3">
        {partners.map(p => (
          <div key={p.id} className={`bg-white border rounded-xl p-5 flex items-center gap-4 ${p.status === 'active' ? 'border-gray-200' : 'border-gray-100 opacity-60'}`}>
            <div className="p-2 bg-emerald-50 rounded-lg"><Users size={20} className="text-emerald-600" /></div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 text-base">{p.name}</span>
                <span className="font-mono text-gray-500 text-sm">{p.code}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>{p.status === 'active' ? 'Active' : 'Inactive'}</span>
                <span className="px-2 py-0.5 text-xs rounded-full font-medium bg-blue-50 text-blue-800">{p.type === 'wellness_partner' ? 'Wellness' : 'Retail'}</span>
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span>Customer Discount: {p.customer_discount_rate}%</span>
                <span>Trial Reward: {p.referral_reward_rate_trial}%</span>
                <span>Gold Reward: {p.referral_reward_rate_gold}%</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-blue-600"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {partners.length === 0 && (
          <div className="bg-white border border-dashed border-gray-300 rounded-xl py-12 text-center">
            <Users className="mx-auto mb-3 text-gray-300" size={32} />
            <p className="text-gray-500">No partners yet.</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={resetForm}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-semibold text-gray-900 mb-4">{editing ? 'Edit Partner' : 'New Partner'}</h3>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="e.g. Health Clinic" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Partner Code *</label>
                  <input value={form.code} onChange={e => setForm(f => ({...f, code: e.target.value.toUpperCase()}))} placeholder="e.g. CLINIC20" className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={form.type} onChange={e => setForm(f => ({...f, type: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="wellness_partner">Wellness Partner</option>
                    <option value="retail_partner">Retail Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({...f, status: e.target.value}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:ring-1 focus:ring-emerald-500">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Rewards & Discounts</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Customer Discount (%)</label>
                    <input type="number" value={form.customer_discount_rate} onChange={e => setForm(f => ({...f, customer_discount_rate: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Trial Pack Reward (%)</label>
                    <input type="number" value={form.referral_reward_rate_trial} onChange={e => setForm(f => ({...f, referral_reward_rate_trial: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Gold Pack Reward (%)</label>
                    <input type="number" value={form.referral_reward_rate_gold} onChange={e => setForm(f => ({...f, referral_reward_rate_gold: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Premium Pack Reward (%)</label>
                    <input type="number" value={form.referral_reward_rate_premium} onChange={e => setForm(f => ({...f, referral_reward_rate_premium: Number(e.target.value)}))} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
                  </div>
                </div>
              </div>

            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={resetForm} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">Cancel</button>
              <button onClick={handleSave} disabled={loading || !form.code || !form.name} className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-sm rounded-md disabled:opacity-50">
                {loading ? 'Saving...' : 'Save Partner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
