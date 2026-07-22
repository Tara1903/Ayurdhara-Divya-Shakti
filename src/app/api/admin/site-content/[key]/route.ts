import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

async function requireAdmin() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  if (!user) return null;
  const { data: p } = await s.from('profiles').select('role').eq('id', user.id).single();
  return (!p || p.role === 'customer') ? null : user;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const supabase = createAdminClient();
  const { data, error } = await supabase.from('site_content').select('content').eq('key', key).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data.content);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ key: string }> }) {
  const user = await requireAdmin();
  if (!user) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  const { key } = await params;
  const body = await req.json();
  const supabase = createAdminClient();
  const { error } = await supabase.from('site_content').upsert({
    key,
    content: body,
    updated_by: user.id,
    updated_at: new Date().toISOString(),
  }, { onConflict: 'key' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
