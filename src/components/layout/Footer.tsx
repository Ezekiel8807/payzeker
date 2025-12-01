"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-gradient-to-br from-[var(--green)] to-[#1fa87a] text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/img/logo_white1.png"
              width={180}
              height={180}
              alt="Payzeker Logo"
              className="mb-4"
            />
            <p className="text-sm text-gray-100 text-center md:text-left leading-relaxed">
              Complete tasks. Get paid instantly. Join thousands earning daily
              on Payzeker.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/#how-to-start"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> How To Start
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> About
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/policy"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gray-200 transition-colors duration-200 flex items-center gap-2"
                >
                  <span className="text-xs">→</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-bold text-white mb-4 text-lg">
              Connect With Us
            </h3>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 mb-4 justify-center md:justify-start">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://web.facebook.com/profile.php?id=61575039205827"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Image
                  src="/icons/f.png"
                  width={20}
                  height={20}
                  alt="Facebook"
                />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://x.com/payzeker"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="X (Twitter)"
              >
                <Image src="/icons/x.png" width={20} height={20} alt="X" />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/payzeker/"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Instagram"
              >
                <Image
                  src="/icons/i.png"
                  width={20}
                  height={20}
                  alt="Instagram"
                />
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://wa.link/q91k54"
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="WhatsApp"
              >
                <Image
                  src="/icons/w.png"
                  width={20}
                  height={20}
                  alt="WhatsApp"
                />
              </Link>
            </div>

            {/* Contact Info */}
            <div className="text-sm space-y-2 text-center md:text-left">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                support@payzeker.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-100">
            <p className="text-center md:text-left">
              © {year ?? "2024"} Payzeker. All Rights Reserved.
            </p>
            <p className="text-center md:text-right text-xs">
              Made with ❤️ in Nigeria
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
