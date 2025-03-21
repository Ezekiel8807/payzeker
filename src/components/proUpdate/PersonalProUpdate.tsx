"use client";

import { useState } from "react";
//components
import ProUpdateForm from "../ProUpdateForm";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

type PersonalProUpdateProbs = {
  userpersonalData: {
    firstname: string;
    lastname: string;
    setLastname: React.Dispatch<React.SetStateAction<string>>;
    setFirstname: React.Dispatch<React.SetStateAction<string>>;
    username: string;
    email: string;
  };
};

export default function PersonalProUpdate({
  userpersonalData,
}: PersonalProUpdateProbs) {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  // const [isPen, setIspen] = useState(false);

  const { firstname, lastname, setFirstname, setLastname, username, email } =
    userpersonalData;

  //
  async function handlePerProUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch(`/api/users/${username}?updateType=personal`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
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
  }

  return (
    <ProUpdateForm handleForm={handlePerProUp} title="Personal Information">
      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="firstname">Name: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
          type="text"
          value={firstname}
          name="firstname"
          id="firstname"
          onChange={(e) => setFirstname(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="lastname">Surname: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
          type="text"
          value={lastname}
          name="lastname"
          id="lastname"
          onChange={(e) => setLastname(e.target.value)}
        />
      </div>

      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="username">Username: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
          type="text"
          value={username}
          readOnly
          disabled
          name="username"
          id="username"
        />
      </div>

      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="email">Email: </label>
        <input
          className="w-full md:w-[70%] outline-none bg-none border-b-2 p-1 text-right"
          type="email"
          value={email}
          readOnly
          disabled
          name="email"
          id="email"
        />
      </div>

      {isSuc && <SuccessModal sucMsg={sucMsg} />}
      {isErr && <ErrorModal errMsg={errMsg} />}
    </ProUpdateForm>
  );
}
