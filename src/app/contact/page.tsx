import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import React from "react";

export default function Contact() {
  return (
    <>
      <Header />
      <div className="px-5 sm:px-10 md:px-20 bg-[#D9EDE7]">
        <p className="font-black py-10">
          <span className="text-[var(--green)]">Home</span> &gt; Contact Us
        </p>

        <div className="p-5 bg-white rounded-xl m-auto">
          <p className="font-black text-xl text-center">
            Have something to share? We&apos;re here for it!
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
