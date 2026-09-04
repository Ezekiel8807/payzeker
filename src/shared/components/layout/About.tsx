import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div id="about" className="relative page-container py-5 sm:py-10">
      <div className="flex flex-col md:flex-row justify-center mb-5 gap-2 sm:gap-10">
        <div className="w-full sm:w-1/2">
          <h1 className="font-black">ABOUT US</h1>
          <p className="font-black text-lg sm:text-3xl">Empowering <span className="text-[var(--green)]">Micro-Freelancers</span>,</p>
          <p className="font-black text-lg sm:text-3xl">One <span className="text-[var(--green)]">Task</span> at a Time.</p>
        </div>
        <div className="w-full sm:w-1/2">
          <p className="text-sm">Payzeker bridges the gap between business owners and freelancers, making it easy to get simple online tasks done—for instant micro-payments.</p>
          <Link className="w-[150px] my-3 p-2 block float-end text-center text-sm text-white rounded-full bg-[var(--green)]" href="/about">Learn more</Link>
        </div>
      </div>
      <Image src="/img/ab.svg" width={1000} height={1000} alt="About description image" className="w-full" />
      <div className="w-[150px] h-[150px] absolute left-0 bottom-32 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"></div>
    </div>
  );
}
