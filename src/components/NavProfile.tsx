"use client";

import Image from "next/image";

type NavProfileProbs = {
  userName: string;
  userRank: number | null;
};

export default function NavProfile({ userName, userRank }: NavProfileProbs) {
  return (
    <div className="w-[160px] flex flex-end">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2">
        <div className="hidden lg:block">
          <Image
            src={"/icons/user-139.svg"}
            width={40}
            height={40}
            className="float-end"
            alt="nav profile photo link"
          />
        </div>
        <div className="hidden lg:block">
          <h3 className="font-black -mb-2 text-[15px]">{userName}</h3>
          <span className="font-black -mt-2 text-[10px]">{`Rank: ${userRank}`}</span>
        </div>
      </div>
    </div>
  );
}
