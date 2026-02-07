import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface WishlistStore {
  wishlist: any[];
  toggleWishlist: (product: any) => void;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (product) =>
        set((state) => {
          const isFav = state.wishlist.some((item) => item.id === product.id);
          if (isFav) {
            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }
          return {
            wishlist: [...state.wishlist, product],
          };
        }),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    },
  ),
);
