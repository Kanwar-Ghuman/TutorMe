"use server";
import { BaseNavbar } from "./baseNavbar";

export async function PlainNavbar({ user }) {
    return (
        <BaseNavbar menuItems={null} profileItems={""} />
    );
}