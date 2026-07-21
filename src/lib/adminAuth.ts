import { createClient } from '@/lib/supabase/server';
import { AdminRole } from '@/types/admin';

export async function verifyAdminRole(allowedRoles?: AdminRole[]): Promise<{
  authorized: boolean;
  userId: string | null;
  role: AdminRole | null;
  error: string | null;
}> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, userId: null, role: null, error: 'Not authenticated' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role === 'customer') {
    return { authorized: false, userId: user.id, role: profile?.role, error: 'Not an administrator' };
  }

  const role = profile.role as AdminRole;

  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(role) && role !== 'super_admin') {
      return { authorized: false, userId: user.id, role, error: 'Insufficient permissions' };
    }
  }

  return { authorized: true, userId: user.id, role, error: null };
}

export async function requireAdmin(allowedRoles?: AdminRole[]) {
  const result = await verifyAdminRole(allowedRoles);
  if (!result.authorized) {
    throw new Error(result.error || 'Unauthorized');
  }
  return result;
}
