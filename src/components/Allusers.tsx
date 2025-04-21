import React from "react";

//components
import Table from "./Table";
import Search from "./Search";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Allusers({ allUsers }: { allUsers: any }) {
  const Users = allUsers;
  return (
    <>
      <Search />
      <Table createLocation="/users/newUser">
        <thead className="table-head">
          <tr>
            <td className="table-cell">S/n</td>
            <td className="table-cell">Username</td>
            <td className="table-cell">UserID</td>
            <td className="table-cell">Surname</td>
            <td className="table-cell">Firstname</td>
            <td className="table-cell">Balance</td>
            <td className="table-cell">Action</td>
          </tr>
        </thead>
        <tbody>
          {Users.map(
            (
              user: {
                _id: string;
                username: string;
                firstname: string;
                lastname: string;
                type: string;
                status: string;
                Balance: number;
                account: {
                  balance: number;
                };
              },
              i: number
            ) => (
              <tr className="table-roll" key={user._id}>
                <td className="table-cell">{++i}</td>
                <td className="table-cell">{user.username}</td>
                <td className="table-cell">{user._id}</td>
                <td className="table-cell">{user.lastname}</td>
                <td className="table-cell">{user.firstname}</td>
                <td className="table-cell">
                  {`#${user.account.balance.toFixed(2)}`}
                </td>
                <td className="table-cell">delete</td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}
