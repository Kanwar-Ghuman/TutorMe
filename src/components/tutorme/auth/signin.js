"use server";

import { signIn as authSignIn } from "@/auth";

export const signIn = async () => {
  await authSignIn("google");
};