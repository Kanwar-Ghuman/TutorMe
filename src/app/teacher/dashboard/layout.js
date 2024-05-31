"use client";

import SideNav from "@/components/tutorme/home/teacher/sideNav";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-row h-[100vh]">
      <SideNav />
      {children}
    </div>
  );
};

export default TeacherLayout;
