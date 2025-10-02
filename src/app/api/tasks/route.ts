import Task from "@/model/taskModel";
import { connectDB } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

//Get all Task from database
export async function GET() {
  try {
    // connect to database
    await connectDB();

    //fetch data from database
    const tasks = await Task.find();

    //respond with data
    return Response.json(tasks);
  } catch (err) {
    console.log(err);
  }
}

// create new task
export async function POST(request: NextRequest) {
  try {
    const newTask = await request.json();

    //connecd to dataBase
    await connectDB();

    //create new taskk
    const createdTask = new Task(newTask);

    //save created task to dataBase
    const cTask = await createdTask.save();

    //respond with data
    return NextResponse.json(
      { msg: "Task created", task: cTask },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
  }
}

// Delete all tasks
export async function DELETE() {
  try {
    //connecd to dataBase
    await connectDB();

    //create new taskk
    const deletedTask = await Task.deleteMany();

    //respond with data
    return NextResponse.json(
      { msg: "All tasks deleted", task: deletedTask },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
  }
}
