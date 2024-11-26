"use client";

import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { Clock7 } from "lucide-react";
import { FaCodePullRequest } from "react-icons/fa6";

const SideButton = React.memo(
  ({ theLink, theIcon: Icon, theName, isActive }) => {
    return (
      <div className="flex flex-row h-[100] mb-4">
        <Link
          href={theLink}
          prefetch={true}
          className={`flex gap-2 items-center flex-row rounded-lg transition duration-150 w-full h-[4vh] p-2 ${
            isActive ? "bg-primary text-black" : "hover:bg-slate-200"
          }`}
        >
          <Icon className="ml-2 size-5" />
          <span>{theName}</span>
        </Link>
      </div>
    );
  }
);

SideButton.displayName = "SideButton";

const SideNav = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, []);

  const navItems = useMemo(
    () => [
      {
        name: "Tutor Requests",
        icon: FaCodePullRequest,
        link: "/teacher/tutor-requests",
      },
      {
        name: "Past Requests",
        icon: Clock7,
        link: "/teacher/past-requests",
      },
    ],
    []
  );

  return (
    <div className="flex-col mt-4 w-64 h-full p-4 bg-white">
      {navItems.map((item) => (
        <SideButton
          key={item.name}
          theName={item.name}
          theIcon={item.icon}
          theLink={item.link}
          isActive={currentPath === item.link}
        />
      ))}
    </div>
  );
};

export default SideNav;
