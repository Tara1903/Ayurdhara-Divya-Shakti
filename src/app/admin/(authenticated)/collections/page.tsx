import { createClient } from '@/lib/supabase/server';
import { CollectionsClient } from './CollectionsClient';

export const revalidate = 0;

export default async function CollectionsPage() {
  const supabase = await createClient();
  const { data: collections } = await supabase.from('collections').select('*').order('created_at', { ascending: false });
  return <CollectionsClient collections={collections || []} />;
}
