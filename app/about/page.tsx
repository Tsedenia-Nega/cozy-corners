import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Cozy Corners",
  description:
    "Learn more about our design studio and get in touch with our team.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-500 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
            About Us
          </h1>
          <p className="text-stone-500 dark:text-stone-400 uppercase tracking-widest text-[10px] font-bold">
            Let us help you create your dream space
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Side: Contact Information */}
          <section className="space-y-12">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-stone-400">
                Our Studio
              </h3>
              <div className="space-y-6 text-stone-600 dark:text-stone-300">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-[#A67C52] shrink-0 mt-1" />
                  <p className="text-sm leading-relaxed">
                    123 Design District, Suite 400
                    <br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-[#A67C52] shrink-0" />
                  <p className="text-sm">+251 911 00 00 00</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-[#A67C52] shrink-0" />
                  <p className="text-sm">hello@cozycorners.com</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-stone-400">
                Business Hours
              </h3>
              <div className="flex items-start gap-4 text-stone-600 dark:text-stone-300">
                <Clock size={20} className="text-[#A67C52] shrink-0 mt-1" />
                <ul className="space-y-2 text-sm">
                  <li>Monday – Friday: 09:00 — 18:00</li>
                  <li>Saturday: 10:00 — 16:00</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right Side: Compact Contact Form */}
          <section className="bg-stone-50 dark:bg-stone-900/50 p-8 md:p-10 rounded-sm border border-stone-100 dark:border-white/5">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-[10px] uppercase font-bold tracking-widest text-stone-400"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Jane Doe"
                    className="bg-transparent border-b border-stone-300 dark:border-stone-700 py-2 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#A67C52] transition-colors text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] uppercase font-bold tracking-widest text-stone-400"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    className="bg-transparent border-b border-stone-300 dark:border-stone-700 py-2 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#A67C52] transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-[10px] uppercase font-bold tracking-widest text-stone-400"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Inquiry about 'The Velvet Sofa'"
                  className="bg-transparent border-b border-stone-300 dark:border-stone-700 py-2 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#A67C52] transition-colors text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-[10px] uppercase font-bold tracking-widest text-stone-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell us about your project..."
                  className="bg-transparent border-b border-stone-300 dark:border-stone-700 py-2 focus:outline-none focus:border-[#A67C52] dark:focus:border-[#A67C52] transition-colors text-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 px-12 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#A67C52] dark:hover:bg-[#A67C52] hover:text-white transition-all duration-300 w-full md:w-auto"
                >
                  Send Message
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
