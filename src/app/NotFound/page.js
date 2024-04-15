import React from "react";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-4 sm:pt-8 md:pt-12 lg:pt-16">
      <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32  font-inter">
        Sorry, you don&apos;t have
      </h1>
      <h2 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold mt-5  font-inter ">
        access to this beta
      </h2>
      <p
        className={
          "text-sm sm:text-base md:text-lg lg:text-xl text-center font-regular mt-10"
        }
      >
        Email us at{" "}
        <a href="mailto:tutorme@franklin.k12.wi.us" className="text-blue-500">
          tutorme@franklin.k12.wi.us
        </a>{" "}
        if you think this is a mistake
      </p>
      <Button
        className="w-3/4 sm:w-1/2 md:w-1/4 text-black bg-yellow-button mt-[10rem]"
        variant="primary"
      >
        Logout
      </Button>
    </div>
  );
};

export default NotFound;
