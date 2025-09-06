import { getAllStudents } from "@/actions/auth";
import DashboardLayout from "./component/dashboard-layout";

export default async function DashboardPage() {
  const students = (await getAllStudents()) || [];
  return <DashboardLayout students={students} />;
}
