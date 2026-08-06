'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

function generateRandomCode(name: string): string {
  const prefix = name.substring(0, 4).toUpperCase().replace(/[^A-Z]/g, 'A');
  const random = Math.floor(100 + Math.random() * 900);
  return `${prefix}${random}`;
}

export async function approveRetailPartner(id: string, name: string) {
  const supabase = await createClient();
  
  // 1. Generate real partner_id and partner_code
  // format ADS-RP-XXXX
  const { count } = await supabase.from('retail_partners').select('*', { count: 'exact', head: true });
  const seq = (count || 0) + 1;
  const newPartnerId = `ADS-RP-${seq.toString().padStart(4, '0')}`;
  const newPartnerCode = generateRandomCode(name);

  const { error } = await supabase
    .from('retail_partners')
    .update({
      partner_id: newPartnerId,
      partner_code: newPartnerCode,
      status: 'ACTIVE'
    })
    .eq('id', id);

  if (error) {
    return { success: false, error: 'Failed to approve partner' };
  }

  revalidatePath('/admin/retail-partners');
  revalidatePath(`/admin/retail-partners/${id}`);
  return { success: true };
}

export async function updatePartnerStatus(id: string, status: 'PENDING' | 'ACTIVE' | 'SUSPENDED') {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('retail_partners')
    .update({ status })
    .eq('id', id);

  if (error) {
    return { success: false, error: 'Failed to update status' };
  }

  revalidatePath('/admin/retail-partners');
  revalidatePath(`/admin/retail-partners/${id}`);
  return { success: true };
}

export async function processPayout(id: string, amount: number, notes: string) {
  const supabase = await createClient();
  
  // Need to use a transaction or RPC ideally, but for now we do sequential with checks
  const { data: rp } = await supabase.from('retail_partners').select('wallet_balance, paid_amount').eq('id', id).single();
  
  if (!rp || rp.wallet_balance < amount) {
    return { success: false, error: 'Insufficient wallet balance' };
  }

  const { error: txError } = await supabase
    .from('retail_partner_transactions')
    .insert({
      retail_partner_id: id,
      type: 'payout',
      amount: -amount, // Negative because it's a deduction from wallet
      product_details: notes,
      status: 'completed'
    });

  if (txError) return { success: false, error: 'Failed to record transaction' };

  // Update wallet
  const { error: updateError } = await supabase.rpc('decrement_retail_wallet', { 
    rp_id: id, 
    deduct_amount: amount 
  });

  // Fallback if RPC doesn't exist
  if (updateError) {
    await supabase
      .from('retail_partners')
      .update({
        wallet_balance: rp.wallet_balance - amount,
        paid_amount: rp.paid_amount + amount
      })
      .eq('id', id);
  }

  revalidatePath(`/admin/retail-partners/${id}`);
  return { success: true };
}
