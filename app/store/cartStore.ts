import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Cart } from '@/types/cart';

interface CartStore extends Cart {
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      addItem: (product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id);
          
          if (existingItem) {
            const updatedItems = state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            return {
              items: updatedItems,
              total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
          }

          const newItems = [...state.items, { ...product, quantity: 1 }];
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== id);
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      updateQuantity: (id, quantity) => {
        set((state) => {
          if (quantity < 1) {
            const newItems = state.items.filter(item => item.id !== id);
            return {
              items: newItems,
              total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
            };
          }

          const newItems = state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          );
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          };
        });
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
); 