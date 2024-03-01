"use client"
import React from 'react';
import { signIn } from "next-auth/react";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Button
} from "@/components/ui/button"
export const LoginPage = ({ providers }) => {
  return (
    <div className='bg-[#363740] flex flex-col sm:flex-row justify-center items-center w-full h-full min-h-screen'>
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Login to <span>TutorMe</span></CardTitle>
          <CardDescription>Use our integrated login providers to seamlessly Login to TutorMe.</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <Button className="w-[300px] h-[50px]" onClick={() => signIn(provider.id)}>
                <EnvelopeOpenIcon className="mr-2 h-4 w-4" />Sign in with {provider.name}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;