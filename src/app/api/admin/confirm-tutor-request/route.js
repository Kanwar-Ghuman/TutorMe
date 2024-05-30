import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { getBackendPermission } from '@/lib/auth/roles';

const prisma = new PrismaClient();

export async function GET(req) {
    const response = await getBackendPermission("admin");
    if (!response.isValid) return response.error;
    const user = response.user;

    // Get all the tutor requests that have made and return them
    const tutorRequests = await prisma.tutorRequest.findMany();

    return NextResponse.json(tutorRequests);
}