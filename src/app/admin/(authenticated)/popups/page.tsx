import { createClient } from '@/lib/supabase/server';
import { PopupsClient } from './PopupsClient';

export const revalidate = 0;

export default async function PopupsPage() {
  const supabase = await createClient();
  const { data: popups } = await supabase.from('popups').select('*').order('created_at', { ascending: false });
  return <PopupsClient popups={popups || []} />;
}
