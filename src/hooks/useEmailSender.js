import { sendEmail } from "./email/email";

export function useEmailSender() {
  const sendMatchEmail = async (to, subject, tutorInfo, studentInfo) => {
    const html = `
      <h1>Tutor Match Confirmation</h1>
      <p>A tutor has been matched for your request!</p>
      <h2>Tutor Information:</h2>
      <p>Name: ${tutorInfo.name}</p>
      <p>Email: ${tutorInfo.email}</p>
      <h2>Student Information:</h2>
      <p>Name: ${studentInfo.name}</p>
      <p>Email: ${studentInfo.email}</p>
      <p>Subject: ${studentInfo.subject}</p>
    `;

    try {
      const result = await sendEmail(to, subject, html);
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
