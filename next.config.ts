import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable image optimization for Netlify
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
