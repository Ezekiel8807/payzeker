"use client";
import { useState } from "react";

//components
import Button from "../Button";
import ProUpdateForm from "../form/ProUpdateForm";
import ErrorModal from "../modal/ErrorModal";
import SuccessModal from "../modal/SuccessModal";

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
  const [isPen, setIspen] = useState(false);

  const { firstname, lastname, setFirstname, setLastname, username, email } =
    userpersonalData;

  //
  async function handlePerProUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    //set pending to true
    setIspen(true);

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

    //set pending to false
    setIspen(false);
  }

  return (
    <ProUpdateForm handleForm={handlePerProUp} title="Personal Information">
      <div className="flex flex-col md:flex-row mb-5 md:justify-between">
        <label htmlFor="firstname">Firstname: </label>
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
          autoComplete="true"
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
          autoComplete="true"
          name="email"
          id="email"
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
