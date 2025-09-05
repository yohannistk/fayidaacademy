"use server";

import { cookies } from "next/headers";
import { verifyAccessToken } from "@/utils/auth";
import { NextRequest } from "next/server";

export async function isUserLoggedIn(
  request?: NextRequest
): Promise<{ sub: string; email: string; role: string } | null> {
  const cookieStore = request ? request.cookies : await cookies();
  const accessToken = cookieStore.get("access_token")?.value;
  let payload: { sub: string; email: string; role: string } | null = null;
  if (accessToken) {
    payload = verifyAccessToken(accessToken);
  }

  if (!payload) {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) {
      return null;
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    try {
      const refreshResponse = await fetch(`${baseUrl}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
          Cookie: `refresh_token=${refreshToken}`,
        },
      });
      console.log("Inside server function");

      if (!refreshResponse.ok) {
        throw new Error("Refresh failed");
      }

      const data = await refreshResponse.json();
      const newAccessToken = data.accessToken;
      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      payload = verifyAccessToken(newAccessToken);
      if (!payload) {
        throw new Error("Invalid new access token");
      }

      if (!request) {
        cookieStore.set("access_token", newAccessToken, {
          secure: process.env.NODE_ENV === "production",
          httpOnly: true,
          sameSite: "lax",
          expires: new Date(Date.now() + 1 * 60 * 1000),
          // expires: new Date(Date.now() + 15 * 60 * 1000),
          path: "/",
        });
      }

      return payload;
    } catch (e) {
      console.log(e);
      // if (!request) {
      //   cookieStore.delete("access_token");
      //   cookieStore.delete("refresh_token");
      // }
      return null;
    }
  }

  return payload;
}
