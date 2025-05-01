/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "@/lib/mongodb";

//fetch data with any model
export async function fetchModelById(model: any, id: string) {
  try {
    //connect dataBase
    await connectDB();

    const data = await model.findById(id);
    return JSON.parse(JSON.stringify(data));

    //
  } catch (error) {
    console.error("Error fetching model data:", error);
    throw error;
  }
}

//fetch data with model id
export async function fetchModelsData(...models: any[]) {
  try {
    //connect dataBase
    await connectDB();

    const data = await Promise.all(models.map((model) => model.find()));
    return JSON.parse(JSON.stringify(data));

    //
  } catch (error) {
    console.error("Error fetching model data:", error);
    throw error;
  }
}
