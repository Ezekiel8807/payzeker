import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";

// components
import Header from "@/components/layout/Header";
import LoginForm from "@/components/form/LoginForm";

export const metadata: Metadata = {
  title: "Payzeker - Login page",
  description: "Access your Payzeker account and start earning now.",
};

export default async function Login() {
  const token = await getToken();

  if (token) return redirect("/dashboard");

  // return redirect("/coming_soon");

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
}
