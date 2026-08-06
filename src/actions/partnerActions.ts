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

export async function computeCommission(productSlug: string, partnerType: 'wellness' | 'retail', quantity: number, unitPrice: number): Promise<{ rate: number, amount: number }> {
  // Cash referrals rules:
  // Trial: 10%
  // Gold: 12%
  // Premium: To Be Defined (assume 0 or some default, let's use 12% if it's a pack, otherwise 0 for now as specified "TO BE DEFINED")
  
  let rate = 0;
  
  if (partnerType === 'wellness') {
    if (productSlug.includes('trial')) {
      rate = 10;
    } else if (productSlug.includes('gold')) {
      rate = 12;
    } else if (productSlug.includes('premium')) {
      rate = 0; // TO BE DEFINED
    }
  } else if (partnerType === 'retail') {
    // Retail margins might be different, but for now we follow the same or assume 0 until defined.
    // The prompt only defined referral structure for "Cash Referral Reward" (Wellness Partner).
    rate = 0; 
  }

  const amount = (rate / 100) * (unitPrice * quantity);
  
  return { rate, amount };
}
