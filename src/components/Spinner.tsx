import React from "react";
import { motion } from "framer-motion";

export default function Spinner({ spinning }: { spinning: boolean }) {
  return (
    <>
      <motion.div
        className="w-32 h-32 rounded-full border-8 border-yellow-400 border-t-transparent"
        animate={{
          rotate: spinning ? 360 : 0,
        }}
        transition={{
          repeat: spinning ? Infinity : 0,
          ease: "linear",
          duration: 1,
        }}
      />
    </>
  );
}
