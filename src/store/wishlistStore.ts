import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createClient } from '@/lib/supabase/client';

export interface WishlistItem {
  id: string; // Product ID
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistState {
  items: WishlistItem[];
  
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: async (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        });

        // Fire and forget sync to DB if logged in
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: wishlist } = await supabase
              .from('wishlists')
              .select('id')
              .eq('user_id', session.user.id)
              .single();
            
            if (wishlist) {
              await supabase.from('wishlist_items').upsert({
                wishlist_id: wishlist.id,
                product_id: item.id // assuming item.id matches product slug/id in db
              }, { onConflict: 'wishlist_id,product_id' });
            }
          }
        }
      },
      
      removeItem: async (id) => {
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        }));

        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            const { data: wishlist } = await supabase
              .from('wishlists')
              .select('id')
              .eq('user_id', session.user.id)
              .single();
            
            if (wishlist) {
              await supabase.from('wishlist_items').delete().match({
                wishlist_id: wishlist.id,
                product_id: id
              });
            }
          }
        }
      },
      
      hasItem: (id) => {
        return get().items.some((i) => i.id === id);
      },
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'ayd_wishlist',
    }
  )
);
