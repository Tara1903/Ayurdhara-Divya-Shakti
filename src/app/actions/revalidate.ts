'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateStorefront(slug?: string) {
  try {
    // Purge unstable_cache tags
    revalidateTag('products', 'default');
    revalidateTag('metadata', 'default');
    revalidateTag('categories', 'default');
    revalidateTag('homepage-content', 'default');
    revalidateTag('marketing', 'default');
  } catch {}

  try {
    // Purge static route caches
    revalidatePath('/', 'layout');
    revalidatePath('/');
    revalidatePath('/collections');
    revalidatePath('/wellness-packs');
    revalidatePath('/trial-packs');
    if (slug) {
      revalidatePath(`/products/${slug}`);
    }
  } catch {}
}

