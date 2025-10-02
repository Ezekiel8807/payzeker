"use server";
import { connectDB } from "@/lib/mongodb";
import User from "../../../../../model/userModel";
import { NextResponse } from "next/server";

//task data model
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userName: string }> }
) {
  const { userName } = await params;

  //
  try {
    //connect to dataBase
    await connectDB();

    //fetch data from database
    const user = await User.findOne({ username: userName });
    if (!user) throw new Error("user not found");

    //respond with data
    return new Response(JSON.stringify(user.tasks), {
      headers: {
        "Content-Typpe": "application/json",
      },
      status: 200,
    });
  } catch (err) {
    //respond with data
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
