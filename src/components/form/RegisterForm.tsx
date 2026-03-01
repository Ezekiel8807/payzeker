"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Link from "next/link";
import Button from "@/components/Button";
import FormError from "@/components/errorCom/FormError";
import { Icon } from "@iconify/react";

function RegisterFormContent() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [compass, setCompass] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      setReferralCode(ref);
    }
  }, [searchParams]);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (!username) {
      setIsLoading(false);
      return setErr("Please enter your username");
    }

    if (!email) {
      setIsLoading(false);
      return setErr("Please enter your email");
    }

    if (!password) {
      setIsLoading(false);
      return setErr("Please enter your password");
    }

    if (password !== compass) {
      setIsLoading(false);
      return setErr("Passwords do not match");
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, referralCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        return setErr(data.error || "Registration failed");
      }

      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.log("Registration error:", error);
      setIsLoading(false);
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sign up to get started</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="solar:user-bold" className="text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => {
                    setErr("");
                    setUsername(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="solar:letter-bold" className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setErr("");
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon
                    icon="solar:lock-password-bold"
                    className="text-gray-400"
                  />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => {
                    setErr("");
                    setPassword(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Icon
                    icon={
                      showPassword ? "heroicons:eye" : "heroicons:eye-slash"
                    }
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="compass"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon
                    icon="solar:lock-password-bold"
                    className="text-gray-400"
                  />
                </div>
                <input
                  id="compass"
                  name="compass"
                  type={showCompass ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Confirm your password"
                  value={compass}
                  onChange={(e) => {
                    setErr("");
                    setCompass(e.target.value);
                  }}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                  onClick={() => setShowCompass(!showCompass)}
                >
                  <Icon
                    icon={showCompass ? "heroicons:eye" : "heroicons:eye-slash"}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="referralCode"
                className="block text-sm font-medium text-gray-700"
              >
                Referral Code (Optional)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="solar:link-bold" className="text-gray-400" />
                </div>
                <input
                  id="referralCode"
                  name="referralCode"
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Enter referral code"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          {err && <FormError msg={err} />}

          <div>
            <Button
              disabled={isLoading}
              btnStyle={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--green)] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--green)] transition-colors ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="eos-icons:loading" className="h-5 w-5" />
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </div>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="font-medium text-[var(--green)] hover:text-green-600 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function RegisterForm() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Icon
            icon="eos-icons:loading"
            className="h-8 w-8 text-[var(--green)]"
          />
        </div>
      }
    >
      <RegisterFormContent />
    </Suspense>
  );
}
