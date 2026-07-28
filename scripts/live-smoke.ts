import 'dotenv/config';
import { RiftborneClient } from '../server/riftborne-client.js';

if (!process.env.RIFTBORNE_LOGS_USERNAME || !process.env.RIFTBORNE_LOGS_PASSWORD) throw new Error('Missing Riftborne credentials in .env');
const client = new RiftborneClient(process.env.RIFTBORNE_LOGS_BASE_URL || 'https://logs.riftborne.net', process.env.RIFTBORNE_LOGS_USERNAME, process.env.RIFTBORNE_LOGS_PASSWORD);
try {
  const session = await client.login();
  const summary = await client.summary('me');
  console.log(JSON.stringify({ ok: true, authenticated: true, operator: session.operator === true, summaryFields: Object.keys(summary).sort() }, null, 2));
} finally {
  await client.logout();
}
