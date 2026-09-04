"use client";
import { useState, useCallback, type Dispatch, type SetStateAction } from "react";

type FormStateReturn = {
  isPen: boolean;
  setIspen: Dispatch<SetStateAction<boolean>>;
  isSuc: boolean;
  setIssuc: Dispatch<SetStateAction<boolean>>;
  isErr: boolean;
  setIserr: Dispatch<SetStateAction<boolean>>;
  errMsg: string;
  setErrmsg: Dispatch<SetStateAction<string>>;
  sucMsg: string;
  setSucmsg: Dispatch<SetStateAction<string>>;
  reset: () => void;
};

export default function useFormState(): FormStateReturn {
  const [isPen, setIspen] = useState(false);
  const [isSuc, setIssuc] = useState(false);
  const [isErr, setIserr] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");

  const reset = useCallback(() => {
    setIspen(false);
    setIssuc(false);
    setIserr(false);
    setErrmsg("");
    setSucmsg("");
  }, []);

  return {
    isPen, setIspen,
    isSuc, setIssuc,
    isErr, setIserr,
    errMsg, setErrmsg,
    sucMsg, setSucmsg,
    reset,
  };
}
