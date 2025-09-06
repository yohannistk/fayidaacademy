"use client";

import { Profile } from "@/types";
import { Book, MapPin, User } from "lucide-react";
import { useState } from "react";
import CourseList from "./coures-list";

interface TabsProps {
  profile: Profile;
}

const DashboardTabs: React.FC<TabsProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "courses">("profile");

  return (
    <div className="w-full mt-8">
      <div className="flex">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 font-medium ${
            activeTab === "courses"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500"
          }`}
        >
          Courses
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white shadow-sm rounded-xl p-6  flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-blue-500" />
                <h2 className="text-xl font-semibold">Personal Info</h2>
              </div>
              <div className="flex flex-col gap-3 text-gray-700">
                <div>
                  <strong>Age:</strong> {profile.age}
                </div>
                <div>
                  <strong>Email:</strong> {profile.email}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6  flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <MapPin className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">Location</h2>
              </div>
              <div className="flex flex-col gap-3 text-gray-700">
                <div>
                  <strong>City:</strong> {profile.city}
                </div>
                <div>
                  <strong>Region:</strong> {profile.region}
                </div>
                <div>
                  <strong>School:</strong> {profile.school_name}
                </div>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-6  flex flex-col gap-4">
              <div className="flex items-center gap-2 text-gray-800">
                <Book className="w-5 h-5 text-purple-500" />
                <h2 className="text-xl font-semibold">Academic</h2>
              </div>
              <div className="flex flex-col gap-3 text-gray-700">
                <div>
                  <strong>Grade:</strong> {profile.grade}
                </div>
                <div>
                  <strong>Referral Source:</strong> {profile.referral_source}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && <CourseList />}
      </div>
    </div>
  );
};

export default DashboardTabs;
