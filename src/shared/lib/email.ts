/**
 * Email Service using Resend (FREE - 3,000 emails/month)
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const APP_NAME = "Payzeker";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string,
  username?: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `Reset Your ${APP_NAME} Password`,
      html: getPasswordResetEmailHTML(resetUrl, username),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(to: string, username: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `Welcome to ${APP_NAME}! 🎉`,
      html: getWelcomeEmailHTML(username),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
}

export async function sendWithdrawalNotificationEmail(
  to: string,
  amount: number,
  status: "pending" | "approved" | "rejected"
) {
  try {
    const { data, error } = await resend.emails.send({
      from: `${APP_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `Withdrawal ${status.charAt(0).toUpperCase() + status.slice(1)} - ₦${amount.toLocaleString()}`,
      html: getWithdrawalEmailHTML(amount, status),
    });

    if (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email service error:", error);
    return { success: false, error };
  }
}

function getPasswordResetEmailHTML(resetUrl: string, username?: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <tr>
            <td style="background: linear-gradient(135deg, #29cd9c 0%, #1fa87a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">🔐 Password Reset</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              ${username ? `<p style="font-size: 16px; color: #333; margin: 0 0 20px;">Hi ${username},</p>` : ""}
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px;">We received a request to reset your password for your Payzeker account.</p>
              <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 30px;">Click the button below to reset your password:</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display: inline-block; padding: 16px 40px; background-color: #29cd9c; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Reset Password</a>
                  </td>
                </tr>
              </table>
              <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 30px 0 0;">Or copy and paste this link into your browser:</p>
              <p style="font-size: 12px; color: #29cd9c; word-break: break-all; margin: 10px 0 30px;">${resetUrl}</p>
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; font-size: 14px; color: #856404;">⚠️ <strong>Important:</strong> This link will expire in 1 hour.</p>
              </div>
              <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 20px 0 0;">If you didn't request this password reset, please ignore this email.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="margin: 0 0 10px; font-size: 14px; color: #666;">© ${new Date().getFullYear()} Payzeker. All rights reserved.</p>
              <p style="margin: 0; font-size: 12px; color: #999;">Made with ❤️ in Nigeria</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getWelcomeEmailHTML(username: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to Payzeker</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #29cd9c 0%, #1fa87a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">🎉 Welcome to Payzeker!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 16px; color: #333; margin: 0 0 20px;">Hi ${username},</p>
              <p style="font-size: 16px; color: #333; line-height: 1.6;">Welcome to Payzeker! Start earning money by completing simple tasks today.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${APP_URL}/dashboard" style="display: inline-block; padding: 16px 40px; background-color: #29cd9c; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">Get Started</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #666;">© ${new Date().getFullYear()} Payzeker. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function getWithdrawalEmailHTML(amount: number, status: string): string {
  const statusColors = {
    pending: { bg: "#fff3cd", border: "#ffc107", text: "#856404" },
    approved: { bg: "#d4edda", border: "#28a745", text: "#155724" },
    rejected: { bg: "#f8d7da", border: "#dc3545", text: "#721c24" },
  };
  const colors = statusColors[status as keyof typeof statusColors];

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Withdrawal ${status}</title></head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden;">
          <tr>
            <td style="background: linear-gradient(135deg, #29cd9c 0%, #1fa87a 100%); padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px;">Withdrawal ${status.charAt(0).toUpperCase() + status.slice(1)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px 30px;">
              <div style="background-color: ${colors.bg}; border-left: 4px solid ${colors.border}; padding: 20px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px; color: ${colors.text}; font-weight: bold;">Your withdrawal of ₦${amount.toLocaleString()} has been ${status}.</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center;">
              <p style="margin: 0; font-size: 14px; color: #666;">© ${new Date().getFullYear()} Payzeker. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
