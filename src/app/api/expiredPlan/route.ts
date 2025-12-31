import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Notification from "@/model/notificationModel";

export async function PATCH() {
  try {
    //connect to database
    await connectDB();

    //current date time
    const now = new Date();

    // Fetch all users whose planName is not "iron"
    const users = await User.find({ planName: { $ne: "" } });

    for (const user of users) {
      //de
      const expiry = new Date(user.subEndDate);

      if (expiry < now) {
        // Reset plan data
        user.planName = "";
        user.rank = 0;
        user.subEndDate = null;
        user.subStartDate = null;
        user.subDuration = "";
        user.account.withdrawal.allTimeWithdrawal = 0;
        user.account.withdrawal.minWithdrawal = 0;
        user.account.withdrawal.maxWithdrawal = 0;

        //save chhanges
        await user.save();

        // Notify user Plan set to default
        const newNotification = new Notification({
          username: user.username,
          message: `❌ Your subscription has expired.`,
        });

        // Save to database
        await newNotification.save();

        //
      } else {
        // Plan is still active
        const msRemaining = expiry.getTime() - now.getTime();
        const daysRemaining = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));

        if (daysRemaining < 4) {
          //

          // Notify user Plan set to default
          const warnNotification = new Notification({
            username: user.username,
            message: `⚠️ Plan expires in ${daysRemaining} ${
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
      { success: "All expired plan successfully reset" },
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
