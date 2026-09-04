"use server";
import { getToken } from "@/features/auth/actions/action";
import Task from "@/features/tasks/models/taskModel";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Transaction from "@/shared/models/transactionModel";
import Notification from "@/shared/models/notificationModel";
import SubmittedTask from "@/features/tasks/models/submittedTaskModel";
import { calculateEndDate } from "@/shared/utils/dateFunc";

type taskCreateInfo = {
  taskName: string; level: number; price: number; social: string;
  fileType: string; fileUrl: string; duration: string; caption: string;
  instruction: string; billingPrice: number;
};

type subTaskInfo = { taskId: string; taskFileType: string; taskFileLink: string; };

export async function createTask({ taskName, level, price, social, fileType, fileUrl, duration, caption, instruction, billingPrice }: taskCreateInfo) {
  const userToken = await getToken();
  if (!userToken) return redirect("/login");

  if (!taskName || !level || !price || !social || !duration || !billingPrice || !instruction) {
    return { error: true, msg: "Fill all required fields!" };
  }

  const startDate = new Date();
  const userId = userToken.id as string;
  const endDate = calculateEndDate(startDate, duration);

  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "User not found!" };

    if (user.account.balance < billingPrice) return { error: true, msg: "Insufficient funds!" };

    user.account.balance -= billingPrice;
    await user.save();

    const task = new Task({ userId, name: taskName, level, price, socialTarget: social, media: { type: fileType, content: fileUrl }, caption, instruction, billingPrice, startDate, endDate });
    await task.save();

    await new Transaction({ userId, type: "debit", status: "successful", amount: billingPrice, disc: `#${billingPrice} for task creation` }).save();
    await new Notification({ username: user.username, message: "Task created successfully 😃" }).save();

    revalidatePath("/dashboard");
    return { error: false, msg: "Task created successfully" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function subTask({ taskId, taskFileType, taskFileLink }: subTaskInfo) {
  try {
    const userToken = await getToken();
    if (!userToken) redirect("/login");

    const userId = userToken.id as string;
    if (!taskId || !taskFileType || !taskFileLink) return { error: true, msg: "Error something went wrong!" };

    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    const userTask = await user.tasks.id(taskId);
    if (!userTask) return { error: true, msg: "Error can't find user task!" };

    userTask.state = "review";
    await user.save();

    const newTaskSubmission = new SubmittedTask({ userId, taskId, taskName: userTask.name, price: userTask.price, type: taskFileType, content: taskFileLink, instruction: userTask.instruction });
    await newTaskSubmission.save();

    return { error: false, msg: "Task Submitted successfully" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function verifyTask(userId: string, subTaskId: string) {
  if (!userId || !subTaskId) return { error: true, msg: "Error something went wrong!" };

  try {
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    const task = await SubmittedTask.findById(subTaskId);
    if (!task) return { error: true, msg: "Error can't find task submitted!" };
    if (task.state === "completed") return { error: true, msg: "Task already verified" };

    task.state = "completed";
    await task.save();

    user.completedTask += 1;
    user.account.earning += task.price;
    await user.save();

    await new Transaction({ userId, type: "credit", status: "successful", amount: task.price, disc: `#${task.price} for completing a tasks` }).save();
    await new Notification({ username: user.username, message: `Congrat😃, #${task.price} paid for completing a tasks` }).save();

    return { error: false, msg: "Task Verification completed!" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function rejectTask(userId: string, subTaskId: string) {
  if (!userId || !subTaskId) return { error: true, msg: "Error something went wrong!" };

  try {
    const user = await User.findById(userId);
    if (!user) return { error: true, msg: "Error can't find user!" };

    const task = await SubmittedTask.findById(subTaskId);
    if (!task) return { error: true, msg: "Error can't find task submitted!" };

    task.state = "rejected";
    await task.save();

    await new Notification({ username: user.username, message: "Sorry😔, task verification failed!." }).save();
    return { error: false, msg: "Task rejected sucessfully!" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function pauseTask(taskId: string) {
  const pauseDate = new Date();
  try {
    await connectDB();
    const task = await Task.findById(taskId);
    if (!task) return { error: true, msg: "Task not found" };

    const endDate = new Date(task.endDate);
    const remainingDays = Math.ceil((endDate.getTime() - pauseDate.getTime()) / (1000 * 60 * 60 * 24));

    task.pauseDate = pauseDate;
    task.remainingDays = remainingDays;
    task.isActive = false;
    await task.save();

    revalidatePath("/tasks");
    return { error: false, msg: "Task paused sucessfully!" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function reactivateTask(taskId: string) {
  try {
    await connectDB();
    const task = await Task.findById(taskId);
    if (!task) return { error: true, msg: "Task not found" };

    const now = new Date();
    if (task.remainingDays && task.remainingDays > 0) {
      const newEndDate = new Date(now);
      newEndDate.setDate(now.getDate() + task.remainingDays);
      task.startDate = new Date(now);
      task.endDate = newEndDate;
      task.isPaused = false;
    }

    task.pauseDate = null;
    task.remainingDays = null;
    task.isActive = true;
    await task.save();

    revalidatePath("/tasks");
    return { error: false, msg: "Task activated sucessfully!" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}

export async function deleteTask(taskId: string) {
  try {
    await connectDB();
    const deleted = await Task.findByIdAndDelete(taskId);
    if (!deleted) throw new Error("Task not found");

    revalidatePath("/tasks");
    return { error: false, msg: "Task deleted sucessfully!" };
  } catch (err) {
    return { error: true, msg: err instanceof Error ? err.message : "An unknown error occurred" };
  }
}
