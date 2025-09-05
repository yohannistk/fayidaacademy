"use client";

import Button from "@/components/fayida-custom-button";
import useAxios from "@/app/hooks/useAxios";
import React from "react";

const DashboardLayout = () => {
  const axios = useAxios();
  return (
    <div>
      <Button
        onClick={async (e) => {
          const res = await axios.get("/api/test");
          console.log(res);
        }}
      >
        Fetch Test Data
      </Button>
    </div>
  );
};

export default DashboardLayout;
