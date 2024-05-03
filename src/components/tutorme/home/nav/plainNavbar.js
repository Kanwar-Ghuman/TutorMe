"use server";
import { BaseNavbar } from "./baseNavbar";

export async function PlainNavbar({ session }) {
    return (
        <BaseNavbar menuItems={null} profileItems={""} />
    );
}