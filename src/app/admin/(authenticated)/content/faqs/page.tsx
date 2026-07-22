import { createClient } from '@/lib/supabase/server';
import { FaqsClient } from './FAQsClient';

export const revalidate = 0;

export default async function FaqsPage() {
  const supabase = await createClient();
  const { data: faqs } = await supabase.from('faqs').select('*').order('display_order', { ascending: true });
  return <FaqsClient faqs={faqs || []} />;
}
