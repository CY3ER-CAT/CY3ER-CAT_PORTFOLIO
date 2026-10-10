import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please tell me your name — at least 2 characters.')
    .max(80, 'That name is a little too long.'),
  email: z.string().trim().email('That email address does not look right.'),
  message: z
    .string()
    .trim()
    .min(20, 'Give me a bit more to work with — at least 20 characters.')
    .max(2000, 'Please keep it under 2000 characters.'),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
