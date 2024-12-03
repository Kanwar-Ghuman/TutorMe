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

import { sendEmail } from "@/hooks/email/email";
import { confirmationEmailTemplate } from "@/components/utils/emailTemplate";
import crypto from "crypto";

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function matchTutor(tutorRequest) {
  try {
    const bestMatch = await GetBestMatch(tutorRequest);
    if (!bestMatch) {
      throw new Error("No suitable tutor found");
    }

    const studentToken = generateToken();
    const tutorToken = generateToken();

    const baseUrl = process.env.NEXT_PUBLIC_URL;

    const updatedMatch = await prisma.tutorRequest.update({
      where: { id: tutorRequest.id },
      data: {
        status: "MATCHED",
        studentToken: studentToken,
        tutorToken: tutorToken,
        matchedTutor: {
          connect: { id: bestMatch.id },
        },
      },
      include: {
        matchedTutor: true,
        teacher: true,
        tutor: true,
      },
    });

    await Promise.all([
      sendEmail(
        updatedMatch.studentEmail,
        "Confirm Your TutorMe Match",
        confirmationEmailTemplate(
          updatedMatch.student,
          "student",
          updatedMatch.matchedTutor.name,
          updatedMatch.subject,
          `${baseUrl}/confirm/${studentToken}?type=student`
        )
      ),
      sendEmail(
        updatedMatch.matchedTutor.email,
        "Confirm Your TutorMe Match",
        confirmationEmailTemplate(
          updatedMatch.matchedTutor.name,
          "tutor",
          updatedMatch.student, // Matched student's name
          updatedMatch.subject,
          `${baseUrl}/confirm/${tutorToken}?type=tutor`
        )
      ),
    ]);

    return updatedMatch;
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
      emailTemplate: confirmationEmailTemplate,
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
      emailTemplate: confirmationEmailTemplate,
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
