import { NextResponse } from "next/server";
import { matchTutor, approveMatch, denyMatch } from "@/lib/logic/matchTutor";

export async function POST(req) {
  try {
    const { requestId } = await req.json();
    const tutorRequest = await prisma.tutorRequest.findUnique({
      where: { id: requestId },
      include: { student: true },
    });

    if (!tutorRequest) {
      return NextResponse.json(
        { error: "Tutor request not found" },
        { status: 404 }
      );
    }

    const match = await matchTutor(tutorRequest);

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
    const { matchId, action } = await req.json();

    if (action === "approve") {
      const approvedMatch = await approveMatch(matchId);
      return NextResponse.json({ match: approvedMatch });
    } else if (action === "deny") {
      const deniedMatch = await denyMatch(matchId);
      return NextResponse.json({ match: deniedMatch });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in PUT /api/tutor-match:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
