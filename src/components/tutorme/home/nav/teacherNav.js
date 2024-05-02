"use server";
import { BaseNav } from "./baseNav";

export async function TeacherNav() {
    const menuItems = [
        { label: "Dashboard", link: "/teacher/dashboard" },
        { label: "Create a Request", link: "/teacher/request/create" },
        { label: "Analytics", link: "/analytics" },
        { label: "System", link: "/system" },
    ];

    const profile = [
        {key: "profile", label: (<>
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user.email}</p>
        </>), className: "h-14 gap-2", link: "/profile"},
        {key: "settings", label: "Settings", link: "/settings"},
        {key: "team_settings", label: "Team Settings", link: "/team-settings"},
        {key: "analytics", label: "Analytics", link: "/analytics"},
        {key: "logout", label: "Log Out", color: "danger"},
    ]

    return (
        <BaseNav menuItems={menuItems} profileItems={[[session.user.name, session.user.image], profile]} />
    );
}