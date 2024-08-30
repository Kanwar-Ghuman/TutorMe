"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiStudent } from "react-icons/pi";
import { IoIosGitPullRequest } from "react-icons/io";
import React from "react";

const SideButton = ({ theLink, theName, theIcon }) => {
  const pathname = usePathname();
  const isActive = pathname === theLink;
  return (
    <div className="flex flex-row ml-[4%] h-[100] mr-[5%]">
      <Link
        href={theLink}
        className={`flex gap-2 items-center flex-row rounded-lg mt-[3%] transition duration-150 w-full h-[4vh] ${
          isActive ? "bg-primary" : "hover:bg-slate-200"
        }`}
      >
        {React.createElement(theIcon, { className: "ml-[2vh]" })}
        {theName}
      </Link>
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="flex-col mt-[3%] h-full">
      <SideButton
        theName="Tutor Requests"
        theIcon={IoIosGitPullRequest}
        theLink="/admin/past-request"
      />
      <SideButton
        theName="Tutors"
        theIcon={PiStudent}
        theLink="/admin/tutor-overview"
      />
    </div>
  );
};

export default SideBar;
