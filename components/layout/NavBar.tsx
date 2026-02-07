"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation"; // ADD THIS
import { Moon, Sun, ShoppingBag, Menu, X, User } from "lucide-react";
import { useCart } from "@/store/useCart";

export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname(); // Get current route
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const cart = useCart((state) => state.cart);
  const [cartCount, setCartCount] = useState(0);

  // 1. Is this the homepage?
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cart]);

  // 2. Logic: If NOT on homepage, OR if scrolled, use Dark/Light theme colors.
  // Otherwise (Top of Homepage), use White.
  const isTransparent = isHomePage && !scrolled;

  const iconColor = isTransparent
    ? "text-white"
    : "text-stone-900 dark:text-stone-100";

  const navBg = isTransparent
    ? "bg-transparent border-b border-transparent py-7"
    : "bg-white/90 dark:bg-stone-950/80 backdrop-blur-md border-b border-stone-200 dark:border-white/5 py-3";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-serif tracking-tighter transition-colors duration-300 ${iconColor}`}
        >
          COZY<span className="italic text-[#A67C52]">CORNERS</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {["Home", "Collections", "New Arrivals", "About", "Contact"].map(
            (item) => (
              <Link
                key={item}
                href={
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(" ", "-")}`
                }
                className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#A67C52] ${iconColor}`}
              >
                {item}
              </Link>
            ),
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 md:space-x-5">
          <Link
            href="/login"
            className={`p-2 transition-colors duration-300 ${iconColor} hover:text-[#A67C52]`}
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`p-2 transition-colors ${iconColor} hover:text-[#A67C52]`}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}

          <Link
            href="/cart"
            className={`relative p-2 transition-colors duration-300 ${iconColor} hover:text-[#A67C52]`}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#A67C52] text-[8px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className={`md:hidden p-2 transition-colors ${iconColor}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {/* ... keep mobile menu as is ... */}
      {/* MOBILE MENU DRAWER */}
      {/* MOBILE MENU DRAWER */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800 transition-all duration-300 ease-in-out origin-top ${
          isOpen
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          {/* Secondary Actions Row */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-50 dark:border-stone-800">
            <Link
              href="/login"
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-[#A67C52]"
              onClick={() => setIsOpen(false)}
            >
              Account
            </Link>
            <span className="text-stone-300">|</span>
            <Link
              href="/cart"
              className="text-[10px] tracking-[0.2em] uppercase font-bold text-stone-500 dark:text-stone-400"
              onClick={() => setIsOpen(false)}
            >
              Shopping Bag ({cartCount})
            </Link>
          </div>

          {/* Main Links */}
          <div className="flex flex-col space-y-5">
            {["Collections", "New Arrivals", "About", "Contact"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-xs tracking-[0.3em] uppercase text-stone-800 dark:text-stone-200 hover:text-[#A67C52] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
