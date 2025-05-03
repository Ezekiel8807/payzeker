import Image from "next/image";
import React from "react";

export default function HowToStart() {
  return (
    <div className="p-5 md:p-10 bg-[#efefef]">
      <div className="flex flex-col sm:flex-row gap-2 md:gap-10">
        <div className="w-full md:w-1/2">
          <h3 className="md:text-[35px] font-black">
            Welcome to <span className="text-[var(--green)]">Payzeker</span>,
          </h3>
          <h3 className="md:text-[35px] font-black">
            Learn How To Get Started!
          </h3>
          <p className="text-[10px] md:text-[24px] text-justify">
            Getting started on Payzeker is quick and easy. First, create a free
            account, whether you&apos;re a business owner looking to delegate
            simple online tasks or a freelancer ready to earn, signing up takes
            just a few minutes. After registration, set up your profile to help
            us connect you with the right opportunities. Business owners can
            fund their wallets and start posting tasks, while freelancers can
            showcase their skills and preferences.
          </p>
        </div>
        <div className="w-full md:w-1/2 m-auto">
          <Image
            src="/img/b.svg"
            width={1000}
            height={1000}
            alt="how_to_start image"
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
}
