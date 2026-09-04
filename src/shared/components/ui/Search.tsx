import React from "react";

export default function Search() {
  return (
    <form className="my-5 flex w-full items-center gap-2" action="">
      <input
        className="input flex-1"
        type="search"
        name="search"
        id=""
        placeholder="Enter search"
      />
      <button type="submit" className="btn-primary shrink-0 px-6 py-2.5">
        Search
      </button>
    </form>
  );
}
