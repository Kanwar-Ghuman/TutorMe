"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export const LoginPage = ({ providers }) => {
  return (
    <div className="bg-[#ffffff] flex flex-col md:flex-row justify-start md:justify-between items-center w-full h-full min-h-screen px-4 sm:px-10 md:px-20">
      <div className="text-left mb-10 mt-[9rem] sm:mt-[5rem] md:mt-[-2rem] ml-4 md:ml-20">
        <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-[500] leading-none mb-8 md:mb-[6rem]">
          Login
        </p>
        <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-[500] leading-tight mb-4 md:mb-0 md:inline-flex  pt-[3rem] sm:pt-[5rem]">
          <span>to TutorMe</span>
        </p>
        <div className="md:inline-flex md:space-x-8">
          <p className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-[500] pt-[4rem] sm:pt-[10rem]">
            <span>
              for <span className="text-yellow-text">Franklin</span>
            </span>
          </p>
        </div>
      </div>
      <div className="w-full mt-4 px-4 sm:px-0">
        {Object.values(providers).map((provider) => (
          <div
            key={provider.name}
            className="mt-4 flex justify-center md:justify-end"
          >
            <Button
              className="w-[300px] h-[50px]"
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
