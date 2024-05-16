import Link from "next/link";

import SideBar from "@/components/tutorme/home/admin/sideBar";


export const metadata = {
  title: "Teacher Dashboard",
  description: "Teacher Dashboard Application",
};

const TeacherDashboard = ({ children }) => {
  return (
  <SideBar />
  {children}
  );
};

export default TeacherDashboard;
