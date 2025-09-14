import User from "@/actions/model/userModel";
import Task from "@/actions/model/taskModel";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Notification from "@/actions/model/notificationModel";

export async function PATCH() {
  try {
    //connect to database
    await connectDB();

    //current date time
    const now = new Date();

    // Fetch all TAsks that are currently active
    const tasks = await Task.find({ isActive: "true" });

    // Distribute tasks to users
    for (const task of tasks) {
      //get task end date
      const expiry = new Date(task.endDate);

      // fetch the user that has the task
      const taskUser = await User.findById(task.userId);

      if (expiry < now) {
        // Change task active state
        task.isActive = "false";

        //save chhanges
        await task.save();

        // Notify user Plan set to default
        const newNotification = new Notification({
          username: taskUser.username,
          message: `😔 Oops your Task with the name "${task.name}" has expired!`,
        });

        // Save to database
        await newNotification.save();

        //
      } else {
        // Task is still active
        const msRemaining = expiry.getTime() - now.getTime();
        const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

        if (daysRemaining < 3) {
          //

          // Notify user Plan set to default
          const warnNotification = new Notification({
            username: taskUser.username,
            message: `⚠️ Task with the name "${
              task.name
            }" expires in ${daysRemaining} ${
              daysRemaining > 1 ? "days" : "day"
            }.`,
          });

          // Save to database
          await warnNotification.save();
        }
      }
    }

    //responce
    return NextResponse.json(
      { success: "Expired tasks successfully updated" },
      { status: 200 }
    );
    //
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `Failed to rest expired plan: ${err}` },
      { status: 500 }
    );
  }
}
