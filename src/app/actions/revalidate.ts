'use server';

import { revalidatePath } from 'next/cache';

export async function revalidateStorefront() {
  // Revalidate the entire application layout to ensure changes propagate everywhere
  revalidatePath('/', 'layout');
}
