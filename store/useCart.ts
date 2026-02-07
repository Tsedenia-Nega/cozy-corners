import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: any, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (product, qty) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            // Guard: Don't exceed stock when adding more from the detail page
            const newQty = Math.min(existing.quantity + qty, product.stock);
            return {
              cart: state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: newQty } : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: qty }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "cart-storage" },
  ),
);
