import { createClient } from '@/lib/supabase/server';
import { BannersClient } from './BannersClient';

export const revalidate = 0;

export default async function BannersPage() {
  const supabase = await createClient();
  const { data: banners } = await supabase.from('banners').select('*').order('priority', { ascending: false });
  return <BannersClient banners={banners || []} />;
}
