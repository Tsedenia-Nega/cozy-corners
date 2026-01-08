const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Harlow Oak Chair",
    price: "$450",
    category: "Dining",
    img: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
  },
  {
    id: 2,
    name: "Velvet Cloud Sofa",
    price: "$1,200",
    category: "Living",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
  },
  {
    id: 3,
    name: "Minimalist Bed Frame",
    price: "$890",
    category: "Bedroom",
    img: "https://images.unsplash.com/photo-1505693419148-4030a90441c9",
  },
  {
    id: 4,
    name: "Stone Coffee Table",
    price: "$320",
    category: "Living",
    img: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc",
  },
];

export default function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {MOCK_PRODUCTS.map((product) => (
        <div key={product.id} className="group cursor-pointer">
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-lg">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-stone-900/90 py-2 px-6 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
              Quick Add
            </button>
          </div>

          {/* Details */}
          <div className="mt-4 space-y-1">
            <p className="text-xs uppercase tracking-widest text-stone-500">
              {product.category}
            </p>
            <h3 className="text-lg font-medium text-stone-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-[#A67C52] font-semibold">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
