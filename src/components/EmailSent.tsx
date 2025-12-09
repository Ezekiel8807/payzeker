"use client";
import React from "react";
import Button from "./Button";
import Main from "./layout/Main";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EmailSent() {
  const router = useRouter();

  const handleViewEmail = () => {
    // Open default email client
    window.location.href = "mailto:";
  };

  return (
    <Main>
      <div className="flex px-5 sm:px-10 md:px-20 pt-10 items-center justify-center">
        <div className="w-full md:max-w-[50%] text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-[var(--green)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-lead text-2xl font-black mb-3">
            Check Your Email! 📧
          </h1>

          <p className="text-sm text-gray-600 mb-2">
            We've sent a password reset link to your email address.
          </p>

          <p className="text-sm text-gray-600 mb-6">
            Please check your inbox and click the link to reset your password.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6 text-left">
            <p className="text-xs text-blue-800 font-semibold mb-2">
              💡 Didn't receive the email?
            </p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>Wait a few minutes for the email to arrive</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              btnAction={handleViewEmail}
              btnStyle="px-6 py-3 bg-[var(--green)] text-white rounded hover:bg-[var(--green-dark)] transition-colors"
            >
              Open Email App
            </Button>

            <Link href="/login">
              <Button btnStyle="px-6 py-3 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                Back to Login
              </Button>
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Still having trouble?{" "}
              <Link
                href="/forget"
                className="text-[var(--green)] hover:underline"
              >
                Try again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Main>
  );
}
