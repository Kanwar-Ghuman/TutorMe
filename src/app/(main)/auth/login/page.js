"use server";

import LoginPage from "@/components/tutorme/auth/login";
import { redirect } from "next/navigation";
import { auth } from "@/auth"

export default async function SignIn(context) {
  const session = await auth();

  if (session) {
    return redirect("/teacher/request/create");
  }

  return (
    <>
      <LoginPage />
    </>
  );
}
