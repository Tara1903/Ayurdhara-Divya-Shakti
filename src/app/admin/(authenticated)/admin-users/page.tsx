import { createClient } from '@/lib/supabase/server';
import { AdminUsersClient } from './AdminUsersClient';

export const revalidate = 0;

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: admins } = await supabase.from('profiles').select('*').neq('role', 'customer').order('created_at', { ascending: false });
  return <AdminUsersClient admins={admins || []} />;
}
