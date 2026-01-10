"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sofa,
  Bed,
  Briefcase,
  Utensils,
  Lamp,
  Heart,
  ShoppingBag,
} from "lucide-react";

const CATEGORY_ICONS = [
  { id: "living-room", label: "Living", icon: <Sofa size={22} /> },
  { id: "bedroom", label: "Bedroom", icon: <Bed size={22} /> },
  { id: "home-office", label: "Office", icon: <Briefcase size={22} /> },
  { id: "dining", label: "Dining", icon: <Utensils size={22} /> },
  { id: "decor", label: "Decor", icon: <Lamp size={22} /> },
];

export default function CategoryPage() {
  const [activeTab, setActiveTab] = useState("living-room");

  return (
    <main className="min-h-screen bg-white dark:bg-stone-950 pt-32 pb-20 transition-colors duration-500">
      <div className="max-w-[1300px] mx-auto px-6">
        {/* TOP PERSISTENT ICON NAV */}
        <div className="flex justify-center items-center gap-6 md:gap-12 mb-20 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORY_ICONS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center gap-3 transition-all duration-300 min-w-[70px] group ${
                activeTab === cat.id
                  ? "text-[#A67C52]"
                  : "text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
              }`}
            >
              <div
                className={`p-5 rounded-full border transition-all duration-500 ${
                  activeTab === cat.id
                    ? "border-[#A67C52] bg-stone-50 dark:bg-stone-900 shadow-md scale-110"
                    : "border-stone-100 dark:border-stone-800"
                }`}
              >
                {cat.icon}
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] font-bold">
                {cat.label}
              </span>
            </button>
          ))}
        </div>

        {/* 4-COLUMN PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {/* We will map 8 items as an example */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
            <ProductCard key={id} id={id} />
          ))}
        </div>
      </div>
    </main>
  );
}

function ProductCard({ id }: { id: number }) {
  const [isFav, setIsFav] = useState(false);

  return (
    <div className="group">
      {/* Aspect Ratio 4:5 for professional furniture shots */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-900 mb-5">
        <Link href={`/product/${id}`}>
          <Image
            src="https://images.unsplash.com/photo-1613685301586-4f2b15f0ccd4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl2aW5nJTIwcm9vbSUyMHN0eWxpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Furniture Piece"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            priority={id <= 4}
          />
        </Link>

        {/* Floating Heart Button */}
        <button
          onClick={() => setIsFav(!isFav)}
          className="absolute top-4 right-4 z-10 p-2.5 bg-white/90 dark:bg-stone-800/90 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0"
        >
          <Heart
            size={16}
            className={
              isFav
                ? "fill-red-500 text-red-500"
                : "text-stone-600 dark:text-stone-300"
            }
          />
        </button>

        {/* Hover Action: Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:bg-[#A67C52] hover:text-white transition-colors">
            <ShoppingBag size={14} /> Add to Cart
          </button>
        </div>
      </div>

      {/* Text Details */}
      <div className="space-y-1 px-1">
        <h3 className="text-stone-900 dark:text-stone-100 font-serif text-base group-hover:text-[#A67C52] transition-colors cursor-pointer">
          Scandi Lounge Chair
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-stone-500 dark:text-stone-400 text-sm">$450.00</p>
          <span className="text-[10px] text-stone-400 uppercase tracking-widest font-medium italic">
            Solid Oak
          </span>
        </div>
      </div>
    </div>
  );
}
