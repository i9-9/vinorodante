import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  total: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>((set) => ({
  items: [],
  total: 0,
  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        const updatedItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
        return {
          items: updatedItems,
          total: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      }
      const newItems = [...state.items, { ...item, quantity: 1 }];
      return {
        items: newItems,
        total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    });
  },
  removeItem: (id) => {
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      return {
        items: newItems,
        total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    });
  },
  updateQuantity: (id, quantity) => {
    set((state) => {
      if (quantity < 1) {
        const newItems = state.items.filter((i) => i.id !== id);
        return {
          items: newItems,
          total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        };
      }
      const newItems = state.items.map((i) =>
        i.id === id ? { ...i, quantity } : i
      );
      return {
        items: newItems,
        total: newItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      };
    });
  },
  clearCart: () => set({ items: [], total: 0 }),
})); 