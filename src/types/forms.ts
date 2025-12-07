import type { z } from 'zod';
import type { ContactFormData } from '@/lib/validation';
import type { BriefStep } from './brief';

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Record<string, string[]> };

export type { ContactFormData, BriefStep };

// Utility type helper for schema-based validators (keeps Zod hidden from call sites)
export type SchemaValidator<T> = (data: unknown) => ValidationResult<T>;

// Re-export Zod schema type only if someone needs to build a schema externally
export type ZodSchema<T> = z.ZodSchema<T>;
