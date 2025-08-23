"use client";
import React from "react";
import Button from "./Button";
import Main from "./layout/Main";
import Link from "next/link";

export default function Forget() {
  return (
    <Main>
      <div className="flex px-5 sm:px-10 md:px-20 pt-20 items-center justify-center">
        <div className="w-full md:max-w-[50%]">
          <h1 className="text-lead text-xl font-black mb-3">
            Forget Password 🙇‍♂️
          </h1>
          <form>
            <input
              className="w-full p-2 input border outline-none border-[var(--green)] rounded"
              type="email"
              name=""
              id=""
              placeholder="Enter account email"
            />
            <Link className="text-[12px] cursor-pointer" href="/login">
              Back to login
            </Link>
          </form>

          <div className="flex justify-end">
            <Button btnStyle="px-5 py-2 my-5 bg-[var(--green)] rounded">
              Change password
            </Button>
          </div>
        </div>
      </div>
    </Main>
  );
}
