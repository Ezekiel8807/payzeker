import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="mx-auto flex flex-col-reverse md:flex-row items-center justify-center p-5 md:p-10">
      <div className="relative md:w-[40%]">
        <h1 className="font-black text-[30px] md:text-[45px] mt-10 md:mt-0 text-center md:text-start">
          Earn on payzeker by performing simple tasks.
        </h1>
        <p className="font-extralight text-sm my-3 text-center md:text-starttext-center md:text-start">
          Earn some naira daily by performing simple social media tasks such as
          posting, liking, commenting and so on.
        </p>

        <Link
          href="/dashboard"
          className="w-[100%] md:w-[200px] block text-center font-bold bg-[var(--green)] p-3 my-5 text-white rounded-full"
        >
          Start earning now!!!
        </Link>

        <div className="w-[150px] h-[150px] absolute right-0 bottom-0 md:left-0 md:top-0 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"></div>
      </div>

      <div className="relative">
        <Image src="/img/e.svg" width={500} height={500} alt="hero image" />
        <div className="w-[150px] h-[150px] absolute top-0 left-0 md:bottom-0  -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"></div>
      </div>
    </div>
  );
}
