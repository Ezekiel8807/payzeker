"use client";
import { useState } from "react";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import { addSubscriber } from "@/actions/subscriberAction";

export default function SubscriberForm() {
  const [errMsg, setErrmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [sucMsg, setSucmsg] = useState("");
  const [isSuc, setIssuc] = useState(false);
  const [email, setEmail] = useState("");

  async function handleSubscriber(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email) {
      setErrmsg("Email is required");
      setIserr(true);
    }

    const response = await addSubscriber(email);
    if (response.error) {
      setErrmsg(response.msg);
      setIserr(true);
    } else {
      setSucmsg(response.msg);
      setIssuc(true);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubscriber}
        className="mt-6 flex flex-col md:flex-row justify-center gap-3"
      >
        <input
          type="email"
          value={email}
          placeholder="Enter your email"
          className="px-4 py-2 rounded-md text-black w-full md:w-auto"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="bg-yellow-500 hover:bg-yellow-600 transition text-black font-semibold px-6 py-2 rounded-md"
        >
          Notify Me
        </button>
      </form>

      {isErr && <ErrorModal errMsg={errMsg} setIserr={setIserr} />}
      {isSuc && <SuccessModal sucMsg={sucMsg} setIssuc={setIssuc} />}
    </>
  );
}
