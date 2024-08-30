"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

// Icons
import { FaCodePullRequest } from "react-icons/fa6";

import { MdDashboard } from "react-icons/md";

const SideButton = ({ theLink, theIcon: Icon, theName, isActive }) => {
  return (
    <div className="flex flex-row h-[100] mb-4">
      <Link
        href={theLink}
        className={`flex gap-2 items-center flex-row rounded-lg transition duration-150 w-full h-[4vh] p-2 ${
          isActive ? "bg-primary text-white" : "hover:bg-slate-200"
        }`}
      >
        <Icon className="ml-2" />
        <span>{theName}</span>
      </Link>
    </div>
  );
};

const SideNav = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  return (
    <div className="flex-col mt-4 w-64 h-full p-4 bg-white">
      <SideButton
        theName="Tutor Requests"
        theIcon={MdDashboard}
        theLink="/teacher/tutor-requests"
        isActive={currentPath === "/teacher/tutor-requests"}
      />
      <SideButton
        theName="Past Requests"
        theIcon={FaCodePullRequest}
        theLink="/teacher/past-requests"
        isActive={currentPath === "/teacher/past-requests"}
      />
    </div>
  );
};

export default SideNav;
