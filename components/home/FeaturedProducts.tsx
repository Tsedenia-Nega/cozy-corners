"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import api from "@/lib/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/products");
        const featuredItems = data.data || data;

        // Slicing to 3 or 6 to keep the rows even
        setProducts(featuredItems.slice(0, 3));
      } catch (error) {
        console.error("Error loading featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 italic text-stone-400">
        Loading curation...
      </div>
    );

  return (
    /* CHANGE: grid-cols-1 (mobile), sm:grid-cols-2 (tablet), lg:grid-cols-3 (desktop) */
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product: any) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="group block"
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 mb-2">
              {product.category}
            </p>
            <h3 className="text-xl font-serif italic text-stone-900 dark:text-white mb-2">
              {product.name}
            </h3>
            <p className="text-[#A67C52] font-light tracking-widest">
              ${Number(product.price).toLocaleString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
