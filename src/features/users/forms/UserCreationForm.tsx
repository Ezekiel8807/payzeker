"use client";
import { useState } from "react";

//components
import Button from "@/shared/components/ui/Button";
import useFormState from "@/shared/hooks/useFormState";

export default function UserCreationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [conpass, setConpass] = useState("");
  const [pass, setPass] = useState("");
  const { isPen, setIspen } = useFormState();

  async function handleCreateTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    if (!username || !email || !pass) {
      console.log("Fill all required field!");
      setIspen(false);
      return;
    }

    setIspen(false);
  }

  return (
    <>
      <form onSubmit={handleCreateTask} className="card mb-5">
        <label htmlFor="username" className="label">Username:</label>
        <input
          className="input"
          type="text"
          name="username"
          id="username"
          required
          value={username}
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email" className="label mt-4">Email:</label>
        <input
          className="input"
          type="email"
          name="email"
          id="email"
          required
          value={email}
          placeholder="Enter email address"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="pass" className="label mt-4">Password:</label>
        <input
          className="input"
          type="password"
          name="pass"
          id="pass"
          required
          value={pass}
          placeholder="Enter password"
          onChange={(e) => setPass(e.target.value)}
        />

        <label htmlFor="conpass" className="label mt-4">Confirm Password:</label>
        <input
          className="input"
          type="password"
          name="conpass"
          id="conpass"
          required
          value={conpass}
          placeholder="Enter confirm password"
          onChange={(e) => setConpass(e.target.value)}
        />

        <div className="mt-5 text-end">
          <Button btnStyle="w-full sm:w-[200px] btn btn-primary">
            {isPen ? "Creating..." : "Create User"}
          </Button>
        </div>
      </form>
    </>
  );
}
