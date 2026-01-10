import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/BentoGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import { TreeDeciduous, Hammer, Truck, ShieldCheck } from "lucide-react";
export default function Home(){
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="py-16 bg-white dark:bg-stone-950 border-y border-stone-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4">
            <TrustItem
              icon={<TreeDeciduous strokeWidth={1.2} />}
              title="Solid Wood"
              desc="Sustainably Sourced"
            />
            <TrustItem
              icon={<Hammer strokeWidth={1.2} />}
              title="Handcrafted"
              desc="By Local Artisans"
            />
            <TrustItem
              icon={<Truck strokeWidth={1.2} />}
              title="Fast Delivery"
              desc="Within 10-14 Days"
            />
            <TrustItem
              icon={<ShieldCheck strokeWidth={1.2} />}
              title="30-Day Trial"
              desc="Love it or Return it"
            />
          </div>
        </div>
      </section>

      <BentoGrid />

      <section className="py-20 bg-stone-100 dark:bg-stone-800/30">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-serif">Trending Now</h2>
            <button className="text-[#A67C52] underline underline-offset-8">
              View All
            </button>
          </div>
          <FeaturedProducts />
        </div>
      </section>
    </main>
  );
}
function TrustItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="group flex flex-col items-center text-center space-y-4 px-4 lg:border-r last:border-r-0 border-stone-200 dark:border-stone-800">
      {/* Icon Container */}
      <div className="text-[#A67C52] transition-transform duration-500 group-hover:-translate-y-1">
        {icon}
      </div>

      <div className="space-y-1">
        <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-stone-900 dark:text-stone-100">
          {title}
        </h4>
        <p className="text-sm font-serif italic text-stone-500 dark:text-stone-400">
          {desc}
        </p>
      </div>
    </div>
  );
}