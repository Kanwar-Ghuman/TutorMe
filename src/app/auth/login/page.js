  import { getProviders } from "next-auth/react";
  import { getServerSession } from "next-auth/next"
  import { options } from "@/app/api/auth/[...nextauth]/route";
  import { LoginPage } from "@/components/tutorme/auth/login";
  import { redirect } from 'next/navigation'

  export default async function SignIn(context) {

    const session = await getServerSession(options)
  
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!
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