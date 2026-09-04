import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getToken } from "@/features/auth/actions/action";

// components
import Header from "@/shared/components/layout/Header";
import RegisterForm from "@/features/auth/components/RegisterForm";

export const metadata: Metadata = {
  title: "Payzeker - Register page",
  description: "Join Payzeker to earn money from simple tasks.",
};

export default async function Register() {
  const token = await getToken();

  if (token) return redirect("/dashboard");

  return (
    <>
      <Header />
      <RegisterForm />
    </>
  );
}
