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

  if (!hasVerifiedToken) {
    return NextResponse.redirect(new URL("http://localhost:3000/login"), url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/panel"],
};
