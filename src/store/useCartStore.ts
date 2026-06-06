import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem } from '../types';

interface CartState {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (item) => {
        set((state) => {
          const existingItem = state.cartItems.find((cartItem) => cartItem.id === item.id);
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          } else {
            return { cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }] };
          }
        });
      },
      removeItem: (itemId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((cartItem) => cartItem.id !== itemId),
        }));
      },
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.id === itemId ? { ...cartItem, quantity: quantity } : cartItem
          ),
        }));
      },
      clearCart: () => set({ cartItems: [] }),
      getTotalItems: () => get().cartItems.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    }),
    {
      name: 'pokestore-cart-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);