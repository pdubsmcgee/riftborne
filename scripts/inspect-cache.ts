import 'dotenv/config';
import { DatabaseSync } from 'node:sqlite';

const db = new DatabaseSync(process.env.DATABASE_PATH || './data/riftborne.db');
for (const table of ['tiles', 'reports']) {
  const rows = (db.prepare(`SELECT payload FROM ${table}`).all() as Array<{ payload: string }>).map(row => JSON.parse(row.payload) as Record<string, unknown>);
  const counts = new Map<string, number>();
  for (const row of rows) for (const key of Object.keys(row)) counts.set(key, (counts.get(key) ?? 0) + 1);
  console.log(table, [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 50));
  for (const nested of ['base', 'feature', 'expedition']) {
    const nestedRows = rows.map(row => row[nested]).filter((value): value is Record<string, unknown> => Boolean(value && typeof value === 'object' && !Array.isArray(value)));
    if (!nestedRows.length) continue;
    const nestedKeys = new Map<string, number>();
    for (const row of nestedRows) for (const key of Object.keys(row)) nestedKeys.set(key, (nestedKeys.get(key) ?? 0) + 1);
    console.log(`${table}.${nested} keys`, [...nestedKeys.entries()].sort((a, b) => b[1] - a[1]));
  }
}
const session = db.prepare("SELECT payload FROM snapshots WHERE kind='session' ORDER BY captured_at DESC LIMIT 1").get() as { payload: string } | undefined;
console.log('session keys', session ? Object.keys(JSON.parse(session.payload)).sort() : []);
db.close();
