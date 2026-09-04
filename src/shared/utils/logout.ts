import { redirect } from "next/navigation";
import { logout } from "@/features/auth/actions/logout";

export async function Logout() {
  await logout();
  redirect("/");
}
