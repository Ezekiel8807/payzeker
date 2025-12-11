"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { resetPasswordSchema } from "@/lib/validation";
import Button from "@/components/Button";
import Main from "@/components/layout/Main";
import ErrorModal from "@/components/modal/ErrorModal";
import SuccessModal from "@/components/modal/SuccessModal";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isErr, setIserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [isSuc, setIssuc] = useState(false);
  const [sucMsg, setSucmsg] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrmsg("Invalid reset link. Please request a new password reset.");
      setIserr(true);
    }
  }, [token]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    if (passwordError) {
      setPasswordError("");
    }
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (confirmError) {
      setConfirmError("");
    }

    // Check if passwords match
    if (value && newPassword && value !== newPassword) {
      setConfirmError("Passwords don't match");
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      setErrmsg("Invalid reset token");
      setIserr(true);
      return;
    }

    // Validate with Zod
    try {
      const validatedData = resetPasswordSchema.parse({
        token,
        newPassword,
        confirmPassword,
      });

      setPasswordError("");
      setConfirmError("");
      setIsLoading(true);

      try {
        const response = await fetch("/api/auth/reset-password", {
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
          setSucmsg(data.message);
          setIssuc(true);

          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        setErrmsg("An error occurred. Please try again later.");
        setIserr(true);
        console.error("Reset password error:", error);
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      // Zod validation error
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          if (err.path[0] === "newPassword") {
            setPasswordError(err.message);
          } else if (err.path[0] === "confirmPassword") {
            setConfirmError(err.message);
          }
        });
      } else {
        setErrmsg("Invalid input. Please check your passwords.");
        setIserr(true);
      }
    }
  }

  return (
    <Main>
      <div className="flex px-5 sm:px-10 md:px-20 pt-20 items-center justify-center">
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-lead text-xl font-black mb-3">
            Reset Your Password 🔐
          </h1>
          <p className="text-sm text-gray-600 mb-5">
            Enter your new password below. Make sure it's strong and secure.
          </p>

          <form onSubmit={handleSubmit}>
            {/* New Password */}
            <div className="mb-4">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium mb-2"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  className={`w-full p-2 input border outline-none rounded focus:ring-2 transition-all pr-10 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-[var(--green)] focus:ring-[var(--green)]"
                  }`}
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  value={newPassword}
                  onChange={handlePasswordChange}
                  required
                  placeholder="Enter new password"
                  disabled={isLoading || !token}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, number,
                and special character
              </p>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                className={`w-full p-2 input border outline-none rounded focus:ring-2 transition-all ${
                  confirmError
                    ? "border-red-500 focus:ring-red-500"
                    : "border-[var(--green)] focus:ring-[var(--green)]"
                }`}
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmChange}
                required
                placeholder="Confirm new password"
                disabled={isLoading || !token}
              />
              {confirmError && (
                <p className="text-red-500 text-xs mt-1">{confirmError}</p>
              )}
            </div>

            <div className="flex items-center justify-between mt-5">
              <Link
                className="text-[12px] text-[var(--green)] hover:underline cursor-pointer"
                href="/login"
              >
                ← Back to login
              </Link>

              <Button
                disabled={
                  isLoading || !token || !!passwordError || !!confirmError
                }
                btnStyle="px-5 py-2 bg-[var(--green)] text-white rounded hover:bg-[var(--green-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </Main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Main>
          <div className="flex px-5 sm:px-10 md:px-20 pt-20 items-center justify-center">
            <div className="w-full md:max-w-[50%] text-center">
              <p className="text-gray-600">Loading...</p>
            </div>
          </div>
        </Main>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
