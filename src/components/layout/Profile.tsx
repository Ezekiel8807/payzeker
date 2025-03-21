"use client";
import Image from "next/image";
import { useState } from "react";

//coponents
import Button from "../Button";
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
  const [bankAcctNo, setBankAcctNo] = useState(userInfo.bankAcctNo);

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
      <div className="w-full my-5 p-5 bg-[var(--green)] rounded-lg">
        <h2 className="font-black text-2xl text-white mb-5">Change Password</h2>

        <form>
          <div className="flex flex-col gap-5 mb-5 items-center justify-between">
            <div className="w-[100%] flex flex-col md:flex-row justify-between">
              <label htmlFor="firstname">Old password: </label>
              <input
                className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1"
                type="text"
                name="firstname"
                id="firstname"
              />
            </div>

            <div className="w-[100%] flex flex-col md:flex-row justify-between">
              <label htmlFor="firstname">New password: </label>
              <input
                className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1"
                type="text"
                name="firstname"
                id="firstname"
              />
            </div>
          </div>

          <div className="w-[100%] flex flex-col md:flex-row justify-between">
            <label htmlFor="firstname">Comfirm new password: </label>
            <input
              className="w-[100%] md:w-[70%] outline-none bg-none border-b-2 p-1"
              type="text"
              name="firstname"
              id="firstname"
            />
          </div>

          <div className="text-right">
            <Button btnStyle="w-[150px] font-bold p-2 mt-5 shadow-lg bg-[var(--white)] rounded-lg">
              Change password
            </Button>
          </div>
        </form>
      </div>
      <Button btnStyle="w-full font-black block p-3 text-center bg-red-600 text-white mb-5 ">
        Delete account
      </Button>
    </div>
  );
}
