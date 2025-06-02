import Image from "next/image";
import React from "react";

import { StarsIcon } from "lucide-react";

export default function HowToStart() {
  return (
    <div
      id="how to start"
      className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 bg-[var(--gray-05)]"
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-10">
        <div className="w-full md:w-1/2">
          <h1 className="font-black text-md sm:text-2xl">
            Welcome to <span className="text-[var(--green)]">Payzeker</span>,
            <br />
            Earning by performing Online Tasks!
          </h1>

          <p className="text-[12px] md:text-[16px] text-justify">
            Joining Payzeker is fast and simple. Whether you&apos;re a business
            owner wanting to outsource online tasks or a freelancer ready to
            earn by completing them, you&apos;re just a few steps away. Start by
            creating a free account—it only takes a few minutes. Once
            you&apos;re in, complete your profile so we can match you with the
            right opportunities. Payzeker makes it easy to connect, collaborate,
            and grow. Let&apos;s get to work!
          </p>
        </div>
        <div className="w-full md:w-1/2 m-auto">
          <Image
            src="/img/b.svg"
            width={500}
            height={500}
            alt="how_to_start image"
            className="m-auto rounded-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-10 items-center justify-between gap-5">
        <div className="w-full p-3 bg-white border-b-2 border-[var(--green)] shadow-md rounded-lg">
          <div className="p-5 mx-auto my-5 w-[100px] h-[100px] bg-[var(--green)] shadow-lg rounded-lg">
            <StarsIcon className="w-full h-full text-white" />
          </div>
          <h4 className="font-black">Sign up</h4>
          <p>Sign up, complete your profile, and start exploring in minutes</p>
        </div>
        <div className="w-full p-3 bg-white border-b-2 border-[var(--green)] shadow-md rounded-lg">
          <div className="p-5 mx-auto my-5 w-[100px] h-[100px] bg-[var(--green)] shadow-lg rounded-lg">
            <StarsIcon className="w-full h-full text-white" />
          </div>
          <h4 className="font-black">Browse Task</h4>
          <p>Explore tasks or post your own job if you&apos;re a business</p>
        </div>
        <div className="w-full p-3 bg-white border-b-2 border-[var(--green)] shadow-md rounded-lg">
          <div className="p-5 mx-auto my-5 w-[100px] h-[100px] bg-[var(--green)] shadow-lg rounded-lg">
            <StarsIcon className="w-full h-full text-white" />
          </div>
          <h4 className="font-black">Complete Task</h4>
          <p>Complete tasks at your own pace and earn funds</p>
        </div>
        <div className="w-full p-3 bg-white border-b-2 border-[var(--green)] shadow-md rounded-lg">
          <div className="p-5 mx-auto my-5 w-[100px] h-[100px] bg-[var(--green)] shadow-lg rounded-lg">
            <StarsIcon className="w-full h-full text-white" />
          </div>
          <h4 className="font-black">Withdraw & Earn</h4>
          <p>Easily withdraw your earnings on designated days</p>
        </div>
      </div>
    </div>
  );
}
