import { BaseNav } from "./baseNav";
import {DropdownMenu, DropdownItem } from "@nextui-org/react";

export function TeacherNav() {
    const menuItems = [
        { label: "Dashboard", link: "/teacher/dashboard" },
        { label: "Create a Request", link: "/teacher/request/create" },
        { label: "Analytics", link: "/analytics" },
        { label: "System", link: "/system" },
    ];

    const profile = [
        {key: "profile", label: (<>
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
        </>), className: "h-14 gap-2", link: "/profile"},
        {key: "settings", label: "Settings", link: "/settings"},
        {key: "team_settings", label: "Team Settings", link: "/team-settings"},
        {key: "analytics", label: "Analytics", link: "/analytics"},
        {key: "logout", label: "Log Out", link: "/logout", color: "danger"}
    ]

    return (
        <BaseNav menuItems={menuItems} profileItems={["https://github.com/shadcn.png", profile]} />
    );
}