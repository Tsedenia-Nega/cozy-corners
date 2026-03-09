import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="bg-white min-h-screen text-stone-900">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Header Section */}
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif mb-4 italic">
            Get in Touch
          </h1>
          <p className="text-stone-500 uppercase tracking-widest text-xs">
            Let us help you create your dream space
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Side: Contact Information */}
          <section className="space-y-12">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">
                Our Studio
              </h3>
              <div className="space-y-6 text-stone-600">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-stone-400 mt-1" />
                  <p>
                    123 Design District, Suite 400
                    <br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-stone-400" />
                  <p>+251 911 00 00 00</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-stone-400" />
                  <p>hello@cozycorners.com</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-6">
                Business Hours
              </h3>
              <div className="flex items-start gap-4 text-stone-600">
                <Clock size={20} className="text-stone-400 mt-1" />
                <ul className="space-y-2">
                  <li>Monday – Friday: 09:00 — 18:00</li>
                  <li>Saturday: 10:00 — 16:00</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right Side: Compact Contact Form */}
          <section className="bg-stone-50 p-8 md:p-10 rounded-sm">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Doe"
                    className="bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@example.com"
                    className="bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Inquiry about 'The Velvet Sofa'"
                  className="bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors text-sm"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="bg-transparent border-b border-stone-300 py-2 focus:outline-none focus:border-stone-900 transition-colors text-sm resize-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="bg-white text-stone-900 border border-stone-200 px-12 py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#A67C52] hover:text-white transition-all duration-300 ease-in-out w-full md:w-auto"
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
};

export default ContactPage;
