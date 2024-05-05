"use server";
import { BaseNavbar } from "./baseNavbar";

export async function TeacherNavbar({ user }) {
    const menuItems = [
        { label: "Dashboard", link: "/teacher/dashboard" },
        { label: "Create a Request", link: "/teacher/request/create" },
        { label: "Analytics", link: "/analytics" },
        { label: "System", link: "/system" },
    ];

    const profile = [
        {key: "profile", label: (<>
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
        </>), className: "h-14 gap-2", link: "/profile"},
        {key: "settings", label: "Settings", link: "/settings"},
        {key: "team_settings", label: "Team Settings", link: "/team-settings"},
        {key: "analytics", label: "Analytics", link: "/analytics"},
        {key: "logout", label: "Log Out", color: "danger"},
    ]

    return (
        <BaseNavbar menuItems={menuItems} profileItems={[[user.name, user.image], profile]} />
    );
}