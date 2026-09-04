import React from "react";
import { motion } from "framer-motion";

export default function Spinner({ spinning }: { spinning: boolean }) {
  return (
    <motion.div
      className="w-20 h-20 rounded-full border-8 border-[var(--green)] border-t-transparent"
      animate={{ rotate: spinning ? 360 : 0 }}
      transition={{ repeat: spinning ? Infinity : 0, ease: "linear", duration: 1 }}
    />
  );
}
