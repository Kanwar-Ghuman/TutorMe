import { PrismaClient } from "@prisma/client";
import {
  tutorSubjectLine,
  studentSubjectLine,
  confirmationEmailTemplate,
  createTutorConfirmationEmail,
} from "@/components/utils/emailTemplate";
// Enhanced email template imported from emailTemplate.js
import GetBestMatch from "./tutorPairSystem";
import { sendEmail } from "@/hooks/email/email";
import crypto from "crypto";

const prisma = new PrismaClient();

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

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

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
        studentSubjectLine,
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
        tutorSubjectLine,
        createTutorConfirmationEmail(
          updatedMatch.matchedTutor.name,
          updatedMatch.student,
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

    // Send final approval emails
    await sendEmail(
      updatedMatch.tutor.email,
      "Tutoring Session Approved - Ready to Start!",
      confirmationEmailTemplate(
        updatedMatch.tutor.name,
        "tutor",
        updatedMatch.student,
        updatedMatch.subject,
        null // No confirmation link needed for approved matches
      )
    );

    await sendEmail(
      updatedMatch.studentEmail,
      "Your Tutoring Session is Approved!",
      confirmationEmailTemplate(
        updatedMatch.student,
        "student",
        updatedMatch.tutor.name,
        updatedMatch.subject,
        null // No confirmation link needed for approved matches
      )
    );

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
