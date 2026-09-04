"use client";
import { useState } from "react";

//components
import Button from "@/shared/components/ui/Button";
import CurrencyDisplay from "@/shared/components/ui/CurrencyDisplay";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import EarningWithdrawalModal from "./modals/EarningWithdrawalModal";

//hooks
import useFormState from "@/shared/hooks/useFormState";

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
  const { isPen, setIspen, isErr, setIserr, errMsg, setErrmsg } = useFormState();
  const [openWithdrawModal, setOpenWithdrawModal] = useState(false);

  function openCloseWithdrawModal() {
    // Prevent opening modal if processing
    if (isPen) return;
    setOpenWithdrawModal(!openWithdrawModal);
  }

  return (
    <>
      <div id="dashboard-earnings" className="w-full h-full bg-gradient-to-b from-white to-primary-lighter p-3 shadow-card rounded-card">
        <div className="text-left">
          <h4 className="font-semibold text-xl">Earning:</h4>
          <h5 className="font-black text-lg my-1">
            <CurrencyDisplay amount={earning} />
          </h5>
        </div>
        <div className="flex justify-end items-center">
          <Button
            btnAction={openCloseWithdrawModal}
            btnStyle={`btn btn-ghost w-[100px] text-[12px] ${isPen
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
              }`}
            disabled={isPen}
          >
            {isPen ? "Processing..." : "Transfer"}
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

      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
