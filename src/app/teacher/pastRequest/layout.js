"use client";

import SideNav from "@/components/tutorme/home/teacher/sideNav";
import { Divider } from "@nextui-org/react";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-grow min-h-screen">
      <SideNav />
      <Divider orientation="vertical" className="h-auto ml-6" />
      {children}
    </div>
  );
};

export default TeacherLayout;
