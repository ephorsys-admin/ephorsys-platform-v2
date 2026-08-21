import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const loginAttempts = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 15 * 60 * 1000; // 15 minutes window
  const maxAttempts = 5; // max 5 attempts

  const record = loginAttempts.get(ip);
  if (!record) {
    loginAttempts.set(ip, { count: 1, resetTime: now + limitWindow });
    return false;
  }

  if (now > record.resetTime) {
    loginAttempts.set(ip, { count: 1, resetTime: now + limitWindow });
    return false;
  }

  record.count += 1;
  if (record.count > maxAttempts) {
    return true;
  }
  return false;
}

export default withAuth(
  function proxy(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Rate limit credentials login attempts to prevent brute-force
    if (
      (pathname.startsWith("/api/auth/callback/credentials") ||
       pathname.startsWith("/api/auth/signin/credentials")) &&
      req.method === "POST"
    ) {
      const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";
      if (isRateLimited(ip)) {
        return NextResponse.json(
          { error: "Too many login attempts. Please try again in 15 minutes." },
          { status: 429 }
        );
      }
    }

    // Protect admin API routes — return 401 JSON if not logged in or not admin
    if (pathname.startsWith("/api/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    // Protect admin pages — redirect to login if not logged in or not admin
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // Let the proxy function handle auth decisions
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/api/auth/:path*"],
};
