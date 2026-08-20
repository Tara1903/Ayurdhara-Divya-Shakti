const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
async function check() {
  const { data, error } = await supabase.from('orders').insert({
      order_ref: 'TEST-123',
      customer_id: null,
      guest_email: 'test@test.com',
      guest_mobile: '1234567890',
      order_status: 'pending',
      payment_status: 'pending',
      payment_method: 'UPI',
      subtotal: 100,
      item_discount: 0,
      coupon_code: null,
      coupon_discount: 0,
      partner_code: null,
      partner_type: null,
      partner_discount: 0,
      referral_reward_eligible_amount: 0,
      referral_reward_calculated: 0,
      referral_reward_status: 'pending',
      shipping_charge: 0,
      final_total: 100,
      shipping_address_snapshot: {},
      idempotency_key: 'test'
  }).select();
  console.log('Error:', error);
}
check();
