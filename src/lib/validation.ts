import { z } from 'zod';
import type { ValidationResult } from '@/types';

/**
 * Validation schemas for all forms in the application
 * Using Zod for type-safe runtime validation
 */

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Imię musi mieć co najmniej 2 znaki')
    .max(100, 'Imię nie może przekraczać 100 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]+$/, 'Imię może zawierać tylko litery'),
  
  email: z.string()
    .email('Nieprawidłowy adres email')
    .max(254, 'Email nie może przekraczać 254 znaków'),
  
  phone: z.string()
    .regex(/^[+]?[\d\s()-]{9,20}$/, 'Nieprawidłowy numer telefonu')
    .optional()
    .or(z.literal('')),
  
  message: z.string()
    .min(10, 'Wiadomość musi mieć co najmniej 10 znaków')
    .max(5000, 'Wiadomość nie może przekraczać 5000 znaków'),
  
  // Honeypot field for spam protection
  website: z.string().max(0, 'Bot detected').optional(),
  
  // Privacy policy acceptance
  privacyAccepted: z.boolean()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .refine((val: any) => val === true, 'Musisz zaakceptować politykę prywatności'),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Website brief form schema
export const websiteBriefSchema = z.object({
  // Basic information
  companyName: z.string()
    .min(2, 'Nazwa firmy musi mieć co najmniej 2 znaki')
    .max(200, 'Nazwa firmy nie może przekraczać 200 znaków'),
  
  industry: z.string()
    .min(2, 'Branża musi mieć co najmniej 2 znaki')
    .max(100, 'Branża nie może przekraczać 100 znaków'),
  
  websiteType: z.enum([
    'landing-page',
    'website',
    'ecommerce',
    'blog',
    'portfolio',
    'saas',
    'other'
  ], { message: 'Wybierz typ strony' }),
  
  // Project details
  projectDescription: z.string()
    .min(20, 'Opis projektu musi mieć co najmniej 20 znaków')
    .max(2000, 'Opis projektu nie może przekraczać 2000 znaków'),
  
  targetAudience: z.string()
    .min(10, 'Grupa docelowa musi mieć co najmniej 10 znaków')
    .max(500, 'Grupa docelowa nie może przekraczać 500 znaków'),
  
  goals: z.string()
    .min(10, 'Cele muszą mieć co najmniej 10 znaków')
    .max(1000, 'Cele nie mogą przekraczać 1000 znaków'),
  
  // Design preferences
  designStyle: z.string()
    .max(500, 'Preferencje stylu nie mogą przekraczać 500 znaków')
    .optional(),
  
  colorPreferences: z.string()
    .max(300, 'Preferencje kolorów nie mogą przekraczać 300 znaków')
    .optional(),
  
  // Technical requirements
  features: z.array(z.string())
    .min(1, 'Wybierz co najmniej jedną funkcjonalność')
    .max(50, 'Maksymalnie 50 funkcjonalności'),
  
  integrations: z.string()
    .max(1000, 'Integracje nie mogą przekraczać 1000 znaków')
    .optional(),
  
  // Budget and timeline
  budget: z.enum([
    'less-than-5k',
    '5k-10k',
    '10k-20k',
    '20k-50k',
    'more-than-50k',
    'not-sure'
  ], { message: 'Wybierz budżet' }),
  
  timeline: z.enum([
    'urgent',
    '1-month',
    '2-3-months',
    '3-6-months',
    'flexible'
  ], { message: 'Wybierz termin realizacji' }),
  
  // Contact details
  contactName: z.string()
    .min(2, 'Imię i nazwisko musi mieć co najmniej 2 znaki')
    .max(100, 'Imię i nazwisko nie może przekraczać 100 znaków'),
  
  contactEmail: z.string()
    .email('Nieprawidłowy adres email')
    .max(254, 'Email nie może przekraczać 254 znaków'),
  
  contactPhone: z.string()
    .regex(/^[+]?[\d\s()-]{9,20}$/, 'Nieprawidłowy numer telefonu')
    .optional()
    .or(z.literal('')),
  
  // Additional information
  additionalInfo: z.string()
    .max(2000, 'Dodatkowe informacje nie mogą przekraczać 2000 znaków')
    .optional(),
  
  // Honeypot
  website: z.string().max(0, 'Bot detected').optional(),
});

export type WebsiteBriefData = z.infer<typeof websiteBriefSchema>;

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: z.string()
    .email('Nieprawidłowy adres email')
    .max(254, 'Email nie może przekraczać 254 znaków'),
  
  // Honeypot field
  website: z.string().max(0, 'Bot detected').optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

// Generic form validation helper
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  // Format Zod errors into a more usable structure
  const errors: Record<string, string[]> = {};
  
  result.error.issues.forEach(issue => {
    const path = issue.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(issue.message);
  });
  
  return { success: false, errors };
}

// Convenience helpers so consumers nie muszą dotykać Zod
export const validateContactForm = (data: unknown): ValidationResult<ContactFormData> =>
  validateForm(contactFormSchema, data);

export const validateNewsletterForm = (data: unknown): ValidationResult<NewsletterData> =>
  validateForm(newsletterSchema, data);

// Sanitization helpers
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 10000); // Hard limit on length
}

export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+()-\s]/g, '').trim();
}
