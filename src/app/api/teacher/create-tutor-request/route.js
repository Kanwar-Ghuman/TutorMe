import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import Joi from 'joi';

const prisma = new PrismaClient();

const schema = Joi.object({
  user: Joi.object({
    id: Joi.string().required(),
    role: Joi.string().valid('teacher').required(),
  }).required(),
  teacherId: Joi.string().required(),
  student: Joi.string().required(),
  studentEmail: Joi.string().email().required(),
  subject: Joi.string().required(),
  genderPref: Joi.string().optional(),
  additionalInfo: Joi.string().optional(),
  tutorId: Joi.string().optional(),
});
export default async function POST(req) {
    const { error } = schema.validate(req.body);

    if (error) {
      return NextResponse.json({ error: error.details[0].message });
    }

    const { user, ...tutorRequestData } = req.body;

    let teacher = await prisma.teacher.findUnique({ where: { userId: user.id } });

    if (!teacher) {
      teacher = await prisma.teacher.create({ data: { userId: user.id } });
    }

    const tutorRequest = await prisma.tutorRequest.create({
      data: {
        ...tutorRequestData,
        teacherId: teacher.id,
      },
    });

    return NextResponse.json(tutorRequest);
}