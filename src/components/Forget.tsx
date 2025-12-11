"use client";
import React, { useState } from "react";
import Button from "./Button";
import Main from "./layout/Main";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorModal from "./modal/ErrorModal";
import { forgotPasswordSchema } from "@/lib/validation";
import { z } from "zod";

export default function Forget() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [emailError, setEmailError] = useState("");

  // Real-time email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }

    // Validate on blur or when user stops typing
    if (value) {
      try {
        forgotPasswordSchema.shape.email.parse(value);
        setEmailError("");
      } catch (error) {
        if (error instanceof z.ZodError) {
          setEmailError(error.issues[0].message);
        }
      }
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate with Zod
    try {
      const validatedData = forgotPasswordSchema.parse({ email });
      setEmailError("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(validatedData),
        });

        const data = await response.json();

        if (data.error) {
          setErrmsg(data.message);
          setIserr(true);
        } else {
          // Redirect to email sent page
          router.push("/email-sent");

          // In development, show the reset link
          if (process.env.NODE_ENV === "development" && data.resetUrl) {
            console.log("Reset URL:", data.resetUrl);
            console.log("Reset Token:", data.resetToken);
          }
        }
      } catch (error) {
        setErrmsg("An error occurred. Please try again later.");
        setIserr(true);
        console.error("Forgot password error:", error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      // Zod validation error
      if (error instanceof z.ZodError) {
        setEmailError(error.issues[0].message);
      } else {
        setErrmsg("Invalid input. Please check your email address.");
        setIserr(true);
      }
    }
  }

  return (
    <Main>
      <div className="flex px-5 sm:px-10 md:px-20 pt-20 items-center justify-center">
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-lead text-xl font-black mb-3">
            Forgot Password? 🙇‍♂️
          </h1>
          <p className="text-sm text-gray-600 mb-5">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                className={`w-full p-2 input border outline-none rounded focus:ring-2 transition-all ${
                  emailError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[var(--green)] focus:ring-[var(--green)]"
                }`}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => {
                  if (email) {
                    try {
                      forgotPasswordSchema.shape.email.parse(email);
                      setEmailError("");
                    } catch (error) {
                      if (error instanceof z.ZodError) {
                        setEmailError(error.issues[0].message);
                      }
                    }
                  }
                }}
                required
                placeholder="Enter your account email"
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <Link
                className="text-[12px] text-[var(--green)] hover:underline cursor-pointer"
                href="/login"
              >
                ← Back to login
              </Link>

              <Button
                disabled={isLoading || !!emailError}
                btnStyle="px-5 py-2 bg-[var(--green)] text-white rounded hover:bg-[var(--green-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-5 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs">
              <p className="font-bold text-yellow-800">Development Mode:</p>
              <p className="text-yellow-700">
                Check the console for the password reset link (email not sent in
                development)
              </p>
            </div>
          )}
        </div>
      </div>

      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </Main>
  );
}
