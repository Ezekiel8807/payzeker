# Environment Variables Usage Map

This document shows where each environment variable is used in the codebase.

## 📋 Environment Variables Overview

### 🔧 Application Configuration

#### `NODE_ENV`

**Value:** `development` | `production`
**Used in:**

- `src/lib/constants.ts` (line 158-159)
  - `IS_PRODUCTION` constant
  - `IS_DEVELOPMENT` constant
- `src/components/ErrorBoundary.tsx` (line 38, 93)
  - Controls error logging in development
  - Shows detailed error info in development mode
- `src/app/api/auth/login/route.ts` (line 87)
  - Sets secure cookie flag in production

#### `NEXT_PUBLIC_APP_URL`

**Value:** `http://localhost:3000` (development)
**Used in:** Not currently used in the codebase
**Purpose:** Base URL for the application

---

### 🗄️ Database

#### `MONGODB_URI`

**Value:** `mongodb://localhost:27017/toopay` (development)
**Used in:**

- `src/lib/mongodb.ts` (line 23)
  - MongoDB connection string
  - Required for database connectivity

---

### 🔐 Authentication & Security

#### `JWT_SECRET`

**Value:** `n48ed843e0oc8h3f8c9JJC493JJCDOWD39`
**Used in:**

- `src/actions/action.ts` (line 7)
  - JWT token signing and verification
- `src/lib/authMiddleware.ts` (line 10)
  - JWT token validation in middleware

#### `NEXTAUTH_SECRET`

**Value:** `d1jh6e68dg747hf8f857yrffvh8r`
**Used in:** Not currently used in the codebase
**Purpose:** Reserved for NextAuth.js if implemented

#### `SESSION_SECRET`

**Value:** `12345ghj2hggr34nrejh548oir`
**Used in:** Not currently used in the codebase
**Purpose:** Reserved for session management

---

### 💳 Payment (Paystack)

#### `PAYSTACK_SECRET_KEY`

**Value:** `sk_test_8f88d45f65a1bbe065f5c5b9f9fcdca6a1e7b09e`
**Used in:**

- `src/actions/paystackAction.ts` (line 65, 102)
  - Creating Paystack recipients
  - Initiating transfers
- `src/app/api/paystack/createRecipient/route.ts` (line 11)
  - API route for creating recipients
- `src/app/api/paystack/banks/route.ts` (line 6)
  - Fetching bank list from Paystack
- `src/app/api/paystack/verifyTransaction/route.ts` (line 10)
  - Verifying payment transactions
- `src/app/api/paystack/withdraw/route.ts` (line 6)
  - Processing withdrawals
- `src/app/api/paystack/verifyAccount/route.ts` (line 6)
  - Verifying bank account details

#### `NEXT_PUBLIC_PAYSTACK_KEY`

**Value:** `pk_test_3822fcf2427d322dff6aeda676648a48bd4fdfab`
**Used in:**

- `src/utils/paystackFunc.ts` (line 5)
  - Client-side Paystack payment initialization
  - Public key for frontend payment widget

---

### 📁 File Storage (Google Drive)

#### `GOOGLE_DRIVE_FOLDER_ID`

**Value:** `1jkI9X3K9ZNKh3epUe1lMoKUusuCOFE4S`
**Used in:**

- `src/actions/fileUpload.ts` (line 29-30)
  - Specifies the Google Drive folder for file uploads
  - Parent folder for uploaded files

#### `GOOGLE_DRIVE_CREDENTIALS`

**Value:** JSON service account credentials
**Used in:**

- `src/actions/fileUpload.ts` (line 19)
  - Google Drive API authentication
  - Service account credentials for file operations

---

### 🔴 Redis (Optional - Not Currently Used)

#### `REDIS_URL`

**Value:** `redis://localhost:6379`
**Used in:** Not currently used in the codebase
**Purpose:** Reserved for caching and background jobs

---

### 📧 Email (Optional - Not Configured)

#### `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

**Used in:** Not currently used in the codebase
**Purpose:** Reserved for email functionality

---

### 📊 Monitoring (Optional - Not Configured)

#### `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`

**Used in:** Not currently used in the codebase
**Purpose:** Reserved for error tracking with Sentry

---

## 🔒 Security Notes

### ⚠️ Critical Variables (Never commit to Git)

- `JWT_SECRET` - Used for token signing
- `PAYSTACK_SECRET_KEY` - Payment processing
- `MONGODB_URI` - Database connection
- `GOOGLE_DRIVE_CREDENTIALS` - File storage access

### ✅ Public Variables (Safe to expose)

- `NEXT_PUBLIC_PAYSTACK_KEY` - Public Paystack key
- `NEXT_PUBLIC_APP_URL` - Application URL
- `NEXT_PUBLIC_SENTRY_DSN` - Sentry public DSN

---

## 📝 Usage Summary

### Active Variables (Currently Used)

1. ✅ `NODE_ENV` - 3 files
2. ✅ `MONGODB_URI` - 1 file
3. ✅ `JWT_SECRET` - 2 files
4. ✅ `PAYSTACK_SECRET_KEY` - 7 files
5. ✅ `NEXT_PUBLIC_PAYSTACK_KEY` - 1 file
6. ✅ `GOOGLE_DRIVE_FOLDER_ID` - 1 file
7. ✅ `GOOGLE_DRIVE_CREDENTIALS` - 1 file

### Unused Variables (Reserved for Future)

1. ⏸️ `NEXT_PUBLIC_APP_URL`
2. ⏸️ `NEXTAUTH_SECRET`
3. ⏸️ `SESSION_SECRET`
4. ⏸️ `REDIS_URL`
5. ⏸️ `SMTP_*` (Email configuration)
6. ⏸️ `SENTRY_*` (Monitoring)

---

## 🚀 Production Checklist

Before deploying to production:

1. [ ] Change `NODE_ENV` to `production`
2. [ ] Update `MONGODB_URI` to production database
3. [ ] Generate new `JWT_SECRET` (32+ characters)
4. [ ] Replace Paystack test keys with live keys
5. [ ] Update `NEXT_PUBLIC_APP_URL` to production domain
6. [ ] Configure production Google Drive folder
7. [ ] Set up Redis if using caching
8. [ ] Configure email service if needed
9. [ ] Set up Sentry for error tracking

---

## 📖 Adding New Environment Variables

1. Add to `.env.local` file
2. Add to `.env.example` (without values)
3. Document usage in this file
4. Update production environment
5. Restart the application
