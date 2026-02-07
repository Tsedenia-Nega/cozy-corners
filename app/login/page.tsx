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
    <main className="min-h-screen w-full bg-white dark:bg-stone-950">
      <div className="flex min-h-screen w-full">
        {/* LEFT IMAGE — Desktop Only */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVybml0dXJlfGVufDB8fDB8fHww"
              alt="Luxury Interior"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-[1px]" />

          {/* Text */}
          <div className="absolute bottom-12 left-12 z-10 text-white max-w-md">
            <h2 className="text-4xl font-serif mb-2 italic">
              Crafting Comfort.
            </h2>
            <p className="text-stone-200 text-xs tracking-widest uppercase">
              Cozy Corners Inner Circle
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Navbar Offset — Responsive */}
          <div className="h-16 lg:h-20 flex-shrink-0" />

          {/* FORM AREA */}
          <div className="flex-1 flex flex-col items-center justify-start lg:justify-center px-6 py-10 lg:py-0 overflow-y-auto">
            <div className="w-full max-w-[360px]">
              {/* Header */}
              <div className="text-center mb-8">
                <Link
                  href="/"
                  className="text-2xl font-serif tracking-tighter text-stone-900 dark:text-white mb-2 inline-block"
                >
                  COZY<span className="italic text-[#A67C52]">CORNERS</span>
                </Link>

                <h1 className="text-lg font-serif text-stone-800 dark:text-stone-100 italic opacity-80">
                  {isLogin ? "Welcome Back" : "Create Account"}
                </h1>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 text-sm focus:outline-none focus:border-[#A67C52] text-stone-900 dark:text-white"
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
                    placeholder="Email Address"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 text-sm focus:outline-none focus:border-[#A67C52] text-stone-900 dark:text-white"
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
                    placeholder="Password"
                    className="w-full bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 py-3 pl-10 text-sm focus:outline-none focus:border-[#A67C52] text-stone-900 dark:text-white"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 dark:bg-[#A67C52] text-white py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                >
                  {isLogin ? "Sign In" : "Register"} <ArrowRight size={14} />
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6">
                <button className="w-full border border-stone-200 dark:border-stone-800 py-3 flex items-center justify-center gap-3 text-xs font-medium text-stone-900 dark:text-stone-100">
                  <Github size={16} /> Google Account
                </button>

                <p className="text-center text-xs text-stone-500 mt-6">
                  {isLogin ? "New here?" : "Joined already?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-[#A67C52] font-bold"
                  >
                    {isLogin ? "Sign Up" : "Log In"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
