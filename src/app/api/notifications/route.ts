import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getToken } from "@/actions/action";
import Notification from "@/model/notificationModel";

export async function GET() {
  try {
    const token = await getToken();
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const notifications = await Notification.find({
      username: token.username,
    })
      .sort({ _id: -1 })
      .lean();

    return NextResponse.json({
      error: false,
      data: JSON.parse(JSON.stringify(notifications)),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: true,
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        data: [],
      },
      { status: 500 },
    );
  }
}
