import React from "react";
import { Button } from "@/components/ui/button";

const AcceptRequest = () => {
  return (
    <div className="flex flex-col justify-start min-h-screen px-4 sm:px-10 md:px-20 lg:px-32 xl:px-80 pb-[5rem] sm:pb-[10rem] md:pb-[15rem] lg:pb-[20rem] xl:pb-[30rem]">
      <div className="pt-4 sm:pt-6 md:pt-7 lg:pt-10 xl:pt-[8rem]">
        <h1 className="text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold">
          <span className="text-[#0E9F6E]">Success!</span> You are now pending
          approval from Mr. Decker.
        </h1>
      </div>
      <div className="mt-4 sm:mt-[4rem]">
        <p className="text-sm sm:text-md md:text-lg">
          Here are the details of the student you are tutoring:
        </p>
        <p className="text-sm sm:text-md md:text-lg">
          <span className="font-bold">Name:</span> John Doe
          (john.doe@franklinsabers.org)
        </p>
        <p className="text-sm sm:setext-md md:text-lg">
          <span className="font-bold">Grade:</span> 10
        </p>
        <p className="text-sm sm:text-md md:text-lg">
          <span className="font-bold">Subject:</span> Pre-AP Chemistry
        </p>
      </div>
      <div className="mt-12 sm:mt-14 md:mt-20">
        <p className="text-md sm:text-lg md:text-2xl font-bold">Next Steps?</p>
        <div className="text-sm sm:text-md md:text-lg">
          <p>
            <span className="font-bold">1)</span> You will receive an email with
            the details of your tutoring arrangement.
          </p>
          <p>
            <span className="font-bold">2)</span> Mr. Decker approves the
            arrangement.
          </p>
          <p>
            <span className="font-bold">3)</span>{" "}
            <span className="font-bold">John</span> accepts you as their tutor.
          </p>
          <p>
            <span className="font-bold">4)</span> You and{" "}
            <span className="font-bold">John</span> will be sent an email
            connecting you to organize a tutoring session.
          </p>
        </div>
      </div>
      <p className="mt-10 sm:mt-15 md:mt-[8rem] text-xs">
        If you would like to cancel your request within the next 10 minutes, you
        can click the button below:
      </p>

      <div className="flex justify-start">
        <Button
          className="text-black bg-cancel-button mt-2 md:mt-4 py-2 px-4 md:py-3 md:px-6 rounded"
          variant="primary"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AcceptRequest;
