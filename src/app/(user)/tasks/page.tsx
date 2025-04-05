import { Key } from "react";
import Task from "@/model/taskModel";
import { redirect } from "next/navigation";
import { getToken } from "@/actions/action";
import { connectDB } from "../../../lib/mongodb";

// Components
import SubHeading from "@/components/SubHeading";
import Main from "@/components/layout/Main";
import Table from "@/components/Table";
import Search from "@/components/Search";

// Fetch user data on the server
async function getTasks() {
  const token = await getToken();
  if (!token) return redirect("/login");

  if (token.isAdmin != true) {
    return redirect("/dashboard");
  }

  //db connection
  await connectDB();

  // Find user and populate tasks
  const tasks = await Task.find();
  if (!tasks) throw new Error("Something went wrong!");

  // Convert tasks data to a plain JavaScript object
  return JSON.parse(JSON.stringify(tasks));
}

export default async function page() {
  const tasks = await getTasks();
  return (
    <Main>
      <SubHeading
        title="All Tasks"
        desc="Earn real cash for completing task."
      />
      <Search />
      <Table disabled={false}>
        {tasks.map((task: { _id: Key | null | undefined; name: string }) => (
          <h1 key={task._id}>{task.name}</h1>
        ))}
      </Table>
    </Main>
  );
}
