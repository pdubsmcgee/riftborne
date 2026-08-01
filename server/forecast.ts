import type { ChangeEvent, ForecastItem, ForecastState, StrategicAnalysis, SyncAudit, WorldRecord } from '../shared/types.js';

function likelihood(probability: number): ForecastItem['likelihood'] {
  if (probability >= 0.66) return 'high';
  if (probability >= 0.38) return 'medium';
  return 'low';
}

function age(sync: SyncAudit | null) {
  if (!sync?.lastSuccessAt) return null;
  return Math.max(0, Math.round((Date.now() - new Date(sync.lastSuccessAt).getTime()) / 60_000));
}

function recencyWeight(event: ChangeEvent) {
  const hours = Math.max(0, (Date.now() - new Date(event.occurredAt).getTime()) / 3_600_000);
  return Math.exp(-hours / 72);
}

export function buildForecast(input: { world: WorldRecord | null; analysis: StrategicAnalysis | null; events: ChangeEvent[]; syncAudit: SyncAudit | null }): ForecastState {
  const generatedAt = new Date().toISOString();
  const dataAgeMinutes = age(input.syncAudit);
  const horizons = [6, 24, 72, 168];
  const expansionEvents = input.events.filter(event => /new_colony|new_outpost|ownership_transfer/.test(event.eventType));
  const combatEvents = input.events.filter(event => /attack|raid|siege|intercept|combat/.test(event.eventType));
  const recentExpansionSignal = expansionEvents.reduce((sum, event) => sum + recencyWeight(event), 0);
  const recentCombatSignal = combatEvents.reduce((sum, event) => sum + recencyWeight(event), 0);
  const topTargets = (input.analysis?.tileMetrics ?? [])
    .filter(tile => !tile.ownerName && tile.opportunityScore > 20)
    .sort((a, b) => (b.opportunityScore - b.threatScore * 0.35) - (a.opportunityScore - a.threatScore * 0.35))
    .slice(0, 5);
  const keystones = (input.analysis?.tileMetrics ?? []).filter(tile => /keystone|kraken|origin|inner|border|outer/i.test(`${tile.terrain} ${tile.baseKind}`));
  const items: ForecastItem[] = [];

  for (const horizon of horizons) {
    const horizonScale = Math.min(1, horizon / 72);
    const expansionVelocity = Math.min(1, recentExpansionSignal / 12) * horizonScale;
    const combatVelocity = Math.min(1, recentCombatSignal / 8) * horizonScale;
    const target = topTargets[Math.min(topTargets.length - 1, Math.floor(horizon / 48))];
    if (target) {
      const probability = Math.max(0.18, Math.min(0.82, 0.22 + expansionVelocity * 0.28 + target.opportunityScore / 260 - target.threatScore / 360));
      items.push({
        id: `expansion-${horizon}-${target.key}`,
        horizonHours: horizon,
        category: 'expansion',
        title: `Likely expansion pressure around ${target.key}`,
        likelihood: likelihood(probability),
        probability,
        confidence: Math.max(0.28, Math.min(0.78, 0.45 + (input.events.length ? 0.12 : 0) + (target.nearestOccupiedDistance !== null ? 0.08 : -0.08))),
        subjectKey: target.key,
        supportingFeatures: [
          `Opportunity ${Math.round(target.opportunityScore)}`,
          `Threat ${Math.round(target.threatScore)}`,
          target.nearestOccupiedDistance !== null ? `Nearest occupied ${target.nearestOccupiedDistance.toFixed(1)}` : 'No occupied-distance baseline',
          `Recent expansion signal ${recentExpansionSignal.toFixed(2)}`
        ],
        assumptions: ['Visible map ownership remains representative.', 'Players favor high-value, reachable unclaimed sites.', 'Hidden diplomacy/reservations are not known.'],
        invalidatedBy: ['A new sync shows the tile occupied.', 'Manual state marks the tile reserved/friendly-protected.', 'Incoming movement telemetry contradicts the pressure model.'],
        dataAgeMinutes
      });
    }

    if (combatEvents.length || input.analysis?.commanderProfiles.some(profile => profile.threatScore > 0)) {
      const topThreat = input.analysis?.commanderProfiles.find(profile => profile.threatScore > 0);
      const probability = Math.max(0.12, Math.min(0.86, 0.18 + combatVelocity * 0.35 + (topThreat?.threatScore ?? 0) / 260));
      items.push({
        id: `hotspot-${horizon}-${topThreat?.name ?? 'world'}`,
        horizonHours: horizon,
        category: 'hotspot',
        title: topThreat ? `Conflict hotspot risk involving ${topThreat.name}` : 'Conflict hotspot risk from recent reports',
        likelihood: likelihood(probability),
        probability,
        confidence: Math.max(0.25, Math.min(0.75, 0.38 + combatEvents.length / 30 + (topThreat ? 0.1 : 0))),
        subjectKey: topThreat?.lastSeenUtc ?? null,
        supportingFeatures: [`Recent combat signal ${recentCombatSignal.toFixed(2)}`, topThreat ? `${Math.round(topThreat.threatScore)} threat score` : 'No named top threat'],
        assumptions: ['Recent report patterns partially predict near-term activity.', 'Same-faction actors are not treated as personal threats.', 'Report summaries are incomplete compared with in-game state.'],
        invalidatedBy: ['New reports show activity shifting elsewhere.', 'Diplomacy/manual profile marks the actor protected or nonhostile.', 'Spy/detail reports show defenses changed materially.'],
        dataAgeMinutes
      });
    }

    if (keystones.length) {
      const probability = Math.max(0.1, Math.min(0.68, 0.12 + horizonScale * 0.22 + keystones.length / 50));
      items.push({
        id: `keystone-${horizon}`,
        horizonHours: horizon,
        category: 'keystone',
        title: 'Keystone/Origin pressure may become strategically relevant',
        likelihood: likelihood(probability),
        probability,
        confidence: 0.42,
        subjectKey: keystones[0].key,
        supportingFeatures: [`${keystones.length} Keystone/KRAKEN-like site(s) identifiable`, 'Current 11.75 victory rules emphasize Origin Wormhole and Keystone-generated Valor paths'],
        assumptions: ['Keystone marker detection from map labels is accurate.', 'Faction objective progress is not fully exposed.', 'Spy snapshots may be stale.'],
        invalidatedBy: ['Map schema changes Keystone labels.', 'Faction objective telemetry becomes available.', 'Manual notes mark sites uncontested or irrelevant.'],
        dataAgeMinutes
      });
    }
  }

  return {
    generatedAt,
    worldId: input.world?.id ?? null,
    horizons,
    items: items.sort((a, b) => b.probability * b.confidence - a.probability * a.confidence).slice(0, 20),
    note: 'Forecasts are broad, rule-based scenarios from visible/cache/imported observations. They are not exact predictions and do not include hidden fleets, private stockpiles, or unobserved diplomacy.'
  };
}
