import User from "@/model/userModel";
import Task from "@/model/taskModel";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH() {
  try {
    //connect to database
    await connectDB();

    // fetch all users
    const allUsers = await User.find({ isAdmin: false });

    // featch all taskS
    let allTasks = await Task.find();

    // Shuffle tasks for randomness
    allTasks = allTasks.sort(() => Math.random() - 0.5);

    // Distribute tasks to users
    for (const user of allUsers) {
      const tasksToAssign = user.rank;

      // Shuffle tasks to ensure randomness
      const shuffledTasks = [...allTasks].sort(() => Math.random() - 0.5);
      const assignedTasks = shuffledTasks.slice(0, tasksToAssign);

      if (assignedTasks.length > 1) {
        //loop thhrough each to change prce valur
        for (const etask of assignedTasks) {
          etask.price = etask.price * user.rank;
        }
      }

      // Update the user's tasks and overall task count
      await User.findByIdAndUpdate(user._id, {
        $set: { tasks: assignedTasks },
        $inc: { overallTask: assignedTasks.length },
      });
    }

    //responce
    return NextResponse.json(
      { success: "Tasks Assigned to all users" },
      { status: 200 }
    );
    //
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `Failed to assign tasks ${err}` },
      { status: 500 }
    );
  }
}
