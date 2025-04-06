"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// components
import Button from "@/components/Button";
import AuthForm from "@/components/form/AuthForm";
import FormError from "@/components/errorCom/FormError";

export default function Login() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      return setErr(data.error);
    }

    setIsLoading(false);
    router.replace("/dashboard");
    //globall suceess msg
  };

  return (
    <>
      <AuthForm title="Login">
        <form onSubmit={handleLogin} method="POST">
          <input
            className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full my-5"
            type="text"
            name="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
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

          <Button btnStyle="font-black float-right px-10 py-2 bg-[var(--green)] text-[var(--white)] rounded">
            {isLoading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </AuthForm>
    </>
  );
}
