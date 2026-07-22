import { createClient } from '@/lib/supabase/server';
import { NavigationClient } from './NavigationClient';

export const revalidate = 0;

export default async function NavigationBuilderPage() {
  const supabase = await createClient();
  const { data: header } = await supabase.from('site_content').select('content').eq('key', 'nav_header').single();
  const { data: footer } = await supabase.from('site_content').select('content').eq('key', 'nav_footer').single();
  
  return <NavigationClient 
    header={header?.content || { links: [] }} 
    footer={footer?.content || { columns: [] }} 
  />;
}
