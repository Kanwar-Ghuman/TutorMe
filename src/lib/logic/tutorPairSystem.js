import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function GetBestMatch(tutorRequest) {
  let bestMatch = null;
  let bestMatchScore = -99;
  let cachedTutor = null;

  try {
    const tutors = await prisma.tutor.findMany({
      include: {
        matchedRequests: true,
      },
    });

    tutors.sort((a, b) => a.matchedRequests.length - b.matchedRequests.length);

    tutorLoop: for (const tutor of tutors) {
      const hasActiveMatch = await prisma.tutorRequest.findFirst({
        where: {
          OR: [
            {
              matchedTutorId: tutor.id,
              status: "PENDING_CONFIRMATION",
            },
            {
              tutorId: tutor.id,
              status: "APPROVED",
            },
          ],
        },
      });

      if (hasActiveMatch) {
        continue;
      }

      let matchScore = 0;
      let subjectScore = 0;

      for (const subject of tutor.subjects) {
        if (tutorRequest.subject === subject) {
          subjectScore++;
          break;
        }
      }

      if (subjectScore === 0) {
        continue tutorLoop;
      } else {
        cachedTutor = tutor;
        matchScore += 5;
      }

      if (tutorRequest.genderPref === tutor.gender) {
        matchScore += 2;
      }

      matchScore += 3 / (tutor.matchedRequests.length + 1);

      if (matchScore > bestMatchScore) {
        bestMatch = tutor;
        bestMatchScore = matchScore;
      }
    }

    if (bestMatch) {
      return bestMatch;
    } else if (cachedTutor) {
      console.log("Could not match gender, forced to choose cachedTutor");
      return cachedTutor;
    } else {
      console.log("Returning...");
      return "Could not find a good match... sending email to mister decker";
    }
  } catch (error) {
    console.error("Error in GetBestMatch:", error);
    throw error;
  }
}
