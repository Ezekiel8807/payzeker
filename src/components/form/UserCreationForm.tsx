"use client";
import { useState } from "react";
// import { fileUpload } from "@/actions/fileUpload";
// import { createTask } from "@/actions/taskActions";

//components
import Button from "../Button";
// import SuccessModal from "../modal/SuccessModal";
// import ErrorModal from "../modal/ErrorModal";

export default function UserCreationForm() {
  // const [isSuc, setIssuc] = useState(false);
  // const [errMsg, setErrmsg] = useState("");
  // const [sucMsg, setSucmsg] = useState("");
  // const [isErr, setIserr] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [conpass, setConpass] = useState("");
  const [pass, setPass] = useState("");
  const [isPen, setIspen] = useState(false);

  async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    if (!username || !email || !pass) {
      // setErrmsg("Fill all required field!");
      console.log("Fill all required field!");
      // setIserr(true);
      setIspen(false);
      return;
    }

    // if (res.error) {
    //   setErrmsg(res.msg as string);
    //   setIserr(true);
    //   setIspen(false);
    //   return;
    // }

    // setSucmsg(res.msg as string);
    // setIssuc(true);
    setIspen(false);
  }

  return (
    <>
      <form onSubmit={handleCreateTask} className="p-5 bg-[var(--gray-10)]">
        <label htmlFor="username">Username:</label>
        <input
          className="w-full h-full block p-2 outline-none"
          type="text"
          name="username"
          id="username"
          required
          value={username}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          className="w-full h-full block p-2 outline-none"
          type="email"
          name="email"
          id="email"
          required
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass">Password:</label>
        <input
          className="p-2 mt-3 outline-none"
          type="password"
          name="pass"
          id="pass"
          required
          value={pass}
          placeholder="Enter password"
          onChange={(e) => setPass(e.target.value)}
        />

        <label htmlFor="conpass">Confirm Password:</label>
        <input
          className="p-2 mt-3 outline-none"
          type="password"
          name="conpass"
          id="conpass"
          required
          value={conpass}
          placeholder="Enter confirm password"
          onChange={(e) => setConpass(e.target.value)}
        />

        <div className="mt-5 text-end">
          <Button btnStyle="w-full sm:w-[200px] p-2 font-black text-white bg-[var(--green)]">
            {isPen ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>

      {/* {isSuc && <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} />}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />} */}
    </>
  );
}
