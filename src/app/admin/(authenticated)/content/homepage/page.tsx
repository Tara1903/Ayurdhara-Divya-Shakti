import { createClient } from '@/lib/supabase/server';
import { HomepageClient } from './HomepageClient';

export const revalidate = 0;

export default async function HomepageBuilderPage() {
  const supabase = await createClient();
  const { data: hero } = await supabase.from('site_content').select('content').eq('key', 'homepage_hero').single();
  const { data: featured } = await supabase.from('site_content').select('content').eq('key', 'homepage_featured').single();
  const { data: about } = await supabase.from('site_content').select('content').eq('key', 'homepage_about').single();
  
  return <HomepageClient 
    hero={hero?.content || {}} 
    featured={featured?.content || {}} 
    about={about?.content || {}} 
  />;
}
