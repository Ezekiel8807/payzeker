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
    const allTasks = await Task.find({ isActive: true });

    // Distribute tasks to users
    for (const user of allUsers) {
      const userRank = user.rank;

      // Shuffle tasks
      const shuffledTasks = [...allTasks].sort(() => Math.random() - 0.5);
      const assignedTasks = shuffledTasks.slice(0, userRank);
      const taskCount = assignedTasks.length;

      // Clone and adjust price based on rank
      const userTasks = assignedTasks.map((task) => ({
        ...task.toObject(),
        price: task.price * userRank,
      }));

      await User.findByIdAndUpdate(user._id, {
        $set: { tasks: userTasks },
        $inc: { overallTask: taskCount },
      });
    }

    //responce
    return NextResponse.json(
      { success: "Tasks Assigned to all users" },
      { status: 200 }
    );
    //
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to assign tasks ${err}` },
      { status: 500 }
    );
  }
}
