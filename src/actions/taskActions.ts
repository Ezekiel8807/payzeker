"use server";
import { getToken } from "./action";
import User from "@/model/userModel";
import Task from "@/model/taskModel";
import Transaction from "@/model/transactionModel";
import Notification from "@/model/notificationModel";
import SubmittedTask from "@/model/submittedTaskModel";
import { calculateEndDate } from "@/utils/dateFunc";
import { redirect } from "next/navigation";

type taskCreateInfo = {
  taskName: string;
  level: number;
  price: number;
  social: string;
  link: string;
  fileType: string;
  fileUrl: string;
  duration: string;
  caption: string;
  instruction: string;
  billingPrice: number;
};

type subTaskInfo = {
  taskId: string;
  taskFileType: string;
  taskFileLink: string;
};

export async function createTask({
  taskName,
  level,
  price,
  social,
  link,
  fileType,
  fileUrl,
  duration,
  caption,
  instruction,
  billingPrice,
}: taskCreateInfo) {
  const userToken = await getToken();
  if (!userToken) return redirect("/login");

  //
  //
  if (
    !taskName ||
    !level ||
    !price ||
    !social ||
    !duration ||
    !billingPrice ||
    !instruction
  )
    return { error: true, msg: "Fill all required fields!" };

  // const validDurations = ["7 days", "14 days", "1 month", "3 months"];
  // if (!validDurations.includes(duration))
  //   return { error: true, msg: "Invalid task duration" };

  const startDate = new Date();
  const userId = userToken.id as string;

  const endDate = calculateEndDate(startDate, duration);

  try {
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    //
    const balance = user.account.balance;

    if (balance < billingPrice)
      return { error: true, msg: "Insufficient funds!" };

    const newBalance = balance - billingPrice;
    user.account.balance = newBalance;

    await user.save();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const taskData: any = {
      userId: userToken.id,
      name: taskName,
      level,
      price,
      socialTarget: social,
      link,
      caption,
      instruction,
      startDate,
      endDate,
    };

    if (fileUrl) {
      taskData.media = { type: fileType, content: fileUrl };
    }

    const newTask = await new Task(taskData);
    await newTask.save();

    //fetch the transaction
    const transaction = new Transaction({
      userId,
      type: "debit",
      status: "successful",
      amount: billingPrice,
      disc: `#${billingPrice} for task creation`,
    });

    //save to update new info
    await transaction.save();

    const notification = new Notification({
      username: user.username,
      message: `Task created successfully😃`,
    });

    //save to update new info
    await notification.save();

    return { error: false, msg: "Task created successfully" };

    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

export async function subTask({
  taskId,
  taskFileType,
  taskFileLink,
}: subTaskInfo) {
  const userToken = await getToken();
  if (!userToken) return redirect("/login");

  //
  //
  const userId = userToken.id as string;

  try {
    if (!taskId || !taskFileType || !taskFileLink)
      return { error: true, msg: "Error something went wrong!" };

    //fetch the user
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    const userTask = await user.tasks.id(taskId);
    if (!userTask) return { error: true, msg: "Error can't find user task!" };

    //update task state
    userTask.state = "review";

    //save update
    await user.save();

    const newTaskSubmission = await new SubmittedTask({
      userId,
      taskId,
      taskName: userTask.name,
      price: userTask.price,
      type: taskFileType,
      content: taskFileLink,
      instruction: userTask.instruction,
    });

    //save task
    await newTaskSubmission.save();

    return { error: false, msg: "Task Submitted successfully" };

    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

export async function verifyTask(userId: string, subTaskId: string) {
  if (!userId || !subTaskId)
    return { error: true, msg: "Error something went wrong!" };

  try {
    //fetch the user
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    //fetch submitted task
    const task = await SubmittedTask.findById(subTaskId);
    if (!task) return { error: true, msg: "Error can't find task submitted!" };

    if (task.state === "completed")
      return { error: true, msg: "Task already verified" };

    //update task status
    task.state = "completed";

    //save to update new info
    await task.save();

    //increase completed task by one
    user.completedTask += 1;

    //add price to balance
    user.account.balance += task.price;

    //save to update new info
    await user.save();

    //fetch the transaction
    const transaction = new Transaction({
      userId,
      type: "credit",
      status: "successful",
      amount: task.price,
      disc: `#${task.price} for completing a tasks`,
    });

    //save to update new info
    await transaction.save();

    const notification = new Notification({
      username: user.username,
      message: `Congrat😃, #${task.price} paid for completing a tasks`,
    });

    //save to update new info
    await notification.save();

    return { error: false, msg: "Task Verification completed!" };
    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}

export async function rejectTask(userId: string, subTaskId: string) {
  if (!userId || !subTaskId)
    return { error: true, msg: "Error something went wrong!" };

  try {
    //fetch the user
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    //fetch submitted task
    const task = await SubmittedTask.findById(subTaskId);
    if (!task) return { error: true, msg: "Error can't find task submitted!" };

    //update task status
    task.state = "rejected";

    //save to update new info
    await task.save();

    const notification = new Notification({
      username: user.username,
      message: "Sorry😔, task verification failed!.",
    });

    //save to update new info
    await notification.save();

    return { error: false, msg: "Task rejected sucessfully!" };
    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
