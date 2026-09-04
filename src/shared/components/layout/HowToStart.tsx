"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function HowToStart() {
  const steps = [
    { title: "Sign Up", desc: "Sign up, complete your profile, and start exploring in minutes", icon: "mdi:account-plus" },
    { title: "Browse Tasks", desc: "Explore tasks or post your own job if you're a business", icon: "mdi:clipboard-text-search" },
    { title: "Complete Tasks", desc: "Work at your own pace and earn as you go", icon: "mdi:check-decagram" },
    { title: "Withdraw & Earn", desc: "Easily withdraw your earnings on designated days", icon: "mdi:cash-multiple" },
  ];

  return (
    <div id="how-to-start" className="overflow-x-hidden page-container py-10 bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa]">
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 md:gap-14 max-w-7xl mx-auto">
        <motion.div className="w-full md:w-1/2 text-center sm:text-left" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
            Welcome to <span className="text-[#29cd9c]">Payzeker</span>,<br />Earn by Performing Online Tasks!
          </h1>
          <p className="text-[14px] md:text-[16px] mt-4 text-gray-700 text-justify sm:text-left">
            Joining Payzeker is fast and simple. Start by creating a free account—it only takes a few minutes.
          </p>
        </motion.div>
        <motion.div className="w-full md:w-1/2 flex justify-center overflow-hidden" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true, amount: 0.3 }}>
          <Image src="/img/b.svg" width={500} height={500} alt="how_to_start image" className="m-auto max-w-full h-auto rounded-md" priority />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-14 gap-6">
        {steps.map((step, index) => (
          <motion.div key={index} className="w-full p-5 bg-white border-b-4 border-[#29cd9c] shadow-md rounded-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true, amount: 0.3 }}>
            <div className="p-5 mx-auto my-5 w-[90px] h-[90px] flex items-center justify-center bg-[#29cd9c] shadow-lg rounded-lg">
              <Icon icon={step.icon} className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-black text-lg text-center mb-2">{step.title}</h4>
            <p className="text-gray-600 text-center text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
