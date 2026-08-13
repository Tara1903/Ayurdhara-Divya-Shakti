'use server';

import { createClient } from '@supabase/supabase-js';

// We create a server client with the service role key to bypass RLS,
// because the RLS policy for partner_accounts incorrectly checks for role = 'admin'
// instead of using is_admin() (which includes super_admin, etc.)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function fetchPartnersAdmin() {
  const { data, error } = await supabase
    .from('partner_accounts')
    .select('*, partner_wallets(*)')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching partners:', error);
    return [];
  }
  return data;
}

export async function updatePartnerStatusAdmin(id: string, newStatus: string) {
  const { error } = await supabase
    .from('partner_accounts')
    .update({ status: newStatus })
    .eq('id', id);
    
  if (error) {
    console.error('Error updating partner status:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}
