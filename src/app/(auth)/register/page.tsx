import { getToken } from "@/actions/action";
import { redirect } from "next/navigation";

// components
import Header from "@/components/layout/Header";
import RegisterForm from "@/components/form/RegisterForm";

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
