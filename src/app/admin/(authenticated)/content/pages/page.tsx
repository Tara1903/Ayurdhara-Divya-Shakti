import { createClient } from '@/lib/supabase/server';
import { PagesClient } from './PagesClient';

export const revalidate = 0;

export default async function PagesAdminPage() {
  const supabase = await createClient();
  const { data: pages } = await supabase.from('pages').select('*').order('created_at', { ascending: false });
  return <PagesClient pages={pages || []} />;
}
