import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { createTutorRequestSchema } from '@/lib/forms/schemas';
import { validateForm } from '@/lib/forms/helpers';
import { getBackendPermission } from '@/lib/auth/roles';

const prisma = new PrismaClient();

export async function POST(req) {
    const response = await getBackendPermission("teacher");
    if (!response.isValid) return response.error;
    const user = response.user;

    const data = await req.json();
    console.log(data)

    const validation = validateForm(createTutorRequestSchema, data);
    if (!validation.isValid) return validation.error;

    let teacher = await prisma.teacher.findUnique({ where: { userId: user.id } });

    const tutorRequest = await prisma.tutorRequest.create({
      data: {
        student: data.studentName,
        studentEmail: data.studentEmail,
        subject: data.subject,
        genderPref: data.genderPreference,
        teacherId: teacher.id,
      },
    });

    return NextResponse.json({message : "Request created successfully"});
}