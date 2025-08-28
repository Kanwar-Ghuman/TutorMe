import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function GET(req) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;

  const user = response.user;
  const { searchParams } = new URL(req.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    // Get teacher
    const teacher = await prisma.teacher.findUnique({
      where: { userId: user.id },
      include: { tutorRequests: true },
    });

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    // Get all tutors that have been assigned to this teacher's requests
    const tutorIds = teacher.tutorRequests
      .filter((request) => request.tutorId || request.matchedTutorId)
      .map((request) => request.tutorId || request.matchedTutorId);

    const uniqueTutorIds = [...new Set(tutorIds)];

    // Get tutors with their schedules
    const tutors = await prisma.tutor.findMany({
      where: {
        id: { in: uniqueTutorIds },
      },
      include: {
        tutoringSessions: {
          where:
            startDate && endDate
              ? {
                  scheduledDate: {
                    gte: new Date(startDate),
                    lte: new Date(endDate),
                  },
                }
              : {},
        },
        assignedRequests: {
          where: { teacherId: teacher.id },
        },
      },
    });

    // Format the response
    const calendarData = tutors.map((tutor) => ({
      id: tutor.id,
      name: tutor.name,
      email: tutor.email,
      subjects: tutor.subjects,
      goldBlockDays: tutor.goldBlockDays || [],
      sessions: tutor.tutoringSessions.map((session) => ({
        id: session.id,
        studentName: session.studentName,
        studentEmail: session.studentEmail,
        subject: session.subject,
        date: session.scheduledDate,
        goldBlockDay: session.goldBlockDay,
        status: session.status,
        location: session.location || "Gold Block Room",
        notes: session.notes,
      })),
      activeRequests: tutor.assignedRequests.filter(
        (req) => req.status === "APPROVED"
      ).length,
      // Add availability status for each gold block day
      availability: {
        monday: tutor.goldBlockDays?.includes("monday") || false,
        tuesday: tutor.goldBlockDays?.includes("tuesday") || false,
        friday: tutor.goldBlockDays?.includes("friday") || false,
      },
    }));

    return NextResponse.json({
      tutors: calendarData,
      teacherName: teacher.user?.name || "Teacher",
    });
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return NextResponse.json(
      { error: "Failed to fetch calendar data" },
      { status: 500 }
    );
  }
}
