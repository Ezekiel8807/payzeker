"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  // Floating particles animation variants
  const floatingVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, 15, 0],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 3 + i * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2,
      },
    }),
  };

  return (
    <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 flex flex-col-reverse md:flex-row items-center overflow-hidden relative">
      {/* Text Section */}
      <motion.div
        className="lg:w-1/2 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="font-black text-[30px] md:text-[45px] mt-10 sm:mt-0 text-center lg:text-start bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Earn on Payzeker by performing simple tasks.
        </motion.h1>

        <motion.p
          className="font-extralight text-sm my-3 text-center md:text-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Earn some naira daily by performing simple social media tasks such as
          posting, liking, commenting, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/dashboard"
            className="w-full sm:max-w-[700px] lg:w-[200px] block text-center font-bold bg-[var(--green)] p-3 my-5 text-white rounded-full hover:bg-[var(--green-dark)] transition-all duration-300 hover:shadow-xl shadow-[var(--green)]/50"
          >
            Start earning now!!!
          </Link>
        </motion.div>

        {/* Green blur background shape */}
        <motion.div
          className="w-[150px] h-[150px] absolute right-0 bottom-0 md:left-0 md:top-0 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="relative sm:hidden lg:block m-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="w-[80%] h-[80%] md:w-[500px] md:h-[500px] m-auto">
          <Image
            src="/img/e.svg"
            width={500}
            height={500}
            priority
            style={{ width: "auto", height: "auto" }}
            className="w-full"
            alt="hero image"
          />
        </div>

        {/* Green blur background shape */}
        <div className="w-[150px] h-[150px] absolute top-0 left-0 md:bottom-0 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]" />
      </motion.div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-3 h-3 bg-[var(--green)] rounded-full opacity-40"
        custom={0}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-40 right-20 w-2 h-2 bg-[var(--green)] rounded-full opacity-30"
        custom={1}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-4 h-4 bg-[var(--green)] rounded-full opacity-20"
        custom={2}
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-2 h-2 bg-[var(--green)] rounded-full opacity-25"
        custom={3}
        variants={floatingVariants}
        animate="animate"
      />
    </div>
  );
}
