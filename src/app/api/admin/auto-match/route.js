import { NextResponse } from "next/server";
import { matchTutor } from "@/lib/logic/matchTutor";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST() {
  try {
    console.log("Triggering auto-match");
    const pendingRequests = await prisma.tutorRequest.findMany({
      where: {
        status: "PENDING",
        matchedTutorId: null,
        tutorId: null,
      },
    });

    const results = [];
    for (const request of pendingRequests) {
      const match = await matchTutor(request);
      if (match) {
        results.push(match);
      }
    }

    return NextResponse.json({ matches: results });
  } catch (error) {
    console.error("Error in auto-match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
