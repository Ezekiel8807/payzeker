import Executive from "@/components/Executive";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import Image from "next/image";
import React from "react";

export default function About() {
  const executives = [
    {
      name: "Ayebidun Ezekiel",
      imgPath: "/img/Image 1.svg",
      title: "Founder & CEO",
      fLink: "",
      lLink: "",
      xLink: "",
    },
    {
      name: "Guy Hawkins",
      imgPath: "/img/Image 2.svg",
      title: "Head of Marketing",
      fLink: "",
      lLink: "",
      xLink: "",
    },
    {
      name: "Ronald Richards",
      imgPath: "/img/Image 3.svg",
      title: "Lead Designer",
      fLink: "",
      lLink: "",
      xLink: "",
    },
  ];
  return (
    <>
      <Header />
      <div className="bg-[#D9EDE7]">
        <div className="relative w-full max-h-[450px] overflow-hidden">
          <Image
            src="/img/af.svg"
            width={1000}
            height={1000}
            alt="about-banner"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full bg-green-600/50 backdrop-blur-sm bg-gradient-to-r from-bg-green-600/50 to-transparent">
            <div className="w-full h-full p-5">
              <div className="text-white">
                <h1 className="text-sm">
                  <span className="mr-3 text-[var(--green)]">&#47;&#47;</span>
                  Experience seamless task completion
                </h1>

                <p>
                  Payzeker empowers freelancers to earn by doing what they do
                  best, while helping businesses get tasks done efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 bg-white">
          <h1 className="max-w-[500px] font-black text-3xl">
            Empowering Micro-Freelancers One Task at a Time
          </h1>
          <div className="flex flex-col md:flex-row items-start justify-between gap-20">
            <p className="w-1/2 py-5">
              With a seamless platform built for efficiency, Payzeker makes task
              completion fast and payments instant. We empower freelancers with
              flexible earning opportunities while helping businesses stay
              productive and grow—without the usual hassle. Whether you&apos;re
              a freelancer looking for new ways to earn or a business owner in
              need of reliable support, Payzeker is the solution that brings it
              all together
            </p>

            <p className="w-1/2 py-5">
              Payzeker connects business owners with eager freelancers ready to
              complete simple online tasks in exchange for instant
              micro-payments. Whether you&apos;re growing a brand or earning
              extra income daily, Payzeker makes it effortless.
            </p>
          </div>
        </div>

        <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="w-1/2 m-auto">
              <Image
                width={500}
                height={500}
                src="/img/vid.svg"
                alt="youtube thub"
              />
            </div>

            <div className="w-1/2">
              <h1 className="max-w-[400px] font-black text-3xl">
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

        <div className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 bg-white">
          <div className="w-full sm:max-w-[800px] m-auto p-5 text-center">
            <h1 className="font-black text-sm text-[var(--green)]">Our Team</h1>
            <h1 className="font-black text-lg">
              Meet the passionate individuals behind Payzeker
            </h1>
            <p className="text-sm">
              Together, we&apos;re committed to empowering freelancers and
              businesses by providing innovative solutions that foster
              collaboration, efficiency, and growth
            </p>
          </div>

          <div className="px-5 sm:px-10 md:px-20 flex flex-col md:flex-row items-center justify-between">
            {executives.map(
              (e: {
                name: string;
                imgPath: string;
                title: string;
                fLink: string;
                lLink: string;
                xLink: string;
              }) => (
                <Executive
                  key={e.name}
                  name={e.name}
                  imgPath={e.imgPath}
                  title={e.title}
                  fLink={e.fLink}
                  lLink={e.lLink}
                  xLink={e.xLink}
                />
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
