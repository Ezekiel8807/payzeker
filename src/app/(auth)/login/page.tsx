import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

// components
import Header from "@/shared/components/layout/Header";
import LoginForm from "@/features/auth/components/LoginForm";

export const metadata: Metadata = {
  title: "Payzeker - Login page",
  description: "Access your Payzeker account and start earning now.",
};

export default async function Login() {
  const token = await getToken();

  if (token) return redirect("/dashboard");

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
}
