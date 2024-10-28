import { PrismaClient } from "@prisma/client";
import { useEmailSender } from "@/hooks/useEmailSender";
import {
  tutorConfirmationEmail,
  studentConfirmationEmail,
  tutorSubjectLine,
  studentSubjectLine,
} from "@/components/utils/emailTemplate";

import GetBestMatch from "./tutorPairSystem";

const prisma = new PrismaClient();
const { sendMatchEmail } = useEmailSender();

export async function matchTutor(tutorRequest) {
  try {
    const matchedTutor = await GetBestMatch(tutorRequest);

    if (typeof matchedTutor === "string") {
      await sendMatchEmail({
        recipient: "ghumankm@gmail.com",
        subject: "No Tutor Match Found",
        tutorData: { name: "Admin", email: "ghumankm@gmail.com" },
        studentData: {
          name: tutorRequest.student,
          email: tutorRequest.studentEmail,
          subject: tutorRequest.subject,
        },
        message: matchedTutor,
      });
      return null;
    }
    const existingAssignment = await prisma.tutorRequest.findFirst({
      where: {
        matchedTutorId: matchedTutor.id,
        status: {
          in: ["PENDING_CONFIRMATION", "APPROVED"],
        },
      },
    });

    if (existingAssignment) {
      console.log("Tutor already assigned to another request");
      return null;
    }

    const updatedRequest = await prisma.tutorRequest.update({
      where: { id: tutorRequest.id },
      data: {
        matchedTutorId: matchedTutor.id,
        status: "PENDING_CONFIRMATION",
      },
      include: {
        matchedTutor: true,
      },
    });

    return updatedRequest;
  } catch (error) {
    console.error("Error in matchTutor:", error);
    throw error;
  }
}

export async function approveMatch(matchId) {
  try {
    const match = await prisma.tutorRequest.findUnique({
      where: { id: matchId },
      include: { matchedTutor: true },
    });

    if (!match) {
      throw new Error("Tutor request not found");
    }

    if (!match.matchedTutor) {
      throw new Error("No matched tutor found for this request");
    }

    const existingApprovedMatch = await prisma.tutorRequest.findFirst({
      where: {
        tutorId: match.matchedTutor.id,
        status: "APPROVED",
      },
    });

    if (existingApprovedMatch) {
      throw new Error("Tutor already has an approved match");
    }

    const updatedMatch = await prisma.$transaction(async (prisma) => {
      await prisma.tutorRequest.update({
        where: { id: matchId },
        data: {
          matchedTutor: {
            disconnect: true,
          },
        },
      });

      // Then update the request with the new tutor connection
      const updatedRequest = await prisma.tutorRequest.update({
        where: { id: matchId },
        data: {
          status: "APPROVED",
          tutor: {
            connect: { id: match.matchedTutor.id },
          },
          matchedTutor: {
            disconnect: true,
          },
        },
        include: {
          tutor: true,
        },
      });

      return updatedRequest;
    });

    // Send confirmation emails
    await sendMatchEmail({
      recipient: updatedMatch.tutor.email,
      subject: tutorSubjectLine,
      emailTemplate: tutorConfirmationEmail,
      tutorData: {
        name: updatedMatch.tutor.name,
        email: updatedMatch.tutor.email,
      },
      studentData: {
        name: updatedMatch.student,
        email: updatedMatch.studentEmail,
        subject: updatedMatch.subject,
      },
    });

    await sendMatchEmail({
      recipient: updatedMatch.studentEmail,
      subject: studentSubjectLine,
      emailTemplate: studentConfirmationEmail,
      tutorData: {
        name: updatedMatch.tutor.name,
        email: updatedMatch.tutor.email,
      },
      studentData: {
        name: updatedMatch.student,
        email: updatedMatch.studentEmail,
        subject: updatedMatch.subject,
      },
    });

    return updatedMatch;
  } catch (error) {
    console.error("Error in approveMatch:", error);
    throw error;
  }
}

export async function denyMatch(matchId) {
  try {
    const match = await prisma.tutorRequest.update({
      where: { id: matchId },
      data: {
        matchedTutorId: null,
        status: "PENDING",
      },
    });

    return match;
  } catch (error) {
    console.error("Error in denyMatch:", error);
    throw error;
  }
}
