import type { Metadata } from "next";
// import { getToken } from "@/actions/action";
import { redirect } from "next/navigation";

// components
// import Header from "@/components/layout/Header";
// import RegisterForm from "@/components/form/RegisterForm";

export const metadata: Metadata = {
  title: "Payzeker - Register page",
  description: "Join Payzeker to earn money from simple tasks.",
};

export default async function Register() {
  // const token = await getToken();

  // if (token) return redirect("/dashboard");

  return redirect("/coming_soon");

  // return (
  //   <>
  //     <Header />
  //     <RegisterForm />
  //   </>
  // );
}
