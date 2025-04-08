"use server";
import { getToken } from "./action";
import User from "@/model/userModel";
import Task from "@/model/taskModel";
import SubmittedTask from "@/model/submittedTaskModel";

type taskCreateInfo = {
  taskName: string;
  level: number;
  price: number;
  social: string;
  link: string;
  fileType: string;
  fileUrl: string;
  startDate: string;
  endDate: string;
  instruction: string;
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
  startDate,
  endDate,
  instruction,
}: taskCreateInfo) {
  //

  try {
    if (
      !taskName ||
      !level ||
      !price ||
      !social ||
      !startDate ||
      !endDate ||
      !instruction
    )
      return { error: true, msg: "Fill all required fields!" };

    if (!fileUrl) {
      const newTask = await new Task({
        name: taskName,
        level,
        price,
        socialTarget: social,
        link,
        instruction,
        startDate,
        endDate,
      });

      //save task
      await newTask.save();

      //
    } else {
      const newTask = await new Task({
        name: taskName,
        level,
        price,
        socialTarget: social,
        link,
        media: {
          type: fileType,
          content: fileUrl,
        },
        instruction,
        startDate,
        endDate,
      });

      //save task
      await newTask.save();
    }

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

export async function verifyTask() {}

export async function rejectTask() {}
