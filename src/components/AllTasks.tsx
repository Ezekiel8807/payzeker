import React from "react";
import Search from "./Search";
import Table from "./Table";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AllTasks({ alltasks }: { alltasks: any }) {
  const tasks = alltasks;

  return (
    <>
      <Search />
      <Table createLocation="/tasks/newTask">
        <thead className="table-head">
          <tr>
            <td className="table-cell">S/n</td>
            <td className="table-cell">TaskID</td>
            <td className="table-cell">Name</td>
            <td className="table-cell">State</td>
            <td className="table-cell">level</td>
            <td className="table-cell">Price</td>
            <td className="table-cell">Action</td>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map(
              (
                task: {
                  _id: string;
                  name: string;
                  state: string;
                  level: number;
                  price: number;
                },
                i: number
              ) => (
                <tr className="table-roll" key={task._id}>
                  <td className="table-cell">{++i}</td>
                  <td className="table-cell">{task._id}</td>
                  <td className="table-cell">{task.name}</td>
                  <td className="table-cell">{task.state}</td>
                  <td className="table-cell">{task.level}</td>
                  <td className="table-cell">{`#${task.price.toFixed(2)}`}</td>
                  <td className="table-cell">delete</td>
                </tr>
              )
            )
          ) : (
            <div className="w-full flex items-center justify-center">
              <p className="w-[200px] text-center text-gray-600">
                No Tasks yet🙈. Check back later.
              </p>
            </div>
          )}
        </tbody>
      </Table>
    </>
  );
}
