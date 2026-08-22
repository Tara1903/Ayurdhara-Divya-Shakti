import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function check() {
  const { data: images } = await supabase.from('product_images').select('url');
  const count = images?.filter(img => img.url.includes('cat_') || img.url.includes('placeholder')).length;
  console.log('Remaining placeholders:', count);
}
check();
