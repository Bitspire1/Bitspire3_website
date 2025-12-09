import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
  phone: z.string().optional(),
  subject: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
