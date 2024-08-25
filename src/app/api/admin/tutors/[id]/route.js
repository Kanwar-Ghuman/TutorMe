import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";
import { createTutorSchema } from "@/lib/forms/schemas";
import { validateForm } from "@/lib/forms/helpers";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;

  const user = response.user;

  const tutor = await prisma.tutor.findMany({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(tutor);
}

export async function PUT(req, { params }) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;

  try {
    const data = await req.json();
    console.log("Request data:", data);

    const validation = validateForm(createTutorSchema, {
      studentsName: data.name,
      studentsEmail: data.email,
      studentsSubjects: data.subjects,
    });

    if (!validation.isValid) {
      console.error("Validation error:", validation.error);
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const updatedTutor = await prisma.tutor.update({
      where: { id: params.id },
      data: {
        name: data.name,
        email: data.email,
        subjects: data.subjects,
      },
    });

    if (!updatedTutor) {
      return NextResponse.json(
        { error: "Tutor not found or you don't have permission to modify it" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Updated tutor successfully",
      tutor: updatedTutor,
    });
  } catch (error) {
    console.error("Error in PUT /api/admin/tutors/[id]:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;
  const user = response.user;

  const deletedTutor = await prisma.tutor.delete({
    where: { id: params.id },
  });

  return NextResponse.json({
    message: "Deleted tutor successfully",
    tutor: deletedTutor,
  });
}
