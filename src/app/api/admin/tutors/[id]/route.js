
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getBackendPermission } from '@/lib/auth/roles';
import { createTutorSchema } from "@/lib/forms/schemas";
import { validateForm } from "@/lib/forms/helpers";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
    // existing GET code
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
    const user = response.user;

    const data = await req.json();
    console.log("Request data:", data);

    const tutor = await prisma.tutor.findUnique({ where: { id: params.id } });

    if (data.name) tutor.name = data.name;
    if (data.email) tutor.email = data.email;
    if (data.subjects) tutor.subjects = data.subjects;

    const validation = validateForm(createTutorSchema, tutor);
    if (!validation.isValid) return validation.error;

    console.log(tutor)

    const updatedTutor = await prisma.tutor.update({
        where: { id: params.id },
        data: tutor,
    });

    return NextResponse.json(updatedTutor);
}

export async function DELETE(req, { params }) {
    const response = await getBackendPermission("admin");
    if (!response.isValid) return response.error;
    const user = response.user;

    const deletedTutor = await prisma.tutor.delete({
        where: { id: params.id },
    });

    return NextResponse.json({ message: "Deleted tutor successfully", tutor: deletedTutor});
}