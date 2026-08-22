import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function createBuckets() {
  const buckets = ['profiles', 'partner-documents', 'product-reviews'];
  
  for (const b of buckets) {
    const { data, error } = await supabase.storage.createBucket(b, {
      public: true,
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'application/pdf'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`Bucket ${b} already exists.`);
      } else {
        console.error(`Error creating bucket ${b}:`, error);
      }
    } else {
      console.log(`Bucket ${b} created successfully!`, data);
    }
  }
}

createBuckets();
