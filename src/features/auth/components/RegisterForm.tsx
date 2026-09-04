"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import FormError from "@/shared/components/feedback/FormError";
import AuthPage from "@/shared/components/auth/AuthPage";
import AuthHeader from "@/shared/components/auth/AuthHeader";
import IconInput from "@/shared/components/auth/IconInput";
import PasswordInput from "@/shared/components/auth/PasswordInput";
import LoadingButton from "@/shared/components/ui/LoadingButton";
import { Icon } from "@iconify/react";

function RegisterFormContent() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [compass, setCompass] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) setReferralCode(ref);
  }, [searchParams]);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErr("");

    if (!username) { setIsLoading(false); return setErr("Please enter your username"); }
    if (!email) { setIsLoading(false); return setErr("Please enter your email"); }
    if (!password) { setIsLoading(false); return setErr("Please enter your password"); }
    if (password !== compass) { setIsLoading(false); return setErr("Passwords do not match"); }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password, referralCode }),
      });
      const data = await res.json();
      if (!res.ok) { setIsLoading(false); return setErr(data.error || "Registration failed"); }
      setIsLoading(false);
      router.push("/login");
    } catch (error) {
      console.log("Registration error:", error);
      setIsLoading(false);
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <AuthPage>
      <AuthHeader title="Create an account" subtitle="Sign up to get started" />
      <form className="mt-8 space-y-6" onSubmit={handleRegistration}>
        <div className="space-y-4">
          <IconInput icon="solar:user-bold" id="username" label="Username" value={username} onChange={(e) => { setErr(""); setUsername(e.target.value); }} required placeholder="Enter your username" />
          <IconInput icon="solar:letter-bold" id="email" label="Email" type="email" value={email} onChange={(e) => { setErr(""); setEmail(e.target.value); }} required placeholder="Enter your email" />
          <PasswordInput id="password" label="Password" value={password} onChange={(e) => { setErr(""); setPassword(e.target.value); }} required placeholder="Create a password" />
          <PasswordInput id="compass" label="Confirm Password" value={compass} onChange={(e) => { setErr(""); setCompass(e.target.value); }} required placeholder="Confirm your password" />

          <div>
            <label htmlFor="referralCode" className="label">Referral Code (Optional)</label>
            <div className="mt-1 relative rounded-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icon icon="solar:link-bold" className="text-slate-400" />
              </div>
              <input id="referralCode" name="referralCode" type="text" className="input pl-10 pr-3" placeholder="Enter referral code"
                value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
            </div>
          </div>
        </div>

        {err && <FormError msg={err} />}

        <div>
          <LoadingButton isLoading={isLoading} loadingText="Creating account..." className="w-full">
            Create account
          </LoadingButton>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link href="/login" className="font-medium text-[var(--green)] hover:text-green-600 hover:underline">Sign in</Link>
        </div>
      </form>
    </AuthPage>
  );
}

export default function RegisterForm() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Icon icon="eos-icons:loading" className="h-8 w-8 text-[var(--green)]" /></div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
