import { courses } from "@/constants";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import PlayVedio from "../components/play-vedio";

const PlayPage = ({ params }: { params: { id: string } }) => {
  const videoId = params.id;
  const course = courses.find((course) => course.id === videoId);
  const url = course?.videoUrl;

  return (
    <div className="h-full p-6">
      <div className="flex gap-3 items-center mb-6">
        <Link href={"/dashboard"}>
          <ChevronLeft className="w-10 h-10 md:w-14 md:h-14 text-gray-600 cursor-pointer" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">
          Playing Course : {course?.title}
        </h1>
      </div>
      <PlayVedio id={params.id} />
    </div>
  );
};

export default PlayPage;
