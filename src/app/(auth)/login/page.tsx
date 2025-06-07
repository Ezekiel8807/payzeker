// import { getToken } from "@/actions/action";
import { redirect } from "next/navigation";

// components
// import Header from "@/components/layout/Header";
// import LoginForm from "@/components/form/LoginForm";

export default async function Login() {
  // const token = await getToken();

  // if (token) return redirect("/dashboard");

  return redirect("/coming_soon");

  // return (
  //   <>
  //     <Header />
  //     <LoginForm />
  //   </>
  // );
}
