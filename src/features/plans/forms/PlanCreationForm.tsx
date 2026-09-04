"use client";
import { useState } from "react";
import { createPlan } from "@/features/plans/actions/planAction";

//components
import Button from "@/shared/components/ui/Button";
import SuccessModal from "@/shared/components/modals/SuccessModal";
import ErrorModal from "@/shared/components/modals/ErrorModal";
import useFormState from "@/shared/hooks/useFormState";

export default function PlanCreationForm() {
  const { isSuc, setIssuc, errMsg, setErrmsg, sucMsg, setSucmsg, isErr, setIserr, isPen, setIspen } = useFormState();

  const [name, setName] = useState("");
  const [rank, setRank] = useState(1);
  const [duration, setDuration] = useState("1 month");
  const [minWid, setMinwid] = useState("");
  const [maxWid, setMaxwid] = useState("");
  const [minEarn, setMinearn] = useState("");
  const [price, setPrice] = useState("");
  const [isDefault, setIsdefault] = useState(true);

  async function handleCreatePlan(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIspen(true);

    try {
      if (
        !name ||
        !rank ||
        !duration ||
        !minWid ||
        !maxWid ||
        !minEarn ||
        !price
      ) {
        setIspen(false);
        setErrmsg("Data missing... fill all required fields!");
        setIserr(true);
        return;
      }

      const response = await createPlan({
        name,
        rank,
        duration,
        minWid: Number(minWid),
        maxWid: Number(maxWid),
        minEarn: Number(minEarn),
        price: Number(price),
        isDefault,
      });

      if (response.error) {
        setIspen(false);
        setErrmsg(response.msg as string);
        setIserr(true);
        return;
      }

      setSucmsg(response.msg as string);
      setIssuc(true);
      setIspen(false);

    } catch (err) {
      setIspen(false);
      setErrmsg(
        err instanceof Error
          ? err.message
          : "Something went wrong creating the plan ❌"
      );
      setIserr(true);

    } finally {
      setIspen(false);
    }
  }

  return (
    <>
      <form
        onSubmit={handleCreatePlan}
        className="card mb-5"
      >
        <input
          className="input"
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
            className="input"
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
            className="input"
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
            className="input"
            type="number"
            name="minWid"
            required
            value={minWid}
            placeholder="Enter min withdrawal"
            onChange={(e) => setMinwid(e.target.value)}
          />
          <input
            className="input"
            type="number"
            name="maxWid"
            required
            value={maxWid}
            placeholder="Enter max withdrawal"
            onChange={(e) => setMaxwid(e.target.value)}
          />

          <input
            className="input"
            type="number"
            name="minEarn"
            required
            value={minEarn}
            placeholder="Enter min Earning"
            onChange={(e) => setMinearn(e.target.value)}
          />
        </div>

        <input
          className="input mt-5"
          type="number"
          name="price"
          required
          value={price}
          placeholder="Enter plan Price"
          onChange={(e) => setPrice(e.target.value)}
        />

        <div className="mt-5 flex items-center gap-2">
          <label className="text-sm font-bold text-ink-soft" htmlFor="isdefault">
            Set as default plan:
          </label>
          <input
            className="h-4 w-4 accent-[var(--green)] outline-none"
            type="checkbox"
            name="isDefault"
            id="isdefault"
            checked={isDefault}
            onChange={(e) => setIsdefault(e.target.checked)}
          />
        </div>

        <div className="mt-5 text-end">
          <Button btnStyle="btn btn-primary w-full sm:w-[200px]">
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
