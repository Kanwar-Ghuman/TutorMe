"use server";

import LoginPage from "@/components/tutorme/auth/login";
import { redirect } from "next/navigation";
import { auth } from "@/auth"
import { getApp } from "@/lib/roles";

export default async function SignIn(context) {
  const session = await auth();

  if (session) {
    return redirect(getApp(session))
  }

  return (
    <>
      <LoginPage />
    </>
  );
}
