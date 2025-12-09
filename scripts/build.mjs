#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '..', '.env.local');

// Load .env.local
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eqIndex = trimmed.indexOf('=');
      if (eqIndex > 0) {
        const key = trimmed.substring(0, eqIndex).trim();
        const value = trimmed.substring(eqIndex + 1).trim().replace(/^["']|["']$/g, '');
        process.env[key] = value;
        if (key.includes('TINA') || key.includes('CLIENT')) {
          console.log(`✓ Set ${key}`);
        }
      }
    }
  });
  console.log('✓ Loaded .env.local\n');
}

// Verify vars are set
if (!process.env.NEXT_PUBLIC_TINA_CLIENT_ID || !process.env.TINA_TOKEN) {
  console.error('✗ Missing TINA credentials in .env.local');
  process.exit(1);
}

// Set NODE_ENV to production for TinaCMS
process.env.NODE_ENV = 'production';
console.log('✓ Set NODE_ENV=production\n');

// Run tina build
console.log('Running: tinacms build');
try {
  execSync('npx tinacms build', { stdio: 'inherit', env: process.env });
} catch (error) {
  console.error('✗ tinacms build failed');
  process.exit(1);
}

// Run next build
console.log('\nRunning: next build');
try {
  execSync('next build', { stdio: 'inherit', env: process.env });
} catch (error) {
  console.error('✗ next build failed');
  process.exit(1);
}

console.log('\n✓ Build completed successfully');
