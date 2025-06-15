"use client";
import React, { useState } from "react";

export default function NewLetterForm() {
  const [email, setEmail] = useState("");

  function handleNewsLetterSubmit() {
    console.log(email);
  }

  return (
    <>
      <form
        onSubmit={handleNewsLetterSubmit}
        className="flex w-full md:max-w-md"
      >
        <input
          type="email"
          required
          value={email}
          placeholder="Enter your mail"
          className="w-[70%] px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-[30%] py-2 bg-[var(--green)] text-white text-center rounded-r-md hover:bg-emerald-600"
        >
          Submit
        </button>
      </form>
    </>
  );
}
