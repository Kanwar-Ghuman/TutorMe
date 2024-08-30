import React from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";
import TutorOverview from "@/components/tutorme/home/admin/tutor-overview";

const AcceptRequest = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/5 shadow-md">
        <SideBar />
      </div>
      <div className="w-4/5 overflow-hidden">
        <TutorOverview />
      </div>
    </div>
  );
};

export default AcceptRequest;
