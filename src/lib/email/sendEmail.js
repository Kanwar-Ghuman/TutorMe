import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/hooks/email/email";

const prisma = new PrismaClient();

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function sendConfirmationEmails({
  studentEmail,
  tutorEmail,
  requestId,
  studentToken,
  tutorToken,
}) {
  // Use provided tokens or generate new ones
  const finalStudentToken = studentToken || generateToken();
  const finalTutorToken = tutorToken || generateToken();

  await prisma.tutorRequest.update({
    where: { id: requestId },
    data: {
      studentToken: finalStudentToken,
      tutorToken: finalTutorToken,
    },
  });

  await Promise.all([
    sendEmail(
      studentEmail,
      "Confirm Your Tutor Match",
      `Click to confirm: ${process.env.NEXT_PUBLIC_URL}/confirm/${finalStudentToken}?type=student`
    ),
    sendEmail(
      tutorEmail,
      "Confirm Your Student Match",
      `Click to confirm: ${process.env.NEXT_PUBLIC_URL}/confirm/${finalTutorToken}?type=tutor`
    ),
  ]);
}
