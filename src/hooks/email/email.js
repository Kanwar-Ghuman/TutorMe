"use server";

import * as sgMail from "@sendgrid/mail";

export async function sendEmail(to, subject, text, html) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: "heyanantraj@gmail.com", // Your verified sender
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
