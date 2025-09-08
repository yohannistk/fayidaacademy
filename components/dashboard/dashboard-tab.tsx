"use client";

import { Profile } from "@/types";
import { Book, MapPin, User } from "lucide-react";
import { useState } from "react";
import CourseList from "./coures-list";

interface TabsProps {
  profile: Profile;
}

const DashboardTabs: React.FC<TabsProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<"profile" | "courses">("courses");

  return (
    <div className="w-full mt-8">
      <div className="flex">
        <button
          onClick={() => setActiveTab("courses")}
          className={`px-4 py-2 font-medium ${
            activeTab === "courses"
              ? "border-b-2 border-primary text-priborder-primary"
              : "text-gray-500"
          }`}
        >
          Courses
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 font-medium ${
            activeTab === "profile"
              ? "border-b-2 border-primary text-priborder-primary"
              : "text-gray-500"
          }`}
        >
          Profile
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {activeTab === "profile" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 border-b pb-3">
                <User className="w-6 h-6 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Personal Info
                </h2>
              </div>
              <div className="flex flex-col space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">Age</span>
                  <span>{profile.age}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">Email</span>
                  <span>{profile.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 border-b pb-3">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Location
                </h2>
              </div>
              <div className="flex flex-col space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">City</span>
                  <span>{profile.city}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">Region</span>
                  <span>{profile.region}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">School</span>
                  <span>{profile.school_name}</span>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 border-b pb-3">
                <Book className="w-6 h-6 text-purple-600" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Academic
                </h2>
              </div>
              <div className="flex flex-col space-y-3 text-gray-700 text-sm">
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">Grade</span>
                  <span>{profile.grade}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium uppercase">Referral Source</span>
                  <span>{profile.referral_source}</span>
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
