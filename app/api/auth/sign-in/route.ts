import prisma from "@/app/lib/prisma";
import { SignInSchema } from "@/app/schemas/auth";
import {
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { cookies } from "next/headers";

const MAX_DEVICES = process.env.MAX_DEVICES!;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  try {
    const body = await req.json();
    const parsedData = SignInSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid input", details: z.formatError(parsedData.error) },
        { status: 400 }
      );
    }
    const { email, password } = parsedData.data;

    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        {
          message: "Email or password is incorect",
        },
        { status: 404 }
      );
    }

    const isPasswordCorrect = comparePassword(user.password, password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          message: "Email or password is incorect",
        },
        { status: 404 }
      );
    }

    const sessionCount = await prisma.sessions.count({
      where: { userId: user.id },
    });
    if (sessionCount >= +MAX_DEVICES) {
      return NextResponse.json(
        {
          message:
            "You can only be logged in on a maximum of 2 devices at the same time.",
        },
        { status: 403 }
      );
    }

    const sessionId = crypto.randomUUID();

    const refreshToken = generateRefreshToken({
      sessionId: sessionId,
      sub: user.id,
    });

    await prisma.sessions.create({
      data: {
        id: sessionId,
        deviceInfo: req.headers.get("user-agent") || "Unknown",
        refreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    const accessToken = generateAccessToken({
      email: user.email,
      sub: user.id,
      role: user.role,
    });

    cookieStore.set("refresh_token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
      expires: 7 * 24 * 60 * 60,
      path: "/",
    });

    return NextResponse.json(
      {
        accessToken,
        user: { email: user.email, id: user.id },
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
