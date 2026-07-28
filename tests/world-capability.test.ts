import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { buildCapabilityModel } from '../server/capabilities.js';
import { Store } from '../server/db.js';
import { deriveWorldRecord } from '../server/world.js';

const dirs: string[] = [];
afterEach(() => { while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true }); });

describe('world separation and capability gates', () => {
  it('derives a current 100x100 world from manifest identity without hardcoding analysis geometry', () => {
    const world = deriveWorldRecord({
      session: { authenticated: true, username: 'pilot' },
      summaryMe: null,
      summaryWorld: null,
      status: null,
      manifest: { minX: -49, maxX: 50, minY: -49, maxY: 50, chunks: [{ x: 0, y: 0 }] }
    });
    expect(world.id).toMatch(/^manifest:/);
    expect(world.identitySource).toBe('manifest-hash');
  });

  it('does not mix reports or tiles between active worlds', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir);
    const store = new Store(join(dir, 'worlds.db'));
    store.upsertWorld({ id: 'world:a', label: 'A', identitySource: 'telemetry', firstSeenAt: '2026-01-01', lastSeenAt: '2026-01-01', active: true });
    store.upsertReports([{ id: 'a1', timeUtc: '2026-01-01T00:00:00Z', mission: 'Raid' }], 'world:a');
    store.replaceTiles([{ x: 0, y: 0, ownerName: 'pilot' }], 'world:a');
    store.upsertWorld({ id: 'world:b', label: 'B', identitySource: 'telemetry', firstSeenAt: '2026-02-01', lastSeenAt: '2026-02-01', active: true });
    store.upsertReports([{ id: 'b1', timeUtc: '2026-02-01T00:00:00Z', mission: 'Spy' }], 'world:b');
    store.replaceTiles([{ x: 9, y: 9, ownerName: 'pilot' }], 'world:b');

    expect(store.activeWorld()?.id).toBe('world:b');
    expect(store.reports(50).map(report => report.id)).toEqual(['b1']);
    expect(store.tiles().map(tile => `${tile.x},${tile.y}`)).toEqual(['9,9']);
    expect(store.reports(50, 'world:a').map(report => report.id)).toEqual(['a1']);
    store.close();
  });

  it('marks unsupported fleet and movement features instead of returning silent empty data', () => {
    const model = buildCapabilityModel({
      worldId: 'world:a',
      session: { authenticated: true, username: 'pilot' },
      summaryMe: {},
      summaryWorld: {},
      status: {},
      reports: [],
      reportDetails: [],
      tiles: [{ x: 0, y: 0, base: { ownerName: 'pilot', kind: 'Colony' } }]
    });
    expect(model.items.find(item => item.key === 'colonyState')?.exposed).toBe(true);
    expect(model.items.find(item => item.key === 'incomingMovements')?.exposed).toBe(false);
    expect(model.items.find(item => item.key === 'currentFleets')?.notes).toMatch(/Not exposed/);
  });
});
