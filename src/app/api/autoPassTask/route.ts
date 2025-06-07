import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Transaction from "@/model/transactionModel";
import SubmittedTask from "@/model/submittedTaskModel";

export async function PATCH() {
  try {
    await connectDB();

    // 1. Get all submitted tasks
    const submittedTasks = await SubmittedTask.find({ state: "submitted" });

    // 2. Loop through and update each
    // const results = [];

    for (const submittedTask of submittedTasks) {
      const user = await User.findById(submittedTask.userId);

      if (!user) continue;

      // Update task status
      submittedTask.state = "approved";
      await submittedTask.save();

      // Update user balance
      user.account.balance += submittedTask.price;
      await user.save();

      //fetch the transaction
      const transaction = new Transaction({
        userId: submittedTask.userId,
        type: "deposit",
        status: "successful",
        amount: submittedTask.price,
        disc: `#${submittedTask.price} for completing a tasks`,
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
