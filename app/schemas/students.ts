import { z } from "zod";
export const ReferralSourceEnum = z.enum([
  "Friend",
  "TICTOK",
  "Facebook",
  "Instagram",
  "SCHOOL",
  "AGENT",
  "Other",
]);

export const GradeSchema = z.object({
  name: z.string().min(1, "Grade name is required"),
});

export const StudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  grandName: z.string().min(1, "Grand name is required"),
  age: z.number().int().min(1, "Age must be a positive integer"),
  schoolName: z.string().min(1, "School name is required"),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  grade: z.string(),
  referralSource: ReferralSourceEnum,
});

export type ReferralSourceT = z.infer<typeof ReferralSourceEnum>;
export type GradeT = z.infer<typeof GradeSchema>;
export type StudentT = z.infer<typeof StudentSchema>;
