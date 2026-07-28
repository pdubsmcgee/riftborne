import 'dotenv/config';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const secrets = [process.env.RIFTBORNE_LOGS_USERNAME, process.env.RIFTBORNE_LOGS_PASSWORD].filter((value): value is string => Boolean(value && value.length >= 4));
const skip = new Set(['.git', 'node_modules', 'dist', 'dist-server', 'data', 'output']);
const skipFiles = new Set(['.env', 'envseed.txt', 'package-lock.json']);
const leaks: string[] = [];
function walk(path: string) {
  for (const name of readdirSync(path)) {
    if (skip.has(name) || skipFiles.has(name)) continue;
    const full = join(path, name); const stat = statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (stat.size < 2_000_000) {
      const contents = readFileSync(full, 'utf8');
      if (secrets.some(secret => contents.includes(secret))) leaks.push(full);
    }
  }
}
walk('.');
if (leaks.length) throw new Error(`Credential material found in: ${leaks.join(', ')}`);
console.log('Secret scan passed.');
