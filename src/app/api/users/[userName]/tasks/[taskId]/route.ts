import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

type Task = {
  _id?: string;
  name?: string;
  level?: number;
  price?: number;
  state?: string;
  link?: string;
  media?: {
    type?: "link" | "image" | "video";
    content?: string;
  };
  ispaid?: boolean;
  instruction?: string;
};

// Fetch task data for a specific user
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userName: string; taskId: string }> }
) {
  const { userName, taskId } = await params;
  console.log(userName, taskId);

  if (!userName || !taskId) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    //
    // Connect to database
    await connectDB();

    // Fetch user from database and populate tasks
    const user = await User.findOne({ username: userName }).populate("tasks");
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Convert `taskId` to ObjectId if necessary
    const taskObjectId = mongoose.Types.ObjectId.isValid(taskId)
      ? new mongoose.Types.ObjectId(taskId)
      : null;

    if (!taskObjectId) {
      return NextResponse.json({ error: "Invalid task ID" }, { status: 400 });
    }

    // Find task in user's tasks
    const userTask = user.tasks.find(
      (task: Task) => task._id?.toString() === taskObjectId.toString()
    );
    if (!userTask)
      return NextResponse.json({ error: "Task not found" }, { status: 404 });

    // Return task details
    return NextResponse.json({ userTask }, { status: 200 });

    //
  } catch (err) {
    console.error("Error fetching task:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
