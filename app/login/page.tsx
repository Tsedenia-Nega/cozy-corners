"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-stone-950">
      {/* LEFT SIDE: DESIGN & IMAGE */}
      <div className="relative hidden lg:block overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616486341353-c5833446a950?auto=format&fit=crop&q=80"
          alt="Luxury Interior"
          fill
          className="object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[2px]" />

        <div className="absolute bottom-12 left-12 right-12 z-10 text-white">
          <h2 className="text-4xl font-serif mb-4 italic italic">
            Crafting Comfort, <br /> Defining Spaces.
          </h2>
          <p className="text-stone-200 text-sm tracking-widest uppercase">
            Join the Cozy Corners Inner Circle
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM */}
      <div className="flex flex-col justify-center items-center px-8 py-12">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center">
            <Link
              href="/"
              className="text-2xl font-serif tracking-tighter text-stone-900 dark:text-white mb-8 inline-block"
            >
              COZY<span className="italic text-[#A67C52]">CORNERS</span>
            </Link>
            <h1 className="text-2xl font-serif text-stone-800 dark:text-stone-100 italic">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-stone-500 dark:text-stone-400 text-xs mt-2 uppercase tracking-widest">
              {isLogin
                ? "Please enter your details"
                : "Sign up for exclusive access"}
            </p>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            {!isLogin && (
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-4 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={18}
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-4 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={18}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-4 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
              />
            </div>

            <button className="w-full bg-stone-900 dark:bg-[#A67C52] text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black dark:hover:bg-[#8e6a45] transition-all">
              {isLogin ? "Sign In" : "Register Now"} <ArrowRight size={16} />
            </button>
          </form>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-200 dark:border-stone-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase text-stone-400">
              <span className="bg-white dark:bg-stone-950 px-2 tracking-widest">
                Or continue with
              </span>
            </div>
          </div>

          <button className="w-full border border-stone-200 dark:border-stone-800 py-4 flex items-center justify-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-xs font-medium">
            <Github size={18} /> Google Account
          </button>

          <p className="text-center text-xs text-stone-500">
            {isLogin ? "Don't have an account?" : "Already a member?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-[#A67C52] font-bold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
