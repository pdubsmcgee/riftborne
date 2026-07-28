import 'dotenv/config';
import { buildStrategicAnalysis } from '../server/strategy.js';
import { Store } from '../server/db.js';

const store = new Store(process.env.DATABASE_PATH || './data/riftborne.db');
try {
  const analysis = buildStrategicAnalysis({
    session: store.latestSnapshot('session'),
    summary: store.latestSnapshot('summary:me'),
    reports: store.reports(500),
    tiles: store.tiles(),
    syncAudit: store.latestSyncAudit()
  });
  store.replaceDerived(analysis);
  console.log(`Rebuilt analysis: ${analysis.recommendations.length} recommendations, ${analysis.fleetPlans.length} fleet plans.`);
} finally {
  store.close();
}
