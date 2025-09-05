import { isUserLoggedIn } from "@/actions/auth";
import React from "react";
import DashboardLayout from "./components/dashboard-layout";

const Dashboard = async () => {
  const user = await isUserLoggedIn();
  return (
    <div>
      <DashboardLayout />
      {user?.email} {user?.role} {user?.sub}
    </div>
  );
};

export default Dashboard;
