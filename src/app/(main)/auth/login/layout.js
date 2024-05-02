import React from "react";
import { TeacherNav } from "@/components/tutorme/home/nav/teacherNav";

const Layout = ({ children }) => {
  return (
    <div>
      {/* <TeacherNav  /> */}
      {children}
    </div>
  );
};

export default Layout;
