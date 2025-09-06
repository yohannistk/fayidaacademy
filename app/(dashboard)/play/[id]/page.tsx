import { courses } from "@/constants";
import { ArrowLeft, ArrowLeftIcon, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

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
      <video src={url} controls className="w-full rounded-lg shadow-lg">
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default PlayPage;
