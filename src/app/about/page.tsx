import { isLaunched } from "@/utils/launch";

//components
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import OurTeam from "@/components/layout/OurTeam";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Payzeker - About page",
  description: "Learn more about payzeker",
};

export default function About() {
  return (
    <>
      <Header />
      <div className="bg-[#D9EDE7]">
        {/* +++++++++++++++++++++++++++++++++
        ++ */}
        {/* 1 */}
        <div className="relative w-full py-10 md:py-20 bg-green-700/90">
          {/* Background Image */}
          <Image
            width={500}
            height={500}
            src="/img/af.svg"
            alt="Freelancer at work"
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
          />

          {/* Overlay content */}
          <div className="relative flex items-center justify-start h-full px-8 md:px-20">
            <div className="max-w-2xl text-white">
              <p className="text-white text-sm md:text-base mb-2">
                <span className="text-[var(--green)]">&#47;&#47; </span>
                Experience seamless task completion
              </p>

              <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Where businesses meet <br />
                skilled freelancers for fast,
                <br /> efficient results
              </h1>

              <p className="text-white/90 text-base md:text-lg mb-8">
                Payzeker empowers freelancers to earn by doing what they do
                best, while helping businesses get tasks done efficiently.
              </p>

              <Link
                href={isLaunched ? "/dashboard" : "/#countdown"}
                className="inline-flex items-center px-6 py-3 rounded-full bg-[var(--green)] text-white font-semibold hover:bg-white hover:text-[var(--green)] transition"
              >
                Explore Task
                <span className="ml-2 text-lg">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++++++++++++++++++
        ++ */}
        {/* 2 */}
        <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-20 bg-white">
          <h1 className="w-full md:max-w-[500px] font-black text-3xl">
            Empowering Micro-Freelancers One Task at a Time
          </h1>
          <div className="flex flex-col md:flex-row items-start justify-between gap-2 md:gap-20">
            <p className="w-full md:w-1/2 py-5">
              With a seamless platform built for efficiency, Payzeker makes task
              completion fast and payments instant. We empower freelancers with
              flexible earning opportunities while helping businesses stay
              productive and grow—without the usual hassle. Whether you&apos;re
              a freelancer looking for new ways to earn or a business owner in
              need of reliable support, Payzeker is the solution that brings it
              all together
            </p>

            <p className="w-full md:w-1/2 py-5">
              Payzeker connects business owners with eager freelancers ready to
              complete simple online tasks in exchange for instant
              micro-payments. Whether you&apos;re growing a brand or earning
              extra income daily, Payzeker makes it effortless.
            </p>
          </div>
        </div>

        {/* +++++++++++++++++++++++++++++++++
        ++ */}
        {/* 3 */}
        <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-10">
            <div className="w-full md:w-1/2 m-auto">
              <Image
                width={500}
                height={500}
                src="/img/vid.svg"
                alt="youtube thub"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h1 className="max-w-[400px] md:mt-0 font-black text-3xl">
                Turning Simple Tasks into Real Income
              </h1>
              <p className="py-3">
                Payzeker connects freelancers and businesses through a platform
                that enables simple daily tasks—offering flexible income for
                freelancers and streamlined solutions for businesses.
              </p>
              <div className="flex gap-2">
                <div className="p-1 bg-[var(--green)]"></div>
                <p className="">
                  With Payzeker, hiring for small tasks is effortless—bringing
                  transparency, trust, and instant results to both freelancers
                  and businesses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* +++++++++++++++++++++++++++++++++
        ++ */}
        {/* 4 */}
        <OurTeam />
      </div>
      <Footer />
    </>
  );
}
