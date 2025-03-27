"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;
const key = new TextEncoder().encode(JWT_SECRET);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

// function to get token real values
export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });

  return JSON.parse(JSON.stringify(payload));
}

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return;

  return await decrypt(token);
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function updateTokenExpirationTime() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return;

  //refresh token exipration time
  const parsed = await decrypt(token);
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  parsed.expires = expires;

  //new token
  const newToken = await encrypt(parsed);

  //save new updated token time
  cookieStore.set("token", newToken, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
}
