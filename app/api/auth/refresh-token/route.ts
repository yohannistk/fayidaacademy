import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  try {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (!refreshToken) {
      return NextResponse.json(
        { error: "No Refresh token was found" },
        { status: 401 }
      );
    }

    const payload = verifyRefreshToken(refreshToken);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const session = await prisma.sessions.findUnique({
      where: { id: payload.sessionId, refreshToken },
    });
    console.log("session", payload.sessionId);
    if (!session || session.expiresAt < new Date()) {
      cookieStore.delete("refresh_token");
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    const user = await prisma.users.findUnique({
      where: { id: payload.sub },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    await prisma.sessions.delete({ where: { id: payload.sessionId } });
    const newSessionId = crypto.randomUUID();

    const newRefreshToken = generateRefreshToken({
      sessionId: newSessionId,
      sub: user.id,
    });

    await prisma.sessions.create({
      data: {
        id: newSessionId,
        deviceInfo: req.headers.get("user-agent") || "Unknown",
        refreshToken: newRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const accessToken = generateAccessToken({
      email: user.email,
      sub: user.id,
      role: user.role,
    });

    cookieStore.set("refresh_token", newRefreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      path: "/",
    });
    cookieStore.set("access_token", accessToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 15 * 60 * 1000),
      path: "/",
    });

    return NextResponse.json(
      {
        accessToken,
        message: "Toekn refreshed",
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
