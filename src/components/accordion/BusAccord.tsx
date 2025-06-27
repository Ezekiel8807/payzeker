"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How can Payzeker help my business?",
    answer:
      "Payzeker helps you grow brand awareness and engagement by assigning your digital tasks (likes, follows, reviews, etc.) to real users who complete them quickly.",
  },
  {
    question: "What kind of tasks can I post?",
    answer:
      "You can post tasks such as: - Getting followers or likes - Asking users to comment on content - Driving traffic to websites or apps - Installing mobile apps",
  },
  {
    question: "How do I fund my account?",
    answer:
      "You can fund your wallet via Paystack or other payment options available on the dashboard. The funds are used to run your campaigns.",
  },
  {
    question: "How much does it cost to post a task?",
    answer:
      "You’re charged per task based on the number of users and the task type. A breakdown will be shown before confirming any campaign",
  },
  {
    question: "How soon will my tasks be completed?",
    answer:
      "Most tasks begin receiving responses within minutes of approval, depending on the number of active workers and the reward offered.",
  },
  {
    question: "How much does it cost to post a task?",
    answer:
      "You’re charged per task based on the number of users and the task type. A breakdown will be shown before confirming any campaign",
  },
];

export default function BusAccord() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto py-4">
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
    </div>
  );
}
