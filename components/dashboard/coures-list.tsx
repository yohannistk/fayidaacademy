import { courses } from "@/constants";
import { Play } from "lucide-react";
import Link from "next/link";

export default function CourseList() {
  return (
    <div className="grid md:grid-cols-3 gap-2">
      {courses.map((course, index) => (
        <div key={course.id} className="max-w-sm border rounded-lg shadow-sm">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://images.unsplash.com/photo-1611137577061-ad9154062d6c?q=80&h=500"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                {course.title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 ">
              {course.description}
            </p>
            <Link
              href={`/play/${course.id}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-primary rounded-lg focus:ring-4 focus:outline-none focus:ring-primary/50 hover:bg-primary/90"
            >
              Start Learning
              <Play className="ml-2 -mr-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
