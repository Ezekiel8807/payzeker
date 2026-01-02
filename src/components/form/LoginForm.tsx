"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


//components
import Link from "next/link";
import Button from "../Button";
import FormError from "../errorCom/FormError";
import { Icon } from "@iconify/react";

export default function LoginForm() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (!username) {
      setIsLoading(false);
      return setErr("Please enter your username");
    }

    if (!password) {
      setIsLoading(false);
      return setErr("Please enter your password");
    }

    try {
      const res = await fetch(
        `/api/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`,
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        return setErr(data.error || "Login failed");
      }

      setIsLoading(false);
      router.push(data.redirectTo);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          {/* Logo could go here if needed again, or keep the existing header one */}
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to manage your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin} method="POST">
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
                  autoComplete="username"
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon icon="solar:lock-password-bold" className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--green)] focus:border-transparent transition-colors"
                  placeholder="Enter your password"
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
                  <Icon icon={showPassword ? "heroicons:eye" : "heroicons:eye-slash"} className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {err && <FormError msg={err} />}

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link
                href="/register"
                className="font-medium text-[var(--green)] hover:text-green-600 hover:underline"
              >
                Create an account
              </Link>
            </div>
            <div className="text-sm">
              <Link
                href="/forget"
                className="font-medium text-gray-600 hover:text-[var(--green)]"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              disabled={isLoading}
              btnStyle={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[var(--green)] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--green)] transition-colors ${isLoading ? "opacity-70 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Icon icon="eos-icons:loading" className="h-5 w-5" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
