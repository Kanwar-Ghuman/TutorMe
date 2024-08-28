import React from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";
import ScrollBar from "@/components/tutorme/home/admin/scrollBar";

const AcceptRequest = () => {
  return (
    <div className="h-screen flex">
      <div className="w-1/5 shadow-md">
        <SideBar />
      </div>
      <div className="w-4/5 overflow-hidden">
        <ScrollBar />
      </div>
    </div>
  );
};

export default AcceptRequest;
