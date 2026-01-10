"use client";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon,Sun,ShoppingBag,Menu,X } from "lucide-react";

export default function NavBar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);    
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
useEffect(() => {
  const handleScroll = () => {
    // If scroll is more than 50px, set scrolled to true
    setScrolled(window.scrollY > 50);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
    return (
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80  dark:bg-stone-950/60 backdrop-blur-md border-b border-stone-200 dark:border-white/5 py-2"
            : "bg-transparent border-b border-transparent py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-serif tracking-tighter transition-colors duration-300
    ${
      scrolled
        ? "text-stone-900 dark:text-stone-100" // When scrolled: Black in Light mode, White in Dark mode
        : "text-white" // When at top: Always white to pop off the hero image
    }`}
          >
            COZY<span className="italic text-[#A67C52]">CORNERS</span>
          </Link>
          <div className="hidden md:flex items-center space-x-10">
            {["Home", "Collections", "New Arrivals", "About", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(" ", "-")}`}
                  className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#A67C52] ${
                    scrolled
                      ? "text-stone-800 dark:text-stone-100" // Scrolled: Dark gray in light mode, White in dark
                      : "text-white" // Not scrolled: Always white (over hero)
                  }`}
                >
                  {item}
                </Link>
              )
            )}
          </div>
          {/* Theme Toggle & Cart */}
          <div className="flex items-center space-x-6">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hoveer:bg-white/10 rounded-full transition-colors"
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-[#A67C52]" />
                ) : (
                  <Moon
                    size={20}
                    className={`${
                      scrolled
                        ? "text-stone-900 dark:text-stone-100"
                        : "text-white"
                    }`}
                  />
                )}
              </button>
            )}
            <Link
              href="/cart"
              className={`relative transition-colors duration-300 ${
                scrolled ? "text-stone-900 dark:text-stone-100" : "text-white"
              } hover:text-[#A67C52]`}
            >
              <ShoppingBag size={20} strokeWidth={1.2} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#A67C52] text-[7px] text-white">
                0
              </span>
            </Link>
            {/* MOBILE MENU TOGGLE */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* MOBILE MENU */}
        {isOpen && (
          <div className="md:hidden bg-stone-900 border-b border-white/10 px-6 py-10 space-y-6 flex flex-col items-center">
            {["Collections", "New Arrivals", "About", "Journal"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-sm tracking-widest uppercase text-white"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>
    );

}