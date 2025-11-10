import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export static HTML (next export equivalent in App Router)
  output: "export",
  // Ensure static hosting serves folders as routes: /about -> /about/index.html
  trailingSlash: true,
  // For static export, disable Next.js image optimization (use unoptimized images)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
