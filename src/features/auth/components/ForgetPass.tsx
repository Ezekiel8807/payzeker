"use client";
import { useEffect, useState } from "react";
import { changePass } from "@/features/auth/actions/changePass";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import WarningModal from "@/shared/components/modals/WarningModal";
import useFormState from "@/shared/hooks/useFormState";
import PasswordInput from "@/shared/components/auth/PasswordInput";
import LoadingButton from "@/shared/components/ui/LoadingButton";

export default function ForgetPass() {
  const { isSuc, setIssuc, errMsg, setErrmsg, sucMsg, setSucmsg, isErr, setIserr, isPen, setIspen } = useFormState();
  const [IsWarning, setIswarning] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");
  const [oldPass, setOldpass] = useState("");
  const [newPass, setNewpass] = useState("");
  const [conPass, setConpass] = useState("");
  const [disableBtn, setDisablebtn] = useState(true);

  useEffect(() => {
    setDisablebtn(!(oldPass !== "" && newPass !== "" && conPass !== ""));
  }, [oldPass, newPass, conPass]);

  async function changePassActon() {
    const updatePass = await changePass(oldPass, newPass, conPass);
    if (updatePass.error != false) { setErrmsg(updatePass.msg); setIserr(true); setIspen(false); return; }
    setOldpass(""); setNewpass(""); setConpass("");
    setSucmsg("Password successfully changed!"); setIssuc(true); setIspen(false);
  }

  async function handleChagePass(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);
    if (!oldPass || !newPass || !conPass) { setErrmsg("All fields required!"); setIserr(true); setIspen(false); return; }
    if (newPass != conPass) { setErrmsg("password don't match!"); setIserr(true); setIspen(false); return; }
    setWarningMsg("You about to take action that will change your account Password");
    setIswarning(true);
  }

  return (
    <div className="card w-full my-5">
      <h2 className="font-black text-2xl text-ink mb-5">Change Password</h2>
      <form onSubmit={handleChagePass}>
        <div className="flex flex-col gap-5 mb-5 items-center justify-between">
          <PasswordInput id="oldPass" label="Old password:" value={oldPass} onChange={(e) => setOldpass(e.target.value)} required placeholder="Enter old password" className="w-full" />
          <PasswordInput id="newPass" label="New password:" value={newPass} onChange={(e) => setNewpass(e.target.value)} required placeholder="Enter new password" className="w-full" />
        </div>
        <PasswordInput id="conPass" label="Confirm new password:" value={conPass} onChange={(e) => setConpass(e.target.value)} required placeholder="Confirm new password" className="w-full" />
        <div className="text-right">
          <LoadingButton isLoading={isPen} loadingText="Changing..." disabled={disableBtn} className="w-[150px] mt-5">
            Change password
          </LoadingButton>
        </div>
      </form>
      {IsWarning && <WarningModal setIswarning={setIswarning} warningMsg={warningMsg} action={changePassActon} />}
      {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </div>
  );
}
