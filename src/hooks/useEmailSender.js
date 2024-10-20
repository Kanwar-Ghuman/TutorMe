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

    console.log(`Sending email to: ${recipient}`);
    console.log(`Subject: ${subject}`);
    console.log(`Tutor: ${tutorData.name} (${tutorData.email})`);
    console.log(`Student: ${studentData.name} (${studentData.email})`);
    console.log(`Subject: ${studentData.subject}`);
    if (message) {
      console.log(`Message: ${message}`);
    }

    const html = `
      <h1>Tutor Match Confirmation</h1>
      <p>A tutor has been matched for your request!</p>
      <h2>Tutor Information:</h2>
      <p>Name: ${tutorData.name}</p>
      <p>Email: ${tutorData.email}</p>
      <h2>Student Information:</h2>
      <p>Name: ${studentData.name}</p>
      <p>Email: ${studentData.email}</p>
      <p>Subject: ${studentData.subject}</p>
      ${message ? `<p>Message: ${message}</p>` : ""}
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
