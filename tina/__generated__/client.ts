import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '8498b0864d915e53c11e066762bb90a6c122c739', queries,  });
export default client;
  