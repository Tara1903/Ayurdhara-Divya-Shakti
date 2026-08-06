'use server';

import { createClient } from '@/lib/supabase/server';
import type { CashOrder } from '@/types/cashOrder';

export interface AdminCustomerSummary {
  id: string; // profile id or 'guest_' + mobile
  name: string;
  email: string | null;
  mobile: string | null;
  isGoldMember: boolean;
  onlineOrderCount: number;
  cashOrderCount: number;
  lastPurchaseDate: string | null;
  type: 'registered' | 'guest';
}

export async function getAdminCustomers(): Promise<AdminCustomerSummary[]> {
  const supabase = await createClient();
  
  // 1. Fetch profiles
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, full_name, email, mobile, is_gold_member, created_at');
    
  // 2. Fetch online orders to count
  const { data: onlineOrders } = await supabase
    .from('orders')
    .select('customer_id, created_at, guest_email, guest_mobile')
    .eq('order_status', 'completed');
    
  // 3. Fetch cash orders to count
  const { data: cashOrders } = await supabase
    .from('cash_orders')
    .select('customer_name, email, mobile_number, linked_account_id, sale_date')
    .eq('order_status', 'completed');

  const customersMap = new Map<string, AdminCustomerSummary>();

  // Process Registered Profiles
  if (profiles) {
    profiles.forEach(p => {
      customersMap.set(p.id, {
        id: p.id,
        name: p.full_name || 'Unnamed',
        email: p.email,
        mobile: p.mobile,
        isGoldMember: !!p.is_gold_member,
        onlineOrderCount: 0,
        cashOrderCount: 0,
        lastPurchaseDate: null,
        type: 'registered'
      });
    });
  }

  // Process Online Orders
  if (onlineOrders) {
    onlineOrders.forEach(o => {
      if (o.customer_id && customersMap.has(o.customer_id)) {
        const c = customersMap.get(o.customer_id)!;
        c.onlineOrderCount++;
        if (!c.lastPurchaseDate || new Date(o.created_at) > new Date(c.lastPurchaseDate)) {
          c.lastPurchaseDate = o.created_at;
        }
      } else if (!o.customer_id && o.guest_mobile) {
        // Guest online order
        const guestId = `guest_${o.guest_mobile}`;
        if (!customersMap.has(guestId)) {
          customersMap.set(guestId, {
            id: guestId,
            name: 'Guest Customer',
            email: o.guest_email,
            mobile: o.guest_mobile,
            isGoldMember: false,
            onlineOrderCount: 0,
            cashOrderCount: 0,
            lastPurchaseDate: null,
            type: 'guest'
          });
        }
        const c = customersMap.get(guestId)!;
        c.onlineOrderCount++;
        if (!c.lastPurchaseDate || new Date(o.created_at) > new Date(c.lastPurchaseDate)) {
          c.lastPurchaseDate = o.created_at;
        }
      }
    });
  }

  // Process Cash Orders
  if (cashOrders) {
    cashOrders.forEach(cOrder => {
      let targetId = cOrder.linked_account_id;
      
      if (!targetId) {
        // Try to match by mobile if linked_account_id is missing
        const matchedProfile = profiles?.find(p => p.mobile === cOrder.mobile_number);
        if (matchedProfile) {
          targetId = matchedProfile.id;
        }
      }

      if (targetId && customersMap.has(targetId)) {
        const c = customersMap.get(targetId)!;
        c.cashOrderCount++;
        if (!c.lastPurchaseDate || new Date(cOrder.sale_date) > new Date(c.lastPurchaseDate)) {
          c.lastPurchaseDate = cOrder.sale_date;
        }
      } else {
        const guestId = `guest_${cOrder.mobile_number}`;
        if (!customersMap.has(guestId)) {
          customersMap.set(guestId, {
            id: guestId,
            name: cOrder.customer_name,
            email: cOrder.email,
            mobile: cOrder.mobile_number,
            isGoldMember: false,
            onlineOrderCount: 0,
            cashOrderCount: 0,
            lastPurchaseDate: null,
            type: 'guest'
          });
        }
        const c = customersMap.get(guestId)!;
        c.cashOrderCount++;
        if (!c.lastPurchaseDate || new Date(cOrder.sale_date) > new Date(c.lastPurchaseDate)) {
          c.lastPurchaseDate = cOrder.sale_date;
        }
        // Update name if we have a better one
        if (c.name === 'Guest Customer' && cOrder.customer_name) {
          c.name = cOrder.customer_name;
        }
      }
    });
  }

  return Array.from(customersMap.values()).sort((a, b) => {
    // Sort by last purchase date descending
    if (!a.lastPurchaseDate) return 1;
    if (!b.lastPurchaseDate) return -1;
    return new Date(b.lastPurchaseDate).getTime() - new Date(a.lastPurchaseDate).getTime();
  });
}

