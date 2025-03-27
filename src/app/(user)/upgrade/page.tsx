/* -eslint-disable @typescript-eslint/no-explicit-any- */
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import User from "../../../model/userModel";
import { connectDB } from "../../../lib/mongodb";

// Components
import SubHeading from "@/components/SubHeading";
import Upgradecard from "@/components/Upgradecard";
import Main from "@/components/layout/Main";

// Fetch user data on the server
async function getUser() {
  const token = await getToken();
  if (!token?.id) return null;

  //db connection
  await connectDB();

  // Find user and populate tasks
  const user = await User.findOne({ _id: token.id }).populate("tasks");

  // Convert user data to a plain JavaScript object
  return JSON.parse(JSON.stringify(user));
}

const upgrade = [
  {
    name: "IRON",
    rank: 1,
    numOfTask: 1,
    minWid: 15,
    maxWid: 30,
    minEarning: 3,
    price: "Free",
  },
  {
    name: "BRASS",
    rank: 2,
    numOfTask: 2,
    minWid: 15,
    maxWid: 50,
    minEarning: 12,
    price: 5000,
  },
  {
    name: "SILVER",
    rank: 3,
    numOfTask: 3,
    minWid: 10,
    maxWid: 80,
    minEarning: 27,
    price: 15000,
  },
  {
    name: "GOLD",
    rank: 4,
    numOfTask: 4,
    minWid: 5,
    maxWid: 150,
    minEarning: 48,
    price: 30000,
  },
  {
    name: "DIAMOND",
    rank: 5,
    numOfTask: 5,
    minWid: "No",
    maxWid: 200,
    minEarning: 75,
    price: 50000,
  },
];

export default async function Upgrade() {
  const user = await getUser(); // Fetch user data before rendering

  if (!user) {
    return redirect("/login");
  }

  return (
    <Main>
      <SubHeading title="Upgrade" desc="Heigher previledges upgrading." />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 my-5">
        {upgrade.map((el, i) => (
          <Upgradecard
            upgradeInfo={{ ...el, userRank: user.rank, elIndex: 1 + i }}
            key={i}
          />
        ))}
      </div>
    </Main>
  );
}
