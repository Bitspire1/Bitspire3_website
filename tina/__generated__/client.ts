import { createClient } from "tinacms/dist/client";
import { queries } from "./types";

// Use environment variable if available (e.g. in Netlify build), fallback to localhost for local dev
const tinaUrl = process.env.NEXT_PUBLIC_TINA_CLIENT_URL || process.env.NEXT_PUBLIC_TINA_API_URL || process.env.TINA_API_URL || 'http://localhost:4001/graphql';
const tinaToken = process.env.TINA_TOKEN || process.env.NEXT_PUBLIC_TINA_TOKEN || '';

export const client = createClient({ url: tinaUrl, token: tinaToken, queries,  });
export default client;
  