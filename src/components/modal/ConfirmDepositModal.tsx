"use client";
import { useState } from "react";
import { fileUpload } from "@/actions/fileUpload";
import { Cancel, Continue } from "@/utils/modalFunc";

//components
import Button from "../Button";
import ModalFrame2 from "./ModalFrame2";
import FormError from "../errorCom/FormError";
import FormSuccess from "../errorCom/FormSuccess";

type ConfirmDepositModalProbs = {
  confirmInfo: {
    isPen: boolean;
    setIspen: React.Dispatch<React.SetStateAction<boolean>>;
    depAmount: number;
    setFileurl: React.Dispatch<React.SetStateAction<string>>;
    // fullname: string;
    // bankName: string;
    // bankAcctNo: number;
    // amount: number;
  };
  setIscondepmodal: React.Dispatch<React.SetStateAction<boolean>>;
  depositFunc: () => void;
};

export default function ConfirmDepositModal({
  confirmInfo,
  setIscondepmodal,
  depositFunc,
}: ConfirmDepositModalProbs) {
  const { isPen, setIspen, depAmount, setFileurl } = confirmInfo;
  const [err, setErr] = useState("");
  const [suc, setSuc] = useState("");
  const [file, setFile] = useState<File>();

  function handleCancleClick() {
    Cancel(setIscondepmodal);
  }

  function handleConfirmClick() {
    Continue(setIscondepmodal, depositFunc);
  }

  async function handleProfUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending state
    setIspen(true);

    if (!file) {
      setErr("Provide prof of payment");
      setIspen(false);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErr("Accept image file only: image/png ... jpg ... jpeg...");
      setIspen(false);
      return;
    }

    const res = await fileUpload(file);
    console.log(res);

    //set pending state
    setIspen(false);
  }

  //
  return (
    <ModalFrame2>
      <h1 className="relative font-black p-3 text-3xl bg-[var(--gray-05)]">
        Make Payment!
      </h1>

      <div className="p-2">
        <div className="p-1 flex justify-center gap-2">
          <p className="font-black">Bank:</p>
          <h2> Monipoint</h2>
        </div>

        <div className="p-1 flex justify-center gap-2">
          <p className="font-black">Account No:</p>
          <h2>6650503820</h2>
        </div>

        <div className="m-3 text-center">
          <p className="font-black">Account Name:</p>
          <h2>Ayebidun Ezekiel Oluwaseyi</h2>
        </div>
      </div>

      <div className="my-3 p-2 mx-auto bg-[var(--gray-05)]">
        <form onSubmit={handleProfUpload}>
          <label className="font-black text-md">Payment reciept!</label>
          <div className="p-2 py-1 text-[12px] bg-[#ffff0040]">
            Upload the reciept to confirm the payment of
            <span className="font-black">{` #${depAmount} `}</span>into your
            account
          </div>
          <input
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
                setErr("");
              }
            }}
            className="py-2  overflow-hidden"
            type="file"
          />

          {err && <FormError msg={err} />}
          {suc && <FormSuccess msg={suc} />}

          <div className="text-right">
            <Button btnStyle="w-full p-2 bg-[var(--gray-20)] rounded">
              {isPen ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </form>
      </div>

      <div className="text-right">
        <div className="flex items-center justify-between">
          <Button
            btnAction={handleCancleClick}
            btnStyle="w-[100px] p-2 rounded font- black bg-[var(--gray-05)]"
          >
            Cancel
          </Button>

          <Button
            btnAction={handleConfirmClick}
            btnStyle="w-[100px] p-2 rounded font- black text-white bg-[var(--green)]"
          >
            Confirm
          </Button>
        </div>
      </div>
    </ModalFrame2>
  );
}
