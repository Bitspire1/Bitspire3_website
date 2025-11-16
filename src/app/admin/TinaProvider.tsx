'use client';

/**
 * TinaCMS works through iframe communication, not a React provider.
 * This file is kept for potential future use but is not needed in v2.x
 */
export default function TinaProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
