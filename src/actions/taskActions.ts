"use server";
import Task from "@/model/taskModel";

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
