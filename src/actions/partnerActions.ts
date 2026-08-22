'use server';

import { createClient } from '@/lib/supabase/server';

export interface PartnerCode {
  id: string;
  code: string;
  partnerType: 'wellness' | 'retail';
  partnerName: string;
  isActive: boolean;
}

export async function validatePartnerCode(code: string, type: 'wellness' | 'retail'): Promise<{ success: boolean; partner?: PartnerCode; error?: string }> {
  if (!code) return { success: false, error: 'Code is required' };
  
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('partner_codes')
    .select('*')
    .eq('code', code.trim().toUpperCase())
    .eq('partner_type', type)
    .eq('is_active', true)
    .single();

  if (error || !data) {
    return { success: false, error: 'Invalid or inactive partner code' };
  }

  return { 
    success: true, 
    partner: {
      id: data.id,
      code: data.code,
      partnerType: data.partner_type,
      partnerName: data.partner_name,
      isActive: data.is_active
    }
  };
}

export async function computeCommission(
  productSlug: string,
  partnerType: 'wellness' | 'retail',
  quantity: number,
  unitPrice: number
): Promise<{ rate: number; amount: number }> {
  let rate = 0;
  const slug = (productSlug || '').toLowerCase();

  if (partnerType === 'wellness') {
    if (slug.includes('diamond') || slug.includes('premium')) {
      rate = 15;
    } else if (slug.includes('gold')) {
      rate = 12;
    } else if (slug.includes('trial') || slug.includes('silver') || slug.includes('prime') || slug.includes('pack')) {
      rate = 10;
    } else {
      // Individual products (Oils, Raw Herbs, Powders, Capsules, Teas, Foods, Spices, Aromas)
      rate = 3;
    }
  } else if (partnerType === 'retail') {
    if (slug.includes('diamond') || slug.includes('premium')) {
      rate = 30;
    } else if (slug.includes('gold')) {
      rate = 24;
    } else if (slug.includes('trial') || slug.includes('silver') || slug.includes('prime') || slug.includes('pack')) {
      rate = 20;
    } else {
      // Individual products approved retail margin
      rate = 5;
    }
  }

  const amount = Math.round(((rate / 100) * (unitPrice * quantity)) * 100) / 100;
  return { rate, amount };
}
