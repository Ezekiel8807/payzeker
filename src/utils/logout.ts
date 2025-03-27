import { redirect } from "next/navigation";
import { logout } from "@/actions/logout";

export async function Logout() {
  await logout();
  redirect("/");
}
