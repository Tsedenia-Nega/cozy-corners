import Hero from "@/components/home/Hero";
import BentoGrid from "@/components/home/BentoGrid";
import FeaturedProducts from "@/components/home/FeaturedProducts";

export default function Home(){
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="py-12 bg-white dark:bg-stone-900/50">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <TrustItem title="Solid Wood" desc="Sustainably Sourced" />
          <TrustItem title="Handcrafted" desc="By Local Artisans" />
          <TrustItem title="Fast Delivery" desc="Within 10-14 Days" />
          <TrustItem title="30-Day Trial" desc="Love it or Return it" />
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
function TrustItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <h4 className="font-semibold text-stone-800 dark:text-stone-200">
        {title}
      </h4>
      <p className="text-sm text-stone-500">{desc}</p>
    </div>
  );
}