import React from "react";
import { PlainNavbar } from "@/components/tutorme/home/nav/plainNavbar";
import { getFrontendPermission } from "@/lib/auth/roles";

async function Layout({ children }) {
  const response = await getFrontendPermission("student");
  if (!response.isValid) return response.error;
  const user = response.user;

  return (
    <div>
      <PlainNavbar />
      {children}
    </div>
  );
}

export default Layout;
