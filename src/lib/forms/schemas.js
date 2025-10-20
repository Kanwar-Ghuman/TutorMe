import { z } from "zod";

export const createTutorRequestSchema = z.object({
  studentFirstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  studentLastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name is required"),
  studentEmail: z.string({
    required_error: "Email address is required",
  }),
  subject: z
    .string({
      required_error: "Subject is required",
    })
    .min(1, "Subject is required"),

  // Preferred times including after school
  preferredTimes: z.array(z.string()).optional(),
  description: z.string().optional(),
  tutorType: z.enum(["drop", "long-term"]).optional(),
});

export const createTutorSchema = z.object({
  studentsName: z
    .string({
      required_error: "Name is required",
    })
    .refine((value) => {
      const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
      return nameRegex.test(value);
    }, "Please enter the full name in the format 'First Last'"),
  studentsEmail: z
    .string({
      required_error: "Email address is required",
    })
    .email({
      message: "Please enter a valid email address",
    }),
  studentsSubjects: z
    .array(z.string({ required_error: "Subject is required" }))
    .min(1, "At least one subject must be selected"),
});

export const createTutorSchemaReal = z.object({
  studentsName: z
    .string({
      required_error: "Name is required",
    })
    .refine((value) => {
      const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
      return nameRegex.test(value);
    }, "Please enter the full name in the format 'First Last'"),
  studentsEmail: z.string({
    required_error: "Email address is required",
  }),
  studentsSubjects: z
    .array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    )
    .min(1, "At least one subject must be selected"),

  // Gold Block availability
  goldBlockDays: z.array(z.string()).optional(),
});
