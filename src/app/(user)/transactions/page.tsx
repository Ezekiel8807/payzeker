import { getToken } from "@/actions/action";
import Transaction from "@/model/transactionModel";
import { fetchModelsData } from "@/utils/modelFunc";

// Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import AllTrans from "@/components/transactions/AllTrans";
import UserTrans from "@/components/transactions/UserTrans";

// Fetch user data on the server
const fetchData = await fetchModelsData(Transaction);

export default async function Transactions() {
  const user = await getToken();
  const userId = user.id as string;
  const [AllTransac] = fetchData;

  return (
    <Main>
      <SubHeading title="Transactions" desc="Transaction history right here." />
      {user.isAdmin ? (
        <AllTrans trans={AllTransac} />
      ) : (
        <UserTrans userId={userId} trans={AllTransac} />
      )}
    </Main>
  );
}
