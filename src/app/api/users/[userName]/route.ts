"use server";
import User from "../../../../model/userModel";
import { connectDB } from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

//get a user
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userName: string }> }
) {
  const { userName } = await params;

  try {
    //connect to database
    await connectDB();

    //fetch data from database
    const user = await User.findOne({ username: userName });

    // user not found
    if (!user) throw new Error("no user found");

    //respond with data

    return NextResponse.json(
      { success: "user data", user: user },
      { status: 200 }
    );

    //
  } catch (err) {
    //respond with data
    return NextResponse.json({ error: err }, { status: 500 });
  }
}

//update user
export async function PATCH(req: Request) {
  const { searchParams } = new URL(req.url);
  const updateType = searchParams.get("updateType");

  // Ensure DB connection
  await connectDB();

  try {
    const data = await req.json();
    const { username } = data;

    if (updateType == "personal") {
      const perUp = await User.findOneAndUpdate(
        { username },
        { $set: { ...data } },
        { new: true }
      );

      if (!perUp) {
        return NextResponse.json(
          { error: "Error updating user" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: "Personal data updated successfully!" },
        { status: 200 }
      );

      //
    } else if (updateType == "account") {
      const accUp = await User.findOneAndUpdate(
        { username },
        {
          $set: {
            "account.withdrawal.bankName": data.bankName,
            "account.withdrawal.bankAcctNo": data.bankAcctNo,
          },
        },
        { new: true }
      );

      if (!accUp) {
        return NextResponse.json(
          { error: "Error updating user" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: "Account data updated successfully!" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ error: `Error: ${err}` }, { status: 500 });
  }
}
