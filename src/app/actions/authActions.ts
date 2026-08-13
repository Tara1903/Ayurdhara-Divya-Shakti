'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function updateUserMobileInProfile(userId: string, mobile: string) {
  if (!userId || !mobile) return;
  
  try {
    await supabaseAdmin
      .from('profiles')
      .update({ mobile })
      .eq('id', userId);
  } catch (error) {
    console.error('Failed to update mobile:', error);
  }
}
