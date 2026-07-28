import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { diffMapSnapshot, reportEvents } from '../server/history.js';
import { importJsonPayload } from '../server/importer.js';
import { Store } from '../server/db.js';

const dirs: string[] = [];
afterEach(() => { while (dirs.length) rmSync(dirs.pop()!, { recursive: true, force: true }); });

describe('history events and imports', () => {
  it('creates observed map change events without claiming pre-snapshot history', () => {
    const events = diffMapSnapshot('world:a',
      [{ x: -1, y: 0, base: { ownerName: 'Pilot', faction: 'A' } }],
      [{ x: -1, y: 0, base: { ownerName: 'Rival', faction: 'B' } }, { x: 2, y: 2, base: { ownerName: 'Pilot', kind: 'Strategic Outpost' } }],
      '2026-07-22T00:00:00Z'
    );
    expect(events.map(event => event.eventType)).toContain('ownership_transfer');
    expect(events.map(event => event.eventType)).toContain('new_outpost');
    expect(events.every(event => event.provenance === 'observed')).toBe(true);
  });

  it('creates report events only for report IDs not already known', () => {
    const events = reportEvents('world:a', [
      { id: 'old', mission: 'Raid' },
      { id: 'new', mission: 'Spy', attackerName: 'Scout', defenderName: 'Target' }
    ], new Set(['old']));
    expect(events).toHaveLength(1);
    expect(events[0].eventType).toBe('new_spy_operation');
  });

  it('imports JSON exports, detects duplicates, and keeps current map safe from older imports', () => {
    const dir = mkdtempSync(join(tmpdir(), 'riftborne-')); dirs.push(dir);
    const store = new Store(join(dir, 'import.db'));
    store.upsertWorld({ id: 'world:a', label: 'A', identitySource: 'telemetry', firstSeenAt: '2026-07-22T10:00:00Z', lastSeenAt: '2026-07-22T10:00:00Z', active: true });
    store.replaceTiles([{ x: 0, y: 0, base: { ownerName: 'Current' } }], 'world:a');

    const payload = {
      generatedAt: '2026-07-21T10:00:00Z',
      worldStartedAtUtc: '2026-07-18T16:00:36.909878+00:00',
      tiles: [{ x: 0, y: 0, base: { ownerName: 'Older' } }],
      reports: [{ id: 'r1', mission: 'Attack', attackerName: 'A', defenderName: 'B' }]
    };
    const first = importJsonPayload(store, { filename: 'export.json', payload, worldId: 'world:a' });
    const second = importJsonPayload(store, { filename: 'export.json', payload, worldId: 'world:a' });

    expect(first.insertedReports).toBe(1);
    expect(first.warnings.join(' ')).toMatch(/older than the current authoritative map/i);
    expect(second.insertedFile).toBe(false);
    expect(store.tiles('world:a')[0].base?.ownerName).toBe('Current');
    expect(store.history('world:a').events.length).toBeGreaterThan(0);
    store.close();
  });
});
