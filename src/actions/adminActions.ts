'use server';

import { createClient } from '@/lib/supabase/server';

export async function toggleGoldMembership(userId: string, isGold: boolean): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };

  // Assume admin check happens here (or RLS policy)
  const { error } = await supabase
    .from('profiles')
    .update({ 
      is_gold_member: isGold,
      gold_membership_status: isGold ? 'active' : 'inactive',
      gold_member_since: isGold ? new Date().toISOString() : null,
      gold_membership_source_course: isGold ? 'Manual Admin Override' : null
    })
    .eq('id', userId);

  if (error) return { success: false, error: error.message };
  return { success: true };
}

