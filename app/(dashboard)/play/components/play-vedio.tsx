"use client";

import VdoPlayer from "@/components/VdoPlayer";
import { useEffect, useState } from "react";

interface PlayVedioProps {
  id: string;
}

const PlayVedio = ({ id }: PlayVedioProps) => {
  const [creds, setCreds] = useState<{
    otp: string;
    playbackInfo: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/vdocipher")
      .then((res) => res.json())
      .then((data) => setCreds(data));
  }, []);

  if (!creds) return <p>Loading video...</p>;

  return <VdoPlayer otp={creds.otp} playbackInfo={creds.playbackInfo} />;
};

export default PlayVedio;
