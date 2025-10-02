"use client";
import Image from "next/image";
import { useState } from "react";

//coponents
import AcctProUpdate from "../proUpdate/AcctProUpdate";
import PersonalProUpdate from "../proUpdate/PersonalProUpdate";

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
      <div className="flex mb-5 justify-end ">
        <div className="flex items-center gap-2">
          <div className="text-right">
            <h1 className="font-black text-[16px] md:text-[20px]">
              {fullname}
            </h1>
            <h3 className="font-normal md:text-[20px]">{username}</h3>
            <p className="font-bold text-[10px] md:text-[16px]">Rank {rank}</p>
          </div>

          <Image
            src="/icons/user-139.svg"
            width="100"
            height="100"
            alt="User profile image"
            className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-top justify-between gap-5">
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
