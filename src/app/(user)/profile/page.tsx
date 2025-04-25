import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { fetchModelById } from "@/utils/scripting";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import ClientProfile from "@/components/layout/Profile";
import ForgetPass from "@/components/ForgetPass";

export default async function Profile() {
  const token = await getToken();
  const user = await fetchModelById(User, token.id); // Fetch user data before rendering

  const {
    firstname = "firstname",
    lastname = "lastname",
    username = "username",
    rank = 1,
    email = "enail",
  } = user;
  const { bankName = "bankName", bankAcctNo = 12346790 } =
    user.account.withdrawal;

  return (
    <Main>
      <SubHeading title="User Profile" desc="Everything about you." />
      <ClientProfile
        userInfo={{
          username,
          firstname,
          lastname,
          email,
          rank,
          bankName,
          bankAcctNo,
        }}
      ></ClientProfile>

      <ForgetPass />
    </Main>
  );
}
