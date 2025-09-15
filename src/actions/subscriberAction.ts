"use server";
import { connectDB } from "@/lib/mongodb";

import subscriberModel from "@/actions/model/subscriberModel";

export async function addSubscriber(email: string) {
  if (!email) return { error: true, msg: "Email is required" };

  try {
    await connectDB();

    const isSubscriber = await subscriberModel.findOne({ email });
    if (isSubscriber) return { error: true, msg: "You’re already subscribed!" };

    await subscriberModel.create({ email });
    return { error: false, msg: "Thanks for subscribing!" };
    //
    //
  } catch (err) {
    return {
      error: true,
      msg: err instanceof Error ? err.message : "An unknown error occurred",
    };
  }
}
