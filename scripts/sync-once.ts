import { config } from '../server/config.js';
import { Store } from '../server/db.js';
import { seedKnowledge } from '../server/knowledge.js';
import { RiftborneClient } from '../server/riftborne-client.js';
import { SyncService } from '../server/sync.js';

const store = new Store(config.DATABASE_PATH);
const client = new RiftborneClient(config.RIFTBORNE_LOGS_BASE_URL, config.RIFTBORNE_LOGS_USERNAME, config.RIFTBORNE_LOGS_PASSWORD);
seedKnowledge(store);
try {
  const service = new SyncService(store, client, config.RIFTBORNE_SYNC_INTERVAL_MINUTES);
  const state = await service.sync();
  console.log(JSON.stringify({
    ok: true,
    lastSyncAt: state.lastSyncAt,
    tiles: state.tiles.length,
    reports: state.reports.length,
    medals: state.medals.length,
    recommendations: state.recommendations.length
  }, null, 2));
} finally {
  await client.logout();
  store.close();
}
