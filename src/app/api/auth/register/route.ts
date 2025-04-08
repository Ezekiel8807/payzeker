import bcrypt from "bcryptjs";
import Task from "@/model/taskModel";
import User from "@/model/userModel";
import Notification from "@/model/notificationModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";

// Register function
export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    // ✅ Database connection
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      throw new Error("User already exists!");
    }

    // Hash password
    const hashPass = await bcrypt.hash(password, 10);

    // Get a random task from the task collection
    const task = await Task.aggregate([{ $sample: { size: 1 } }]);
    const assignedTask = task?.[0] || null;

    // Create new user
    const newUser = new User({
      username,
      email,
      overallTask: task.length,
      tasks: assignedTask ? [assignedTask] : [],
      password: hashPass,
    });

    //save user
    await newUser.save();

    //create Notification
    const welcomeMsg = new Notification({ username });
    await welcomeMsg.save();

    // Return success response
    return NextResponse.json(
      { success: "Account created successfully" },
      { status: 201 }
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return NextResponse.json(
      { error: `Failed to create user: ${err.message}` },
      { status: 500 }
    );
  }
}
