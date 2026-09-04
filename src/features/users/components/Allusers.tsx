import React from "react";

//components
import Table from "@/shared/components/ui/Table";
import Search from "@/shared/components/ui/Search";

// Define the User interface based on the structure used in the component
interface User {
  _id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  planName: string;
  rank: number;
  completedTask: number;
  createdAt: string;
  account: {
    balance: number;
    earning: number;
  };
}

export default function Allusers({
  allUsers,
  currentPage,
  totalPages,
}: {
  allUsers: User[];
  currentPage: number;
  totalPages: number;
}) {
  const Users = allUsers;
  return (
    <>
      <Search />
      <Table createLocation="/users/newUser">
        <thead className="table-head">
          <tr>
            <td className="table-cell min-w-[50px]">S/n</td>
            <td className="table-cell min-w-[150px] text-left">Username</td>
            <td className="table-cell min-w-[200px] text-left">Email</td>
            <td className="table-cell min-w-[100px] text-left">Plan</td>
            <td className="table-cell min-w-[100px]">Rank</td>
            <td className="table-cell min-w-[150px] text-left">Names (Surname First)</td>
            <td className="table-cell min-w-[120px]">Earning</td>
            <td className="table-cell min-w-[120px]">Balance</td>
            <td className="table-cell min-w-[100px]">Tasks Done</td>
            <td className="table-cell min-w-[150px] text-left">Date Joined</td>
            <td className="table-cell min-w-[100px]">Action</td>
          </tr>
        </thead>
        <tbody>
          {Users.map(
            (
              user: User,
              i: number
            ) => (
              <tr className="table-roll" key={user._id}>
                <td className="table-cell">{(currentPage - 1) * 20 + i + 1}</td>
                <td className="table-cell text-left">{user.username}</td>
                <td className="table-cell text-left">{user.email}</td>
                <td className="table-cell text-left">
                  {user.planName || <span className="text-red-500">None</span>}
                </td>
                <td className="table-cell">{user.rank}</td>
                <td className="table-cell text-left">
                  {user.lastname} {user.firstname}
                </td>
                <td className="table-cell">
                  #{user.account.earning.toFixed(2)}
                </td>
                <td className="table-cell">
                  #{user.account.balance.toFixed(2)}
                </td>
                <td className="table-cell">{user.completedTask}</td>
                <td className="table-cell text-left">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="table-cell text-red-500 cursor-pointer">
                  Delete
                </td>
              </tr>
            )
          )}
        </tbody>
      </Table>
      {/* Pagination Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <a
          href={`?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className={`btn btn-primary ${currentPage <= 1 ? "opacity-50 pointer-events-none" : ""
            }`}
        >
          Previous
        </a>
        <span className="px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <a
          href={`?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
          className={`btn btn-primary ${currentPage >= totalPages ? "opacity-50 pointer-events-none" : ""
            }`}
        >
          Next
        </a>
      </div>
    </>
  );
}
