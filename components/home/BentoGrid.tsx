"use client";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Living Room",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80",
    gridClass: "md:col-span-2 md:row-span-2",
    href: "/category/living-room",
  },
  {
    title: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&q=80",
    gridClass: "md:col-span-2 md:row-span-1",
    href: "/category/bedroom",
  },
  {
    title: "Office",
    image:
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80",
    gridClass: "md:col-span-1 md:row-span-1",
    href: "/category/office",
  },
  {
    title: "Decor",
    image:
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f505?auto=format&fit=crop&q=80",
    gridClass: "md:col-span-1 md:row-span-1",
    href: "/category/decor",
  },
];

export default function BentoGrid() {
  return (
    /* We use #f5f5f4 for the stone-50 gray and ignore dark mode here to keep it light */
    <div className="bg-[#f5f5f4] w-full py-10 px-6">
      <div className="max-w-[1400px] w-full">
        <div className="mb-12 text-center">
          <p className="text-[#A67C52] text-[10px] tracking-[0.5em] uppercase mb-2 font-bold">
            Curated Spaces
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1c1917]">
            Browse Collections
          </h2>
        </div>

        {/* This grid forces the layout you liked */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[700px]">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.title}
              /* White Card Frame */
              className={`group relative bg-white  shadow-sm border border-stone-200 transition-all duration-700 hover:shadow-xl ${cat.gridClass}`}
            >
              <div className="relative w-full h-full overflow-hidden bg-stone-100">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />

                {/* Overlay and Center Button */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                  <Link
                    href={cat.href}
                    className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 bg-white text-stone-900 px-6 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#A67C52] hover:text-white"
                  >
                    View All
                  </Link>
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
                  <h3 className="text-2xl font-serif tracking-tight">
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
