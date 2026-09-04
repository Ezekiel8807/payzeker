"use client";
import React, { useState } from "react";
import Button from "@/shared/components/ui/Button";
import Main from "@/shared/components/layout/Main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import { forgotPasswordSchema } from "@/shared/lib/validation";
import { z } from "zod";

export default function Forget() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) setEmailError("");
    if (value) {
      try { forgotPasswordSchema.shape.email.parse(value); setEmailError(""); }
      catch (error) { if (error instanceof z.ZodError) setEmailError(error.issues[0].message); }
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const validatedData = forgotPasswordSchema.parse({ email });
      setEmailError("");
      setIsLoading(true);
      try {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        });
        const data = await response.json();
        if (data.error) { setErrmsg(data.message); setIserr(true); }
        else { router.push("/email-sent"); }
      } catch (error) {
        setErrmsg("An error occurred. Please try again later.");
        setIserr(true);
        console.error("Forgot password error:", error);
      } finally { setIsLoading(false); }
    } catch (error) {
      if (error instanceof z.ZodError) setEmailError(error.issues[0].message);
      else { setErrmsg("Invalid input."); setIserr(true); }
    }
  }

  return (
    <Main>
      <div className="flex px-5 sm:px-10 md:px-20 pt-20 items-center justify-center">
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-lead text-xl font-black mb-3">Forgot Password? 🙇‍♂️</h1>
          <p className="text-sm text-ink-muted mb-5">Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className={`input ${emailError ? "border-red-500 focus:ring-red-500" : ""}`}
                type="email" name="email" id="email" value={email} onChange={handleEmailChange} required placeholder="Enter your account email" disabled={isLoading} />
              {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
            </div>
            <div className="flex items-center justify-between mt-3">
              <Link className="text-[12px] text-[var(--green)] hover:underline cursor-pointer" href="/login">← Back to login</Link>
              <Button disabled={isLoading || !!emailError}
                btnStyle="btn btn-primary">
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </Main>
  );
}
