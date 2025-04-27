import Request from "../../../model/requestModel";
import { fetchModelsData } from "@/utils/scripting";

// // Components
import Main from "@/components/layout/Main";
import SubHeading from "@/components/SubHeading";
import RequestCard from "@/components/cards/RequestCard";


export default async function page() {
  const [requests] = await fetchModelsData(Request);

  const newRequest = requests.filter(
    (r: { status: string }) => r.status === "new"
  );

  return (
    <Main>
      <SubHeading
        title="Requests"
        desc="Deposit and withdrawal confirmation."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 my-5 gap-5">
        {newRequest.map(
          (request: {
            _id: string;
            userId: string;
            type: string;
            username: string;
            fullname: string;
            bankName: string | null | undefined;
            prof: string;
            bankAcctNo: number | null | undefined;
            amount: number;
          }) => (
            <RequestCard key={request._id} requestCardInfo={request} />
          )
        )}
      </div>
    </Main>
  );
}
