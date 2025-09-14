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
    <footer className="w-full bg-[var(--green)] text-white px-6 sm:px-12 md:px-20 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <Image
            src="/img/logo_white1.png"
            width={300}
            height={300}
            alt="payzeker-logo-alt-white"
            className="mb-4"
          />
          <p className="text-sm text-gray-100">
            © {year ?? "...."} Payzeker. All Rights Reserved.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start gap-2 text-sm">
          <h3 className="font-semibold text-white mb-1 text-lg">Quick Links</h3>
          <ul className="pl-5 list-disc">
            <li>
              <Link href="/policy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Handles */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h3 className="font-semibold text-white mb-1 text-lg">Follow Us</h3>
          <div className="flex flex-row gap-3">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://web.facebook.com/profile.php?id=61575039205827"
            >
              <Image src="/icons/f.png" width={28} height={28} alt="Facebook" />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://x.com/payzeker"
            >
              <Image src="/icons/x.png" width={28} height={28} alt="X" />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/payzeker/"
            >
              <Image
                src="/icons/i.png"
                width={28}
                height={28}
                alt="Instagram"
              />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://wa.link/q91k54"
            >
              <Image src="/icons/w.png" width={28} height={28} alt="WhatsApp" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
