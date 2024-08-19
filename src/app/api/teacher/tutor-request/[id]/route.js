import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";
import { createTutorRequestSchema } from "@/lib/forms/schemas";
import { validateForm } from "@/lib/forms/helpers";

const prisma = new PrismaClient();

export async function DELETE(req, { params }) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
  });

  const deletedRequest = await prisma.tutorRequest.deleteMany({
    where: {
      id: params.id,
      teacherId: teacher.id,
    },
  });

  if (deletedRequest.count === 0) {
    return NextResponse.json(
      { error: "Request not found or you don't have permission to delete it" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted tutor request successfully" });
}

export async function PUT(req, { params }) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  const data = await req.json();
  console.log("Request data:", data);

  const validation = validateForm(createTutorRequestSchema, data);
  if (!validation.isValid) return validation.error;

  const teacher = await prisma.teacher.findUnique({
    where: { userId: user.id },
  });

  const updatedRequest = await prisma.tutorRequest.updateMany({
    where: {
      id: params.id,
      teacherId: teacher.id,
    },
    data: {
      student: data.studentName,
      studentEmail: data.studentEmail,
      subject: data.subject,
      genderPref: data.genderPreference,
    },
  });

  if (updatedRequest.count === 0) {
    return NextResponse.json(
      { error: "Request not found or you don't have permission to modify it" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Updated tutor request successfully" });
}
