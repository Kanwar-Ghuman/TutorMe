import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function GET(req) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  const { searchParams } = new URL(req.url);

  const status = searchParams.get("status");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
  });

  const tutorRequests = await prisma.tutorRequest.findMany({
    where: {
      teacherId: teacher.id,
      status: status || undefined,
    },

    select: {
      id: true,
      student: true,
      studentEmail: true,
      subject: true,
      genderPref: true,
      status: true,
      tutor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      matchedTutor: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json(tutorRequests);
}
