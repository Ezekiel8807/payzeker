import { Key } from "react";
import Image from "next/image";
import Button from "../Button";
import Link from "next/link";

type RequestCardProbs = {
  requestCardInfo: {
    _id: Key | string | null | undefined;
    userId: string;
    type: string;
    username: string;
    fullname: string;
    bankName: string | null | undefined;
    prof: string;
    bankAcctNo: number | null | undefined;
    amount: number;
  };
};

export default function RequestCard({ requestCardInfo }: RequestCardProbs) {
  const { type, username, fullname, bankName, prof, bankAcctNo, amount } =
    requestCardInfo;

  return (
    <div className="bg-[var(--gray-10)] p-3 rounded-lg shadow-md">
      {prof && (
        <Link href={prof} target="_bank">
          <Image
            src={prof}
            width={500}
            height={500}
            alt="request prof"
            className="w-full h-[200px]"
          />
        </Link>
      )}

      <h2 className="font-black mt-3">{type.toLocaleUpperCase()}</h2>

      <div>
        {type === "withdraw" && (
          <div className="flex mt-1 items-center justify-between">
            <span className="">Name:</span>
            <span className="text-right">{fullname}</span>
          </div>
        )}

        {type === "deposit" && (
          <div className="flex mt-1 items-center justify-between">
            <span className="">Username:</span>
            <span className="text-right">{username}</span>
          </div>
        )}

        {bankName && (
          <div className="flex mt-1 items-center justify-between">
            <span className="">Bank:</span>
            <span className="text-right">{bankName}</span>
          </div>
        )}

        {bankAcctNo && (
          <div className="flex mt-1 items-center justify-between">
            <span className="">Acct No:</span>
            <span className="text-right">{bankAcctNo}</span>
          </div>
        )}

        <div className="flex mt-1 items-center justify-between">
          <span className="">Amount:</span>
          <span className="text-right">
            {amount.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
        </div>

        {type === "withdraw" && (
          <p className="mt-5 p-2 text-sm text-center bg-[var(--gray-05)]">
            Balace must have been check before confirming payment.
          </p>
        )}

        <div className="flex mt-3 items-center justify-end text-[14px] font-black gap-3">
          <Button>Reject</Button>
          <Button btnStyle=" p-1 text-white bg-[var(--green)] rounded">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
