import { createClient } from '@/lib/supabase/server';
import { AnnouncementBarClient } from './AnnouncementBarClient';

export const revalidate = 0;

export default async function AnnouncementBarPage() {
  const supabase = await createClient();
  const { data } = await supabase.from('site_settings').select('value').eq('key', 'announcement_bar').single();
  const settings = data?.value || { enabled: false, message: '', cta_text: '', cta_link: '', variant: 'default' };
  return <AnnouncementBarClient settings={settings} />;
}
