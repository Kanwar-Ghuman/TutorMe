"use client";
import React from "react";
import SideBar from "@/components/tutorme/home/admin/sideBar";
import PastRequests from "@/components/tutorme/home/admin/past-requests";
import "../../../styles/globals.css";

const AcceptRequest = () => {
  return (
    <div className="h-[100vh] global-overflow-hidden">
      <div className="flex w-full h-full space-x-4 p-4">
        <div className="w-[20%] shadow-md rounded-lg h-full">
          <SideBar />
        </div>
        <div className="w-[80%] h-full">
          <PastRequests />
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;