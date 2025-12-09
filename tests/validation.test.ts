import { describe, it, expect } from 'vitest';
import { validateForm, contactFormSchema, sanitizeInput, sanitizeEmail } from '@/lib/validation';

describe('Form Validation', () => {
  describe('contactFormSchema', () => {
    it('should validate correct contact form data', () => {
      const validData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'This is a test message with enough characters.',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, validData);
      
      expect(result.success).toBe(true);
      if (result.success) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = result.data as any;
        expect(data.name).toBe('Jan Kowalski');
        expect(data.email).toBe('jan@example.com');
      }
    });

    it('should reject name that is too short', () => {
      const invalidData = {
        name: 'J',
        email: 'jan@example.com',
        message: 'This is a test message with enough characters.',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.name).toBeDefined();
        expect(result.errors.name[0]).toContain('co najmniej 2 znaki');
      }
    });

    it('should reject invalid email', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'invalid-email',
        message: 'This is a test message with enough characters.',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.email).toBeDefined();
        expect(result.errors.email[0]).toContain('email');
      }
    });

    it('should reject message that is too short', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'Short',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.message).toBeDefined();
        expect(result.errors.message[0]).toContain('10 znaków');
      }
    });

    it('should reject when privacy not accepted', () => {
      const invalidData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'This is a test message with enough characters.',
        privacyAccepted: false,
      };

      const result = validateForm(contactFormSchema, invalidData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.privacyAccepted).toBeDefined();
      }
    });

    it('should accept optional phone number', () => {
      const validData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        phone: '+48 123 456 789',
        message: 'This is a test message with enough characters.',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, validData);
      
      expect(result.success).toBe(true);
    });

    it('should detect honeypot spam', () => {
      const spamData = {
        name: 'Jan Kowalski',
        email: 'jan@example.com',
        message: 'This is a test message with enough characters.',
        website: 'http://spam.com',
        privacyAccepted: true,
      };

      const result = validateForm(contactFormSchema, spamData);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.website).toBeDefined();
      }
    });
  });

  describe('Sanitization', () => {
    it('should trim whitespace from input', () => {
      const input = '  test input  ';
      const sanitized = sanitizeInput(input);
      
      expect(sanitized).toBe('test input');
    });

    it('should remove HTML tags', () => {
      const input = 'Hello <script>alert("xss")</script> World';
      const sanitized = sanitizeInput(input);
      
      expect(sanitized).not.toContain('<');
      expect(sanitized).not.toContain('>');
    });

    it('should enforce maximum length', () => {
      const input = 'a'.repeat(15000);
      const sanitized = sanitizeInput(input);
      
      expect(sanitized.length).toBeLessThanOrEqual(10000);
    });

    it('should lowercase and trim email', () => {
      const email = '  Test@Example.COM  ';
      const sanitized = sanitizeEmail(email);
      
      expect(sanitized).toBe('test@example.com');
    });
  });
});
