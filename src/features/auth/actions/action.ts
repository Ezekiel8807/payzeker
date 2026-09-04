"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JWT_CONFIG, IS_PRODUCTION } from "@/shared/constants";
import type { AppJWTPayload } from "@/shared/types";

const JWT_SECRET = process.env.JWT_SECRET as string;
const key = new TextEncoder().encode(JWT_SECRET);

const ACCESS_TOKEN_EXPIRY = JWT_CONFIG.ACCESS_TOKEN_EXPIRY / 1000;
const MAX_TOKEN_LIFETIME = JWT_CONFIG.MAX_TOKEN_LIFETIME / 1000;

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

export async function decrypt(input: string) {
  try {
    const { payload } = await jwtVerify(input, key, { algorithms: ["HS256"] });
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) throw new Error("Token expired");
    if (payload.iat && now - (payload.iat as number) > MAX_TOKEN_LIFETIME) throw new Error("Token exceeded maximum lifetime");
    return JSON.parse(JSON.stringify(payload));
  } catch {
    return null;
  }
}

export async function getToken(): Promise<AppJWTPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(JWT_CONFIG.COOKIE_NAME)?.value;
  if (!token) return null;
  const decoded = await decrypt(token);
  if (!decoded) {
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
    cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
    return false;
  }

  const now = Math.floor(Date.now() / 1000);
  if (parsed.iat && now - (parsed.iat as number) > MAX_TOKEN_LIFETIME) {
    cookieStore.delete(JWT_CONFIG.COOKIE_NAME);
    return false;
  }

  const expires = new Date(Date.now() + JWT_CONFIG.ACCESS_TOKEN_EXPIRY);
  const newPayload: AppJWTPayload = {
    email: parsed.email as string,
    id: parsed.id as string,
    username: parsed.username as string,
    isAdmin: parsed.isAdmin as boolean,
    iat: parsed.iat as number,
  };

  const newToken = await encrypt(newPayload);
  cookieStore.set(JWT_CONFIG.COOKIE_NAME, newToken, {
    expires,
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "strict",
    path: "/",
  });

  return true;
}
