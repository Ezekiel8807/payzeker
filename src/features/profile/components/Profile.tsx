"use client";
import Image from "next/image";
import { useState } from "react";

//coponents
import AcctProUpdate from "./proUpdate/AcctProUpdate";
import PersonalProUpdate from "./proUpdate/PersonalProUpdate";

type ProfileProbs = {
  userInfo: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    rank: number;
    bankName: string;
    bankAcctNo: number;
  };
};

export default function Profile({ userInfo }: ProfileProbs) {
  const username = userInfo.username;
  const email = userInfo.email;
  const rank = userInfo.rank;
  const [firstname, setFirstname] = useState(userInfo.firstname);
  const [lastname, setLastname] = useState(userInfo.lastname);
  const fullname = `${lastname} ${firstname}`;
  const [bankName, setBankName] = useState(userInfo.bankName);
  const [bankAcctNo, setBankAcctNo] = useState(userInfo.bankAcctNo.toString());

  return (
    <div>
      <div className="flex mb-5 justify-end">
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h1 className="font-black text-lg md:text-2xl">
              {fullname}
            </h1>
            <h3 className="font-normal text-sm md:text-xl">{username}</h3>
            <p className="font-bold text-xs md:text-base">Rank {rank}</p>
          </div>

          <Image
            src="/icons/user-139.svg"
            width="100"
            height="100"
            alt="User profile image"
            className="w-24 h-24 md:w-36 md:h-36 rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start justify-between gap-5">
        <PersonalProUpdate
          userpersonalData={{
            firstname,
            lastname,
            setLastname,
            setFirstname,
            username,
            email,
          }}
        />
        <AcctProUpdate
          userAcctData={{
            fullname,
            username,
            bankName,
            bankAcctNo,
            setBankName,
            setBankAcctNo,
          }}
        />
      </div>
    </div>
  );
}
