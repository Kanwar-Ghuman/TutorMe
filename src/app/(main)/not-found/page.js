import React from "react";
import { Button } from "@/components/ui/button";
import { Inter } from "next/font/google";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-4 sm:pt-8 md:pt-12 lg:pt-16">
      <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl text-center font-bold -mt-20 sm:-mt-24 md:-mt-28 lg:-mt-32  font-inter">
        404 Not Found
      </h1>

      <Button
        className="w-3/4 sm:w-1/2 md:w-1/4 mt-[6rem]"
        variant="destructive"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default NotFound;
