import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // Vercel automatically handles images optimization
  images: {
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
