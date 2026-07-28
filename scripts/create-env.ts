import { readFileSync, writeFileSync } from 'node:fs';
import { parseEnvSeed, quoteEnv } from '../server/envseed.js';

const seed = parseEnvSeed(readFileSync('envseed.txt', 'utf8'));
const lines = [
  `RIFTBORNE_LOGS_USERNAME=${quoteEnv(seed.username)}`,
  `RIFTBORNE_LOGS_PASSWORD=${quoteEnv(seed.password)}`,
  'RIFTBORNE_LOGS_BASE_URL=https://logs.riftborne.net',
  'RIFTBORNE_SYNC_INTERVAL_MINUTES=30',
  'DATABASE_PATH=./data/riftborne.db',
  'OPENAI_API_KEY=',
  'OPENAI_MODEL=gpt-5-mini',
  'PORT=4317'
];
writeFileSync('.env', `${lines.join('\n')}\n`, { encoding: 'utf8', mode: 0o600 });
console.log('Created .env. Credential values were not printed.');
