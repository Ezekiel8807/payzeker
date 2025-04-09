"use client";
// import { useState } from "react";

//components
import Table from "../Table";
import Search from "../Search";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AllTrans({ trans }: { trans: any }) {
  const alltrans = trans;

  return (
    <div>
      <div className="w-[100%]">
        <Search />

        <Table>
          {alltrans.length > 0 ? (
            <>
              <thead>
                <tr>
                  <td>S/n</td>
                  <td>TransID</td>
                  <td>UserID</td>
                  <td>State</td>
                  <td>Amount</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {alltrans.map(
                  (
                    tr: {
                      _id: string;
                      userId: string;
                      type: string;
                      amount: number;
                      status: string;
                    },
                    i: number
                  ) => (
                    <tr className="table-column" key={tr._id}>
                      <td className="table-cell">{++i}</td>
                      <td>{tr._id}</td>
                      <td>{tr.userId}</td>
                      <td>{tr.status}</td>
                      <td>{tr.amount}</td>
                      <td>delete</td>
                    </tr>
                  )
                )}
              </tbody>
            </>
          ) : (
            <></>
          )}
        </Table>
      </div>
    </div>
  );
}
