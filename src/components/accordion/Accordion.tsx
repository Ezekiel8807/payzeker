"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Payzeker?",
    answer:
      "Payzeker connects business owners with freelancers to complete simple online tasks in exchange for instant micro-payments.",
  },
  {
    question: "How do I get started?",
    answer:
      "Create a free account, complete your profile, and start posting or completing tasks based on your role.",
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
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-3xl mx-auto py-4">
      {/* <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2> */}

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              className="flex justify-between items-center w-full px-5 py-4 text-left font-medium text-gray-800 bg-[#BCDFD5] hover:bg-[var(--green)] transition"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-4 text-gray-600">{faq.answer}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
