"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@iconify/react";

const faqs = [
  {
    question: "What is Payzeker?",
    answer:
      "Payzeker is a digital platform where individuals complete simple online tasks for businesses in exchange for small earnings. It connects brands with a crowd workforce to boost online engagement.",
  },
  {
    question: "Is Payzeker free to use?",
    answer:
      "Yes, signing up on Payzeker is free. However, workers may need to upgrade to a plan for full access to tasks, and businesses pay to post tasks.",
  },
  {
    question: "How do I get started?",
    answer:
      "Create a free account, complete your profile, and start posting or completing tasks based on your role.",
  },
  {
    question: "Is Payzeker available in my country?",
    answer:
      "Payzeker is primarily focused on users in Nigeria, but future updates may expand to other countries.",
  },
  {
    question: "How are freelancers paid?",
    answer:
      "Freelancers receive micro-payments instantly after a task is approved. Business owners pre-fund their wallets.",
  },
  {
    question: "Is there a cost to join?",
    answer:
      "Signing up is completely free. Business owners only pay when posting tasks.",
  },
  {
    question: "Is my information safe on Payzeker?",
    answer:
      "Yes. Payzeker prioritizes user data protection using secure encryption methods and does not sell personal information.",
  },
];

export default function GenAccord() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-8 px-4 md:px-0">
      <h2 className="text-center text-3xl font-extrabold mb-8 text-[#29cd9c]">
        💬 General Questions
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
