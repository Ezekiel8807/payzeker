import React from "react";
import Accordion from "@/shared/components/layout/Accordion";

export default function Faq() {
  return (
    <div id="faq" className="page-container py-5 sm:py-10 bg-[var(--gray-05)]">
      <div className="w-full sm:max-w-[800px] m-auto p-5 text-center">
        <h1 className="font-black text-sm text-[var(--green)]">FAQS</h1>
        <h1 className="font-black text-lg">Frequently Asked Questions</h1>
        <p className="text-sm">These are the most commonly asked questions about Payzeker.</p>
      </div>
      <Accordion />
    </div>
  );
}
