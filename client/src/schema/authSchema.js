import { z } from "zod";
import { stringValidation } from "@/lib/utils";

const passwordSchema = z
  .string()
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one numerical digit.",
  })
  .refine((value) => /[!@#$%^&*]/.test(value), {
    message: "Password must contain at least one special character.",
  });
 

export const loginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
});

export const registerSchema = z.object({
  name: stringValidation(3, 30, 'Name'),
  email: z.string().email(),
  password: passwordSchema,
  role: z.enum(['STUDENT', 'INSTRUCTOR']),
});
