import { courses } from "@/constants";
import { Play } from "lucide-react";
import Link from "next/link";

export default function CourseList() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <div
          key={index}
          className="shadow-sm rounded-xl p-6 transition-shadow duration-300 flex flex-col justify-between"
        >
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-700">{course.description}</p>
          </div>
          <Link
            href={`play/${course.id}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            <Play className="w-4 h-4" />
            Watch Video
          </Link>
        </div>
      ))}
    </div>
  );
}
