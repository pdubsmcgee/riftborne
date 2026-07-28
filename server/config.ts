import { config as loadEnv } from 'dotenv';
import { z } from 'zod';

// The checked local file is the explicit source of truth. This prevents an
// unrelated machine-wide API key from silently enabling paid AI requests.
loadEnv({ override: true, quiet: true });

const schema = z.object({
  RIFTBORNE_LOGS_USERNAME: z.string().min(1),
  RIFTBORNE_LOGS_PASSWORD: z.string().min(1),
  RIFTBORNE_LOGS_BASE_URL: z.string().url().default('https://logs.riftborne.net'),
  RIFTBORNE_SYNC_INTERVAL_MINUTES: z.coerce.number().int().min(30).default(30),
  DATABASE_PATH: z.string().default('./data/riftborne.db'),
  OPENAI_API_KEY: z.string().optional(),
  OPENAI_MODEL: z.string().default('gpt-5-mini'),
  PORT: z.coerce.number().int().min(1024).max(65535).default(4317)
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  const fields = parsed.error.issues.map(issue => issue.path.join('.')).join(', ');
  throw new Error(`Invalid local configuration. Check these fields: ${fields}`);
}

export const config = parsed.data;

export function publicConfig() {
  return {
    syncIntervalMinutes: config.RIFTBORNE_SYNC_INTERVAL_MINUTES,
    aiEnabled: Boolean(config.OPENAI_API_KEY),
    localhostOnly: true
  };
}
