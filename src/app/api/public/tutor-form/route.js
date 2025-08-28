import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { validateForm } from "@/lib/forms/helpers";
import { createTutorSchemaReal } from "@/lib/forms/schemas";

const prisma = new PrismaClient();

export async function POST(req) {
  const data = await req.json();
  console.log("Request data:", data);

  try {
    for (var tutor of data) {
      const validation = validateForm(createTutorSchemaReal, {
        studentsName: tutor.name,
        studentsEmail: tutor.email,
        studentsSubjects: tutor.subjects.map((subject) => ({
          value: subject,
          label: subject,
        })),
      });
      if (!validation.isValid) return validation.error;
    }

    let tutors = [];
    for (var tutor of data) {
      const existingTutor = await prisma.tutor.findUnique({
        where: { email: tutor.email },
      });

      if (existingTutor) {
        return NextResponse.json(
          {
            error: `Email ${tutor.email} is already associated with another tutor.`,
          },
          { status: 400 }
        );
      }

      tutors.push(
        await prisma.tutor.create({
          data: {
            name: tutor.name,
            email: tutor.email,
            subjects: tutor.subjects,
            goldBlockDays: tutor.goldBlockDays || [],
          },
        })
      );
    }

    return NextResponse.json({
      message: "Created tutor application successfully",
      tutors: tutors,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
