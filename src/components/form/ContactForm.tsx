"use client";

import { useState } from "react";

export default function ContactForm() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  return (
    <form className="grid gap-4">
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="email"
          value={email}
          placeholder="Email"
          className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          value={phone}
          placeholder="Phone Number"
          className="border rounded-md px-4 py-2 w-full outline-none text-black bg-[#f5f5f5]"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <fieldset className="border border-gray-300 rounded-md px-4 py-2 bg-[#f5f5f5]">
        <legend className="text-sm text-gray-500">
          Why are you contacting us?
        </legend>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <label className="flex gap-2 text-sm">
            <input type="checkbox" /> Technical Support
          </label>
          <label className="flex gap-2 text-sm">
            <input type="checkbox" /> Payment Issues
          </label>
          <label className="flex gap-2 text-sm">
            <input type="checkbox" /> Task Inquiry
          </label>
          <label className="flex gap-2 text-sm">
            <input type="checkbox" /> Others
          </label>
        </div>
      </fieldset>
      <textarea
        rows={4}
        value={message}
        placeholder="Your message here..."
        className="border rounded-md px-4 py-2 w-full bg-[#f5f5f5] outline-none"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <button
        type="submit"
        className="bg-[var(--green)] hover:bg-green-600 text-white px-6 py-2 rounded-md w-full md:w-fit"
      >
        Submit
      </button>
    </form>
  );
}
