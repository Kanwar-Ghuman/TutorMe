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

    tutorLoop: for (const tutor of tutors) {
      if (tutor.matchedRequests.length > 3) {
        continue;
      }

      let matchScore = 0;
      let subjectScore = 0;

      for (const subject of tutor.subjects) {
        if (tutorRequest.subject !== subject) {
          continue;
        } else {
          subjectScore++;
          break;
        }
      }

      if (subjectScore === 0) {
        continue tutorLoop;
      } else {
        cachedTutor = tutor;
      }

      if (tutorRequest.genderPref === tutor.gender) {
        matchScore += 2;
      }

      if (matchScore > bestMatchScore) {
        bestMatch = tutor;
        bestMatchScore = matchScore;
      }
    }

    if (bestMatchScore <= 0) {
      if (cachedTutor != null) {
        console.log("Could not match gender, forced to choose cachedTutor");
        return cachedTutor;
      } else {
        console.log("Returning...");
        return "Could not find a good match... sending email to mister decker";
      }
    }
    return bestMatch;
  } catch (error) {
    console.error("Error in GetBestMatch:", error);
    throw error;
  }
}
