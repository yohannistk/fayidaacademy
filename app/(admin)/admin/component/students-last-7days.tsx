"use client";

import { Profile } from "@/types";
import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  students: Profile[];
}

export default function StudentsLast7DaysChart({ students }: Props) {
  const data = useMemo(() => {
    const today = new Date();
    const days: { date: string; students: number }[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      days.push({ date: key, students: 0 });
    }

    students.forEach((s) => {
      const created = new Date(s.created_at);
      const key = created.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      const day = days.find((d) => d.date === key);
      if (day) {
        day.students += 1;
      }
    });

    return days;
  }, [students]);

  return (
    <div className="w-full h-80 p-8 mt-9 bg-white rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-4">
        Registrations (Last 7 Days)
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="students"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
