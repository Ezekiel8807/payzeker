"use client";
import { useState } from "react";
import { createPlan } from "@/actions/planAction";

//components
import Button from "../Button";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";

export default function PlanCreationForm() {
  const [isSuc, setIssuc] = useState(false);
  const [errMsg, setErrmsg] = useState("");
  const [sucMsg, setSucmsg] = useState("");
  const [isErr, setIserr] = useState(false);
  const [isPen, setIspen] = useState(false);

  const [name, setName] = useState("");
  const [rank, setRank] = useState<number | string>(1);
  const [duration, setDuration] = useState("1 month");
  const [isDefault, setIsdefault] = useState("");
  const [minWid, setMinwid] = useState<number | string>("");
  const [maxWid, setMaxwid] = useState<number | string>("");
  const [minEarn, setMinearn] = useState<number | string>("");
  const [price, setPrice] = useState<number | string>("");

  async function handleCreatePlan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    if (
      !name ||
      !rank ||
      !duration ||
      !minWid ||
      !maxWid ||
      !minEarn ||
      !price
    ) {
      setErrmsg("Data missing... fill all required fields!");
      setIserr(true);
      return;
    }

    console.log(isDefault);

    // const response = await createPlan({
    //   name,
    //   rank,
    //   duration,
    //   minWid,
    //   maxWid,
    //   minEarn,
    //   price,
    // });

    // if (response.error) {
    //   setErrmsg(response.msg as string);
    //   setIserr(true);
    //   return;
    // }

    // setSucmsg(response.msg as string);
    // setIssuc(true);
    setIspen(false);
  }

  return (
    <>
      <form
        onSubmit={handleCreatePlan}
        className="p-5 mb-5 bg-[var(--gray-10)]"
      >
        <input
          className="w-full h-full block p-2 outline-none"
          type="text"
          name="name"
          id="name"
          required
          value={name}
          placeholder="Enter plan name"
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col md:flex-row mt-5 items-center justify-between gap-5">
          <select
            onChange={(e) => setRank(+e.target.value)}
            className="w-full p-2 outline-none"
            name="level"
            value={rank}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <select
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 outline-none"
            name="social"
            value={duration}
          >
            <option value="1 month">1 Month</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="9 months">9 Months</option>
            <option value="1 year">1 year</option>
          </select>
        </div>

        <div className="flex flex-col md:flex-row mt-5 items-center justify-between gap-5">
          <input
            className="w-full h-full block p-2 outline-none"
            type="number"
            name="minWid"
            required
            value={minWid}
            placeholder="Enter min withdrawal"
            onChange={(e) => setMinwid(e.target.value)}
          />
          <input
            className="w-full h-full block p-2 outline-none"
            type="number"
            name="maxWid"
            required
            value={maxWid}
            placeholder="Enter max withdrawal"
            onChange={(e) => setMaxwid(e.target.value)}
          />

          <input
            className="w-full h-full block p-2 outline-none"
            type="number"
            name="minEarn"
            required
            value={minEarn}
            placeholder="Enter min Earning"
            onChange={(e) => setMinearn(e.target.value)}
          />
        </div>

        <input
          className="w-full h-full block p-2 mt-5 outline-none"
          type="number"
          name="price"
          required
          value={price}
          placeholder="Enter plan Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="mt-5">
          <label className="mr-3" htmlFor="isdefault">
            Set as default plan:
          </label>
          <input
            className="outline-none"
            type="checkbox"
            name="isDefault"
            id="isdefault"
            value={isDefault}
            placeholder="Set as default?"
            onChange={(e) => setIsdefault(e.target.value)}
          />
        </div>

        <div className="mt-5 text-end">
          <Button btnStyle="w-full sm:w-[200px] p-2 font-black text-white bg-[var(--green)]">
            {isPen ? "Creating..." : "Create Plan"}
          </Button>
        </div>
      </form>

      {isSuc && (
        <SuccessModal setIssuc={setIssuc} sucMsg={sucMsg} direction="/plans" />
      )}
      {isErr && <ErrorModal setIserr={setIserr} errMsg={errMsg} />}
    </>
  );
}
