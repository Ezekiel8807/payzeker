"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

//components
import Link from "next/link";
import Button from "../Button";
import FormError from "../errorCom/FormError";

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

    if (!username) {
      setIsLoading(false);
      return setErr("Enter your username");
    }

    if (!password) {
      setIsLoading(false);
      return setErr("Enter your password");
    }

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
      return setErr(data.error);
    }

    setIsLoading(false);
    router.push(data.redirectTo);
    // window.location.href = "/dashboard";
    //globall suceess msg
  };

  return (
    <div className="w-[90%] max-w-[400px] p-5 my-10 mx-auto rounded-lg shadow-xl">
      <div className="flex items-center justify-between">
        <h1 className="font-black text-3xl text-[var(--green)]">Login</h1>
        <span className="w-[20px] h-[20px] p-1 cursor-pointer font-black text-[var(--white)] text-[10px] bg-[var(--green)] text-center rounded-full">
          <Link href="/">X</Link>
        </span>
      </div>
      <form onSubmit={handleLogin} method="POST">
        <input
          className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full my-5"
          type="text"
          name="username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setErr("");
            setUsername(e.target.value);
          }}
          defaultValue={username}
          placeholder="Username"
        />

        <input
          className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full"
          type="password"
          name="password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setErr("");
            setPassword(e.target.value);
          }}
          defaultValue={password}
          placeholder="Password"
        />
        {err && <FormError msg={err} />}

        <div className="flex items-center justify-between my-2">
          <Link className="text-[12px] cursor-pointer" href="/register">
            Register now!!!
          </Link>
          <Link className="text-[12px] cursor-pointer" href="/forget">
            Retrive account?
          </Link>
        </div>

        <div className="text-right">
          <Button btnStyle="font-black px-10 py-2 bg-[var(--green)] text-[var(--white)] rounded">
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
}
