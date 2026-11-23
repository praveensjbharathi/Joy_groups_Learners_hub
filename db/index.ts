import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Configure the D1 database binding named DB in wrangler.json and apply the supplied migrations."
    );
  }

  return drizzle(env.DB, { schema });
}
