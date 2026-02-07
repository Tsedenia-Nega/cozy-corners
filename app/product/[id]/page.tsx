"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import api from "@/lib/api";
import { useCart } from "@/store/useCart";
import { useWishlist } from "@/store/useWishlist";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Zustand Stores
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  // Hydration state (prevents Next.js errors when reading localStorage)
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        setProduct(data.data || data);
      } catch (err: any) {
        console.error("Fetch Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    setIsLoaded(true);
  }, [id]);

  // Logic: Sync Favorite status
  const isFav = wishlist.some((item: any) => item.id === product?.id);

  // Logic: Prevent quantity exceeding stock
  const handleIncrease = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    // You could trigger a toast notification here
    alert(`${product.name} added to cart!`);
  };

  if (loading || !isLoaded)
    return (
      <div className="min-h-screen flex items-center justify-center font-serif italic text-stone-400 animate-pulse">
        Refining the details...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-stone-500 gap-4">
        <p>Product not found.</p>
        <Link href="/" className="underline text-amber-700">
          Return Home
        </Link>
      </div>
    );

  return (
    <main className="min-h-screen bg-white dark:bg-stone-950 pt-20 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-stone-400 hover:text-stone-800 mb-8 transition-colors text-xs uppercase tracking-widest font-bold"
        >
          <ChevronLeft size={16} /> Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: IMAGE COLUMN */}
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-square lg:aspect-[4/5] max-h-[75vh] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 rounded-2xl shadow-inner">
              <Image
                src={product.image || "https://via.placeholder.com/600x800"}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* RIGHT: DETAILS COLUMN */}
          <div className="flex flex-col pt-4 lg:pt-0">
            <div className="mb-8 border-b border-stone-100 dark:border-stone-800 pb-8">
              <p className="text-[#A67C52] text-[10px] tracking-[0.4em] uppercase font-black mb-3">
                {product.category} &mdash; Boutique
              </p>
              <h1 className="text-4xl md:text-5xl font-serif text-stone-900 dark:text-stone-100 mb-4 italic leading-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-light text-stone-800 dark:text-stone-300">
                ${Number(product.price).toLocaleString()}
              </p>
            </div>

            {/* DESCRIPTION SECTION */}
            <div className="mb-10">
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-400 mb-3">
                The Narrative
              </h4>
              <p className="text-stone-500 dark:text-stone-400 leading-relaxed font-serif text-lg italic">
                "
                {product.description ||
                  "A masterfully crafted piece designed to bring warmth and elegance to your sanctuary."}
                "
              </p>
            </div>

            {/* QUANTITY & ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-stone-200 dark:border-stone-800 px-5 py-3 bg-stone-50 dark:bg-stone-900 rounded-xl">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 hover:text-[#A67C52] transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-14 text-center font-bold text-lg text-stone-800 dark:text-stone-100">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className={`p-1 transition-colors ${quantity >= product.stock ? "text-stone-300 cursor-not-allowed" : "hover:text-[#A67C52]"}`}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 bg-stone-900 dark:bg-[#A67C52] text-white py-5 px-8 uppercase text-[11px] font-bold tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-all disabled:bg-stone-200 disabled:text-stone-400 rounded-xl shadow-lg active:scale-95"
              >
                <ShoppingBag size={20} />
                {product.stock > 0 ? "Add to Cart" : "Currently Unavailable"}
              </button>

              <button
                onClick={() => toggleWishlist(product)}
                className="p-5 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 rounded-xl transition-all group active:scale-90"
              >
                <Heart
                  size={24}
                  className={`transition-colors ${isFav ? "fill-red-500 text-red-500" : "text-stone-300 group-hover:text-stone-600"}`}
                />
              </button>
            </div>

            {/* TRUST BADGES / STATUS */}
            <div className="space-y-4 pt-8 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center justify-between">
                <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest flex items-center gap-3">
                  <Truck size={16} className="text-[#A67C52]" />
                  {product.stock <= 3 && product.stock > 0 ? (
                    <span className="text-red-600 animate-pulse">
                      Limited Edition: Only {product.stock} left
                    </span>
                  ) : (
                    <span>Ready for immediate shipment</span>
                  )}
                </div>
                <div className="text-[10px] text-stone-500 font-bold uppercase tracking-widest flex items-center gap-3">
                  <ShieldCheck size={16} className="text-[#A67C52]" /> 2-Year
                  Warranty
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
