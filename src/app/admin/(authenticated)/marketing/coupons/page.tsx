import { createClient } from '@/lib/supabase/server';
import { CouponsClient } from './CouponsClient';

export const revalidate = 0;

export default async function CouponsPage() {
  const supabase = await createClient();
  const { data: coupons } = await supabase.from('coupons').select('*').order('created_at', { ascending: false });
  return <CouponsClient coupons={coupons || []} />;
}
