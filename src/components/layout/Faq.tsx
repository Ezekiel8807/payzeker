import React from "react";
import Accordion from "../accordion/Accordion";

export default function Faq() {
  return (
    <div
      id="faq"
      className="px-5 sm:px-10 md:px-20 py-5 sm:py-10 bg-[var(--gray-05)]"
    >
      <div className="w-full sm:max-w-[800px] m-auto p-5 text-center">
        <h1 className="font-black text-sm text-[var(--green)]">FAQS</h1>
        <h1 className="font-black text-lg">Frequently Asked Questions</h1>
        <p className="text-sm">
          These are the most commonly asked questions about Payzeker.
          Understanding how Payzeker operates is key to becoming a better
          Freelancer and a better Employer
        </p>
      </div>

      <Accordion />
    </div>
  );
}
