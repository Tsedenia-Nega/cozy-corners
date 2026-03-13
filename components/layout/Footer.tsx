"use client";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-white/5 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link
              href="/"
              className="text-2xl font-serif tracking-tighter text-stone-900 dark:text-stone-100"
            >
              COZY<span className="italic text-[#A67C52]">CORNERS</span>
            </Link>
            <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed max-w-xs">
              Elevating everyday living through curated furniture and timeless
              design pieces.
            </p>
            <div className="flex items-center space-x-5 text-stone-400">
              <Link href="#" className="hover:text-[#A67C52] transition-colors">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="hover:text-[#A67C52] transition-colors">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="hover:text-[#A67C52] transition-colors">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 mb-8">
              Collections
            </h4>
            <ul className="space-y-4">
              {["Living Room", "Bedroom", "Office", "Decor"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/collections/${item.toLowerCase()}`}
                    className="text-sm text-stone-500 hover:text-[#A67C52] dark:text-stone-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 mb-8">
              Support
            </h4>
            <ul className="space-y-4">
              {["Shipping Policy", "Returns", "Care Guide", "FAQs"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-stone-500 hover:text-[#A67C52] dark:text-stone-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900 dark:text-stone-100 mb-8">
              Visit Us
            </h4>
            <div className="space-y-4 text-sm text-stone-500 dark:text-stone-400">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-[#A67C52] shrink-0 mt-0.5" />
                <span>
                  123 Design District,
                  <br />
                  Addis Ababa, Ethiopia
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#A67C52] shrink-0" />
                <span>+251 911 000 000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#A67C52] shrink-0" />
                <span>hello@cozycorners.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-stone-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          <p>© {currentYear} COZY CORNERS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <Link
              href="#"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
