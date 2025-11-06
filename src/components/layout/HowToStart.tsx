"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function HowToStart() {
  const steps = [
    {
      title: "Sign Up",
      desc: "Sign up, complete your profile, and start exploring in minutes",
      icon: "mdi:account-plus",
    },
    {
      title: "Browse Tasks",
      desc: "Explore tasks or post your own job if you're a business",
      icon: "mdi:clipboard-text-search",
    },
    {
      title: "Complete Tasks",
      desc: "Work at your own pace and earn as you go",
      icon: "mdi:check-decagram",
    },
    {
      title: "Withdraw & Earn",
      desc: "Easily withdraw your earnings on designated days",
      icon: "mdi:cash-multiple",
    },
  ];

  return (
    <div
      id="how-to-start"
      className="overflow-x-hidden px-5 sm:px-10 md:px-20 py-10 bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa]"
    >
      {/* Hero Section */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 md:gap-14 max-w-7xl mx-auto">
        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 text-center sm:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
            Welcome to <span className="text-[#29cd9c]">Payzeker</span>,<br />
            Earn by Performing Online Tasks!
          </h1>
          <p className="text-[14px] md:text-[16px] mt-4 text-gray-700 text-justify sm:text-left">
            Joining Payzeker is fast and simple. Whether you&apos;re a business
            owner wanting to outsource online tasks or a freelancer ready to
            earn by completing them, you&apos;re just a few steps away. Start by
            creating a free account—it only takes a few minutes. Once
            you&apos;re in, complete your profile so we can match you with the
            right opportunities. Payzeker makes it easy to connect, collaborate,
            and grow. Let&apos;s get to work!
          </p>

          <button className="mt-6 px-6 py-3 bg-[#29cd9c] text-white rounded-lg shadow-lg font-semibold hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Image
            src="/img/b.svg"
            width={500}
            height={500}
            alt="how_to_start image"
            className="m-auto max-w-full h-auto rounded-md"
            priority
          />
        </motion.div>
      </div>

      {/* Steps Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-14 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="w-full p-5 bg-white border-b-4 border-[#29cd9c] shadow-md rounded-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="p-5 mx-auto my-5 w-[90px] h-[90px] flex items-center justify-center bg-[#29cd9c] shadow-lg rounded-lg">
              <Icon icon={step.icon} className="w-10 h-10 text-white" />
            </div>
            <h4 className="font-black text-lg text-center mb-2">
              {step.title}
            </h4>
            <p className="text-gray-600 text-center text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// "use client";

// import Image from "next/image";
// import React from "react";
// import { motion } from "framer-motion";
// import { Icon } from "@iconify/react";

// export default function HowToStart() {
//   const steps = [
//     {
//       title: "Sign Up",
//       desc: "Sign up, complete your profile, and start exploring in minutes",
//       icon: "mdi:account-plus",
//     },
//     {
//       title: "Browse Tasks",
//       desc: "Explore tasks or post your own job if you're a business",
//       icon: "mdi:clipboard-text-search",
//     },
//     {
//       title: "Complete Tasks",
//       desc: "Work at your own pace and earn as you go",
//       icon: "mdi:check-decagram",
//     },
//     {
//       title: "Withdraw & Earn",
//       desc: "Easily withdraw your earnings on designated days",
//       icon: "mdi:cash-multiple",
//     },
//   ];

//   return (
//     <div
//       id="how-to-start"
//       className="px-5 sm:px-10 md:px-20 py-10 bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa]"
//     >
//       {/* Hero Section */}
//       <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-8 md:gap-14">
//         <motion.div
//           className="w-full md:w-1/2 text-center sm:text-left"
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
//             Welcome to <span className="text-[#29cd9c]">Payzeker</span>,<br />
//             Earn by Performing Online Tasks!
//           </h1>
//           <p className="text-[14px] md:text-[16px] mt-4 text-gray-700 text-justify sm:text-left">
//             Joining Payzeker is fast and simple. Whether you&apos;re a business
//             owner wanting to outsource online tasks or a freelancer ready to
//             earn by completing them, you&apos;re just a few steps away. Start by
//             creating a free account—it only takes a few minutes. Once
//             you&apos;re in, complete your profile so we can match you with the
//             right opportunities. Payzeker makes it easy to connect, collaborate,
//             and grow. Let&apos;s get to work!
//           </p>

//           <button className="mt-6 px-6 py-3 bg-[#29cd9c] text-white rounded-lg shadow-lg font-semibold hover:scale-105 transition-all duration-300">
//             Get Started
//           </button>
//         </motion.div>

//         <motion.div
//           className="w-full md:w-1/2 flex justify-center"
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <Image
//             src="/img/b.svg"
//             width={500}
//             height={500}
//             alt="how_to_start image"
//             className="m-auto rounded-md"
//           />
//         </motion.div>
//       </div>

//       {/* Steps Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-14 gap-6">
//         {steps.map((step, index) => (
//           <motion.div
//             key={index}
//             className="w-full p-5 bg-white border-b-4 border-[#29cd9c] shadow-md rounded-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//           >
//             <div className="p-5 mx-auto my-5 w-[90px] h-[90px] flex items-center justify-center bg-[#29cd9c] shadow-lg rounded-lg">
//               <Icon icon={step.icon} className="w-10 h-10 text-white" />
//             </div>
//             <h4 className="font-black text-lg text-center mb-2">
//               {step.title}
//             </h4>
//             <p className="text-gray-600 text-center text-sm">{step.desc}</p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }
