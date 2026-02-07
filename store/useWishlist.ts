import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlist = create<any>()(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (product: any) =>
        set((state: any) => {
          const isFav = state.wishlist.some(
            (item: any) => item.id === product.id,
          );
          if (isFav) {
            return {
              wishlist: state.wishlist.filter(
                (item: any) => item.id !== product.id,
              ),
            };
          }
          return { wishlist: [...state.wishlist, product] };
        }),
    }),
    { name: "wishlist-storage" },
  ),
);
