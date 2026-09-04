"use client";
import { cancelRequest, confirmRequest } from "@/features/requests/actions/requesAction";

//components
import CardActionBtn from "@/shared/components/ui/CardActionBtn";
import WarningModal from "@/shared/components/modals/WarningModal";
import { useState } from "react";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";

type RequestCardProbs = {
  requestCardInfo: {
    _id: string;
    userId: string;
    fullname: string;
    bankName: string | null | undefined;
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

  const { _id, userId, fullname, bankName, bankAcctNo, amount } =
    requestCardInfo;

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
      <div className="card">
        <h2 className="font-black mt-3">Withdral</h2>

        <div>
          <div className="flex mt-1 items-center justify-between">
            <span className="">Name:</span>
            <span className="text-right">{fullname}</span>
          </div>

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

          <p className="mt-5 p-3 text-sm text-center bg-slate-50 rounded-lg">
            Balace must have been check before confirming payment.
          </p>

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
