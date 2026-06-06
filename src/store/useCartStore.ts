import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cartItems: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.cartItems.find((ci) => ci.productId === item.productId);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((ci) =>
                ci.productId === item.productId
                  ? { ...ci, quantity: ci.quantity + item.quantity }
                  : ci
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        }),
      removeItem: (productId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.productId !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: quantity } : item
          ),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'pokestore-cart-storage', // unique name
      storage: createJSONStorage(() => localStorage), // use localStorage for persistence
    }
  )
);