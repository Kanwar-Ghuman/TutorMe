import GetBestMatch from "./tutorPairSystem";
import { PrismaClient } from "@prisma/client";
import { useEmailSender } from "@/hooks/useEmailSender";
import {
  tutorConfirmationEmail,
  studentConfirmationEmail,
  tutorSubjectLine,
  studentSubjectLine,
} from "@/components/utils/emailTemplate";

const prisma = new PrismaClient();
const { sendMatchEmail } = useEmailSender();

import GetBestMatch from "./tutorPairSystem";

export async function matchTutor(tutorRequest) {
  try {
    const matchedTutor = await GetBestMatch(tutorRequest);

    if (typeof matchedTutor === "string") {
      await sendEmail(
        "admin@example.com",
        "No Tutor Match Found",
        matchedTutor
      );
      return null;
    }

    const match = await prisma.tutorMatch.create({
      data: {
        tutorId: matchedTutor.id,
        requestId: tutorRequest.id,
        status: "PENDING_CONFIRMATION",
      },
    });

    // Update the tutor's matchedRequest count
    await prisma.tutor.update({
      where: { id: matchedTutor.id },
      data: { matchedRequest: { increment: 1 } },
    });

    return match;
  } catch (error) {
    console.error("Error in matchTutor:", error);
    throw error;
  }
}
export async function approveMatch(matchId) {
  try {
    const match = await prisma.tutorMatch.update({
      where: { id: matchId },
      data: { status: "APPROVED" },
      include: { tutor: true, request: { include: { student: true } } },
    });

    // Send email to tutor
    await sendMatchEmail(
      match.tutor.email,
      tutorSubjectLine,
      {
        name: match.tutor.name,
        email: match.tutor.email,
      },
      {
        name: match.request.student.name,
        email: match.request.student.email,
        subject: match.request.subject,
      }
    );

    await sendMatchEmail(
      match.request.student.email,
      studentSubjectLine,
      {
        name: match.tutor.name,
        email: match.tutor.email,
      },
      {
        name: match.request.student.name,
        email: match.request.student.email,
        subject: match.request.subject,
      }
    );

    return match;
  } catch (error) {
    console.error("Error in approveMatch:", error);
    throw error;
  }
}

export async function denyMatch(matchId) {
  try {
    const match = await prisma.tutorMatch.delete({
      where: { id: matchId },
    });

    return match;
  } catch (error) {
    console.error("Error in denyMatch:", error);
    throw error;
  }
}
