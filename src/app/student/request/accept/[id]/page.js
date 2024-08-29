"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { sendEmail } from "@/hooks/email/email";

const AcceptRequest = () => {
  const tutorConfirmationEmail = `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
    }
    .logoStyle {
      color: #FACC14;
    }
    .title {
      font-size: 28px;
      margin-top: 10px;
    }
    .content {
      text-align: center;
    }
    .line {
      margin: 10px 0;
    }
    .subtitle {
      font-weight: bold;
    }
    .confirm {
      background-color: #FACC14;
      border-radius: 10px;
      padding: 10px 20px;
      border: 1px solid #333;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      color: black;
      font-size: 16px;
      margin-top: 20px;
    }
    a, a:visited {
      color: inherit;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <p class="logo">NHS<span class="logoStyle">TutorMe</span></p>
      <h1 class="title">Tutor Confirmation</h1>
    </div>
    <div class="content">
      <p>Hello [name of tutor]</p>
      <p>These are the details of your tutoring session:</p>
      <div class="line">
        <p><span class="subtitle">Name Of Student:</span> [name of person getting tutored]</p>
      </div>
      <div class="line">
        <p><span class="subtitle">Subject:</span> AP Physics</p>
      </div>
      <p>To confirm this tutoring session, please click the button below:</p>
      <button class="confirm">Confirm</button>
      <p>Thank you for using TutorMe!</p>
    </div>
  </div>
</body>
</html>`;

  const studentConfirmationEmail = `<!DOCTYPE html>
<html>

<head>
  <style>
    body {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
      color: black;
    }
    .line {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      gap: 5px;
      color: black;
    }
    .confirm {
      background-color: #FACC14;
      border-radius: 10px;
      padding: 10px 20px;
      border: 1px solid #333;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
      cursor: pointer;
      color: black;
      display: block;
      margin: 20px auto;
    }
    .logo {
      text-align: center;
      color: black;
      font-size: 24px;
      font-weight: bold;
    }
    .logoStyle {
      color: #FACC14;
    }
    .title {
      text-align: center;
      color: black;
    }
    .subtitle {
      font-weight: bold;
    }
    a:visited {
      color: inherit;
      text-decoration: none;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <p class="logo">NHS<span class="logoStyle">TutorMe</span></p>
      <h1 class="title">Student Confirmation</h1>
    </div>
    <div class="content">
      <p>Hello [name of student]</p>
      <p>These are the details of your tutoring session: </p>
      <div class="line">
        <p><span class="subtitle">Name Of Tutor: </span>  [name of tutor]</p>
      </div>
      <div class="line">
        <p><span class="subtitle">Subject:</span>  AP Physics</p>
      </div>
      <p>To confirm this tutoring session, please click the button below:</p>
      <button class="confirm">Confirm</button>
      <p>Thank you for using TutorMe!</p>
    </div>
  </div>
</body>

</html>`;

  const handleTestEmail = async () => {
    const result = await sendEmail(
      "ghumankm@gmail.com",
      "Tutor Me Confirmation",
      tutorConfirmationEmail
    );

    if (result) {
      alert("Test email sent successfully");
    } else {
      alert("Failed to send test email");
    }
  };

  return (
    <div className="flex flex-col justify-start min-h-screen px-4 sm:px-10 md:px-20 lg:px-32 xl:px-80 pb-[5rem] sm:pb-[10rem] md:pb-[15rem] lg:pb-[20rem] xl:pb-[30rem]">
      <div className="pt-10 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-20">
        <h1 className="text-md sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold">
          <span className="text-[#0E9F6E]">Success!</span> You are now pending
          approval from Mr. Decker
        </h1>
      </div>
      <div className="mt-4 sm:mt-[4rem]">
        <p className="text-md sm:text-lg md:text-xl">
          Here are the details of the student you are tutoring:
        </p>
        <p className="text-md sm:text-lg md:text-xl">
          <span className="font-bold">Name:</span> John Doe
          (john.doe@franklinsabers.org)
        </p>
        <p className="text-md sm:text-lg md:text-xl">
          <span className="font-bold">Grade:</span> 10
        </p>
        <p className="text-md sm:text-lg md:text-xl">
          <span className="font-bold">Subject:</span> Pre-AP Chemistry
        </p>
      </div>
      <div className="mt-12 sm:mt-14 md:mt-20">
        <p className="text-lg sm:text-xl md:text-2xl font-bold">Next Steps?</p>
        <div className="text-md sm:text-lg md:text-xl">
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
      <p className="mt-10 sm:mt-15 md:mt-[7rem] text-sm sm:text-md">
        If you would like to cancel your request within the next 10 minutes, you
        can click the button below:
      </p>

      <div className="flex justify-start">
        <Button
          className="text-black bg-cancel-button mt-2 md:mt-4 py-2 px-4 md:py-3 md:px-6 rounded"
          variant="primary"
          onClick={handleTestEmail}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AcceptRequest;
