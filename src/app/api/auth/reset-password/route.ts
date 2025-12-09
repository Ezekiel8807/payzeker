import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { validateResetPassword } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    let validatedData;
    try {
      validatedData = validateResetPassword(body);
    } catch (error) {
      return NextResponse.json(
        {
          error: true,
          message: error instanceof Error ? error.message : "Invalid input",
        },
        { status: 400 }
      );
    }

    const { token, newPassword } = validatedData;

    // Hash the token to compare with stored hash
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Connect to database
    await connectDB();

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: true,
          message: "Invalid or expired reset token. Please request a new one.",
        },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json({
      error: false,
      message:
        "Password reset successful. You can now login with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { error: true, message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
