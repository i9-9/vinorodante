import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => ({ 
        items: [...state.items, item],
        total: state.total + item.price
      })),
      removeItem: (id) => set((state) => {
        const itemToRemove = state.items.find(item => item.id === id);
        return {
          items: state.items.filter((item) => item.id !== id),
          total: itemToRemove ? state.total - itemToRemove.price : state.total
        };
      }),
      clearCart: () => set({ items: [], total: 0 }),
      total: 0,
    }),
    {
      name: 'cart-storage',
    }
  )
); 