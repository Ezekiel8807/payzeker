import { NextRequest, NextResponse } from "next/server";
import { getToken, updateTokenExpirationTime } from "@/features/auth/actions/action";

export async function middleware(request: NextRequest) {
  //check token avaliable
  const userToken = await getToken();

  //check token exist
  if (!userToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  //update Token Expiration Time
  await updateTokenExpirationTime();

  //print out userIfo
  // console.log(userToken);

  // Clone the request and modify headers to pass decoded values
  // const requestHeaders = new Headers(request.headers);
  // requestHeaders.set("UserId", userCookieInfo?.id);
  // if (userCookieInfo?.isAdmin == "true") {
  //   requestHeaders.set("isAdnin", userCookieInfo?.isAdmin);
  // }

  // Forward request with modified headers
  // return NextResponse.next({
  //   request: {
  //     headers: requestHeaders,
  //   },
  // });

  return NextResponse.next();
}

export const config = {
  matcher: ["/app((?!register|forget|api|login).*)"],
};
