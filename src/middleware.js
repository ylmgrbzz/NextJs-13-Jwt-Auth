import { verifyJwtToken } from "./libs/auth";
import { NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/panel", "/register", "/forgot-password"];

const isAuthPages = (url) => AUTH_PAGES.some((page) => page.startsWith(url));

export async function middleware(request) {
  const { url, nextUrl, cookies } = request;
  const { value: token } = cookies.get("token") ?? { value: null };

  console.log("token", token);
  const hasVerifiedToken = token && (await verifyJwtToken(token));

  console.log("hasVerifiedToken", hasVerifiedToken);

  const isAuthPageRequsted = isAuthPages(nextUrl.pathname);

  if (isAuthPageRequsted) {
    if (hasVerifiedToken) {
      const response = NextResponse.next();
      return response;
    }
    const response = NextResponse.redirect(
      new URL("http://localhost:3000/"),
      url
    );
    return response;
  }

  if (!hasVerifiedToken) {
    const searchParams = new URLSearchParams(nextUrl.searchParams);
    return NextResponse.redirect(new URL(`/login?${searchParams}`), url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/panel"],
};
