import { createClient } from '@/lib/supabase/server';
import { OffersClient } from './OffersClient';

export const revalidate = 0;

export default async function OffersPage() {
  const supabase = await createClient();
  const { data: offers } = await supabase.from('offers').select('*').order('created_at', { ascending: false });
  return <OffersClient offers={offers || []} />;
}
