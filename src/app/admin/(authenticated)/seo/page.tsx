import { createClient } from '@/lib/supabase/server';
import { SeoClient } from './SeoClient';

export const revalidate = 0;

export default async function SeoPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('key, value');
  const settingsMap: Record<string, any> = {};
  settings?.forEach(s => { settingsMap[s.key] = s.value; });
  return <SeoClient settings={settingsMap} />;
}
