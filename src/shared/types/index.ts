/**
 * Type Definitions
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  error: boolean;
  message: string;
  data?: T;
}

export interface ApiError { error: true; message: string; }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiSuccess<T = any> { error: false; message: string; data?: T; }

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  planName: string;
  subDuration: string;
  subStartDate: Date;
  subEndDate: Date;
  rank: number;
  isAdmin: boolean;
  overallTask: number;
  completedTask: number;
  account: UserAccount;
  tasks: Task[];
  password?: string;
  createdAt: Date;
}

export interface UserAccount {
  balance: number;
  earning: number;
  minWithdrawal: number;
  withdrawal: WithdrawalInfo;
}

export interface WithdrawalInfo {
  allTimeWithdrawal: number;
  bankName: string;
  bankCode: string;
  bankAcctNo: string;
  minWithdrawal: number;
  maxWithdrawal: number;
}

export interface Task {
  _id?: string;
  userId: string;
  name: string;
  level: number;
  price: number;
  state: "new" | "review" | "completed";
  isActive: boolean;
  socialTarget: string;
  media: TaskMedia;
  caption: string;
  instruction: string;
  remainingDays: number;
  startDate: Date | null;
  pauseDate: Date | null;
  endDate: Date | null;
}

export interface TaskMedia { type: string; content: string; }

export interface Transaction {
  _id?: string;
  userId: string;
  type: "credit" | "debit";
  status: "pending" | "successful" | "failed";
  amount: number;
  description: string;
  date: Date;
}

export interface WithdrawalRequest {
  _id?: string;
  userId: string;
  username: string;
  amount: number;
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: Date;
  processedDate?: Date;
  processedBy?: string;
  rejectionReason?: string;
  transactionId?: string;
  notes?: string;
}

export interface Notification {
  _id: string;
  username: string;
  state: "read" | "unread";
  message: string;
  createdAt?: Date;
}

export interface Bank {
  id: number;
  name: string;
  code: string;
  slug: string;
  country: string;
  currency: string;
  type: string;
  active: boolean;
}

export interface BankAccountVerification {
  account_number: string;
  account_name: string;
  bank_id: number;
}

export interface PaystackRecipient {
  recipient_code: string;
  recipient_id: number;
  name: string;
  account_number: string;
  bank_code: string;
  bank_name: string;
  type: string;
  currency: string;
  isActive?: boolean;
}

export interface PaystackTransfer {
  transfer_code: string;
  id: number;
  amount: number;
  currency: string;
  status: string;
  recipient: string;
  reason: string;
}

export interface AppJWTPayload {
  email: string;
  id: string;
  username: string;
  isAdmin: boolean;
  iat?: number;
  exp?: number;
  nbf?: number;
}

export interface LoginCredentials { username: string; password: string; }
export interface RegisterCredentials { username: string; email: string; password: string; }

export interface WithdrawalFormData { amount: number; }
export interface BankDetailsFormData { bankName: string; bankCode: string; bankAcctNo: string; }
export interface UserUpdateFormData { firstname?: string; lastname?: string; email?: string; }

export interface SideNavProps {
  sideNavInfo: { username: string; isAdmin: boolean; isLogin: boolean; };
}

export interface WithdrawalCardProps { withdrawalInfo: WithdrawalRequest; }
export interface NotificationProps { notis: Notification[]; }

export interface RateLimitConfig { interval: number; maxRequests: number; }
export interface RateLimitResult { allowed: boolean; remaining: number; resetTime: number; }

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<ApiResponse<T>>;
