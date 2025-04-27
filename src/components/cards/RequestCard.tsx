"use client";
import { cancelRequest, confirmRequest } from "@/actions/requesAction";

//components
import Image from "next/image";
import Link from "next/link";
import CardActionBtn from "../CardActionBtn";
import WarningModal from "../modal/WarningModal";
import { useState } from "react";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

type RequestCardProbs = {
  requestCardInfo: {
    _id: string;
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
  const [isCon, setIscon] = useState(false);
  const [isRej, setIsrej] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [rejWarningMsg, setRejwarningmsg] = useState("");
  const [conWarningMsg, setConwarningmsg] = useState("");
  const [IsRejWarning, setIsrejwarning] = useState(false);
  const [IsConWarning, setIsconwarning] = useState(false);

  const {
    _id,
    userId,
    type,
    username,
    fullname,
    bankName,
    prof,
    bankAcctNo,
    amount,
  } = requestCardInfo;

  async function cancelRequestAction() {
    setIsrej(true);
    //await reject action call
    const response = await cancelRequest(userId, _id);

    if (response.error) {
      setErrmsg(response.msg as string);
      setIsrej(false);
      setIserr(true);
      return;
    }

    setSucmsg(response.msg as string);
    setIssuc(true);
    setIsrej(false);
  }

  async function confirmRequestAction() {
    setIscon(true);
    //await reject action call
    const response = await confirmRequest(userId, _id);

    if (response.error) {
      setErrmsg(response.msg as string);
      setIscon(false);
      setIserr(true);
      return;
    }

    setSucmsg(response.msg as string);
    setIscon(false);
    setIssuc(true);
  }

  //cancle subtask button func
  function cancelRequestFunc() {
    setIsrej(true);
    //display warning
    setRejwarningmsg("Rejection of request action cannot be revised!");
    setIsrejwarning(true);
    setIsrej(false);
  }

  //confirm subtask button func
  function confirmRequestFunc() {
    setIscon(true);
    //display warning
    setConwarningmsg(
      "Confirm request and be certain before taking this action!"
    );
    setIsconwarning(true);
    setIscon(false);
  }

  return (
    <>
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

          <CardActionBtn
            isCon={isCon}
            isRej={isRej}
            rejectFunc={cancelRequestFunc}
            confirmFunc={confirmRequestFunc}
          />
        </div>
      </div>

      {IsRejWarning && (
        <WarningModal
          setIswarning={setIsrejwarning}
          warningMsg={rejWarningMsg}
          action={cancelRequestAction}
        />
      )}

      {IsConWarning && (
        <WarningModal
          setIswarning={setIsconwarning}
          warningMsg={conWarningMsg}
          action={confirmRequestAction}
        />
      )}

      {isSuc && (
        <SuccessModal
          setIssuc={setIssuc}
          sucMsg={sucMsg}
          direction="/requests"
        />
      )}

      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
