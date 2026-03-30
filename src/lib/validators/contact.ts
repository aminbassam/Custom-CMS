import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(320),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
  website: z.string().max(0).optional().default("")
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
