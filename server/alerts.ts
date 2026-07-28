import type { AlertRecord, ChangeEvent, ManualStateSnapshot, StrategicAnalysis, SyncAudit, WorldRecord } from '../shared/types.js';
import { contentHash } from './world.js';

function alert(worldId: string, eventType: string, severity: AlertRecord['severity'], title: string, detail: string, evidence: string[], sourceObservation: string | null, confidence = 0.8): AlertRecord {
  const fingerprint = contentHash({ worldId, eventType, title, sourceObservation, evidence: evidence.slice(0, 3) }).slice(0, 32);
  return {
    id: `alert:${fingerprint}`,
    worldId,
    fingerprint,
    eventType,
    severity,
    title,
    detail,
    createdAt: new Date().toISOString(),
    sourceObservation,
    evidence,
    confidence,
    acknowledgedAt: null,
    snoozedUntil: null,
    deliveryState: 'in-app'
  };
}

function numeric(payload: Record<string, unknown>, key: string) {
  const value = Number(payload[key]);
  return Number.isFinite(value) ? value : null;
}

export function buildAlerts(input: { world: WorldRecord | null; events: ChangeEvent[]; analysis: StrategicAnalysis | null; syncAudit: SyncAudit | null; manualState: ManualStateSnapshot[] }): AlertRecord[] {
  if (!input.world) return [];
  const worldId = input.world.id;
  const alerts: AlertRecord[] = [];

  if (input.syncAudit?.staleMinutes && input.syncAudit.staleMinutes > 60) {
    alerts.push(alert(worldId, 'stale_telemetry', 'warning', 'Telemetry is stale', `Last good sync is ${input.syncAudit.staleMinutes} minutes old.`, ['Sync audit'], 'sync_audit', 0.98));
  }

  for (const event of input.events.slice(0, 80)) {
    if (/ownership_transfer|base_removed/.test(event.eventType)) alerts.push(alert(worldId, event.eventType, 'danger', 'Holding ownership changed', event.evidence.join(' | '), event.evidence, event.id, event.confidence));
    if (/new_attack|new_raid|new_siege|new_intercept/.test(event.eventType)) alerts.push(alert(worldId, event.eventType, 'warning', 'New hostile/combat report observed', event.evidence.join(' | '), event.evidence, event.id, event.confidence));
    if (/expedition_appeared|expedition_changed/.test(event.eventType)) alerts.push(alert(worldId, event.eventType, 'info', 'Expedition changed', event.evidence.join(' | '), event.evidence, event.id, event.confidence));
    if (/keystone/.test(event.eventType)) alerts.push(alert(worldId, event.eventType, 'warning', 'Keystone/KRAKEN observation changed', event.evidence.join(' | '), event.evidence, event.id, event.confidence));
  }

  for (const item of input.analysis?.alerts ?? []) {
    alerts.push(alert(worldId, item.id, item.severity, item.title, item.detail, item.evidence, item.id, 0.78));
  }

  for (const snapshot of input.manualState.filter(item => item.subject === 'economy')) {
    const payload = snapshot.payload;
    const astra = numeric(payload, 'astra');
    const astraUpkeepPerHour = numeric(payload, 'astraUpkeepPerHour');
    if (astra !== null && astraUpkeepPerHour !== null && astraUpkeepPerHour > 0) {
      const hours = astra / astraUpkeepPerHour;
      if (hours < 6) alerts.push(alert(worldId, 'manual_astra_risk', 'danger', 'Manual Astra state predicts starvation risk', `Astra reserve covers roughly ${hours.toFixed(1)} hour(s) of upkeep.`, [`Manual economy snapshot ${snapshot.capturedAt}`], `manual:${snapshot.id ?? snapshot.capturedAt}`, 0.72));
      else if (hours < 24) alerts.push(alert(worldId, 'manual_astra_low', 'warning', 'Manual Astra reserve is low', `Astra reserve covers roughly ${hours.toFixed(1)} hour(s) of upkeep.`, [`Manual economy snapshot ${snapshot.capturedAt}`], `manual:${snapshot.id ?? snapshot.capturedAt}`, 0.68));
    }
    for (const resource of ['vulkron', 'aurelite', 'deuterium', 'astra']) {
      const amount = numeric(payload, resource);
      const cap = numeric(payload, `${resource}Capacity`);
      if (amount !== null && cap !== null && cap > 0) {
        const ratio = amount / cap;
        if (ratio >= 0.95) alerts.push(alert(worldId, `manual_capacity_${resource}_95`, 'warning', `${resource} storage near cap`, `${resource} is at ${Math.round(ratio * 100)}% of manual capacity.`, [`Manual economy snapshot ${snapshot.capturedAt}`], `manual:${snapshot.id ?? snapshot.capturedAt}`, 0.74));
      }
    }
  }

  return alerts;
}
