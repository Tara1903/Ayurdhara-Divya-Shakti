import { createClient } from '@/lib/supabase/server';
import { TestimonialsClient } from './TestimonialsClient';

export const revalidate = 0;

export default async function TestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
  return <TestimonialsClient testimonials={testimonials || []} />;
}
