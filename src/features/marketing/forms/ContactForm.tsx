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
          className="input"
          onChange={(e) => {
            setFirstname(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          className="input"
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
          className="input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="text"
          value={phone}
          placeholder="Phone Number"
          className="input"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <fieldset className="rounded-card border border-slate-200 bg-slate-50 px-4 py-2">
        <legend className="text-sm text-ink-muted">
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
        className="input"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      ></textarea>
      <button
        type="submit"
        className="btn btn-primary w-full md:w-fit"
      >
        Submit
      </button>
    </form>
  );
}
