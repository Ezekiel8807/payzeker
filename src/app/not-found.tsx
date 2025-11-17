"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0.2, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-[150px] md:text-[200px] font-extrabold text-[#29cd9c]"
      >
        404
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="-mt-5 text-xl font-semibold text-gray-800"
      >
        Oops! Page Not Found
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-2 text-gray-500 max-w-md"
      >
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </motion.p>

      <Link
        href="/"
        className="mt-8 inline-block bg-[#29cd9c] text-white px-6 py-3 rounded-xl font-medium hover:bg-[#20b389] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
