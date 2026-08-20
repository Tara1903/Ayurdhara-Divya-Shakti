// Properly fix the database: add product_slug column and clean up orphaned orders
const SUPABASE_URL = 'https://rldozvghjrmuuutnwdjs.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZG96dmdoanJtdXV1dG53ZGpzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDY0Nzc0OSwiZXhwIjoyMTAwMjIzNzQ5fQ.mP4zF3Xarfcq2O8CgjAUy21xd2czMZ-Birn2P7prPC0';

async function query(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Prefer': options.prefer || 'return=representation',
      ...(options.headers || {})
    }
  });
  const text = await res.text();
  try { return { ok: res.ok, status: res.status, data: JSON.parse(text) }; }
  catch { return { ok: res.ok, status: res.status, data: text }; }
}

async function main() {
  // === Step 1: Add product_slug column via Supabase Management API ===
  console.log('=== Step 1: Adding product_slug column to order_items ===');
  
  // We'll use the Supabase pg_net extension or direct SQL endpoint
  // The REST API can't ALTER TABLE, so we need to use the SQL endpoint
  const sqlEndpoint = `${SUPABASE_URL}/rest/v1/rpc/exec_sql`;
  
  // First, check if there's an exec_sql function
  const sqlRes = await fetch(sqlEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ sql: "ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_slug TEXT;" })
  });
  
  if (sqlRes.ok) {
    console.log('✅ product_slug column added successfully!');
  } else {
    console.log(`exec_sql not available (${sqlRes.status}). Trying alternative...`);
    
    // Try via the Supabase Management API (v1)
    // Extract project ref from URL
    const projectRef = SUPABASE_URL.replace('https://', '').replace('.supabase.co', '');
    console.log(`Project ref: ${projectRef}`);
    
    const mgmtRes = await fetch(`https://api.supabase.com/v1/projects/${projectRef}/database/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: "ALTER TABLE order_items ADD COLUMN IF NOT EXISTS product_slug TEXT;" })
    });
    
    if (mgmtRes.ok) {
      console.log('✅ product_slug column added via Management API!');
    } else {
      console.log(`Management API also failed (${mgmtRes.status}).`);
      console.log('');
      console.log('==========================================================');
      console.log('  MANUAL ACTION REQUIRED:');
      console.log('  Go to Supabase Dashboard > SQL Editor and run:');
      console.log('');
      console.log('  ALTER TABLE order_items ADD COLUMN product_slug TEXT;');
      console.log('==========================================================');
      console.log('');
    }
  }
  
  // === Step 2: Clean up orphaned orders (no items) ===
  console.log('\n=== Step 2: Cleaning up orphaned orders ===');
  
  // Get all orders
  const ordersResult = await query('orders?select=id,order_ref,created_at&order=created_at.desc');
  if (!ordersResult.ok) {
    console.error('Failed to fetch orders:', ordersResult.data);
    return;
  }
  
  const orders = ordersResult.data;
  let orphanedIds = [];
  
  for (const order of orders) {
    const itemsResult = await query(`order_items?select=id&order_id=eq.${order.id}`);
    if (itemsResult.ok && itemsResult.data.length === 0) {
      orphanedIds.push(order.id);
      console.log(`  ❌ Orphaned: ${order.order_ref} (${order.id})`);
    }
  }
  
  if (orphanedIds.length > 0) {
    console.log(`\nDeleting ${orphanedIds.length} orphaned orders...`);
    
    for (const id of orphanedIds) {
      const delRes = await fetch(`${SUPABASE_URL}/rest/v1/orders?id=eq.${id}`, {
        method: 'DELETE',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
        }
      });
      console.log(`  Deleted ${id}: ${delRes.ok ? '✅' : '❌ ' + delRes.status}`);
    }
  } else {
    console.log('  No orphaned orders found.');
  }
  
  // === Step 3: Verify the fix ===
  console.log('\n=== Step 3: Final verification ===');
  const verifyRes = await query('order_items?select=product_slug&limit=1');
  if (verifyRes.ok) {
    console.log('✅ product_slug column EXISTS — code fix can be reverted to use it directly');
  } else {
    console.log('⚠️  product_slug column still missing — run the SQL manually first');
  }
  
  // Show remaining orders
  const remainingOrders = await query('orders?select=id,order_ref,order_status,payment_status,final_total&order=created_at.desc');
  if (remainingOrders.ok) {
    console.log(`\nRemaining orders: ${remainingOrders.data.length}`);
    remainingOrders.data.forEach(o => {
      console.log(`  ${o.order_ref} | ${o.order_status}/${o.payment_status} | ₹${o.final_total}`);
    });
  }
}

main().catch(console.error);
