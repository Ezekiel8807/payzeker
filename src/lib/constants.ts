/**
 * Application Constants
 * Centralized configuration values
 */

// Time Constants (in milliseconds)
export const TIME = {
  ONE_SECOND: 1000,
  ONE_MINUTE: 60 * 1000,
  ONE_HOUR: 60 * 60 * 1000,
  ONE_DAY: 24 * 60 * 60 * 1000,
  ONE_WEEK: 7 * 24 * 60 * 60 * 1000,
} as const;

// JWT Configuration
export const JWT_CONFIG = {
  ACCESS_TOKEN_EXPIRY: TIME.ONE_HOUR, // 1 hour
  MAX_TOKEN_LIFETIME: 7 * TIME.ONE_DAY, // 7 days
  COOKIE_NAME: "token",
} as const;

// Withdrawal Limits (in Naira)
export const WITHDRAWAL_LIMITS = {
  MINIMUM: 100,
  MAXIMUM: 10_000_000,
  DEFAULT_MIN: 100,
  DEFAULT_MAX: 50_000,
} as const;

// Payment Configuration
export const PAYMENT = {
  KOBO_MULTIPLIER: 100, // Convert Naira to Kobo
  CURRENCY: "NGN",
} as const;

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 100,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  BANK_ACCOUNT: {
    ACCOUNT_NUMBER_LENGTH: 10,
    BANK_CODE_LENGTH: 3,
  },
} as const;

// Notification Polling
export const NOTIFICATION = {
  POLL_INTERVAL: 5 * TIME.ONE_SECOND, // 5 seconds
  MAX_DISPLAY: 20,
} as const;

// Task Configuration
export const TASK = {
  STATES: {
    NEW: "new",
    REVIEW: "review",
    COMPLETED: "completed",
  },
  DEFAULT_PRICE: 100,
  DEFAULT_LEVEL: 1,
} as const;

// Transaction Types
export const TRANSACTION = {
  TYPES: {
    CREDIT: "credit",
    DEBIT: "debit",
  },
  STATUS: {
    PENDING: "pending",
    SUCCESSFUL: "successful",
    FAILED: "failed",
  },
} as const;

// Withdrawal Request Status
export const WITHDRAWAL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  COMPLETED: "completed",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized. Please login.",
  FORBIDDEN: "Forbidden. You don't have permission.",
  NOT_FOUND: "Resource not found.",
  INVALID_CREDENTIALS: "Invalid credentials.",
  USER_EXISTS: "Username or email already exists.",
  INVALID_INPUT: "Invalid input provided.",
  SERVER_ERROR: "An error occurred. Please try again.",
  INSUFFICIENT_BALANCE: "Insufficient balance.",
  INVALID_AMOUNT: "Invalid amount.",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: "Login successful",
  REGISTER: "Account created successfully",
  LOGOUT: "Logged out successfully",
  UPDATE: "Updated successfully",
  DELETE: "Deleted successfully",
  WITHDRAWAL_REQUESTED: "Withdrawal request submitted successfully",
  WITHDRAWAL_APPROVED: "Withdrawal approved successfully",
  WITHDRAWAL_REJECTED: "Withdrawal rejected successfully",
} as const;

// Paystack Configuration
export const PAYSTACK = {
  COUNTRY: "nigeria",
  CURRENCY: "NGN",
  RECIPIENT_TYPE: "nuban",
  TRANSFER_SOURCE: "balance",
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
} as const;

// Environment
export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
