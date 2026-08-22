import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function inspect() {
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  console.log('Categories count:', categories?.length);
  categories?.forEach(c => console.log(`ID: ${c.id} | Name: "${c.name}" | Slug: "${c.slug}"`));
}

inspect();
