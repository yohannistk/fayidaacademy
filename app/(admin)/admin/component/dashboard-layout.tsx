"use client";

import { useState } from "react";
import { Menu, Home, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Dashboard from "./dashboard";
import StudentsList from "./students-list";
import { Profile } from "@/types";

interface Props {
  students: Profile[];
}

export default function DashboardLayout({ students }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const menus = [
    { id: "dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { id: "students", label: "Students", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen">
      <div
        className={`fixed md:static top-0  left-0 h-full w-64 border-r transform md:translate-x-0 transition-transform duration-200 z-20
          ${open ? "translate-x-0 bg-white z-20" : "-translate-x-full"}`}
      >
        <div className="p-4 text-xl font-bold border-b">
          <div>Admin Dashboard</div>

          <X
            className="w-6 h-6 absolute top-4 right-4 md:hidden"
            onClick={() => setOpen(false)}
          />
        </div>
        <nav className="p-4 space-y-2">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => {
                if (open) setOpen(false);
                setActive(menu.id);
              }}
              className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg transition
                ${
                  active === menu.id
                    ? "bg-primary text-white"
                    : "hover:border-primary text-gray-700"
                }`}
            >
              {menu.icon}
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center z-10 justify-between p-4 bg-white shadow-md md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6" />
          </Button>
          <div className="font-semibold">
            {active === "dashboard" ? "Dashboard" : "Students"}
          </div>
        </div>

        <div className="p-6">
          {active === "dashboard" && <Dashboard students={students} />}
          {active === "students" && <StudentsList students={students} />}
        </div>
      </div>
    </div>
  );
}
