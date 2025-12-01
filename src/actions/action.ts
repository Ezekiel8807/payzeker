"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWT_CONFIG, IS_PRODUCTION } from "@/lib/constants";
import type { AppJWTPayload } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const key = new TextEncoder().encode(JWT_SECRET);

// Token expiration times (in seconds)
const ACCESS_TOKEN_EXPIRY = JWT_CONFIG.ACCESS_TOKEN_EXPIRY / 1000; // Convert ms to seconds
const MAX_TOKEN_LIFETIME = JWT_CONFIG.MAX_TOKEN_LIFETIME / 1000; // Convert ms to seconds

export async function encrypt(payload: AppJWTPayload) {
  const now = Math.floor(Date.now() / 1000);
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return await new SignJWT(payload as any)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(now)
    .setExpirationTime(now + ACCESS_TOKEN_EXPIRY)
    .setNotBefore(now)
    .sign(key);
}

// function to get token real values with expiration check
export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });

    // Additional expiration check
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error("Token expired");
    }

    // Check max lifetime (prevent infinite refresh)
    if (payload.iat && (now - (payload.iat as number)) > MAX_TOKEN_LIFETIME) {
      throw new Error("Token exceeded maximum lifetime");
    }

    return JSON.parse(JSON.stringify(payload));
  } catch {
    // Token is invalid or expired
    return null;
  }
}

export async function getToken(): Promise<AppJWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value;
  if (!token) return null;

  const decoded = await decrypt(token);
  if (!decoded) {
    // Token is invalid or expired, delete it
    cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
    return null;
  }

  return decoded as AppJWTPayload;
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
}

export async function updateTokenExpirationTime(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value;
  if (!token) return false;

  const parsed = await decrypt(token);
  if (!parsed) {
    // Token is invalid, delete it
    cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
    return false;
  }

  // Check if token is still within max lifetime
  const now = Math.floor(Date.now() / 1000);
  if (parsed.iat && (now - (parsed.iat as number)) > MAX_TOKEN_LIFETIME) {
    // Token exceeded max lifetime, require re-login
    cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
    return false;
  }

  // Create new token with fresh expiration
  const expires = new Date(Date.now() + JWT_CONFIG.ACCESS_TOKEN_EXPIRY);
  const newPayload: AppJWTPayload = {
    id: parsed.id as string,
    username: parsed.username as string,
    isAdmin: parsed.isAdmin as boolean,
    iat: parsed.iat as number, // Keep original issued at time
  };

  const newToken = await encrypt(newPayload);

  // Save with secure settings
  cookieStore.set(JWT_CONFIG.COOKIE_NAME, newToken, {
    expires,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "strict", // CSRF protection
    path: "/",
  });

  return true;
}
