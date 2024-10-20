import { sendEmail } from "./email/email";

export function useEmailSender() {
  const sendMatchEmail = async ({
    recipient,
    subject,
    tutorData,
    studentData,
    message,
  }) => {
    if (!tutorData || !studentData) {
      console.error("Missing tutor or student data");
      return;
    }

    if (message) {
      console.log(`Message: ${message}`);
    }

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
        }
        .container {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          color: black;
        }
        .line {
          align-items: center;
          text-align: center;
          gap: 5px;
          color: black;
        }
        .logo {
          text-align: center;
          color: black;
          font-size: 24px;
          font-weight: bold;
        }
        .logoStyle {
          color: #FACC14;
          padding-left: 5px;
        }
        .title {
          text-align: center;
          color: black;
        }
        .subtitle {
          font-weight: bold;
        }
        .content {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <p class="logo">NHS<span class="logoStyle">TutorMe</span></p>
          <h1 class="title">Tutor Match Confirmation</h1>
        </div>
        <div class="content">
          <p>A tutor has been matched for your request!</p>
          <div class="line">
            <p><span class="subtitle">Tutor Name:</span> ${tutorData.name}</p>
          </div>
          <div class="line">
            <p><span class="subtitle">Tutor Email:</span> ${tutorData.email}</p>
          </div>
          <div class="line">
            <p><span class="subtitle">Student Name:</span> ${
              studentData.name
            }</p>
          </div>
          <div class="line">
            <p><span class="subtitle">Student Email:</span> ${
              studentData.email
            }</p>
          </div>
          <div class="line">
            <p><span class="subtitle">Subject:</span> ${studentData.subject}</p>
          </div>
          ${
            message
              ? `<div class="line"><p><span class="subtitle">Message:</span> ${message}</p></div>`
              : ""
          }
          <p>Thank you for using TutorMe!</p>
        </div>
      </div>
    </body>
    </html>
    `;

    try {
      const result = await sendEmail(recipient, subject, html);
      if (result) {
        console.log("Match email sent successfully");
        return true;
      } else {
        console.error("Failed to send match email");
        return false;
      }
    } catch (error) {
      console.error("Error sending match email:", error);
      return false;
    }
  };

  return { sendMatchEmail };
}
