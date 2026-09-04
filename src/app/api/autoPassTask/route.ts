import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { NextResponse } from "next/server";
import Transaction from "@/shared/models/transactionModel";
import SubmittedTask from "@/features/tasks/models/submittedTaskModel";

export async function PATCH() {
  try {
    await connectDB();

    // 1. Get all submitted tasks
    const submittedTasks = await SubmittedTask.find({ state: "submitted" });

    // 2. Loop through and update each
    for (const submittedTask of submittedTasks) {
      const user = await User.findById(submittedTask.userId);

      if (!user) continue;

      // Update task status
      submittedTask.state = "completed";
      await submittedTask.save();

      //increase completed task counter
      user.completedTask += 1;

      // Update user balance
      user.account.earning += submittedTask.price;
      await user.save();

      //fetch the transaction
      const transaction = new Transaction({
        userId: submittedTask.userId,
        type: "credit",
        status: "successful",
        amount: submittedTask.price,
        disc: `#${submittedTask.price} - Task completion`,
      });

      //save to update new info
      await transaction.save();
    }

    return NextResponse.json(
      { success: "All submitted tasks passed!" },
      { status: 200 }
    );
    //

    //
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: `Failed to pass tasks ${err}` },
      { status: 500 }
    );
  }
}
