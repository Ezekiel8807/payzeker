import React from "react";
import Button from "./Button";

export default function Search() {
  return (
    <form className="w-full my-5 flex" action="">
      <input
        className="w-full px-5 outline-none bg-[var(--gray-05)]"
        type="text"
        name=""
        id=""
        placeholder="Enter search"
      />

      <Button btnStyle="w-[100px] font-black text-white p-2 bg-[var(--green)]">
        Search
      </Button>
    </form>
  );
}
