import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(120),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(2000),
  // Honeypot: real users never see or fill this field.
  company: z.string().max(200).optional().default(""),
});

export type ContactInput = z.input<typeof contactSchema>;
