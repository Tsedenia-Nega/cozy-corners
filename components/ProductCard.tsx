"use client";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 rounded-sm mb-4">
        <Image
          src={product.image || "https://via.placeholder.com/400x500"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.stock < 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-white/90 px-2 py-1 text-[8px] uppercase tracking-tighter font-bold text-orange-600">
            Low Stock
          </div>
        )}
      </div>

      <div className="space-y-1 text-center">
        <h3 className="text-sm font-serif italic text-stone-800 dark:text-stone-200 group-hover:text-[#A67C52] transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em]">
          {product.category}
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          ${Number(product.price).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
