import type { ChangeEvent, FactionStrategyAction, FactionStrategyState, ForecastItem, StrategicAnalysis, WorldRecord } from '../shared/types.js';
import { asText } from './strategy-utils.js';

function normalize(value: string) {
  return value.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function risk(priority: number): FactionStrategyAction['risk'] {
  if (priority >= 78) return 'high';
  if (priority >= 48) return 'medium';
  return 'low';
}

function action(input: Omit<FactionStrategyAction, 'risk'> & { risk?: FactionStrategyAction['risk'] }): FactionStrategyAction {
  return { ...input, risk: input.risk ?? risk(input.priority) };
}

export function buildFactionStrategy(input: {
  world: WorldRecord | null;
  analysis: StrategicAnalysis | null;
  events: ChangeEvent[];
  forecasts: ForecastItem[];
}): FactionStrategyState {
  const generatedAt = new Date().toISOString();
  const myFaction = asText(input.analysis?.myTiles[0]?.faction || input.analysis?.factionProfiles.find(profile => /terran/i.test(profile.faction))?.faction) || null;
  const myFactionKey = normalize(myFaction ?? '');
  const factionProfiles = input.analysis?.factionProfiles ?? [];
  const tiles = input.analysis?.tileMetrics ?? [];
  const friendlyTiles = tiles.filter(tile => normalize(tile.faction) && normalize(tile.faction) === myFactionKey);
  const hostileTiles = tiles.filter(tile => tile.ownerName && normalize(tile.faction) && normalize(tile.faction) !== myFactionKey);
  const unknownTiles = tiles.filter(tile => tile.ownerName && !tile.faction);
  const friendlyCommanders = (input.analysis?.commanderProfiles ?? []).filter(profile => profile.relation === 'ally' || profile.relation === 'self');
  const hostileCommanders = (input.analysis?.commanderProfiles ?? []).filter(profile => profile.relation === 'opponent');
  const recentFactionEvents = input.events.filter(event => /new_colony|new_outpost|ownership_transfer|base_removed|keystone|attack|raid|siege/.test(event.eventType));
  const actions: FactionStrategyAction[] = [];

  const staging = tiles.filter(tile => !tile.ownerName)
    .sort((a, b) => (b.opportunityScore + (b.factionSupportScore ?? 0) - b.threatScore * 0.45) - (a.opportunityScore + (a.factionSupportScore ?? 0) - a.threatScore * 0.45))[0];
  if (staging) actions.push(action({
    id: `faction-expand-${staging.key}`,
    category: 'expand',
    title: `Coordinate faction expansion toward ${staging.key}`,
    rationale: `${staging.terrain} at ${staging.key} has strong faction-adjusted value: opportunity ${Math.round(staging.opportunityScore)}, support ${Math.round(staging.factionSupportScore ?? 0)}, threat ${Math.round(staging.threatScore)}.`,
    priority: Math.max(35, Math.min(95, staging.opportunityScore + (staging.factionSupportScore ?? 0) * 0.6 - staging.threatScore * 0.25)),
    confidence: Math.max(0.35, Math.min(0.82, 0.48 + (staging.nearestFriendlyFactionDistance !== null ? 0.12 : 0) + (myFaction ? 0.1 : -0.08))),
    scope: 'faction',
    targetKey: staging.key,
    evidence: staging.evidence,
    verifyInGame: ['Confirm the tile is not reserved by a faction mate.', 'Ask nearby Terran Union commanders who can reinforce it fastest.', 'Check legal colony/outpost unlocks before committing.'],
    missingInformation: ['Faction reservation agreements', 'Hidden incoming fleets', 'Exact allied travel timers']
  }));

  const topHostile = hostileCommanders[0];
  if (topHostile) actions.push(action({
    id: `faction-intel-${topHostile.name}`,
    category: 'intel',
    title: `Make ${topHostile.name} a faction intel target`,
    rationale: `${topHostile.name} is the strongest visible non-faction pressure source with ${Math.round(topHostile.threatScore)} threat and ${topHostile.reports} report(s).`,
    priority: Math.min(92, 45 + topHostile.threatScore * 0.55),
    confidence: Math.max(0.4, Math.min(0.82, 0.45 + topHostile.reports / 20)),
    scope: 'faction',
    targetKey: null,
    evidence: topHostile.evidence,
    verifyInGame: ['Coordinate spy coverage instead of duplicate blind probes.', 'Share fresh report details with faction mates.', 'Confirm diplomacy before retaliation.'],
    missingInformation: ['Current garrison state', 'Private diplomacy/NAPs', 'Hidden fleets']
  }));

  const forecastExpansion = input.forecasts.find(item => item.category === 'expansion' && item.subjectKey);
  if (forecastExpansion) actions.push(action({
    id: `faction-forecast-${forecastExpansion.subjectKey}`,
    category: 'defend',
    title: `Watch projected expansion pressure at ${forecastExpansion.subjectKey}`,
    rationale: `${forecastExpansion.title} is a ${forecastExpansion.likelihood}-likelihood scenario. Use it as a watchlist, not a certainty.`,
    priority: Math.round(35 + forecastExpansion.probability * 40 + forecastExpansion.confidence * 20),
    confidence: forecastExpansion.confidence,
    scope: 'faction',
    targetKey: forecastExpansion.subjectKey,
    evidence: forecastExpansion.supportingFeatures,
    verifyInGame: ['Check map before faction members spend colony ships.', 'Scout nearby non-faction bases.', 'Update manual reservations if this area is protected.'],
    missingInformation: ['Hidden claims/reservations', 'Exact opponent expansion queues']
  }));

  const keystone = tiles.find(tile => /keystone|kraken|origin|inner|border|outer/i.test(`${tile.terrain} ${tile.baseKind}`));
  if (keystone) actions.push(action({
    id: `faction-keystone-${keystone.key}`,
    category: 'keystone',
    title: `Assign Keystone/Origin coverage around ${keystone.key}`,
    rationale: 'Current 11.73 victory rules make Origin and Keystone Vision sites faction-level objectives, but enemy progress is not live public information.',
    priority: 62,
    risk: 'high',
    confidence: 0.46,
    scope: 'faction',
    targetKey: keystone.key,
    evidence: keystone.evidence,
    verifyInGame: ['Do not attack KRAKEN/Keystone sites alone.', 'Use spy snapshots to refresh objective state.', 'Coordinate Noctmark/Visions support only after ownership is confirmed.'],
    missingInformation: ['Live enemy Visions', 'KRAKEN garrison details', 'Faction stockpiles']
  }));

  if (friendlyTiles.length > 1) actions.push(action({
    id: 'faction-logistics-spine',
    category: 'logistics',
    title: 'Build a faction logistics spine between friendly clusters',
    rationale: `${friendlyTiles.length} visible same-faction holding(s) means reinforcement and supply timing can decide whether expansion near pressure zones sticks.`,
    priority: 52,
    risk: 'medium',
    confidence: 0.55,
    scope: 'faction',
    targetKey: null,
    evidence: friendlyTiles.slice(0, 5).map(tile => `${tile.ownerName || 'friendly'} at ${tile.key}`),
    verifyInGame: ['Identify fastest allied shipyards.', 'Keep Astra reserves at staging bases.', 'Avoid mixing slow cargo/siege hulls into response fleets.'],
    missingInformation: ['Current allied inventories', 'Route capacity', 'Astra reserves']
  }));

  return {
    generatedAt,
    worldId: input.world?.id ?? null,
    myFaction,
    posture: 'balanced-edge',
    summary: {
      friendlyHoldings: friendlyTiles.length,
      hostileHoldings: hostileTiles.length,
      unknownHoldings: unknownTiles.length,
      friendlyCommanders: friendlyCommanders.length,
      hostileCommanders: hostileCommanders.length,
      recentFactionEvents: recentFactionEvents.length
    },
    actions: actions.sort((a, b) => b.priority - a.priority).slice(0, 10),
    factionProfiles,
    note: 'Faction strategy is advisory and based on visible telemetry, imported observations, manual state, and current 11.73 knowledge. It does not know hidden fleets, private stockpiles, or faction chat agreements.'
  };
}
