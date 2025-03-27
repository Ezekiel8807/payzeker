import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import User from "../../../../model/userModel";
import { connectDB } from "../../../../lib/mongodb";
import { encrypt } from "@/actions/action";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const cookieStore = await cookies();

  //connect to db
  await connectDB();

  //fetch user
  const user = await User.findOne({ username: username }).select("+password");

  //check user
  if (!user) {
    return new Response(JSON.stringify({ error: "No user found!" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  // Compare password
  const isValidPassword = await bcrypt.compare(password, user?.password);
  if (!isValidPassword) {
    return new Response(JSON.stringify({ error: "Wrong credentials" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  // Generate JWT token
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  const token = await encrypt({
    id: user._id.toString(),
    username: user.username,
    isAdmin: user.isAdmin,
    expires,
  });

  //save token to cookies
  cookieStore.set("token", token, { expires, httpOnly: true });

  //redirect user to dashboard
  return new Response(JSON.stringify({ success: "Login Successful" }), {
    headers: {
      "Content-Typpe": "application/json",
    },
    status: 200,
  });
  //
}
