import { getHeaderData } from "@/actions/getHeaderData";

//components
import HeaderCom from "../HeaderCom";

export default async function HeaderWrapper() {
  const { user, notifications } = await getHeaderData();

  return <HeaderCom user={user} notifications={notifications} />;
}
