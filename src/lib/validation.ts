// Minimal validation utilities used by tests
export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export const contactFormSchema = {
  fields: ['name', 'email', 'message', 'privacyAccepted', 'phone', 'website'],
};

export function sanitizeInput(input: unknown): string {
  if (input == null) return '';
  let s = String(input);
  // trim
  s = s.trim();
  // remove HTML tags
  s = s.replace(/<[^>]*>?/gm, '');
  // enforce max length
  if (s.length > 10000) s = s.slice(0, 10000);
  return s;
}

export function sanitizeEmail(input: unknown): string {
  if (input == null) return '';
  let s = String(input);
  s = s.trim().toLowerCase();
  // remove spaces
  s = s.replace(/\s+/g, '');
  return s;
}

export function validateForm(schema: typeof contactFormSchema, data: Record<string, any>): ValidationResult<Record<string, any>> {
  const errors: Record<string, string[]> = {};

  // Honeypot: website must be empty
  if (data.website) {
    if (String(data.website).trim().length > 0) {
      errors.website = ['Spam detected'];
    }
  }

  // Name: required, min 2
  const name = sanitizeInput(data.name);
  if (!name || name.length < 2) {
    errors.name = [`Nazwa musi mieć co najmniej 2 znaki`];
  }

  // Email: required, basic validation
  const email = sanitizeEmail(data.email);
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    errors.email = [`Nieprawidłowy email`];
  }

  // Message: required, min 10
  const message = sanitizeInput(data.message);
  if (!message || message.length < 10) {
    errors.message = [`Wiadomość musi mieć co najmniej 10 znaków`];
  }

  // Privacy: must be true
  if (data.privacyAccepted !== true && data.privacyAccepted !== 'true') {
    errors.privacyAccepted = ['Zgoda na przetwarzanie danych jest wymagana'];
  }

  // Phone: optional - sanitize if present
  const phone = data.phone ? sanitizeInput(data.phone) : undefined;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const out: Record<string, any> = {
    name,
    email,
    message,
    privacyAccepted: true,
  };
  if (phone) out.phone = phone;

  return { success: true, data: out };
}

export default { sanitizeInput, sanitizeEmail, validateForm, contactFormSchema };
