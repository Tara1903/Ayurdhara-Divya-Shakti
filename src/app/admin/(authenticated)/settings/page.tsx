import { createClient } from '@/lib/supabase/server';
import { SettingsClient } from './SettingsClient';

export const revalidate = 0;

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from('site_settings').select('key, value');
  const settingsMap: Record<string, any> = {};
  settings?.forEach(s => { settingsMap[s.key] = s.value; });
  return <SettingsClient settings={settingsMap} />;
}
