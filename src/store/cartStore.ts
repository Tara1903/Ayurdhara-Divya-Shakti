import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;          // e.g. "kids-smart-blend-10ml" (slug + variant size)
  productId: string;   // e.g. "kids-smart-blend"
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  size: string;        // e.g. "10 ml"
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  
  // Actions
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // UI Actions
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // Computed Values (Getters)
  getCartCount: () => number;
  getCartSubtotal: () => number;
  getCartOriginalTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      addItem: (item) => {
        // Generate a unique ID based on product and variant size
        const uniqueId = `${item.productId}-${item.size.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(i => i.id === uniqueId);
          
          if (existingItemIndex !== -1) {
            // Item exists, increase quantity
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += item.quantity;
            return { items: newItems, isCartOpen: true };
          } else {
            // New item, add to array
            return { items: [...state.items, { ...item, id: uniqueId }], isCartOpen: true };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      getCartCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      getCartOriginalTotal: () => {
        return get().items.reduce((total, item) => total + (item.originalPrice * item.quantity), 0);
      }
    }),
    {
      name: 'ayurdhara-cart', // name of the item in the storage (must be unique)
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state like isCartOpen
    }
  )
);
