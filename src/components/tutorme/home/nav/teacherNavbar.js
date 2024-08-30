"use server";
import { BaseNavbar } from "./baseNavbar";

export async function TeacherNavbar({ user }) {
  const menuItems = [
    { label: "Dashboard", link: "/teacher/tutor-requests" },
    { label: "Create a Request", link: "/teacher/request/create" },
  ];

  const profile = [
    {
      key: "profile",
      label: (
        <>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </>
      ),
      className: "h-14 gap-2",
      link: "/profile",
    },

    { key: "logout", label: "Log Out", color: "danger" },
  ];

  return (
    <BaseNavbar
      menuItems={menuItems}
      profileItems={[[user.name, user.image], profile]}
    />
  );
}
