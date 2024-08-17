import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LoginPage from "@/components/tutorme/auth/login";
import { redirect } from "next/navigation";
import SignOut from "./signout";

export default async function Signout(context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/login");
  }

  const providers = await getProviders();

  return (
    <>
      <SignOut />
    </>
  );
}
