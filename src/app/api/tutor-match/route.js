import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { matchTutor, approveMatch, denyMatch } from "@/lib/logic/matchTutor";
import crypto from "crypto";

const prisma = new PrismaClient();

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

export async function POST(req) {
  try {
    const { requestId } = await req.json();
    const tutorRequest = await prisma.tutorRequest.findUnique({
      where: { id: requestId },
    });

    if (!tutorRequest) {
      return NextResponse.json(
        { error: "Tutor request not found" },
        { status: 404 }
      );
    }

    const match = await matchTutor(tutorRequest);

    // matchTutor already handles token generation and email sending
    // No need for duplicate logic here

    return NextResponse.json({ match });
  } catch (error) {
    console.error("Error in POST /api/tutor-match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { action, matchId, token, type } = body;

    if (action === "confirm") {
      if (!token || !type) {
        return NextResponse.json(
          { error: "Missing token or type for confirmation" },
          { status: 400 }
        );
      }

      const request = await prisma.tutorRequest.findFirst({
        where: {
          OR: [{ studentToken: token }, { tutorToken: token }],
        },
      });

      if (!request) {
        return NextResponse.json(
          { error: "Invalid confirmation token" },
          { status: 400 }
        );
      }

      const isStudentToken = request.studentToken === token;
      const isTutorToken = request.tutorToken === token;

      if (
        (type === "student" && !isStudentToken) ||
        (type === "tutor" && !isTutorToken)
      ) {
        return NextResponse.json(
          { error: "Invalid token type" },
          { status: 400 }
        );
      }

      let newStatus = request.status;
      if (request.status === "MATCHED") {
        newStatus =
          type === "student" ? "STUDENT_CONFIRMED" : "TUTOR_CONFIRMED";
      } else if (request.status === "STUDENT_CONFIRMED" && type === "tutor") {
        newStatus = "PENDING_ADMIN";
      } else if (request.status === "TUTOR_CONFIRMED" && type === "student") {
        newStatus = "PENDING_ADMIN";
      }

      const updated = await prisma.tutorRequest.update({
        where: { id: request.id },
        data: {
          status: newStatus,
          ...(newStatus === "PENDING_ADMIN" && {
            studentToken: null,
            tutorToken: null,
          }),
        },
      });

      return NextResponse.json({ status: updated.status });
    }

    if (action === "approve") {
      if (!matchId) {
        return NextResponse.json({ error: "Missing matchId" }, { status: 400 });
      }

      const match = await approveMatch(matchId);
      return NextResponse.json({ match });
    }

    if (action === "deny") {
      if (!matchId) {
        return NextResponse.json({ error: "Missing matchId" }, { status: 400 });
      }

      const match = await denyMatch(matchId);
      return NextResponse.json({ match });
    }

    return NextResponse.json(
      { error: "Invalid action specified" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in tutor-match PUT:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
