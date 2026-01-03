/**
 * Rate Limiting Implementation
 * Prevents brute force attacks, DDoS, and resource abuse
 */

import { NextRequest } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (use Redis in production for distributed systems)
const store: RateLimitStore = {};

// Cleanup old entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  maxRequests: number; // Max requests per interval
}

// Predefined rate limit configs
export const RATE_LIMITS = {
  // Strict limits for authentication
  AUTH: { interval: 15 * 60 * 1000, maxRequests: 10 }, // 5 attempts per 15 minutes

  // Moderate limits for sensitive operations
  WITHDRAWAL: { interval: 60 * 1000, maxRequests: 3 }, // 3 per minute
  PAYMENT: { interval: 60 * 1000, maxRequests: 5 }, // 5 per minute

  // Generous limits for general API
  API: { interval: 60 * 1000, maxRequests: 60 }, // 60 per minute

  // Very strict for registration
  REGISTER: { interval: 60 * 60 * 1000, maxRequests: 10 }, // 10 per hour
};

/**
 * Get client identifier (IP address or user ID)
 */
function getClientId(request: NextRequest, userId?: string): string {
  if (userId) return `user:${userId}`;

  // Try to get real IP from headers (for proxies/load balancers)
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";

  return `ip:${ip}`;
}

/**
 * Check if request should be rate limited
 */
export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  identifier?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = identifier || getClientId(request);
  const key = `${clientId}:${request.nextUrl.pathname}`;
  const now = Date.now();

  // Get or create rate limit entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 0,
      resetTime: now + config.interval,
    };
  }

  const entry = store[key];
  entry.count++;

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return {
    allowed,
    remaining,
    resetTime: entry.resetTime,
  };
}

/**
 * Rate limit middleware for API routes
 */
export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest, userId?: string) => {
    const result = checkRateLimit(request, config, userId);

    if (!result.allowed) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);

      return new Response(
        JSON.stringify({
          error: "Too many requests. Please try again later.",
          retryAfter,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": result.resetTime.toString(),
          },
        }
      );
    }

    return null; // Allow request
  };
}

/**
 * Helper to add rate limit headers to response
 */
export function addRateLimitHeaders(
  response: Response,
  result: { remaining: number; resetTime: number },
  config: RateLimitConfig
): Response {
  const headers = new Headers(response.headers);
  headers.set("X-RateLimit-Limit", config.maxRequests.toString());
  headers.set("X-RateLimit-Remaining", result.remaining.toString());
  headers.set("X-RateLimit-Reset", result.resetTime.toString());

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
