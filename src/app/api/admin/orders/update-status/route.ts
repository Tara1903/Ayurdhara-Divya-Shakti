import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { orderId, status } = body;

  // Auth check
  const userSupabase = await createClient();
  const { data: { user } } = await userSupabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data: profile } = await userSupabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role === 'customer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const supabase = createAdminClient();
  const { error } = await supabase.from('orders').update({ order_status: status, updated_at: new Date().toISOString() }).eq('id', orderId);
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id, action: 'order.status_updated',
    resource_type: 'order', resource_id: orderId,
    new_data: { status },
  });
  
  return NextResponse.json({ success: true });
}
