"use server";
import bcrypt from "bcryptjs";
import { getToken } from "./action";
import User from "@/shared/models/userModel";

export async function changePass(oldPass: string, newPass: string, conPass: string) {
  const token = await getToken();
  const username = token?.username as string;

  if (!oldPass || !newPass || !conPass) return { error: true, msg: "All fields required!" };
  if (newPass != conPass) return { error: true, msg: "password don't match!" };

  const user = await User.findOne({ username });
  if (!user) return { error: true, msg: "No user found!" };

  const isValidPassword = await bcrypt.compare(oldPass, user?.password);
  if (!isValidPassword) return { error: true, msg: "Enter the correct old password" };

  const newHashPass = await bcrypt.hash(newPass, 10);
  if (!newHashPass) return { error: true, msg: "Something went wrong" };

  const updatePass = await User.findOneAndUpdate(
    { username },
    { $set: { password: newHashPass } },
    { new: true }
  );

  if (!updatePass) return { error: true, msg: "Unable to change password" };
  return { error: false, msg: "Password updated successfully!" };
}
