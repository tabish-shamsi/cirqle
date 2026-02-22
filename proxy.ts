import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function (req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  // All /account routes
  const isAccountPage = pathname.startsWith("/account");

  // Specific pages 
  const isVerifyPage = pathname.startsWith("/account/verify");

  // 1️⃣ User NOT logged in
  if (!token) {
    // Only allow login, register, verify
    if (isAccountPage) {
      if (isVerifyPage) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }
    // Everything else → login
    return NextResponse.redirect(new URL("/account/login", req.url));
  }

  // 2️⃣ User logged in AND verified
  if (token.isVerified) {
    // Block ALL /account pages
    if (isAccountPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 3️⃣ User logged in BUT NOT verified
  if (!token.isVerified) {
    // Allow only /account/verify`
    if (isVerifyPage) return NextResponse.next();

    // All other pages → redirect to verify
    return NextResponse.redirect(new URL("/account/verify", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)", // Protect everything except static
  ],
};
