"use client";
import {
  Package,
  Newspaper,
  Trophy,
  Info,
  Bot,
  ChevronDown,
  LucideBell,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import Button from "./fayida-custom-button";
import { createClient } from "@/utils/supabase/client";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Grade 9",
    href: "/grade-9",
    description:
      "Explore study guides, notes, and resources tailored for Grade 9 students.",
  },
  {
    title: "Grade 10",
    href: "/grade-10",
    description:
      "Explore study guides, notes, and resources tailored for Grade 10 students.",
  },
  {
    title: "Grade 11",
    href: "/grade-11",
    description:
      "Explore study guides, notes, and resources tailored for Grade 11 students.",
  },
  {
    title: "Grade 12",
    href: "/grade-12",
    description:
      "Explore study guides, notes, and resources tailored for Grade 12 students.",
  },
];

function AcademicCategories() {
  return (
    <div className="relative group cursor-pointer">
      <button className="flex items-center gap-1 px-4 font-medium hover:text-primary">
        Academic Categories
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute left-0 top-full mt-2 w-[600px] bg-white shadow-lg rounded-lg p-6 grid grid-cols-2 gap-6 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {components.map((item) => (
          <Link key={item.title} href={item.href} className="block group/item">
            <h3 className="text-lg font-semibold group-hover/item:text-primary">
              {item.title}
            </h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

const moreMenu = [
  { title: "Packages List", href: "/packages", icon: Package },
  { title: "Blog", href: "/blog", icon: Newspaper },
  { title: "Leader Board", href: "/leaderboard", icon: Trophy },
  { title: "About", href: "/about", icon: Info },
  { title: "Telegram Bot", href: "/telegram-bot", icon: Bot },
];

function MoreMenu() {
  return (
    <div className="relative group cursor-pointer">
      <button className="flex items-center gap-2 font-medium">
        More
        <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      <div className="absolute left-0 top-full mt-3 w-[280px] bg-white shadow-lg rounded-xl p-5 flex flex-col gap-3 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {moreMenu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 text-base font-medium py-2 px-3 rounded-md hover:bg-gray-100"
          >
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

interface NavigationProps {
  user?: User | null;
}
const Navigation = ({ user }: NavigationProps) => {
  const supabase = createClient();

  const handleLogout = async () => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      await supabase.from("user_sessions").delete().eq("id", sessionId);
      localStorage.removeItem("sessionId");
    }
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  return (
    <nav className="w-full px-3 z-50 fixed left-1/2 -translate-x-1/2 top-5">
      <div className="mx-auto py-1 bg-white rounded-full  max-w-[90rem] md:mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-7">
          <Link href="/">
            <Image
              src={"/fayida-academy-logo.png"}
              alt=""
              width={100}
              height={50}
            />
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/features" className="font-medium text-md">
              Home
            </Link>
            <AcademicCategories />
            <MoreMenu />
            <Link href="/features" className="font-medium text-md">
              FAQ
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button>
            <LucideBell size={30} className="text-primary" />
          </button>
          {!user ? (
            <Link
              href="/sign-in"
              className="rounded-full cursor-pointer border-2 border-primary px-8 font-medium py-2 text-primary bg-transparent "
            >
              Signin
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full border-1 px-4 font-medium py-2 text-red-400 bg-transparent flex items-center gap-2"
            >
              <LogOut /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
