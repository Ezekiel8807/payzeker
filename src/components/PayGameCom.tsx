import User from "@/model/userModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { fetchModelById } from "@/utils/modelFunc";

//components
import PayGamer from "./PayGamer";

export default async function PayGameCom() {
  const token = await getToken();
  if (!token) return redirect("/login");

  const user = await fetchModelById(User, token.id);
  const { balance } = user.account;

  return <PayGamer balance={balance} />;
}
