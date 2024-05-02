"use server";

import { signOut as authSignOut } from "@/auth";

export const signOut = async () => {
    "use server";
    await authSignOut();
};