import React from "react";
import RequestCard from "./cards/RequestCard";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function RequestCom({newRequest}:{newRequest: any}) {
  return (
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
  );
}
