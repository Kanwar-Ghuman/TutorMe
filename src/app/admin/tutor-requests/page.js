"use client";
import React, { lazy, Suspense } from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";
import "../../../styles/globals.css";

const PastRequests = lazy(() =>
  import("@/components/tutorme/home/admin/past-requests")
);

const AdminTutorRequests = () => {
  return (
    <div className="h-screen global-overflow-hidden">
      <div className="flex w-full h-full space-x-4 ">
        <div className="w-[20%] shadow-md rounded-lg h-full">
          <SideBar />
        </div>
        <div className="w-[80%] h-full overflow-hidden">
          <Suspense>
            <PastRequests />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminTutorRequests;
