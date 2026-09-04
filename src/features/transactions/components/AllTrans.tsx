"use client";
import Table from "@/shared/components/ui/Table";
import Search from "@/shared/components/ui/Search";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AllTrans({ trans }: { trans: any }) {
  return (
    <div className="w-full">
      <Search />
      <Table>
        <thead className="table-head">
          <tr>
            <td className="table-cell">S/n</td>
            <td className="table-cell">TransID</td>
            <td className="table-cell">UserID</td>
            <td className="table-cell">Type</td>
            <td className="table-cell">Status</td>
            <td className="table-cell">Amount</td>
            <td className="table-cell">Action</td>
          </tr>
        </thead>
        <tbody>
          {trans.map((tr: { _id: string; userId: string; type: string; status: string; amount: number }, i: number) => (
            <tr className="table-roll" key={tr._id}>
              <td className="table-cell">{++i}</td>
              <td className="table-cell">{tr._id}</td>
              <td className="table-cell">{tr.userId}</td>
              <td className="table-cell">{tr.type}</td>
              <td className="table-cell">{tr.status}</td>
              <td className="table-cell">{`#${tr.amount}`}</td>
              <td className="table-cell">delete</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
