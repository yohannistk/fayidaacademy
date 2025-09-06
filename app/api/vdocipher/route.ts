import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const videoId = process.env.VEDIO_ID;
  if (!videoId) {
    return NextResponse.json(
      { error: "Video ID not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(
    `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Apisecret ${process.env.VDOCIPHER_API_KEY}`,
      },
      body: JSON.stringify({
        ttl: 300,
      }),
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
