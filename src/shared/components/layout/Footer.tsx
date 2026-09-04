"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => { setYear(new Date().getFullYear()); }, []);

  return (
    <footer className="w-full bg-gradient-to-br from-[var(--green)] to-[#1fa87a] text-white">
      <div className="page-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <Image src="/img/logo_white1.png" width={180} height={180} alt="Payzeker Logo" className="mb-4" />
            <p className="text-sm text-gray-100 text-center md:text-left leading-relaxed">
              Complete tasks. Get paid instantly. Join thousands earning daily on Payzeker.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[{ href: "/#how-to-start", label: "How To Start" }, { href: "/#about", label: "About" }, { href: "/#faq", label: "FAQ" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"><span className="text-xs">→</span> {l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              {[{ href: "/policy", label: "Privacy Policy" }, { href: "/terms", label: "Terms of Service" }, { href: "/contact", label: "Contact Us" }].map((l) => (
                <li key={l.href}><Link href={l.href} className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"><span className="text-xs">→</span> {l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">Connect With Us</h3>
            <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
              {[
                { href: "https://web.facebook.com/profile.php?id=61575039205827", src: "/icons/f.png", alt: "Facebook" },
                { href: "https://x.com/payzeker", src: "/icons/x.png", alt: "X" },
                { href: "https://www.instagram.com/payzeker/", src: "/icons/i.png", alt: "Instagram" },
                { href: "https://wa.link/q91k54", src: "/icons/w.png", alt: "WhatsApp" },
              ].map((s) => (
                <Link key={s.alt} target="_blank" rel="noopener noreferrer" href={s.href} aria-label={s.alt}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <Image src={s.src} width={20} height={20} alt={s.alt} />
                </Link>
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              support@payzeker.com
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="page-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-100">
            <p>© {year ?? "2024"} Payzeker. All Rights Reserved.</p>
            <p className="text-xs">Made with ❤️ in Nigeria</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
