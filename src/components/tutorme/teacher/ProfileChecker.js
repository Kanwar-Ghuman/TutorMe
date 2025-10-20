"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const ProfileChecker = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [profileComplete, setProfileComplete] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
    try {
      // Skip profile check if already on profile page
      if (pathname === "/teacher/profile") {
        setIsChecking(false);
        setProfileComplete(true);
        return;
      }

      const response = await fetch("/api/teacher/profile");
      if (response.ok) {
        const data = await response.json();
        if (!data.isProfileComplete) {
          router.push("/teacher/profile");
          return;
        }
        setProfileComplete(true);
      }
    } catch (error) {
      console.error("Error checking profile:", error);
      setProfileComplete(true); // Allow access on error
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  return profileComplete ? children : null;
};

export default ProfileChecker;
