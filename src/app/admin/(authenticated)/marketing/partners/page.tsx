import { createClient } from '@/lib/supabase/server';
import { PartnersClient } from './PartnersClient';

export const revalidate = 0;

export default async function PartnersPage() {
  const supabase = await createClient();
  const { data: partners } = await supabase.from('partners').select('*').order('created_at', { ascending: false });
  return <PartnersClient partners={partners || []} />;
}
