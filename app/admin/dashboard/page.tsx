import { isUserLoggedIn } from "@/actions/auth";
import React from "react";

const AdminDashboard = async () => {
  const user = await isUserLoggedIn();
  return (
    <div>
      {user?.email} {user?.role}
    </div>
  );
};

export default AdminDashboard;
