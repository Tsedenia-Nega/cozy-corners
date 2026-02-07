"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
  "https://images.unsplash.com/photo-1567016432779-094069958ea5",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone-900">
      {IMAGES.map((img, index) => (
        <div
          key={img}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt="Luxury Interior"
            fill
            priority={index === 0}
            className="object-cover"
            sizes="100vw"
            quality={75}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* CONTENT LAYER */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="text-white text-[10px] md:text-xs tracking-[0.8em] uppercase font-light">
            Cozy Corners &mdash; {new Date().getFullYear()}
          </p>

          {/* PRIMARY SLOGAN */}
          <h1 className="text-white text-5xl md:text-8xl font-serif tracking-tight leading-tight pt-15">
            Create Your <br />
            <span className="italic text-[#efa964]"> Comfort.</span>
          </h1>

          {/* NEW DESCRIPTION AT BOTTOM OF TEXT BLOCK */}
          <p className="mt-8 text-stone-200 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed tracking-wide drop-shadow-md">
            Elevating your daily living with artisanal pieces that merge{" "}
            <br className="hidden md:block" />
            modern aesthetics with lasting durability.
          </p>

          {/* BUTTONS */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/products"
              className="w-full sm:w-auto bg-white text-stone-900 px-12 py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#A67C52] hover:text-white transition-all duration-500 shadow-2xl"
            >
              Shop Now
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto border border-white/40 backdrop-blur-md text-white px-6 py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-500"
            >
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
