import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import RetailPartnerDetailClient from './RetailPartnerDetailClient';

export default async function AdminRetailPartnerDetailPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  
  const { data: rp, error } = await supabase
    .from('retail_partners')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !rp) {
    return notFound();
  }

  return <RetailPartnerDetailClient params={params} rp={rp} />;
}
