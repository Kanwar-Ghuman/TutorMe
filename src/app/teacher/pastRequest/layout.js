"use client";

import SideNav from "@/components/tutorme/home/teacher/sideNav";
import { Divider } from "@nextui-org/react";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <SideNav />
      <Divider orientation="vertical" className="h-screen" />
      <div className="flex-grow">{children}</div>
    </div>
  );
};

export default TeacherLayout;
