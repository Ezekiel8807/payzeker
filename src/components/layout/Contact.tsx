import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function Contact() {
  return (
    <div className="p-5 md:p-10 text-center">
      <Image
        src="/icons/duo-icons.svg"
        width={50}
        height={50}
        alt="contact-duo-image"
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
    </div>
  );
}
