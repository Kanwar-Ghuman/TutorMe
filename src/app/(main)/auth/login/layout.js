import React from "react";
import { TeacherNavbar } from "@/components/tutorme/home/nav/teacherNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <TeacherNavbar  /> */}
      {children}
    </div>
  );
};

export default Layout;
