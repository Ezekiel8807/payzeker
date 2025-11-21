"use client";
import { useState } from "react";

//components
import Button from "./Button";
// import SuccessModal from "./modal/SuccessModal";
import ErrorModal from "./modal/ErrorModal";
import EarningWithdrawalModal from "./modal/EarningWithdrawalModal";

type EarningBalPobs = {
  earning: number;
  minWithdrawal: number;
  maxWithdrawal: number;
  allTimeWithdrawal: number;
};

export default function EarningBal({
  earning,
  minWithdrawal,
  maxWithdrawal,
  allTimeWithdrawal,
}: EarningBalPobs) {
  const [isPen, setIspen] = useState(false);
  // const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  // const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);

  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  function openCloseWithdrawModal() {
    setOpenWithdrawModal(!openWithdrawModal);
  }

  return (
    <>
      <div className="w-full h-full bg-gradient-to-b from-[#f9f9f9] to-[#eefdfa] p-3 shadow-md rounded-lg">
        <div className="text-left">
          <h4 className="font-semibold text-xl">Earning:</h4>
          <h5 className="font-black text-lg my-1">
            {earning.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
            <span className="ms-1 text-[var(--green)]">NGN</span>
          </h5>
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle="w-[100px] p-2 font-bold text-[12px] cursor-pointer bg-green-100 hover:bg-[var(--green)] hover:text-[var(--white)] rounded outline-none shadow-md"
          >
            {!isPen ? "Transfer" : "Processing..."}
          </Button>
        </div>
      </div>

      {openWithdrawModal && (
        <EarningWithdrawalModal
          EarningWithdrawalInfo={{
            isPen,
            setIspen,
            setErrmsg,
            setIserr,
            earning,
            minWithdrawal,
            maxWithdrawal,
            allTimeWithdrawal,
            setOpenWithdrawModal,
          }}
          closeModal={openCloseWithdrawModal}
        />
      )}

      {/* {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />} */}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
