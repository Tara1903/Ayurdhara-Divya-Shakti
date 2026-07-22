import { createClient } from '@/lib/supabase/server';
import { JournalClient } from './JournalClient';

export const revalidate = 0;

export default async function JournalPage() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from('journal_articles')
    .select('id, title, slug, excerpt, status, category, publish_date, created_at')
    .order('created_at', { ascending: false });
  return <JournalClient articles={articles || []} />;
}
