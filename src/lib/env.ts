/**
 * Environment variables validation and type-safe access
 * This ensures all required environment variables are present at build time
 */

function getEnvVar(key: string, required: boolean = true): string | undefined {
  const value = process.env[key];
  
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value;
}

export const env = {
  // TinaCMS Configuration
  NEXT_PUBLIC_TINA_CLIENT_ID: getEnvVar('NEXT_PUBLIC_TINA_CLIENT_ID'),
  TINA_TOKEN: getEnvVar('TINA_TOKEN'),
  
  // Analytics (optional)
  NEXT_PUBLIC_GA_ID: getEnvVar('NEXT_PUBLIC_GA_ID', false),
  
  // Build configuration
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;

// Validate environment variables at module load time
if (typeof window === 'undefined') {
  // Only validate on server-side
  // Access properties to trigger validation (void prevents ESLint warning)
  void env.NEXT_PUBLIC_TINA_CLIENT_ID;
  void env.TINA_TOKEN;
}
