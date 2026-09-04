import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { encrypt } from "@/features/auth/actions/action";
import { rateLimit, RATE_LIMITS } from "@/shared/lib/rateLimit";

const loginRateLimit = rateLimit(RATE_LIMITS.AUTH);

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = loginRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { username, password } = body;

    // Input validation
    if (!username || !password) {
      return new Response(
        JSON.stringify({ error: "Username and password are required" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Sanitize username (prevent NoSQL injection)
    const sanitizedUsername = String(username).trim().toLowerCase();

    if (sanitizedUsername.length < 3 || sanitizedUsername.length > 20) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    await connectDB();

    // Use case-insensitive search
    const user = await User.findOne({
      username: { $regex: new RegExp(`^${sanitizedUsername}$`, 'i') }
    }).select("+password");

    // Generic error message to prevent user enumeration
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 401,
        }
      );
    }

    // Generate secure token
    const token = await encrypt({
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    });

    const cookieStore = await cookies();
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    // Set secure cookie
    cookieStore.set("token", token, {
      expires,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // CSRF protection
      path: "/",
    });

    // Read the redirectTo param
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirectTo") || "/dashboard";

    return new Response(
      JSON.stringify({ success: "Login Successful", redirectTo }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch {
    // Generic error message - don't leak system info
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again." }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
}

// export async function POST(request: Request) {
//   const { username, password } = await request.json();
//   const cookieStore = await cookies();

//   //connect to db
//   await connectDB();

//   //fetch user
//   const user = await User.findOne({ username: username }).select("+password");

//   //check user
//   if (!user) {
//     return new Response(JSON.stringify({ error: "No user found!" }), {
//       headers: { "Content-Type": "application/json" },
//       status: 500,
//     });
//   }

//   // Compare password
//   const isValidPassword = await bcrypt.compare(password, user?.password);
//   if (!isValidPassword) {
//     return new Response(JSON.stringify({ error: "Wrong credentials" }), {
//       headers: { "Content-Type": "application/json" },
//       status: 500,
//     });
//   }

//   // Generate JWT token
//   const expires = new Date(Date.now() + 60 * 60 * 1000);
//   const token = await encrypt({
//     id: user._id.toString(),
//     email: user.email,
//     username: user.username,
//     isAdmin: user.isAdmin,
//     expires,
//   });

//   //save token to cookies
//   cookieStore.set("token", token, { expires, httpOnly: true });

//   //redirect user to dashboard
//   return new Response(JSON.stringify({ success: "Login Successful" }), {
//     headers: {
//       "Content-Typpe": "application/json",
//     },
//     status: 200,
//   });
//   //
// }
