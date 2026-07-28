import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { Store } from '../server/db.js';
import { buildStrategicAnalysis } from '../server/strategy.js';

const dirs: string[] = [];
afterEach(() => { while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true }); });

describe('knowledge store', () => {
  it('orders current authoritative facts before older facts', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir); const store = new Store(join(dir, 'test.db'));
    store.addSource({ id: 'old', title: 'Old guide', url: 'https://example.com/old', authority: 50, retrievedAt: '2026-01-01', version: '1' });
    store.addSource({ id: 'new', title: 'Patch', url: 'https://example.com/new', authority: 90, retrievedAt: '2026-02-01', version: '2' });
    store.addFact({ sourceId: 'old', topic: 'map', title: 'Old rule', body: 'old', version: '1', authority: 50, confidence: .7, effectiveAt: '2026-01-01', superseded: true });
    store.addFact({ sourceId: 'new', topic: 'map', title: 'New rule', body: 'new', version: '2', authority: 90, confidence: .9, effectiveAt: '2026-02-01', superseded: false });
    expect(store.searchFacts('', 'map').map(fact => fact.title)).toEqual(['New rule', 'Old rule']); store.close();
  });
  it('stores raw snapshots and normalized derived analysis separately', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir); const store = new Store(join(dir, 'test.db'));
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot' },
      summary: null,
      reports: [{ id: 'r1', mission: 'Raid', attackerName: 'foe', defenderName: 'pilot', attackerPower: 100 }],
      tiles: [{ x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot' } }, { x: 4, y: 0, tileType: 'Energy Spire', astraBonus: 2 }]
    });
    store.saveSnapshot('raw:test', { ok: true });
    store.replaceDerived(analysis);
    expect(store.latestSnapshot<{ ok: boolean }>('raw:test')?.ok).toBe(true);
    expect(store.latestSnapshot<typeof analysis>('analysis')?.recommendations.length).toBeGreaterThan(0);
    expect(store.dashboard(analysis).analysis?.commanderProfiles[0].name).toBe('foe');
    store.close();
  });
});
