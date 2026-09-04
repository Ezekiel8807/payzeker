"use client";
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import FormError from "@/shared/components/feedback/FormError";
import AuthPage from "@/shared/components/auth/AuthPage";
import AuthHeader from "@/shared/components/auth/AuthHeader";
import IconInput from "@/shared/components/auth/IconInput";
import PasswordInput from "@/shared/components/auth/PasswordInput";
import LoadingButton from "@/shared/components/ui/LoadingButton";

export default function LoginForm() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (!username) { setIsLoading(false); return setErr("Please enter your username"); }
    if (!password) { setIsLoading(false); return setErr("Please enter your password"); }

    try {
      const res = await fetch(`/api/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setIsLoading(false); return setErr(data.error || "Login failed"); }
      setIsLoading(false);
      router.push(data.redirectTo);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthPage>
      <AuthHeader title="Welcome back" subtitle="Sign in to manage your account" />
      <form className="mt-8 space-y-6" onSubmit={handleLogin} method="POST">
        <div className="space-y-4">
          <IconInput icon="solar:user-bold" id="username" label="Username" value={username} onChange={(e) => { setErr(""); setUsername(e.target.value); }} required placeholder="Enter your username" />
          <PasswordInput id="password" label="Password" value={password} onChange={(e) => { setErr(""); setPassword(e.target.value); }} required placeholder="Enter your password" />
        </div>

        {err && <FormError msg={err} />}

        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link href="/register" className="font-medium text-[var(--green)] hover:text-green-600 hover:underline">Create an account</Link>
          </div>
          <div className="text-sm">
            <Link href="/forget" className="font-medium text-gray-600 hover:text-[var(--green)]">Forgot password?</Link>
          </div>
        </div>

        <div>
          <LoadingButton isLoading={isLoading} loadingText="Signing in..." className="w-full">
            Sign in
          </LoadingButton>
        </div>
      </form>
    </AuthPage>
  );
}
