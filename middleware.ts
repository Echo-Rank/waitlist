import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/profile/:path*"],
};

export default function middleware(req: NextRequest) {
  // Gets the path from the request
  const { pathname } = req.nextUrl;

  // For profile routes, we want to ensure proper formatting
  if (pathname.startsWith("/profile/")) {
    // Get the displayname from the URL
    const displayname = pathname.replace("/profile/", "");

    // If it contains invalid characters or spaces, redirect to homepage
    if (
      !displayname ||
      displayname.includes("/") ||
      displayname.includes("?")
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Continue with the request
  return NextResponse.next();
}
