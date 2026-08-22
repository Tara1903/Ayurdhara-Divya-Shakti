import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: images } = await supabase.from('product_images').select('*');
  const placeholders = images?.filter(img => img.url.includes('cat_') || img.url.includes('placeholder')) || [];
  const validSupabase = images?.filter(img => img.url.includes('supabase.co')) || [];

  console.log(`Total Product Images in DB: ${images?.length}`);
  console.log(`Valid High-Definition Supabase Images: ${validSupabase.length}`);
  console.log(`Remaining generic placeholders: ${placeholders.length}`);
}

check();