export interface CustomerProfileDetails {
  id: string;
  name: string;
  email: string | null;
  mobile: string | null;
  type: 'registered' | 'guest';
  isGoldMember: boolean;
  onlineOrders: any[];
  cashOrders: any[];
  purchasedProducts: any[];
  partnerAttribution: any;
  rewards: any;
}

export async function getAdminCustomerProfile(id: string): Promise<{ data: CustomerProfileDetails | null, error?: string }> {
  const supabase = await createClient();
  
  let profile = null;
  let searchMobile = null;
  let type: 'registered' | 'guest' = 'registered';

  if (id.startsWith('guest_')) {
    type = 'guest';
    searchMobile = id.replace('guest_', '');
  } else {
    const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
    if (data) {
      profile = data;
      searchMobile = data.mobile;
    } else {
      return { data: null, error: 'Customer not found' };
    }
  }

  // Fetch online orders
  let onlineOrders: any[] = [];
  if (profile) {
    const { data: oOrders } = await supabase.from('orders').select('*').eq('customer_id', id).order('created_at', { ascending: false });
    if (oOrders) onlineOrders = oOrders;
  } else if (searchMobile) {
    const { data: oOrders } = await supabase.from('orders').select('*').eq('guest_mobile', searchMobile).order('created_at', { ascending: false });
    if (oOrders) onlineOrders = oOrders;
  }

  // Fetch cash orders
  let cashOrders: any[] = [];
  if (profile) {
    // Try linked account OR mobile
    const { data: cOrders } = await supabase.from('cash_orders').select('*').or(`linked_account_id.eq.${id},mobile_number.eq.${searchMobile}`).order('sale_date', { ascending: false });
    if (cOrders) cashOrders = cOrders;
  } else if (searchMobile) {
    const { data: cOrders } = await supabase.from('cash_orders').select('*').eq('mobile_number', searchMobile).order('sale_date', { ascending: false });
    if (cOrders) cashOrders = cOrders;
  }

  // Purchased products deduplication
  const purchasedMap = new Map<string, any>();
  onlineOrders.forEach(o => {
    if (o.order_status === 'cancelled') return;
    (o.items || []).forEach((item: any) => {
      if (!purchasedMap.has(item.productSlug)) {
        purchasedMap.set(item.productSlug, { ...item, source: 'online', date: o.created_at });
      }
    });
  });
  cashOrders.forEach(o => {
    if (o.order_status === 'cancelled') return;
    (o.items || []).forEach((item: any) => {
      if (!purchasedMap.has(item.productSlug)) {
        purchasedMap.set(item.productSlug, { ...item, name: item.productName, source: 'cash', date: o.sale_date });
      }
    });
  });

  // Partner info
  let partnerAttribution = null;
  if (profile && profile.referred_by) {
    partnerAttribution = { code: profile.referred_by, type: 'referral' };
  } else {
    // Check if any order was placed with a partner code
    const firstPartnerOrder = cashOrders.find(o => o.partner_type && o.partner_type !== 'none');
    if (firstPartnerOrder) {
      partnerAttribution = { 
        code: firstPartnerOrder.wellness_partner_code || firstPartnerOrder.retail_partner_code, 
        type: firstPartnerOrder.partner_type 
      };
    }
  }

  return {
    data: {
      id: id,
      name: profile?.full_name || cashOrders[0]?.customer_name || onlineOrders[0]?.guest_name || 'Guest',
      email: profile?.email || cashOrders[0]?.email || onlineOrders[0]?.guest_email || null,
      mobile: searchMobile,
      type: type,
      isGoldMember: !!profile?.is_gold_member,
      onlineOrders,
      cashOrders,
      purchasedProducts: Array.from(purchasedMap.values()),
      partnerAttribution,
      rewards: {
        totalSpent: [...onlineOrders, ...cashOrders].reduce((acc, o) => acc + (o.final_total || 0), 0)
      }
    }
  };
}
