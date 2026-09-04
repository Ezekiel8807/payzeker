"use client";
import React, { useState } from "react";

export default function NewLetterForm() {
  const [email, setEmail] = useState("");

  function handleNewsLetterSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          className="w-[70%] input !rounded-r-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-[30%] btn btn-primary !rounded-l-none"
        >
          Submit
        </button>
      </form>
    </>
  );
}
