/**
 * Input Validation and Sanitization Utilities
 */

import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username must be at most 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
  .trim();

export const emailSchema = z.string().email("Invalid email address").toLowerCase().trim();

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(100, "Password is too long")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

export const loginSchema = z.object({
  username: usernameSchema,
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const amountSchema = z
  .number()
  .positive("Amount must be positive")
  .int("Amount must be a whole number")
  .max(10000000, "Amount exceeds maximum limit");

export const bankDetailsSchema = z.object({
  bankName: z.string().min(1, "Bank name is required").max(100),
  bankCode: z.string().regex(/^\d{3}$/, "Invalid bank code"),
  bankAcctNo: z.string().regex(/^\d{10}$/, "Account number must be 10 digits"),
});

export const withdrawalSchema = z.object({ amount: amountSchema });

export const userUpdateSchema = z.object({
  firstname: z.string().min(1).max(50).trim().optional(),
  lastname: z.string().min(1).max(50).trim().optional(),
  email: emailSchema.optional(),
});

export const forgotPasswordSchema = z.object({ email: emailSchema });

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export function sanitizeString(input: string): string {
  return input.replace(/[<>]/g, "").trim();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sanitizeObject(obj: any): any {
  if (typeof obj === "string") return sanitizeString(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (obj && typeof obj === "object") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sanitized: any = {};
    for (const key in obj) sanitized[key] = sanitizeObject(obj[key]);
    return sanitized;
  }
  return obj;
}

export function validateLogin(data: unknown) {
  const result = loginSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return sanitizeObject(result.data);
}

export function validateRegister(data: unknown) {
  const result = registerSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return sanitizeObject(result.data);
}

export function validateAmount(amount: unknown) {
  const result = amountSchema.safeParse(amount);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return result.data;
}

export function validateBankDetails(data: unknown) {
  const result = bankDetailsSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return sanitizeObject(result.data);
}

export function validateForgotPassword(data: unknown) {
  const result = forgotPasswordSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return sanitizeObject(result.data);
}

export function validateResetPassword(data: unknown) {
  const result = resetPasswordSchema.safeParse(data);
  if (!result.success) throw new Error(result.error.issues[0].message);
  return sanitizeObject(result.data);
}
