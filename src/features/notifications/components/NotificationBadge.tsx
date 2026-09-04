"use client";
import { motion, AnimatePresence } from "framer-motion";

interface NotificationBadgeProps {
  count: number;
  isLoading?: boolean;
}

export default function NotificationBadge({ count, isLoading = false }: NotificationBadgeProps) {
  if (count === 0 && !isLoading) return null;

  return (
    <AnimatePresence>
      {(count > 0 || isLoading) && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          ) : (
            <motion.span
              key={count}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.1 }}
            >
              {count > 99 ? "99+" : count}
            </motion.span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
