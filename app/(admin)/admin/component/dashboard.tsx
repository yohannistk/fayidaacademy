import { Profile } from "@/types";
import React from "react";
import StudentsLast7DaysChart from "./students-last-7days";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

interface Props {
  students: Profile[];
}
const Dashboard = ({ students }: Props) => {
  function getThisMonthStudents(students: Profile[]): Profile[] {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return students.filter((s) => {
      const created = new Date(s.created_at);
      return (
        created.getMonth() === currentMonth &&
        created.getFullYear() === currentYear
      );
    });
  }

  function exportStudentsReportPDF(students: Profile[]) {
    const doc = new jsPDF();

    const primaryColor = "#07705D";

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(primaryColor);
    doc.text("Students Report", 14, 20);

    const totalStudents = students.length;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(primaryColor);
    doc.text(`Total Students: ${totalStudents}`, 16, 32);

    const gradeCounts: Record<string, number> = {};
    students.forEach((s) => {
      gradeCounts[s.grade] = (gradeCounts[s.grade] || 0) + 1;
    });
    const gradeTable = Object.entries(gradeCounts).map(([grade, count]) => [
      grade,
      count,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [["Grade", "Count"]],
      body: gradeTable,
      headStyles: { fillColor: [7, 112, 93] },
      theme: "grid",
      styles: { font: "helvetica" },
    });

    const gradeFinalY = (doc as any).autoTablePrevious?.finalY || 50;

    const schoolCounts: Record<string, number> = {};
    students.forEach((s) => {
      schoolCounts[s.school_name] = (schoolCounts[s.school_name] || 0) + 1;
    });
    const schoolTable = Object.entries(schoolCounts).map(([school, count]) => [
      school,
      count,
    ]);

    autoTable(doc, {
      startY: gradeFinalY + 10,
      head: [["School", "Count"]],
      body: schoolTable,
      headStyles: { fillColor: [7, 112, 93] },
      theme: "grid",
      styles: { font: "helvetica" },
    });

    const schoolFinalY = (doc as any).autoTablePrevious?.finalY || 50;

    const today = new Date();
    const last7DaysCounts: { date: string; count: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      const count = students.filter((s) => {
        const created = new Date(s.created_at);
        return (
          created.getMonth() === d.getMonth() &&
          created.getDate() === d.getDate() &&
          created.getFullYear() === d.getFullYear()
        );
      }).length;
      last7DaysCounts.push({ date: key, count });
    }

    autoTable(doc, {
      startY: schoolFinalY + 10,
      head: [["Date", "Registrations"]],
      body: last7DaysCounts.map((d) => [d.date, d.count]),
      headStyles: { fillColor: [7, 112, 93] },
      theme: "grid",
      styles: { font: "helvetica" },
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      pageHeight - 10
    );

    doc.save("students_report.pdf");
  }
  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
          <p className="text-gray-700">Welcome to the admin dashboard!</p>
        </div>
        <div>
          <button
            onClick={() => {
              exportStudentsReportPDF(students);
            }}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Export Data as PDF
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="p-4 border rounded-md bg-blue-50">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold">{students.length}</p>
        </div>
        <div className="p-4 border rounded-md bg-green-50">
          <h3 className="text-lg font-semibold">Active Courses</h3>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="p-4 border rounded-md bg-green-50">
          <h3 className="text-lg font-semibold">Students (This Month)</h3>
          <p className="text-3xl font-bold">
            {getThisMonthStudents(students).length || "No Students Yet"}
          </p>
        </div>
      </div>
      <StudentsLast7DaysChart students={students} />
    </div>
  );
};

export default Dashboard;
