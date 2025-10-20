import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { getBackendPermission } from "@/lib/auth/roles";

const prisma = new PrismaClient();

export async function GET(req) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  try {
    let teacher = await prisma.teacher.findUnique({
      where: { userId: user.id },
    });

    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: { userId: user.id },
      });
    }

    return NextResponse.json({
      classes: teacher.classes,
      isProfileComplete: teacher.isProfileComplete,
    });
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const response = await getBackendPermission("teacher");
  if (!response.isValid) return response.error;
  const user = response.user;

  try {
    const data = await req.json();

    let teacher = await prisma.teacher.findUnique({
      where: { userId: user.id },
    });

    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: { userId: user.id },
      });
    }

    const updatedTeacher = await prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        classes: JSON.stringify(data.classes),
        isProfileComplete: true,
      },
    });

    return NextResponse.json({
      message: "Profile updated successfully",
      classes: updatedTeacher.classes,
      isProfileComplete: updatedTeacher.isProfileComplete,
    });
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
