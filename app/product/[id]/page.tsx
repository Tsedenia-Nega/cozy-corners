"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Oak");
  const [isFav, setIsFav] = useState(false);

  const colors = [
    { name: "Oak", hex: "#e5d5c0" },
    { name: "Walnut", hex: "#5d4037" },
    { name: "Black", hex: "#1a1a1a" },
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-stone-950 pt-28 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT: IMAGE SECTION */}
        <div className="space-y-4">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-100 dark:bg-stone-900 rounded-sm">
            <Image
              src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80"
              alt="Product Image"
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Thumbnail row could go here */}
        </div>

        {/* RIGHT: DETAILS SECTION */}
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-[#A67C52] text-[10px] tracking-[0.3em] uppercase font-bold mb-2">
              Handcrafted Collection
            </p>
            <h1 className="text-4xl font-serif text-stone-900 dark:text-stone-100 mb-4 italic">
              Scandi Lounge Chair
            </h1>
            <p className="text-2xl text-stone-600 dark:text-stone-400">
              $450.00
            </p>
          </div>

          <p className="text-stone-500 dark:text-stone-400 leading-relaxed mb-8">
            Designed for comfort and built for longevity. This chair features
            solid wood construction with a minimalist silhouette that fits
            perfectly in any modern living space. The ergonomic design ensures
            hours of relaxation.
          </p>

          {/* COLOR SELECTOR */}
          <div className="mb-8">
            <span className="text-[10px] uppercase tracking-widest font-bold text-stone-400 block mb-4">
              Finish: {selectedColor}
            </span>
            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.name
                      ? "border-[#A67C52] scale-110"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* QUANTITY & ACTIONS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center border border-stone-200 dark:border-stone-800 px-4 py-3 bg-stone-50 dark:bg-stone-900">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-1 hover:text-[#A67C52]"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center font-bold text-sm">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:text-[#A67C52]"
              >
                <Plus size={16} />
              </button>
            </div>

            <button className="flex-1 bg-stone-900 dark:bg-[#A67C52] text-white py-4 px-8 uppercase text-[10px] font-bold tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-[#8e6a45] transition-all">
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <button
              onClick={() => setIsFav(!isFav)}
              className="p-4 border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 transition-all"
            >
              <Heart
                size={20}
                className={
                  isFav ? "fill-red-500 text-red-500" : "text-stone-400"
                }
              />
            </button>
          </div>

          {/* TRUST BADGES */}
          <div className="grid grid-cols-2 gap-4 pt-8 border-t border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-stone-500">
              <Truck size={18} className="text-[#A67C52]" /> Fast Delivery
            </div>
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest font-bold text-stone-500">
              <ShieldCheck size={18} className="text-[#A67C52]" /> 2 Year
              Warranty
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
