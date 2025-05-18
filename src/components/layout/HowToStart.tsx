import Image from "next/image";
import React from "react";

export default function HowToStart() {
  return (
    <div id="how to start" className="p-5 sm:p-10 md:p-20 bg-[var(--gray-05)]">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-10">
        <div className="w-full md:w-1/2">
          <h3 className="md:text-[30px] font-black">
            Welcome to <span className="text-[var(--green)]">Payzeker</span>,
          </h3>
          <h3 className="md:text-[30px] font-black">
            Your Platform for Earning and Delegating Online Tasks!
          </h3>

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
    </div>
  );
}
