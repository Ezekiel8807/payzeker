import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function About() {
  return (
    <div id="about" className="relative p-5 md:p-10">
      <div className="flex flex-col md:flex-row justify-center mb-5 gap-2 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <h1 className="font-black ">ABOUT US</h1>
          <p className="font-black text-lg sm:text-3xl">
            Empowering
            <span className="text-[var(--green)]"> Micro-Freelancers</span>,
          </p>
          <p className="font-black text-lg sm:text-3xl">
            One <span className="text-[var(--green)]">Task</span> at a Time.
          </p>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-sm">
            Toopay connects business owners with eager freelancers ready to
            complete simple online tasks all in exchange for instant
            micro-payments. Whether you&apos;re growing a brand or earning extra
            income daily Whether you&apos;re growing a brand or earning extra
            income daily, Toopay makes it effortless
          </p>

          <Link
            className="w-[150px] my-3 p-2 block float-end text-center text-sm text-white rounded-full bg-[var(--green)]"
            href="/"
          >
            Learn more
          </Link>
        </div>
      </div>
      <Image
        src="/img/ab.svg"
        width={1000}
        height={1000}
        alt="About_discripption com-image"
        className="w-full"
      />
      <div className="w-[150px] h-[150px] absolute left-0 bottom-32 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"></div>
    </div>
  );
}
