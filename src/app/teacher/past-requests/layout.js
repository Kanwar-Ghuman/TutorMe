"use client";

import SideNav from "@/components/tutorme/home/teacher/sideNav";
import { Divider } from "@nextui-org/react";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-row min-h-screen">
      <SideNav />
      <Divider orientation="vertical" className="h-auto ml-6 mt-4" />
      {children}
    </div>
  );
};

export default TeacherLayout;
