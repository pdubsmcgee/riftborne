import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { buildAlerts } from '../server/alerts.js';
import { buildForecast } from '../server/forecast.js';
import { Store } from '../server/db.js';

const dirs: string[] = [];
afterEach(() => { while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true }); });

describe('alerts, manual state, and forecast persistence', () => {
  it('generates persistent alerts from visible events and manual Astra state', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir);
    const store = new Store(join(dir, 'alerts.db'));
    const world = { id: 'world:a', label: 'A', identitySource: 'telemetry' as const, firstSeenAt: '2026-07-22', lastSeenAt: '2026-07-22', active: true };
    store.upsertWorld(world);
    const manual = store.saveManualState({ subject: 'economy', payload: { astra: 100, astraUpkeepPerHour: 50, vulkron: 96, vulkronCapacity: 100 } });
    const alerts = buildAlerts({
      world,
      events: [{ id: 'e1', worldId: 'world:a', eventType: 'base_removed', severity: 'warning', occurredAt: '2026-07-22T00:00:00Z', subjectKey: '1,1', confidence: 0.9, evidence: ['lost base'], provenance: 'observed' }],
      analysis: null,
      syncAudit: null,
      manualState: [manual]
    });
    store.upsertAlerts(alerts);
    expect(store.alertState('world:a').activeCount).toBeGreaterThanOrEqual(2);
    const first = store.alerts('world:a')[0];
    store.setAlertState(first.id, 'ack');
    expect(store.alerts('world:a').find(alert => alert.id === first.id)?.acknowledgedAt).toBeTruthy();
    store.close();
  });

  it('saves forecast runs and can backtest against later observed events', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir);
    const store = new Store(join(dir, 'forecast.db'));
    const world = { id: 'world:a', label: 'A', identitySource: 'telemetry' as const, firstSeenAt: '2026-07-22', lastSeenAt: '2026-07-22', active: true };
    store.upsertWorld(world);
    const forecast = buildForecast({
      world,
      analysis: {
        posture: 'balanced', generatedAt: '2026-07-22T00:00:00Z', worldId: 'world:a',
        mapGeometry: { minX: -49, maxX: 50, minY: -49, maxY: 50, width: 100, height: 100, source: 'manifest' },
        commanderName: 'pilot', myTiles: [], reportMetrics: [], commanderProfiles: [], factionProfiles: [], expeditions: [], fleetPlans: [], recommendations: [], alerts: [], changes: [],
        tileMetrics: [{ key: '5,5', x: 5, y: 5, terrain: 'Energy Spire', ownerName: '', faction: '', baseKind: '', resourceScore: 80, slotScore: 30, specialScore: 20, threatScore: 5, opportunityScore: 85, uncertainty: 20, nearestOwnedDistance: 4, nearestOccupiedDistance: 3, evidence: [] }]
      },
      events: [],
      syncAudit: null
    });
    store.saveForecastRun(forecast);
    store.upsertChangeEvents([{ id: 'new', worldId: 'world:a', eventType: 'new_colony', severity: 'info', occurredAt: new Date().toISOString(), subjectKey: '5,5', confidence: 0.9, evidence: ['new colony'], provenance: 'observed' }]);
    expect(store.forecastBacktest('world:a').hits).toBeGreaterThan(0);
    store.close();
  });
});
