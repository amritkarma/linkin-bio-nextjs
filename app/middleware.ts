import { NextRequest, NextResponse } from "next/server";

const publicPaths = ["/login", "/register"];
const protectedPaths = ["/dashboard"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Allow public route access if not logged in
  if (!token && publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Block protected routes if not authenticated
  if (!token && protectedPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If authenticated and visiting public page (like /login), redirect to dashboard
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
