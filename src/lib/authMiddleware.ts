/**
 * Authentication Middleware
 * Protects API routes and validates user sessions
 */

import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const key = new TextEncoder().encode(JWT_SECRET);

export interface AuthUser {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
  expires: Date;
}

/** Verify and decode JWT token */
export async function verifyToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });

    // Check if token is expired
    const expires = new Date(payload.expires as string);
    if (expires < new Date()) {
      return null;
    }

    return {
      id: payload.id as string,
      email: payload.email as string,
      username: payload.username as string,
      isAdmin: payload.isAdmin as boolean,
      expires,
    };
  } catch {
    return null;
  }
}

/**
 * Get authenticated user from request
 */
export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  return await verifyToken(token);
}

/**
 * Get authenticated user from cookies (server actions)
 */
export async function getAuthUserFromCookies(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  return await verifyToken(token);
}

/**
 * Middleware to require authentication
 */
export async function requireAuth(request: NextRequest): Promise<NextResponse | AuthUser> {
  const user = await getAuthUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Please login." },
      { status: 401 }
    );
  }

  return user;
}

/**
 * Middleware to require admin privileges
 */
export async function requireAdmin(request: NextRequest): Promise<NextResponse | AuthUser> {
  const user = await getAuthUser(request);

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized. Please login." },
      { status: 401 }
    );
  }

  if (!user.isAdmin) {
    return NextResponse.json(
      { error: "Forbidden. Admin access required." },
      { status: 403 }
    );
  }

  return user;
}

/**
 * Check if user owns a resource
 */
export function checkOwnership(userId: string, resourceUserId: string): boolean {
  return userId === resourceUserId;
}

/**
 * Require ownership or admin
 */
export function requireOwnershipOrAdmin(
  user: AuthUser,
  resourceUserId: string
): boolean {
  return user.isAdmin || checkOwnership(user.id, resourceUserId);
}
