import React, { lazy, Suspense } from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";

const TutorOverview = lazy(() =>
  import("@/components/tutorme/home/admin/tutor-overview")
);

const AdminTutorOverview = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/5 shadow-md">
        <SideBar />
      </div>
      <div className="w-4/5 overflow-hidden">
        <Suspense>
          <TutorOverview />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminTutorOverview;
