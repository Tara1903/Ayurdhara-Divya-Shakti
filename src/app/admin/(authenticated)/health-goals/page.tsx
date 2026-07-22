import { createClient } from '@/lib/supabase/server';
import { HealthGoalsClient } from './HealthGoalsClient';

export const revalidate = 0;

export default async function HealthGoalsPage() {
  const supabase = await createClient();
  const { data: goals } = await supabase.from('health_goals').select('*').order('name', { ascending: true });
  return <HealthGoalsClient goals={goals || []} />;
}
