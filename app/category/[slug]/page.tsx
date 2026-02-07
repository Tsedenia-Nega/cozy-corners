"use client";
import { useState, useEffect } from "react";
import { Sofa, Bed, Briefcase, Utensils, Lamp } from "lucide-react";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";

const CATEGORY_ICONS = [
  { id: "Living", label: "Living", icon: <Sofa size={22} /> },
  { id: "Bedroom", label: "Bedroom", icon: <Bed size={22} /> },
  { id: "Office", label: "Office", icon: <Briefcase size={22} /> },
  { id: "Dining", label: "Dining", icon: <Utensils size={22} /> },
  { id: "Decor", label: "Decor", icon: <Lamp size={22} /> },
];

export default function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState("Living");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("api/products");
        const allProducts = Array.isArray(data) ? data : data.data || [];

        // Filter: Match the product's category field to our activeTab ID
        // Note: Includes "Living Room" if the tab is "Living"
        const filtered = allProducts.filter((p: any) =>
          p.category.toLowerCase().includes(activeTab.toLowerCase()),
        );

        setProducts(filtered);
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]); // Re-run whenever the tab changes

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* TAB NAVIGATION */}
        <div className="flex justify-center gap-4 md:gap-12 mb-16 overflow-x-auto pb-4 scrollbar-hide">
          {CATEGORY_ICONS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex flex-col items-center gap-4 min-w-[80px] transition-all duration-300 ${
                activeTab === cat.id
                  ? "text-stone-900 scale-110"
                  : "text-stone-400 hover:text-stone-600"
              }`}
            >
              <div
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-stone-900 text-white shadow-xl shadow-stone-200"
                    : "bg-stone-50"
                }`}
              >
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
                {cat.label}
              </span>

              {/* Active Indicator Line */}
              <div
                className={`h-1 w-1 rounded-full bg-amber-600 transition-all duration-300 ${
                  activeTab === cat.id ? "opacity-100" : "opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[400px] bg-stone-50 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-stone-100 rounded-3xl">
            <p className="text-stone-400 font-serif italic text-lg">
              Our {activeTab} collection is currently being curated.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
