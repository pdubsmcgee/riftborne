import { z } from 'zod';
import type { ImportResult, MapManifest, MapTile, ReportSummary, Session, WorldSummary } from '../shared/types.js';
import { diffMapSnapshot, reportEvents } from './history.js';
import type { Store } from './db.js';
import { deriveWorldRecord } from './world.js';

const objectSchema = z.object({}).catchall(z.unknown());
const tileSchema = objectSchema.extend({ x: z.coerce.number(), y: z.coerce.number() });
const reportSchema = objectSchema.extend({ id: z.union([z.string(), z.number()]) });

function arrayAt<T>(payload: unknown, keys: string[], schema: z.ZodType<T>): T[] {
  if (Array.isArray(payload)) {
    const parsed = z.array(schema).safeParse(payload);
    return parsed.success ? parsed.data : [];
  }
  const object = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  for (const key of keys) {
    const value = object[key];
    if (!Array.isArray(value)) continue;
    const parsed = z.array(schema).safeParse(value);
    if (parsed.success) return parsed.data;
  }
  return [];
}

function objectAt(payload: unknown, keys: string[]) {
  const object = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  for (const key of keys) if (object[key] && typeof object[key] === 'object' && !Array.isArray(object[key])) return object[key] as Record<string, unknown>;
  return null;
}

function timestamp(payload: unknown) {
  const object = payload && typeof payload === 'object' ? payload as Record<string, unknown> : {};
  const raw = object.generatedAt ?? object.generatedAtUtc ?? object.exportedAt ?? object.exportedAtUtc ?? object.capturedAt ?? object.capturedAtUtc;
  const date = typeof raw === 'string' ? new Date(raw) : null;
  return date && Number.isFinite(date.getTime()) ? date.toISOString() : new Date().toISOString();
}

export function importJsonPayload(store: Store, input: { filename: string; payload: unknown; worldId?: string | null }): ImportResult {
  const warnings: string[] = [];
  const payload = objectSchema.or(z.array(z.unknown())).parse(input.payload);
  const tiles = arrayAt<MapTile>(payload, ['tiles', 'mapTiles', 'items'], tileSchema);
  const reports = arrayAt<ReportSummary>(payload, ['reports', 'reportSummaries', 'items'], reportSchema);
  const manifest = objectAt(payload, ['manifest', 'mapManifest']) as MapManifest | null;
  const session = objectAt(payload, ['session']) as Session | null;
  const summaryMe = objectAt(payload, ['summary', 'summaryMe']) as WorldSummary | null;
  const summaryWorld = objectAt(payload, ['worldSummary', 'summaryWorld']) as WorldSummary | null;
  const observedAt = timestamp(payload);
  if (!tiles.length && !reports.length) warnings.push('No map tiles or report summaries were found in the import payload.');

  const currentWorld = store.activeWorld();
  const importedWorld = input.worldId
    ? { id: input.worldId, label: input.worldId, identitySource: 'manual' as const, firstSeenAt: observedAt, lastSeenAt: observedAt, active: true }
    : deriveWorldRecord({ session, summaryMe, summaryWorld, status: null, manifest, previous: currentWorld });
  store.upsertWorld(importedWorld, !currentWorld || currentWorld.id === importedWorld.id);
  const file = store.recordImportedFile({ filename: input.filename, worldId: importedWorld.id, payload });

  let insertedTiles = 0;
  let generatedEvents = 0;
  if (tiles.length) {
    const snapshots = store.mapSnapshots(importedWorld.id, 1);
    const latest = snapshots[0]?.capturedAt ? new Date(snapshots[0].capturedAt).getTime() : 0;
    const importedTime = new Date(observedAt).getTime();
    const previous = store.tiles(importedWorld.id);
    const events = diffMapSnapshot(importedWorld.id, previous, tiles, observedAt);
    generatedEvents += store.upsertChangeEvents(events);
    if (!latest || importedTime >= latest) {
      store.replaceTiles(tiles, importedWorld.id, manifest ? undefined : undefined);
      insertedTiles = tiles.length;
    } else {
      warnings.push('Imported map snapshot is older than the current authoritative map; observations/events were preserved but current map tiles were not overwritten.');
    }
  }

  let insertedReports = 0;
  if (reports.length) {
    const known = store.reportIds(importedWorld.id);
    generatedEvents += store.upsertChangeEvents(reportEvents(importedWorld.id, reports, known, observedAt));
    store.upsertReports(reports, importedWorld.id);
    insertedReports = reports.filter(report => !known.has(String(report.id))).length;
  }

  if (!file.insertedFile) warnings.push('This exact file payload was already imported; duplicate file storage was skipped.');
  return { ok: true, filename: input.filename, worldId: importedWorld.id, insertedFile: file.insertedFile, insertedReports, insertedTiles, generatedEvents, warnings };
}
