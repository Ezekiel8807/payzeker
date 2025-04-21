import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { fetchModelsData } from "@/utils/scripting";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import Allusers from "@/components/Allusers";

// Fetch user data on the server
const fetchData = await fetchModelsData(User);

export default async function page() {
  const user = await getToken();

  if (!user.isAdmin) {
    return redirect("/dashboard");
  }
  const [users] = fetchData;

  return (
    <Main>
      <SubHeading title="All Users" desc="Users information all together." />
      <Allusers allUsers={users} />
    </Main>
  );
}
