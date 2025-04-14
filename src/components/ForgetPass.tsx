"use client";
import { useEffect, useState } from "react";
import { changePass } from "@/actions/changePass";

//components
import Button from "./Button";
import ErrorModal from "./modal/ErrorModal";
import SuccessModal from "./modal/SuccessModal";
import WarningModal from "./modal/WarningModal";

export default function ForgetPass() {
  const [IsWarning, setIswarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [conPass, setConpass] = useState("");
  const [isPen, setIspen] = useState(false);
  const [disableBtn, setDisablebtn] = useState(true);

  useEffect(() => {
    if (oldPass != "" && newPass != "" && conPass != "") {
      setDisablebtn(false);
    } else {
      setDisablebtn(true);
    }
  }, [oldPass, newPass, conPass]);

  async function changePassActon() {
    const updatePass = await changePass(oldPass, newPass, conPass);

    if (updatePass.error != false) {
      setErrmsg(updatePass.msg);
      setIserr(true);
      setIspen(false);
      return;
    }

    //clear form data
    setOldpass("");
    setNewpass("");
    setConpass("");

    //success message
    setSucmsg("Password successfully changed!");
    setIssuc(true);

    // set loading state to true
    setIspen(false);
  }

  async function handleChagePass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // set loading state to true
    setIspen(true);

    if (!oldPass || !newPass || !conPass) {
      setErrmsg("All fields required!");
      setIserr(true);
      setIspen(false);
      return;
    }

    if (newPass != conPass) {
      setErrmsg("password don't match!");
      setIserr(true);
      setIspen(false);
      return;
    }

    //prompt to confirm action
    setWarningMsg(
      "You about to take action that will change your account Password"
    );
    setIswarning(true);
  }

  return (
    <div className="w-full my-5 p-5 bg-[var(--green)] rounded-lg">
      <h2 className="font-black text-2xl text-white mb-5">Change Password</h2>

      <form onSubmit={handleChagePass}>
        <div className="flex flex-col gap-5 mb-5 items-center justify-between">
          <div className="w-[100%] flex flex-col md:flex-row justify-between">
            <label htmlFor="oldPass">Old password: </label>
            <input
              className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
              type="password"
              name="oldPass"
              id="oldPass"
              value={oldPass}
              onChange={(e) => setOldpass(e.target.value)}
              placeholder="Enter old password"
            />
          </div>

          <div className="w-[100%] flex flex-col md:flex-row justify-between">
            <label htmlFor="newPass">New password: </label>
            <input
              className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
              type="password"
              name="newPass"
              id="newPass"
              value={newPass}
              onChange={(e) => setNewpass(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </div>

        <div className="w-[100%] flex flex-col md:flex-row justify-between">
          <label htmlFor="conPass">Comfirm new password: </label>
          <input
            className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
            type="password"
            name="conPass"
            id="conPass"
            value={conPass}
            onChange={(e) => setConpass(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        <div className="text-right">
          <Button
            disabled={disableBtn}
            btnStyle="w-[150px] font-bold p-2 mt-5 shadow-lg bg-[var(--white)] text-[13px] rounded-lg disabled:text-gray-300 disabled:bg-gray-200"
          >
            {isPen ? "Changing..." : "Change password"}
          </Button>
        </div>
      </form>

      {IsWarning && (
        <WarningModal
          setIswarning={setIswarning}
          warningMsg={warningMsg}
          action={changePassActon}
        />
      )}
      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </div>
  );
}
