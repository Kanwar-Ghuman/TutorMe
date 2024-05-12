import React from "react";
import { PlainNavbar } from "@/components/tutorme/home/nav/plainNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <PlainNavbar  />
      {children}
    </div>
  );
};

export default Layout;
