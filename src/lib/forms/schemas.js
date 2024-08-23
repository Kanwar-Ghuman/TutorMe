import { z } from "zod";

export const createTutorRequestSchema = z.object({
  studentName: z
    .string({
      required_error: "Student Name is required",
    })
    .refine((value) => {
      const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
      return nameRegex.test(value);
    }, "Please enter the student's full name in the format 'First Last'"),
  studentEmail: z
    .string({
      required_error: "Email address is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  subject: z
    .string({
      required_error: "Subject is required",
    })
    .min(1, "Subject is required"),
  genderPreference: z
    .string({
      required_error: "Gender Preference is required",
    })
    .min(1, "Gender Preference is required"),
});

export const createTutorSchema = z.object({
  studentName: z
    .string({
      required_error: "Name is required",
    })
    .refine((value) => {
      const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
      return nameRegex.test(value);
    }, "Please enter the full name in the format 'First Last'"),
  studentEmail: z
    .string({
      required_error: "Email address is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  studentSubjects: z
    .array(z.string({ required_error: "Subject is required" }))
    .min(1, "At least one subject must be selected"),
});
