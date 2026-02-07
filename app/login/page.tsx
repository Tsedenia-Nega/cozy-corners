"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Mail, Lock, User, ArrowRight, Github } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isLogin ? "api/auth/login" : "api/auth/register";
      const { data } = await api.post(
        endpoint,
        isLogin
          ? { email: formData.email, password: formData.password }
          : formData,
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      router.push(data.user.isAdmin ? "/admin/inventory" : "/");
    } catch (err: any) {
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-stone-950 overflow-hidden">
      {/* LEFT SIDE: DESIGN & IMAGE */}
      <div className="relative hidden lg:block h-full">
        <Image
          src="https://images.unsplash.com/photo-1613252036716-e1efc9788e5b?w=800&auto=format&fit=crop&q=80"
          alt="Luxury Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-stone-900/20 backdrop-blur-[1px]" />
        <div className="absolute bottom-12 left-12 z-10 text-white max-w-md">
          <h2 className="text-4xl font-serif mb-2 italic">Crafting Comfort.</h2>
          <p className="text-stone-200 text-xs tracking-widest uppercase">
            Cozy Corners Inner Circle
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: AUTH FORM (Centering & Scroll management) */}
      <div className="flex flex-col h-full overflow-y-auto px-6 py-8 lg:px-12 items-center justify-center">
        <div className="w-full max-w-[360px] flex flex-col">
          {/* Header Section - Tightened */}
          <div className="text-center mb-6">
            <Link
              href="/"
              className="text-xl font-serif tracking-tighter text-stone-900 dark:text-white mb-2 inline-block"
            >
              COZY<span className="italic text-[#A67C52]">CORNERS</span>
            </Link>
            <h1 className="text-xl font-serif text-stone-800 dark:text-stone-100 italic">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                  size={16}
                />
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={16}
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                size={16}
              />
              <input
                type="password"
                required
                placeholder="Password"
                className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#A67C52] transition-colors"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 dark:bg-[#A67C52] text-white py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Register"}{" "}
              <ArrowRight size={14} />
            </button>
          </form>

          {/* Divider - Smaller Padding */}
          <div className="relative py-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-stone-100 dark:border-stone-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase text-stone-400">
              <span className="bg-white dark:bg-stone-950 px-2 tracking-widest">
                Or
              </span>
            </div>
          </div>

          <button className="w-full border border-stone-200 dark:border-stone-800 py-3 flex items-center justify-center gap-3 hover:bg-stone-50 dark:hover:bg-stone-900 transition-colors text-xs font-medium mb-6">
            <Github size={16} /> Google Account
          </button>

          {/* Fixed "No Scroll" Toggle */}
          <p className="text-center text-xs text-stone-500">
            {isLogin ? "New here?" : "Joined already?"}
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
