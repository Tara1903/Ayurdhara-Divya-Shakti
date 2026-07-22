import { createClient } from '@/lib/supabase/server';
import { IngredientsClient } from './IngredientsClient';

export const revalidate = 0;

export default async function IngredientsPage() {
  const supabase = await createClient();
  const { data: ingredients } = await supabase.from('ingredients').select('*').order('name', { ascending: true });
  return <IngredientsClient ingredients={ingredients || []} />;
}
