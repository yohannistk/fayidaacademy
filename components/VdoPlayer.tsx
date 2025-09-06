"use client";

export default function VdoPlayer({
  otp,
  playbackInfo,
}: {
  otp: string;
  playbackInfo: string;
}) {
  return (
    <iframe
      src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}&theme=9ae8bbe8dd964ddc9bdb932cca1cb59a`}
      style={{ width: "100%", height: "500px", border: "0" }}
      allow="encrypted-media"
      allowFullScreen
    />
  );
}
