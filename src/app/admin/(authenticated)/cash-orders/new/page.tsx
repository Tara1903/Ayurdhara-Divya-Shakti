'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { products, type Product } from '@/data/productData';
import { createCashOrder } from '@/actions/cashOrderActions';
import { validatePartnerCode } from '@/actions/partnerActions';
import { createClient } from '@/lib/supabase/client';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function NewCashOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [staffList, setStaffList] = useState<{ id: string, name: string }[]>([]);
  
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [staffName, setStaffName] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [partnerType, setPartnerType] = useState<'none'|'wellness'|'retail'>('none');
  const [partnerCode, setPartnerCode] = useState('');
  const [partnerValidating, setPartnerValidating] = useState(false);
  const [partnerError, setPartnerError] = useState('');
  const [partnerSuccess, setPartnerSuccess] = useState('');

  const [notes, setNotes] = useState('');
  const [items, setItems] = useState([{
    productId: '',
    variant: '',
    quantity: 1,
    unitPrice: 0,
    imageUrl: ''
  }]);

  useEffect(() => {
    // Fetch admin users for staff dropdown
    const fetchStaff = async () => {
      const supabase = createClient();
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, role')
        .eq('role', 'admin');
      if (data) {
        setStaffList(data.map(d => ({ id: d.id, name: d.full_name || 'Admin User' })));
        if (data.length > 0 && !staffName) setStaffName(data[0].full_name || 'Admin User');
      }
    };
    fetchStaff();
  }, [staffName]);

  const handleValidatePartner = async () => {
    if (!partnerCode || partnerType === 'none') return;
    setPartnerValidating(true);
    setPartnerError('');
    setPartnerSuccess('');
    
    const res = await validatePartnerCode(partnerCode, partnerType as any);
    if (res.success && res.partner) {
      setPartnerSuccess(`Valid: ${res.partner.partnerName}`);
    } else {
      setPartnerError(res.error || 'Invalid code');
    }
    setPartnerValidating(false);
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', variant: '', quantity: 1, unitPrice: 0, imageUrl: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...items];
    if (field === 'productId') {
      const product = products.find(p => p.slug === value || p.id === value);
      newItems[index].productId = value;
      if (product) {
        newItems[index].variant = product.variants[0]?.size || '';
        newItems[index].unitPrice = product.variants[0]?.price || 0;
        newItems[index].imageUrl = product.images[0] || '';
      }
    } else if (field === 'variant') {
      const product = products.find(p => p.slug === newItems[index].productId || p.id === newItems[index].productId);
      newItems[index].variant = value;
      if (product) {
        const variantData = product.variants.find(v => v.size === value);
        if (variantData) {
          newItems[index].unitPrice = variantData.price;
        }
      }
    } else {
      newItems[index] = { ...newItems[index], [field]: value };
    }
    setItems(newItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.some(i => !i.productId || !i.variant || i.quantity < 1)) {
      alert("Please complete all product line items.");
      return;
    }
    
    if (partnerType !== 'none' && partnerCode && !partnerSuccess) {
      alert("Please validate the partner code before submitting.");
      return;
    }

    setLoading(true);
    
    // Map items to payload
    const formattedItems = items.map(item => {
      const product = products.find(p => p.slug === item.productId || p.id === item.productId);
      return {
        productSlug: product?.slug || item.productId,
        productName: product?.name || item.productId,
        variant: item.variant,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        imageUrl: item.imageUrl
      };
    });

    const payload = {
      customerName,
      mobileNumber,
      email: email || undefined,
      staffName,
      saleDate: new Date(saleDate).toISOString(),
      partnerType: partnerType !== 'none' ? partnerType : undefined,
      partnerCode: partnerType !== 'none' ? partnerCode : undefined,
      notes: notes || undefined,
      items: formattedItems
    };

    const res = await createCashOrder(payload);
    if (res.success && res.orderId) {
      router.push(`/admin/cash-orders/${res.orderId}`);
    } else {
      alert(res.error || 'Failed to create cash order');
      setLoading(false);
    }
  };

  const total = items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <Link href="/admin/cash-orders" className="text-gray-500 hover:text-gray-900">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Create Cash Order</h1>
          <p className="text-gray-500 mt-1">Record a new offline store purchase.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Customer Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name *</label>
              <input 
                type="text" required value={customerName} onChange={e => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input 
                type="tel" required value={mobileNumber} onChange={e => setMobileNumber(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input 
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Order Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sale Date *</label>
              <input 
                type="date" required value={saleDate} onChange={e => setSaleDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Staff / Seller *</label>
              <select 
                required value={staffName} onChange={e => setStaffName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {staffList.length === 0 ? <option value="">Loading...</option> : null}
                {staffList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <div className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-md text-gray-600">CASH (Physical Payment)</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-900">Products</h3>
            {items.map((item, index) => {
              const selectedProduct = products.find(p => p.slug === item.productId || p.id === item.productId);
              return (
                <div key={index} className="flex flex-col md:flex-row gap-3 items-start md:items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex-1 w-full">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Product</label>
                    <select 
                      required value={item.productId} onChange={e => handleItemChange(index, 'productId', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select Product...</option>
                      {products.map(p => (
                        <option key={p.id} value={p.slug}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-32">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Variant</label>
                    <select 
                      required value={item.variant} onChange={e => handleItemChange(index, 'variant', e.target.value)}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      disabled={!selectedProduct}
                    >
                      <option value="">Variant...</option>
                      {selectedProduct?.variants.map((v, i) => (
                        <option key={i} value={v.size}>{v.size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input 
                      type="number" required min="0" value={item.unitPrice} onChange={e => handleItemChange(index, 'unitPrice', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="w-full md:w-20">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Qty</label>
                    <input 
                      type="number" required min="1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', Number(e.target.value))}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                  <div className="w-full md:w-24">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Total</label>
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-900 border border-transparent">
                      ₹{item.unitPrice * item.quantity}
                    </div>
                  </div>
                  <button type="button" onClick={() => handleRemoveItem(index)} disabled={items.length === 1} className="p-1.5 text-red-500 hover:bg-red-50 rounded-md disabled:opacity-30">
                    <Trash2 size={18} />
                  </button>
                </div>
              );
            })}
            
            <div className="flex justify-between items-center pt-2">
              <button type="button" onClick={handleAddItem} className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700">
                <Plus size={16} /> Add Another Product
              </button>
              <div className="text-xl font-serif font-bold text-gray-900">
                Total: ₹{total.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        </div>

        {/* Partner Attribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Partner Attribution (Optional)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Type</label>
              <select 
                value={partnerType} onChange={e => { setPartnerType(e.target.value as any); setPartnerCode(''); setPartnerSuccess(''); setPartnerError(''); }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="none">None</option>
                <option value="wellness">Wellness Partner</option>
                <option value="retail">Retail Partner</option>
              </select>
            </div>
            {partnerType !== 'none' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Code *</label>
                <div className="flex gap-2">
                  <input 
                    type="text" required value={partnerCode} onChange={e => { setPartnerCode(e.target.value); setPartnerSuccess(''); setPartnerError(''); }}
                    className="flex-1 px-3 py-2 uppercase border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button type="button" onClick={handleValidatePartner} disabled={!partnerCode || partnerValidating} className="px-3 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200 disabled:opacity-50">
                    {partnerValidating ? '...' : 'Verify'}
                  </button>
                </div>
                {partnerError && <p className="text-xs text-red-600 mt-1">{partnerError}</p>}
                {partnerSuccess && <p className="text-xs text-green-600 mt-1">{partnerSuccess}</p>}
              </div>
            )}
          </div>
        </div>
        
        {/* Notes */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Internal Notes</h2>
          <textarea 
            value={notes} onChange={e => setNotes(e.target.value)} rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Add any internal notes here..."
          ></textarea>
        </div>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" disabled={loading}
            className="inline-flex items-center gap-2 bg-[#2D5A27] hover:bg-[#23471f] text-white px-6 py-3 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Creating Order...' : 'Create Cash Order'}
          </button>
        </div>

      </form>
    </div>
  );
}
