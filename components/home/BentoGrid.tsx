"use client";
import Image from "next/image";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Living Room",
    image:
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=600&auto=format&fit=crop&q=60",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    title: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVkfGVufDB8fDB8fHww",
    span: "md:col-span-3 md:row-span-2",
  },
  {
    title: "Home Office",
    image:
      "https://images.unsplash.com/photo-1623177623442-979c1e42c255?w=600&auto=format&fit=crop&q=60",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Dining",
    image:
      "https://images.unsplash.com/photo-1758977403341-0104135995af?w=600&auto=format&fit=crop&q=60",
    span: "md:col-span-2 md:row-span-1",
  },
  {
    title: "Decor",
    image:
      "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=600&auto=format&fit=crop&q=60",
    span: "md:col-span-2 md:row-span-1",
  },
];

export default function SymmetricBento() {
  return (
    <section className="bg-stone-100 dark:bg-stone-950 w-full py-10 px-6 transition-colors duration-500">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-12 text-center">
          <p className="text-[#A67C52] text-[10px] tracking-[0.3em] uppercase mb-2 font-bold">
            The Collections
          </p>
          <h2 className="text-3xl font-serif text-stone-900 dark:text-white">
            Shop by Space
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[200px]">
          {CATEGORIES.map((cat, index) => (
            <div
              key={index}
              className={`group relative p-2 shadow-sm transition-all duration-700 hover:shadow-xl ${cat.span}`}
            >
              <div className="relative w-full h-full overflow-hidden bg-stone-200 dark:bg-stone-800 rounded-sm">
                {/* 1. Prevent "" error: Check if image exists before rendering */}
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-all duration-1000 group-hover:scale-110"
                    // 2. Load top-row images faster
                    priority={index < 2}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-stone-400 text-xs italic">
                    Image coming soon
                  </div>
                )}

                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/40 transition-all duration-500 flex items-center justify-center">
                  <Link
                    href={`/category/${cat.title.toLowerCase().replace(" ", "-")}`}
                    className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 bg-white text-stone-900 px-7 py-4 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-[#A67C52] hover:text-white shadow-xl"
                  >
                    View All
                  </Link>
                </div>

                <div className="absolute bottom-5 left-5 text-white">
                  <h3 className="text-lg md:text-xl font-serif tracking-tight drop-shadow-md">
                    {cat.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
