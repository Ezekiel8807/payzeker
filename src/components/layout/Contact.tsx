import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Contact() {
  return (
    <div
      id="contact"
      className="relative px-5 sm:px-10 md:px-20 py-10 sm:py-20 text-center bg-[var(--gray-05)]"
    >
      <Image
        src="/icons/duo-icons.svg"
        width={50}
        height={50}
        alt="contact-duo-image"
        style={{ width: "auto", height: "auto" }}
        className="m-auto"
      />
      <h2 className="my-2 font-black ">Get In Touch With Us</h2>
      <p className="text-[12px]">
        We&apos;re here to assist you with any questions or support you may
        need. Feel free to reach out
      </p>
      <Link
        className="w-[150px] py-2 mx-auto mt-5 font-black block text-white bg-[var(--green)] rounded-full"
        href="/contact"
      >
        Contact Us
      </Link>
      <div className="w-[150px] h-[150px] absolute top-0 right-5 -z-10 rounded-[220px] blur-[30px] bg-[#29cd9c4d]"></div>
    </div>
  );
}
