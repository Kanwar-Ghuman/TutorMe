import React from "react";
import Navbar from "@/components/tutorme/home/nav/authNav";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
