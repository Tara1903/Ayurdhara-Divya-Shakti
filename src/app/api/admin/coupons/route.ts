import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const userSupabase = await createClient();
  const { data: { user } } = await userSupabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await userSupabase.from('profiles').select('role').eq('id', user.id).single();
  return (!profile || profile.role === 'customer') ? null : user;
}

export async function POST(req: NextRequest) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const body = await req.json();
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('coupons').insert({ ...body, used_count: 0 }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
