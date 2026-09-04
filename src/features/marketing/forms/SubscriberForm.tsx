"use client";
import { useState } from "react";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import { addSubscriber } from "@/features/marketing/actions/subscriberAction";
import useFormState from "@/shared/hooks/useFormState";

export default function SubscriberForm() {
  const { errMsg, setErrmsg, isErr, setIserr, sucMsg, setSucmsg, isSuc, setIssuc } = useFormState();
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
          className="input md:w-auto"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          Notify Me
        </button>
      </form>

      {isErr && <ErrorModal errMsg={errMsg} setIserr={setIserr} />}
      {isSuc && <SuccessModal sucMsg={sucMsg} setIssuc={setIssuc} />}
    </>
  );
}
