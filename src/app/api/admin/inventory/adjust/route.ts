import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const userSupabase = await createClient();
  const { data: { user } } = await userSupabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  
  const { data: profile } = await userSupabase.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role === 'customer') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { variantId, quantity, reason, note } = await req.json();
  const supabase = createAdminClient();

  // Get current stock
  const { data: variant } = await supabase.from('product_variants').select('stock_quantity, product_id').eq('id', variantId).single();
  if (!variant) return NextResponse.json({ error: 'Variant not found' }, { status: 404 });

  const newStock = Math.max(0, (variant.stock_quantity || 0) + quantity);

  // Update stock
  const { error } = await supabase.from('product_variants').update({ stock_quantity: newStock }).eq('id', variantId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log the adjustment
  await supabase.from('inventory_logs').insert({
    product_id: variant.product_id,
    variant_id: variantId,
    quantity_change: quantity,
    reason,
    actor_id: user.id,
    note: note || null,
  });

  // Audit log
  await supabase.from('audit_logs').insert({
    actor_id: user.id,
    action: 'inventory.adjusted',
    resource_type: 'product_variant',
    resource_id: variantId,
    old_data: { stock_quantity: variant.stock_quantity },
    new_data: { stock_quantity: newStock, quantity_change: quantity, reason },
  });

  return NextResponse.json({ success: true, newStock });
}
