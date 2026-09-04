/**
 * Rate Limiting Implementation
 */

import { NextRequest } from "next/server";

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  interval: number;
  maxRequests: number;
}

export const RATE_LIMITS = {
  AUTH: { interval: 15 * 60 * 1000, maxRequests: 10 },
  WITHDRAWAL: { interval: 60 * 1000, maxRequests: 3 },
  PAYMENT: { interval: 60 * 1000, maxRequests: 5 },
  API: { interval: 60 * 1000, maxRequests: 60 },
  REGISTER: { interval: 60 * 60 * 1000, maxRequests: 10 },
};

function getClientId(request: NextRequest, userId?: string): string {
  if (userId) return `user:${userId}`;
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const ip = forwarded?.split(",")[0] || realIp || "unknown";
  return `ip:${ip}`;
}

export function checkRateLimit(
  request: NextRequest,
  config: RateLimitConfig,
  identifier?: string
): { allowed: boolean; remaining: number; resetTime: number } {
  const clientId = identifier || getClientId(request);
  const key = `${clientId}:${request.nextUrl.pathname}`;
  const now = Date.now();

  if (!store[key] || store[key].resetTime < now) {
    store[key] = { count: 0, resetTime: now + config.interval };
  }

  const entry = store[key];
  entry.count++;

  const allowed = entry.count <= config.maxRequests;
  const remaining = Math.max(0, config.maxRequests - entry.count);

  return { allowed, remaining, resetTime: entry.resetTime };
}

export function rateLimit(config: RateLimitConfig) {
  return (request: NextRequest, userId?: string) => {
    const result = checkRateLimit(request, config, userId);

    if (!result.allowed) {
      const retryAfter = Math.ceil((result.resetTime - Date.now()) / 1000);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later.", retryAfter }),
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

    return null;
  };
}

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
