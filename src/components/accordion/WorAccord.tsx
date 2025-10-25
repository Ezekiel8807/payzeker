"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const faqs = [
  {
    question: "How do I earn money on Payzeker?",
    answer:
      "You earn by completing simple online tasks like following social media pages, commenting on posts, or sharing content. Each task has a fixed payout.",
  },
  {
    question: "What types of tasks will I perform?",
    answer:
      "Tasks may include: - Liking social media posts - Subscribing to YouTube channels - Downloading apps - Sharing or commenting on content.",
  },
  {
    question: "When do I get paid?",
    answer:
      "Payments are processed after tasks are reviewed and approved. You can withdraw once you reach the minimum withdrawal threshold.",
  },
  {
    question: "What’s the minimum withdrawal amount?",
    answer:
      "The minimum withdrawal amount is typically ₦500 or ₦1000, depending on your plan. This may vary, so check the wallet page for details.",
  },
  {
    question: "Can I do multiple tasks per day?",
    answer:
      "Yes, you can. However, the number of available tasks may depend on your membership plan and rank.",
  },
  {
    question: "Why was my task rejected?",
    answer:
      "Tasks can be rejected if: - You didn't follow the instructions - You submitted invalid or incomplete proof. Always read instructions carefully before submitting.",
  },
];

export default function WorAccord() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 md:px-0">
      <h2 className="text-center text-3xl font-extrabold mb-8 text-[#29cd9c]">
        💼 Worker FAQs
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-[#29cd9c]/30 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <button
              className="flex justify-between items-center w-full px-5 py-4 text-left font-semibold text-gray-800 bg-[#bcdfd5] hover:bg-[#29cd9c] hover:text-white transition-colors duration-300"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              <span className="text-sm md:text-base">{faq.question}</span>
              {openIndex === index ? (
                <Icon icon="mdi:chevron-up" className="w-6 h-6" />
              ) : (
                <Icon icon="mdi:chevron-down" className="w-6 h-6" />
              )}
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-gray-600 text-sm md:text-base leading-relaxed bg-white">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
