"use client";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";

// components
import Button from "@/components/Button";
import AuthForm from "@/components/AuthForm";
import FormError from "@/components/errorCom/FormError";

export default function Register() {
  const [err, setErr] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [compass, setCompass] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!username) {
      setIsLoading(false);
      return setErr("Enter your username");
    }

    if (!email) {
      setIsLoading(false);
      return setErr("Enter your email");
    }

    if (!password) {
      setIsLoading(false);
      return setErr("Enter your password");
    }

    if (password != compass) {
      setIsLoading(false);
      return setErr("Password don't match");
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setIsLoading(false);
      return setErr(data.error);
    }

    setIsLoading(false);
    redirect("/login");
    //global success message
  };

  return (
    <>
      <AuthForm title="Register">
        <form onSubmit={handleRegistration}>
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
            className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full mb-5"
            type="email"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            defaultValue={email}
            placeholder="Email"
          />

          <input
            className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full mb-5"
            type="password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(e.target.value);
            }}
            defaultValue={password}
            placeholder="Password"
          />

          <input
            className="block p-2 border-b-2 border-[var(--green)] outline-none rounded w-full"
            type="password"
            name="compass"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCompass(e.target.value);
            }}
            defaultValue={compass}
            placeholder="Password Again"
          />
          {err && <FormError msg={err} />}

          <div className="flex items-center justify-between my-2">
            <Link className="text-[12px] cursor-pointer" href="/login">
              Back to login
            </Link>
          </div>

          <Button btnStyle="font-black float-right px-10 py-2 bg-[var(--green)] text-[var(--white)] rounded">
            {isLoading ? "Processing..." : "Register"}
          </Button>
        </form>
      </AuthForm>
    </>
  );
}
