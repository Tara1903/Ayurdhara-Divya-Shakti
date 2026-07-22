import { createClient } from '@/lib/supabase/server';
import { PaymentsClient } from './PaymentsClient';

export const revalidate = 0;

export default async function PaymentsPage() {
  const supabase = await createClient();
  const { data: payments } = await supabase.from('payment_attempts').select('*, orders(order_number)').order('created_at', { ascending: false }).limit(100);
  return <PaymentsClient payments={payments || []} />;
}
