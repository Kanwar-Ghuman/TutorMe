"use server";

import React from "react";
import { AdminNavbar } from "@/components/tutorme/home/nav/adminNavbar";

import { getFrontendPermission } from "@/lib/auth/roles";

async function Layout({ children }) {
  const response = await getFrontendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  console.log(children); // Check what is being passed as children

  return (
    <div>
      
      <AdminNavbar user={user} />
      {children}
    </div>
  );
}

export default Layout;
