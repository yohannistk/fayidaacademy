import prisma from "@/lib/prisma";
import { verifyRefreshToken } from "@/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function POST(request: NextRequest) {
  const cookieStore = await cookies();

  try {
    const refreshToken = cookieStore.get("refresh_token")?.value;
    if (refreshToken) {
      let payload = verifyRefreshToken(refreshToken);
      console.log(payload);
      if (payload) {
        await prisma.sessions.delete({
          where: { id: payload.sessionId, refreshToken },
        });
      }
      cookieStore.delete("refresh_token");
    }
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
