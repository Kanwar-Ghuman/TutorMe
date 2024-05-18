import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { createTutorSchema } from "@/lib/forms/schemas";
import { validateForm } from "@/lib/forms/helpers";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function POST(req) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;
  const user = response.user;

  const data = await req.json();
  console.log("Request data:", data);
  console.log("User:", user);
  try {
    for (var tutor of data) {
      const validation = validateForm(createTutorSchema, tutor);
      if (!validation.isValid) return validation.error;
    }
    let tutors = [];
    for (var tutor of data) {
      tutors.push(await prisma.tutor.create({
        data: {
          name: tutor.name,
          email: tutor.email,
          subjects: tutor.subjects,
        }
      }));
    }

    return NextResponse.json({ message: "Created tutors successfully", tutors: tutors});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 }); // TODO: change this to more generic error message
  }
}

export async function GET(req) {
  const response = await getBackendPermission("admin");
  if (!response.isValid) return response.error;
  const user = response.user;

  const tutors = await prisma.tutor.findMany();

  return NextResponse.json(tutors);
}

