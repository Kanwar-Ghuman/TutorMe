// src/app/tutor-form/success/page.js
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center max-w-xl">
        <h1 className="text-3xl font-bold mb-6">
          <span className="text-[#0E9F6E]">Thank you!</span> Your application
          has been submitted
        </h1>

        <p className="text-lg mb-8">
          We have received your tutoring interest and will be in touch soon.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => router.push("/tutor-form")}
            className="bg-green-500 hover:bg-green-600"
          >
            Submit Another Application
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
