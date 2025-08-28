import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function POST(req) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;

  try {
    const {
      tutorId,
      studentName,
      studentEmail,
      subject,
      scheduledDate,
      startTime,
      endTime,
      duration,
      location,
      notes,
    } = await req.json();

    const session = await prisma.tutoringSession.create({
      data: {
        tutorId,
        studentName,
        studentEmail,
        subject,
        scheduledDate: new Date(scheduledDate),
        startTime,
        endTime,
        duration: duration || 60,
        location,
        notes,
        status: "SCHEDULED",
      },
      include: {
        tutor: true,
      },
    });

    return NextResponse.json({
      message: "Tutoring session created successfully",
      session,
    });
  } catch (error) {
    console.error("Error creating tutoring session:", error);
    return NextResponse.json(
      { error: "Failed to create tutoring session" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;

  const { searchParams } = new URL(req.url);
  const tutorId = searchParams.get("tutorId");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const whereClause = {};

    if (tutorId) {
      whereClause.tutorId = tutorId;
    }

    if (startDate && endDate) {
      whereClause.scheduledDate = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const sessions = await prisma.tutoringSession.findMany({
      where: whereClause,
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
            email: true,
            subjects: true,
          },
        },
      },
      orderBy: {
        scheduledDate: "asc",
      },
    });

    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("Error fetching tutoring sessions:", error);
    return NextResponse.json(
      { error: "Failed to fetch tutoring sessions" },
      { status: 500 }
    );
  }
}
