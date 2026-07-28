import type { ChangeEvent, MapTile, ReportSummary } from '../shared/types.js';
import { baseKind, factionName, ownerName, reportLocationKey, reportMission, terrainName } from './strategy-utils.js';
import { contentHash } from './world.js';

function eventId(worldId: string, type: string, subjectKey: string, occurredAt: string, evidence: unknown) {
  return `${type}:${contentHash({ worldId, type, subjectKey, occurredAt, evidence }).slice(0, 24)}`;
}

function tileKey(tile: MapTile) {
  return `${tile.x},${tile.y}`;
}

function baseLabel(tile: MapTile) {
  return baseKind(tile) || (tile.base ? 'Base' : '');
}

function hasKeystoneSignal(tile: MapTile) {
  return /keystone|kraken|origin|inner|border|outer/i.test(`${terrainName(tile)} ${baseKind(tile)} ${String(tile.keystoneTier ?? '')} ${String(tile.specialEffectName ?? '')}`);
}

function expeditionStatus(tile: MapTile) {
  if (!tile.expedition) return '';
  return JSON.stringify({
    id: tile.expedition.id ?? tileKey(tile),
    status: tile.expedition.status,
    deadline: tile.expedition.contributionClosesAtUtc ?? tile.expedition.choiceDeadlineUtc,
    completed: tile.expedition.completedAtUtc
  });
}

function make(worldId: string, eventType: string, subjectKey: string, occurredAt: string, severity: ChangeEvent['severity'], evidence: string[], confidence = 0.96): ChangeEvent {
  return {
    id: eventId(worldId, eventType, subjectKey, occurredAt, evidence),
    worldId,
    eventType,
    severity,
    occurredAt,
    subjectKey,
    confidence,
    evidence,
    provenance: 'observed'
  };
}

export function diffMapSnapshot(worldId: string, previous: MapTile[], next: MapTile[], occurredAt = new Date().toISOString()): ChangeEvent[] {
  const oldByKey = new Map(previous.map(tile => [tileKey(tile), tile]));
  const newByKey = new Map(next.map(tile => [tileKey(tile), tile]));
  const events: ChangeEvent[] = [];
  for (const [key, tile] of newByKey) {
    const old = oldByKey.get(key);
    const owner = ownerName(tile);
    const oldOwner = old ? ownerName(old) : '';
    const kind = baseLabel(tile);
    const oldKind = old ? baseLabel(old) : '';
    const faction = factionName(tile);
    const oldFaction = old ? factionName(old) : '';
    if (!old && owner) events.push(make(worldId, kind.toLowerCase().includes('outpost') ? 'new_outpost' : 'new_colony', key, occurredAt, 'info', [`${kind || 'Base'} observed at ${key}`, `Owner ${owner}`, `Terrain ${terrainName(tile)}`]));
    if (old && oldOwner !== owner) {
      if (oldOwner && owner) events.push(make(worldId, 'ownership_transfer', key, occurredAt, 'warning', [`${key} transferred from ${oldOwner} to ${owner}`, `Terrain ${terrainName(tile)}`]));
      else if (oldOwner && !owner) events.push(make(worldId, 'base_removed', key, occurredAt, 'warning', [`${oldOwner}'s base no longer observed at ${key}`, 'This is observed disappearance, not proof of exact cause.']));
      else if (!oldOwner && owner) events.push(make(worldId, kind.toLowerCase().includes('outpost') ? 'new_outpost' : 'new_colony', key, occurredAt, 'info', [`${kind || 'Base'} newly observed at ${key}`, `Owner ${owner}`]));
    }
    if (old && oldFaction !== faction) events.push(make(worldId, 'faction_change', key, occurredAt, 'warning', [`${key} faction changed from ${oldFaction || 'unknown'} to ${faction || 'unknown'}`]));
    if (old && oldKind !== kind) events.push(make(worldId, 'base_kind_change', key, occurredAt, 'info', [`${key} base kind changed from ${oldKind || 'none'} to ${kind || 'none'}`]));
    if (old && ownerName(old) === owner && old.base?.ownerName !== tile.base?.ownerName && tile.base?.ownerName) events.push(make(worldId, 'commander_name_change', key, occurredAt, 'info', [`Commander label at ${key} changed to ${tile.base.ownerName}`]));
    if (old && hasKeystoneSignal(old) !== hasKeystoneSignal(tile)) events.push(make(worldId, hasKeystoneSignal(tile) ? 'keystone_observed' : 'keystone_signal_removed', key, occurredAt, 'warning', [`Keystone/KRAKEN signal changed at ${key}`]));
    const oldExpedition = old ? expeditionStatus(old) : '';
    const newExpedition = expeditionStatus(tile);
    if (!oldExpedition && newExpedition) events.push(make(worldId, 'expedition_appeared', key, occurredAt, 'info', [`Expedition appeared at ${key}`]));
    if (oldExpedition && newExpedition && oldExpedition !== newExpedition) events.push(make(worldId, /completed/i.test(newExpedition) ? 'expedition_completed' : 'expedition_changed', key, occurredAt, 'info', [`Expedition changed at ${key}`]));
    if (old && contentHash({ terrain: terrainName(old), special: old.specialEffectName, tier: old.keystoneTier }) !== contentHash({ terrain: terrainName(tile), special: tile.specialEffectName, tier: tile.keystoneTier })) {
      events.push(make(worldId, 'important_tile_modifier_change', key, occurredAt, 'info', [`Tile modifier/schema signal changed at ${key}`], 0.82));
    }
  }
  for (const [key, tile] of oldByKey) {
    if (!newByKey.has(key) && ownerName(tile)) events.push(make(worldId, 'base_removed', key, occurredAt, 'warning', [`Previously observed base at ${key} is omitted from the latest snapshot`, 'Could be removed, hidden by schema changes, or absent from partial telemetry.'], 0.72));
  }
  return events;
}

export function reportEvents(worldId: string, reports: ReportSummary[], knownIds: Set<string>, occurredAt = new Date().toISOString()): ChangeEvent[] {
  return reports.filter(report => !knownIds.has(String(report.id))).map(report => {
    const mission = reportMission(report).toLowerCase();
    const type = mission.includes('spy') ? 'new_spy_operation'
      : mission.includes('raid') ? 'new_raid'
      : mission.includes('siege') ? 'new_siege'
      : mission.includes('intercept') ? 'new_intercept'
      : mission.includes('attack') ? 'new_attack'
      : 'new_report';
    const severity: ChangeEvent['severity'] = /attack|raid|siege|intercept/.test(type) ? 'warning' : 'info';
    const subjectKey = reportLocationKey(report) ?? String(report.id);
    return make(worldId, type, subjectKey, report.timeUtc ?? occurredAt, severity, [
      `Report ${report.id}: ${reportMission(report)}`,
      report.attackerName || report.defenderName ? `${report.attackerName ?? 'unknown'} -> ${report.defenderName ?? 'unknown'}` : 'Participants not exposed in summary'
    ], 0.94);
  });
}
