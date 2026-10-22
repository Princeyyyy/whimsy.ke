import { NextResponse, type NextRequest } from "next/server";

/**
 * Next.js 16+ Proxy convention (replacing legacy middleware.ts).
 * Ensures POC safety headers and clean routing.
 */
export function proxy(request: NextRequest) {
  if (
    process.env.NODE_ENV === "production" &&
    request.nextUrl.pathname.startsWith("/design-system")
  ) {
    return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
  }
  const response = NextResponse.next();
  if (process.env.ALLOW_INDEXING !== "true") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
