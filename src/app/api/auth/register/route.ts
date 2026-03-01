import bcrypt from "bcryptjs";
import User from "@/model/userModel";
// import Plan from "@/model/planModel";
// import Task from "@/model/taskModel";
import Notification from "@/model/notificationModel";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { rateLimit, RATE_LIMITS } from "@/lib/rateLimit";
// import { calculateEndDate } from "@/utils/dateFunc";

const registerRateLimit = rateLimit(RATE_LIMITS.REGISTER);

// Register function
export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = registerRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;

    const body = await request.json();
    const { username, email, password, referralCode } = body;

    // Input validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Validate username format
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        {
          error:
            "Username must be 3-20 characters and contain only letters, numbers, and underscores",
        },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    if (!/[A-Z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one uppercase letter" },
        { status: 400 },
      );
    }

    if (!/[a-z]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one lowercase letter" },
        { status: 400 },
      );
    }

    if (!/[0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one number" },
        { status: 400 },
      );
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return NextResponse.json(
        { error: "Password must contain at least one special character" },
        { status: 400 },
      );
    }

    // Sanitize inputs
    const sanitizedUsername = username.trim().toLowerCase();
    const sanitizedEmail = email.trim().toLowerCase();

    // ✅ Database connection
    await connectDB();

    // Check if user already exists (case-insensitive)
    const existingUser = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${sanitizedUsername}$`, "i") } },
        { email: { $regex: new RegExp(`^${sanitizedEmail}$`, "i") } },
      ],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 },
      );
    }

    // Hash password with higher cost factor for better security
    const hashPass = await bcrypt.hash(password, 12);

    // Generate a unique referral code
    const generateReferralCode = () => {
      return Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    let newReferralCode = generateReferralCode();
    // ensure uniqueness
    while (await User.findOne({ referralCode: newReferralCode })) {
      newReferralCode = generateReferralCode();
    }

    let referredById = null;
    if (referralCode) {
      const referrer = await User.findOne({ referralCode });
      if (referrer) {
        referredById = referrer._id;
        // Increment their referrals count
        referrer.referralsCount += 1;
        await referrer.save();
      }
    }

    // Create new user with sanitized data
    const newUser = new User({
      username: sanitizedUsername,
      email: sanitizedEmail,
      password: hashPass,
      referralCode: newReferralCode,
      referredBy: referredById,
    });

    //save user
    await newUser.save();

    //create Notification
    const welcomeMsg = new Notification({ username: sanitizedUsername });
    await welcomeMsg.save();

    // Return success response
    return NextResponse.json(
      { success: "Account created successfully" },
      { status: 201 },
    );
  } catch {
    // Don't leak system information in error messages
    return NextResponse.json(
      { error: `opps... Something went wrong.` },
      { status: 500 },
    );
  }
}
