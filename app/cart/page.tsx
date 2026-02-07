"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/store/useCart";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const [isLoaded, setIsLoaded] = useState(false);

  // Wait for hydration to prevent mismatch errors
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 500 ? 0 : 50; // Free shipping over $500

  if (!isLoaded) return null;

  return (
    <main className="min-h-screen bg-stone-50 dark:bg-stone-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 border-b border-stone-200 dark:border-stone-800 pb-8 flex justify-between items-end">
          <div className="w-full flex flex-col items-center text-center">
            <p className="text-[#A67C52] text-[10px] tracking-[0.4em] uppercase font-black mb-2">
              Review Your Pieces
            </p>
            <h1 className="text-4xl font-serif text-stone-900 dark:text-stone-100">
              Shopping Bag
            </h1>
          </div>
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="text-[10px] uppercase tracking-widest text-stone-400 hover:text-red-500 transition-colors"
            >
              Clear All
            </button>
          )}
        </header>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-stone-900 rounded-2xl border border-dashed border-stone-200 dark:border-stone-800">
            <ShoppingBag className="mx-auto text-stone-200 mb-6" size={48} />
            <p className="text-stone-500 font-serif italic text-xl mb-8">
              Your sanctuary is currently empty.
            </p>
            <Link
              href="/"
              className="bg-stone-900 text-white px-8 py-4 uppercase text-[10px] font-bold tracking-widest hover:bg-[#A67C52] transition-colors"
            >
              Continue Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* PRODUCT LIST */}
            <div className="lg:col-span-8 space-y-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-6 pb-8 border-b border-stone-100 dark:border-stone-900 group"
                >
                  <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-800 rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-serif text-stone-800 dark:text-stone-200">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                      <p className="text-stone-400 text-xs uppercase tracking-widest mt-1">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-md">
                        <button
                          onClick={() => addToCart(item, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 flex items-center justify-center disabled:opacity-30"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            item.quantity < item.stock && addToCart(item, 1)
                          }
                          className="w-8 h-8 flex items-center justify-center"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY PANEL */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-800">
                <h2 className="text-lg font-serif mb-6">Order Summary</h2>

                <div className="space-y-4 text-sm mb-8">
                  <div className="flex justify-between text-stone-500">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-stone-500">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Complimentary" : `$${shipping}`}
                    </span>
                  </div>
                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(subtotal + shipping).toLocaleString()}</span>
                  </div>
                </div>

                <button className="w-full bg-stone-900 dark:bg-[#A67C52] text-white py-5 px-8 uppercase text-[10px] font-bold tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-black transition-all rounded-xl shadow-lg mb-4 group">
                  Proceed to Checkout
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                <p className="text-[9px] text-stone-400 text-center uppercase tracking-widest leading-relaxed">
                  Tax calculated at checkout <br />
                  Free shipping on orders over $500
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
