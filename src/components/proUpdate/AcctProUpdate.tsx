"use client";
import { useState } from "react";

//components
import ProUpdateForm from "../form/ProUpdateForm";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import Button from "../Button";

type AcctProUpdateProbs = {
  userAcctData: {
    fullname: string;
    username: string;
    bankName: string;
    bankAcctNo: string;
    setBankName: React.Dispatch<React.SetStateAction<string>>;
    setBankAcctNo: React.Dispatch<React.SetStateAction<string>>;
  };
};

export default function AcctProUpdate({ userAcctData }: AcctProUpdateProbs) {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [isPen, setIspen] = useState(false);

  //
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

    //set pending to true
    setIspen(true);

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

    if (response.ok) {
      setIssuc(true);
      setSucmsg(result.success);
    } else {
      setIserr(true);
      setErrmsg(result.error);
    }

    //set pending to false
    setIspen(false);
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
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={bankAcctNo.toString()}
          name="bankAcctNo"
          id="bankAcctNo"
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setBankAcctNo(value);
            }
          }}
        />
      </div>
      <div className="text-right mt-5">
        <Button btnStyle="w-[100px] font-bold p-2 text-[var(--white)] bg-[var(--green)]">
          {isPen ? "Updating..." : "Update"}
        </Button>
      </div>

      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </ProUpdateForm>
  );
}
