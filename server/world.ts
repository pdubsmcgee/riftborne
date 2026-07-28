import { createHash } from 'node:crypto';
import type { MapManifest, Session, WorldRecord, WorldSummary } from '../shared/types.js';

function stableJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    const object = value as Record<string, unknown>;
    return `{${Object.keys(object).sort().map(key => `${JSON.stringify(key)}:${stableJson(object[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function contentHash(value: unknown) {
  return createHash('sha256').update(stableJson(value)).digest('hex');
}

function text(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

function pickIdentity(...objects: Array<Record<string, unknown> | null | undefined>) {
  const worldKeys = ['worldId', 'serverId', 'worldKey', 'worldName', 'serverName', 'gameWorldId'];
  const startKeys = ['worldStartedAtUtc', 'worldStartUtc', 'startedAtUtc', 'createdAtUtc', 'worldTimeAnchorUtc'];
  for (const object of objects) for (const key of worldKeys) {
    const value = text(object?.[key]);
    if (value) return { value, source: 'telemetry' as const };
  }
  for (const object of objects) for (const key of startKeys) {
    const value = text(object?.[key]);
    if (value) return { value, source: 'world-start' as const };
  }
  return null;
}

export function deriveWorldRecord(input: {
  session: Session | null;
  summaryMe: WorldSummary | null;
  summaryWorld: WorldSummary | null;
  status: WorldSummary | null;
  manifest: MapManifest | null;
  previous?: WorldRecord | null;
}): WorldRecord {
  const now = new Date().toISOString();
  const identity = pickIdentity(input.session, input.summaryMe, input.summaryWorld, input.status, input.manifest);
  const manifestHash = input.manifest ? contentHash(input.manifest).slice(0, 24) : undefined;
  const worldStartedAtUtc = text(input.summaryMe?.worldStartedAtUtc) || text(input.summaryWorld?.worldStartedAtUtc) || text(input.status?.worldStartedAtUtc) || undefined;
  const id = identity
    ? `${identity.source}:${identity.value}`
    : manifestHash
      ? `manifest:${manifestHash}`
      : input.previous?.id ?? 'manual:default';
  const identitySource = identity?.source ?? (manifestHash ? 'manifest-hash' : input.previous?.identitySource ?? 'fallback');
  const label = identity?.value ?? (worldStartedAtUtc ? `World started ${worldStartedAtUtc}` : manifestHash ? `Manifest ${manifestHash.slice(0, 8)}` : 'Active local world');
  return {
    id,
    label,
    identitySource,
    firstSeenAt: input.previous?.id === id ? input.previous.firstSeenAt : now,
    lastSeenAt: now,
    active: true,
    manifestHash,
    worldStartedAtUtc
  };
}
