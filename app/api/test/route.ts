import { isUserLoggedIn } from "@/actions/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await isUserLoggedIn(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({ message: "Testing Route", email: user?.email });
}
