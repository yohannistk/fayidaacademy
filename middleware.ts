import { NextResponse, NextRequest } from "next/server";
import { verifyAccessToken } from "@/utils/auth";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname === "/sign-in" ||
    pathname === "/sign-up" ||
    pathname === "/forgot-password" ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }
  console.log("Inside the middleware");

  const isAdminPath = pathname.startsWith("/admin/");
  const isStudentPath = pathname.startsWith("/dashboard");
  if (!isAdminPath && !isStudentPath) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get("access_token")?.value;
  let payload: { sub: string; email: string; role: string } | null = null;

  if (accessToken) {
    payload = verifyAccessToken(accessToken);
  }

  if (!payload) {
    const refreshToken = request.cookies.get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
      const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });
      const data = await refreshResponse.json();
      const newAccessToken = data.accessToken;
      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      payload = verifyAccessToken(newAccessToken);
      if (!payload) {
        throw new Error("Invalid new access token");
      }

      const response = NextResponse.next();
      response.cookies.set("access_token", newAccessToken, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        // expires: new Date(Date.now() + 15 * 60 * 1000),
        expires: new Date(Date.now() + 1 * 60 * 1000),
        path: "/",
      });
      return response;
    } catch (e) {
      console.log(e);
      const response = NextResponse.redirect(new URL("/sign-in", request.url));
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  const role = payload.role;

  if (isAdminPath && role !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Admin access required" },
      { status: 403 }
    );
  }
  if (isStudentPath && role !== "STUDENT") {
    return NextResponse.json(
      { error: "Forbidden: Student access required" },
      { status: 403 }
    );
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*"],
};
