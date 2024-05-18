"use client";

import SideNav from "@/components/tutorme/home/teacher/sideNav";

const TeacherLayout = ({ children }) => {
  return (
    <div className="flex flex-row">
      <SideNav />
      {children}
    </div>
  );
};

export default TeacherLayout;
