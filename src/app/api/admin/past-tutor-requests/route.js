import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function GET(req) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;
  const user = response.user;

  // Get all the tutor requests that have made and return them
  const { searchParams } = new URL(req.url);

  const tutorRequests = await prisma.tutorRequest.findMany({
    where: {
      status: {
        in: searchParams.has("status")
          ? searchParams.get("status").split(",")
          : undefined,
      },
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
