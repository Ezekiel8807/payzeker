import { isLaunched } from "@/utils/launch";

// components
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 flex flex-col-reverse md:flex-row items-center">
      {/* Text Section */}
      <div className="lg:w-1/2 relative">
        <h1 className="font-black text-[30px] md:text-[45px] mt-10 sm:mt-0 text-center lg:text-start">
          Earn on Payzeker by performing simple tasks.
        </h1>

        <p className="font-extralight text-sm my-3 text-center md:text-start">
          Earn some naira daily by performing simple social media tasks such as
          posting, liking, commenting, and more.
        </p>

        <Link
          href={isLaunched ? "/dashboard" : "/#countdown"}
          className="w-full sm:max-w-[700px] lg:w-[200px] block text-center font-bold bg-[var(--green)] p-3 my-5 text-white rounded-full"
        >
          Start earning now!!!
        </Link>

        {/* Green blur background shape */}
        <div className="w-[150px] h-[150px] absolute right-0 bottom-0 md:left-0 md:top-0 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]" />
      </div>

      {/* Image Section */}
      <div className="relative sm:hidden lg:block m-auto">
        <div className="w-[80%] h-[80%] md:w-[500px] md:h-[500px] m-auto">
          <Image
            src="/img/e.svg"
            width={500}
            height={500}
            priority
            style={{ width: "auto", height: "auto" }}
            className="w-full"
            alt="hero image"
          />
        </div>

        {/* Green blur background shape */}
        <div className="w-[150px] h-[150px] absolute top-0 left-0 md:bottom-0 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]" />
      </div>
    </div>
  );
}
