"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const LoginPage = ({ providers }) => {
  return (
    <div className="bg-[#f7f7f7] flex flex-col md:flex-row justify-between items-center w-full h-full min-h-screen px-4 sm:px-10 md:px-20">
      <div className="text-left mb-10 md:mb-0 mt-[9rem] md:-mt-20 ml-4 md:ml-20">
        <p className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-none mb-12 md:mb-[6rem]">
          Login
        </p>
        <p className="text-6xl sm:text-8xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-tight mb-12 md:mb-[6rem]">
          to TutorMe
        </p>
        <p className="text-6xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium mb-8 md:mb-12">
          for <span className="text-yellow-text">Franklin</span>
        </p>
      </div>
      <div className="w-full md:w-auto flex justify-center md:justify-end md:items-end mt-4 md:mt-0">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="w-full md:w-auto flex justify-center md:justify-end mt-4"
          >
            <Button
              className="w-[300px] h-[50px] "
              onClick={() => signIn(provider.id)}
            >
              <EnvelopeOpenIcon className="mr-2 h-4 w-4" />
              Sign in with {provider.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginPage;
