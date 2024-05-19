"use-client";
import React from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";

import ScrollBar from "@/components/tutorme/home/admin/scrollBar";

const AcceptRequest = () => {
  return (
    <div className="scroll-hide h-[100vh]">
      <div className="flex w-100 space-x-4 p-4">
        <div className="w-[20%] shadow-md rounded-lg">
          <SideBar />
        </div>
        <div className="w-[80%]">
          <ScrollBar />
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;
