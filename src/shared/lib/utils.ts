/**
 * Utility Functions
 */

import User from "@/shared/models/userModel";
import { connectDB } from "@/shared/lib/mongodb";
import { PAYMENT, ERROR_MESSAGES } from "@/shared/constants";
import type { ApiResponse, ApiError, ApiSuccess } from "@/shared/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createErrorResponse(message: string, data?: any): ApiError {
  return { error: true, message, ...(data && { data }) };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSuccessResponse<T = any>(message: string, data?: T): ApiSuccess<T> {
  return { error: false, message, ...(data && { data }) };
}

export async function getUserById(userId: string) {
  await connectDB();
  const user = await User.findById(userId);
  if (!user) throw new Error(ERROR_MESSAGES.NOT_FOUND);
  return user;
}

export async function getUserByUsername(username: string) {
  await connectDB();
  const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
  if (!user) throw new Error(ERROR_MESSAGES.NOT_FOUND);
  return user;
}

export async function getUserWithPassword(username: string) {
  await connectDB();
  const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } }).select("+password");
  if (!user) throw new Error(ERROR_MESSAGES.NOT_FOUND);
  return user;
}

export function nairaToKobo(amount: number): number {
  return Math.round(amount * PAYMENT.KOBO_MULTIPLIER);
}

export function koboToNaira(amount: number): number {
  return amount / PAYMENT.KOBO_MULTIPLIER;
}

export function formatCurrency(amount: number, currency: string = "NGN"): string {
  return amount.toLocaleString("en-NG", { style: "currency", currency });
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-NG");
}

export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric", ...options };
  return new Date(date).toLocaleDateString("en-NG", defaultOptions);
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-NG", {
    year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export function isValidAmount(amount: number, min: number, max: number): boolean {
  return typeof amount === "number" && Number.isInteger(amount) && amount >= min && amount <= max;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function slugify(str: string): string {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => { if (key in obj) result[key] = obj[key]; });
  return result;
}

export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => { delete result[key]; });
  return result;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function retry<T>(fn: () => Promise<T>, retries: number = 3, delay: number = 1000): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await sleep(delay);
    return retry(fn, retries - 1, delay * 2);
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return ERROR_MESSAGES.SERVER_ERROR;
}

export function isApiError(response: ApiResponse): response is ApiError {
  return response.error === true;
}

export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
  return response.error === false;
}

export function hassufficientBalance(balance: number, amount: number): boolean {
  return balance >= amount;
}

export function calculateNewBalance(currentBalance: number, amount: number, type: "credit" | "debit"): number {
  return type === "credit" ? currentBalance + amount : currentBalance - amount;
}

export interface PaginationParams { page: number; limit: number; }
export interface PaginationResult<T> {
  data: T[]; page: number; limit: number; total: number;
  totalPages: number; hasNext: boolean; hasPrev: boolean;
}

export function calculatePagination(page: number = 1, limit: number = 20): { skip: number; limit: number } {
  return { skip: (page - 1) * limit, limit };
}

export function createPaginationResult<T>(data: T[], page: number, limit: number, total: number): PaginationResult<T> {
  const totalPages = Math.ceil(total / limit);
  return { data, page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 };
}

export function safeJsonParse<T>(json: string, fallback: T): T {
  try { return JSON.parse(json); } catch { return fallback; }
}

export function generateRandomString(length: number = 32): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => { clearTimeout(timeout); func(...args); };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
