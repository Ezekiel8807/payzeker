import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/model/userModel";
import crypto from "crypto";
import { validateForgotPassword } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod
    let validatedData;
    try {
      validatedData = validateForgotPassword(body);
    } catch (error) {
      return NextResponse.json(
        {
          error: true,
          message: error instanceof Error ? error.message : "Invalid email",
        },
        { status: 400 }
      );
    }

    const { email } = validatedData;

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });

    // Return error if user not found
    if (!user) {
      return NextResponse.json(
        {
          error: true,
          message:
            "No account found with this email address. Please check and try again.",
        },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiry (1 hour from now)
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    // Save token to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Create reset URL
    const resetUrl = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/reset-password?token=${resetToken}`;

    // Send email with reset link
    try {
      const { sendPasswordResetEmail } = await import("@/lib/email");
      const emailResult = await sendPasswordResetEmail(
        user.email,
        resetUrl,
        user.username
      );

      if (!emailResult.success) {
        console.error("❌ Failed to send email:", emailResult.error);
        // In development, show more details
        if (process.env.NODE_ENV === "development") {
          console.error("Email config check:");
          console.error(
            "- RESEND_API_KEY:",
            process.env.RESEND_API_KEY ? "✓ Set" : "✗ Missing"
          );
          console.error(
            "- RESEND_FROM_EMAIL:",
            process.env.RESEND_FROM_EMAIL || "✗ Missing"
          );
        }
      } else {
        console.log(
          "✅ Password reset email sent successfully to:",
          user.email
        );
      }
    } catch (emailError) {
      console.error("❌ Email service error:", emailError);
    }

    // In development, also log to console
    if (process.env.NODE_ENV === "development") {
      console.log("Password Reset URL:", resetUrl);
      console.log("Reset Token:", resetToken);
    }

    // In production, you would send an email here:
    /*
    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    });
    */

    return NextResponse.json({
      error: false,
      message:
        "If an account with that email exists, a password reset link has been sent.",
      // Remove this in production - only for development
      ...(process.env.NODE_ENV === "development" && { resetUrl, resetToken }),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: true, message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
