"use server"
import { getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/route";
import LoginPage from "@/components/tutorme/auth/login";
import { redirect } from 'next/navigation'

export default async function SignIn(context) {

  const session = await getServerSession(options)

  if (session) {
    return redirect("/")
  }

  const providers = await getProviders()

  return (
    <>
      <LoginPage providers={providers} />
    </>
  )
}