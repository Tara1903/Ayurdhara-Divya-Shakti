import { createClient } from '@/lib/supabase/server';
import { ReviewsClient } from './ReviewsClient';

export const revalidate = 0;

export default async function ReviewsPage() {
  const supabase = await createClient();
  const { data: reviews } = await supabase.from('reviews').select('*, products(name), profiles(full_name, email)').order('created_at', { ascending: false });
  return <ReviewsClient reviews={reviews || []} />;
}
