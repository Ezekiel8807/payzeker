"use client";
import { useState } from "react";

//components
import ProUpdateForm from "../ProUpdateForm";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

type AcctProUpdateProbs = {
  userAcctData: {
    fullname: string;
    username: string;
    bankName: string;
    bankAcctNo: number;
    setBankName: React.Dispatch<React.SetStateAction<string>>;
    setBankAcctNo: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function AcctProUpdate({ userAcctData }: AcctProUpdateProbs) {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  // const [isPen, setIspen] = useState(false);
  const {
    fullname,
    username,
    bankName,
    bankAcctNo,
    setBankName,
    setBankAcctNo,
  } = userAcctData;

  async function handleAccProUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`/api/users/${username}?updateType=account`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bankName,
        bankAcctNo,
        username,
      }),
    });

    const result = await response.json();
    console.log(result);

    if (response.ok) {
      setIssuc(true);
      setSucmsg(result.success);
    } else {
      setIserr(true);
      setErrmsg(result.error);
    }
  }

  return (
    <ProUpdateForm handleForm={handleAccProUp} title="Account Information">
      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="acctName">Acct Name: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none p-1 border-b-2 text-right"
          type="text"
          value={fullname}
          readOnly
          disabled
          name="acctName"
          id="acctName"
        />
      </div>

      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="bankName">Bank Name: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none p-1 border-b-2 text-right"
          type="text"
          value={bankName}
          name="bankName"
          id="bankName"
          onChange={(e) => setBankName(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="bankAcctNo">Acct NO: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none p-1 border-b-2 text-right"
          type="number"
          value={bankAcctNo}
          name="bankAcctNo"
          id="bankAcctNo"
          maxLength={10}
          onChange={(e) => setBankAcctNo(+e.target.value)}
        />
      </div>

      {isSuc && <SuccessModal sucMsg={sucMsg} />}
      {isErr && <ErrorModal errMsg={errMsg} />}
    </ProUpdateForm>
  );
}
