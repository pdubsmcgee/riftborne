import type {
  BridgeCandidate,
  BridgePlan,
  DecisionCard,
  ResourcePlan,
  StrategicAnalysis,
  StrategicLabel,
  TileMetric
} from '../shared/types.js';

type ResourceKind = ResourcePlan['resource'];

function n(value: number | null | undefined, fallback = 60) {
  return Number.isFinite(value) ? Number(value) : fallback;
}

function risk(threat: number, isolation = 0): DecisionCard['risk'] {
  if (threat + isolation >= 58) return 'high';
  if (threat + isolation >= 30) return 'medium';
  return 'low';
}

function scoreResource(tile: TileMetric, resource: ResourceKind) {
  const text = `${tile.terrain} ${tile.evidence.join(' ')}`.toLowerCase();
  const exact: Record<ResourceKind, RegExp> = {
    deuterium: /deuterium/,
    vulkron: /vulkron|asteroidfield|asteroid field/,
    aurelite: /aurelite|crystal/,
    astra: /astra|gas|solar|energy|spire/,
    rare: /rare|noctium|echorite|prismalloy|xenocite|vantium|radianite|mining/,
    noctium: /noctium/
  };
  const broad: Record<ResourceKind, RegExp> = {
    deuterium: /deuterium|gas|nebula/,
    vulkron: /vulkron|asteroid/,
    aurelite: /aurelite|crystal/,
    astra: /astra|solar|energy|gas|spire/,
    rare: /rare|mining|noctium|echorite|prismalloy|xenocite|vantium|radianite/,
    noctium: /noctium|rare|mining/
  };
  if (exact[resource].test(text)) return 45;
  if (broad[resource].test(text)) return 24;
  return 0;
}

function labelsFor(candidate: BridgeCandidate): StrategicLabel[] {
  const labels: StrategicLabel[] = [];
  if (candidate.bridgeValue >= 24) labels.push('best bridge');
  if (candidate.resourceScore >= 28) labels.push('resource fix');
  if (candidate.threatScore >= 45 || n(candidate.nearestHostileDistance) < 8) labels.push('hostile pressure');
  if (candidate.isolationPenalty >= 18) labels.push('too isolated');
  if (candidate.score >= 70 && candidate.threatScore >= 35) labels.push('greedy');
  if (!labels.length) labels.push(candidate.score >= 48 ? 'safe but low value' : 'watch');
  return labels;
}

function bridgeCandidate(tile: TileMetric, resource?: ResourceKind): BridgeCandidate {
  const friendly = n(tile.nearestFriendlyFactionDistance);
  const owned = n(tile.nearestOwnedDistance);
  const hostile = n(tile.nearestHostileFactionDistance);
  const bridgeValue = Math.max(0, 30 - friendly) * 1.3 + Math.max(0, 24 - owned) * 0.35;
  const isolationPenalty = Math.max(0, owned - 22) * 0.9 + Math.max(0, friendly - 18) * 1.1;
  const resourceValue = resource ? scoreResource(tile, resource) : Math.max(0, tile.resourceScore * 0.35 + tile.specialScore * 0.15);
  const hostilePenalty = Math.max(0, 10 - hostile) * 4 + tile.threatScore * 0.75;
  const score = Math.max(0, Math.min(100, tile.opportunityScore * 0.42 + bridgeValue + resourceValue - hostilePenalty - isolationPenalty));
  const candidate: BridgeCandidate = {
    key: tile.key,
    x: tile.x,
    y: tile.y,
    terrain: tile.terrain,
    score,
    labels: [],
    nearestOwnedDistance: tile.nearestOwnedDistance,
    nearestTerranDistance: tile.nearestFriendlyFactionDistance ?? null,
    nearestHostileDistance: tile.nearestHostileFactionDistance ?? null,
    resourceScore: resourceValue,
    threatScore: tile.threatScore,
    bridgeValue,
    isolationPenalty,
    evidence: tile.evidence
  };
  candidate.labels = labelsFor(candidate);
  return candidate;
}

function unclaimed(analysis: StrategicAnalysis | null) {
  return (analysis?.tileMetrics ?? []).filter(tile => !tile.ownerName && !tile.baseKind);
}

export function buildBridgePlan(input: { analysis: StrategicAnalysis | null; worldId: string | null }): BridgePlan {
  const candidates = unclaimed(input.analysis)
    .map(tile => bridgeCandidate(tile))
    .sort((a, b) => b.score - a.score)
    .slice(0, 40);
  return {
    generatedAt: new Date().toISOString(),
    worldId: input.worldId,
    myFaction: input.analysis?.myTiles[0]?.faction || null,
    candidates,
    best: candidates[0] ?? null,
    note: 'Bridge scoring favors safe steps toward same-faction/Terran support over isolated raw tile value. It does not know hidden fleet launches or private faction reservations.'
  };
}

export function buildResourcePlan(input: { analysis: StrategicAnalysis | null; worldId: string | null; resource: ResourceKind }): ResourcePlan {
  const all = unclaimed(input.analysis).map(tile => bridgeCandidate(tile, input.resource)).filter(candidate => candidate.resourceScore > 0);
  const ranked = all.sort((a, b) => b.score - a.score);
  const safer = ranked.filter(candidate => candidate.threatScore < 38 && n(candidate.nearestHostileDistance) >= 8).slice(0, 5);
  const strategic = [...ranked].sort((a, b) => (b.bridgeValue + b.resourceScore - b.threatScore * 0.55) - (a.bridgeValue + a.resourceScore - a.threatScore * 0.55))[0] ?? null;
  const avoid = ranked.filter(candidate => candidate.threatScore >= 48 || n(candidate.nearestHostileDistance) < 7 || candidate.isolationPenalty >= 22).slice(0, 5);
  return {
    generatedAt: new Date().toISOString(),
    worldId: input.worldId,
    resource: input.resource,
    bestNow: ranked[0] ?? null,
    bestStrategic: strategic,
    safer,
    avoid,
    note: `Resource plan for ${input.resource}. Rankings prefer explicit matching terrain, unclaimed status, lower hostile pressure, and Terran/friendly bridge value.`
  };
}

function cardFromCandidate(input: {
  id: string;
  intent: DecisionCard['intent'];
  title: string;
  answer: string;
  candidate: BridgeCandidate;
  rank: number;
  benefit: string;
  alternatives?: BridgeCandidate[];
}): DecisionCard {
  const c = input.candidate;
  return {
    id: input.id,
    intent: input.intent,
    title: input.title,
    answer: input.answer,
    targetKey: c.key,
    targetType: c.terrain,
    rank: input.rank,
    benefit: input.benefit,
    risk: risk(c.threatScore, c.isolationPenalty),
    confidence: Math.max(0.35, Math.min(0.86, 0.7 - c.threatScore / 250 - c.isolationPenalty / 180 + c.bridgeValue / 300)),
    confirmedFacts: [`${c.terrain} at ${c.key}`, ...c.evidence.filter(item => /Unclaimed|Terrain|Resource|Build|Distance|support|pressure/i.test(item)).slice(0, 5)],
    calculatedValues: [
      `Score ${Math.round(c.score)}`,
      `Bridge value ${Math.round(c.bridgeValue)}`,
      `Resource value ${Math.round(c.resourceScore)}`,
      `Threat ${Math.round(c.threatScore)}`,
      `Isolation penalty ${Math.round(c.isolationPenalty)}`
    ],
    inferences: c.labels.map(label => `Label: ${label}`),
    missingData: ['Hidden incoming fleets', 'Private faction reservations', 'Exact in-game travel timers'],
    verifyInGame: ['Confirm tile is still unclaimed.', 'Confirm the outpost/colony type is legal from the launch base.', 'Check faction chat/reservations before committing.'],
    alternatives: (input.alternatives ?? []).slice(0, 4).map(item => ({ label: `${item.terrain} ${item.key}`, targetKey: item.key, reason: item.labels.join(', '), score: item.score }))
  };
}

export function buildDecisionCards(input: {
  analysis: StrategicAnalysis | null;
  worldId: string | null;
  bridgePlan?: BridgePlan;
  resourcePlans?: ResourcePlan[];
  businessCards?: DecisionCard[];
}): DecisionCard[] {
  const cards: DecisionCard[] = [];
  const bridge = input.bridgePlan ?? buildBridgePlan(input);
  if (bridge.best) cards.push(cardFromCandidate({
    id: `decision-bridge-${bridge.best.key}`,
    intent: 'expansion',
    title: `Best bridge move: ${bridge.best.key}`,
    answer: `Use ${bridge.best.terrain} at ${bridge.best.key} as the leading expansion candidate if it is still legal/open.`,
    candidate: bridge.best,
    rank: 1,
    benefit: 'Improves your position toward same-faction support without chasing isolated greed.',
    alternatives: bridge.candidates.slice(1, 5)
  }));
  for (const plan of input.resourcePlans ?? []) if (plan.bestNow) cards.push(cardFromCandidate({
    id: `decision-resource-${plan.resource}-${plan.bestNow.key}`,
    intent: 'resource',
    title: `Best ${plan.resource} fix: ${plan.bestNow.key}`,
    answer: `For ${plan.resource}, use ${plan.bestNow.terrain} at ${plan.bestNow.key} before generic high-value tiles.`,
    candidate: plan.bestNow,
    rank: cards.length + 1,
    benefit: `Directly addresses the ${plan.resource} bottleneck while still considering pressure and faction support.`,
    alternatives: [plan.bestStrategic, ...plan.safer].filter(Boolean) as BridgeCandidate[]
  }));
  const threat = input.analysis?.commanderProfiles.find(profile => profile.relation === 'opponent' && (profile.threatScore > 0 || profile.hostileReports > 0));
  if (threat) cards.push({
    id: `decision-threat-${threat.name}`,
    intent: 'threat',
    title: `Watch ${threat.name}`,
    answer: `${threat.name} is the most relevant visible opponent pressure. Profile before launching a long timer.`,
    targetKey: null,
    targetType: 'commander',
    rank: cards.length + 1,
    benefit: 'Avoids walking into repeated hostile patterns.',
    risk: threat.threatScore >= 70 ? 'high' : 'medium',
    confidence: Math.max(0.35, Math.min(0.82, 0.45 + threat.reports / 20)),
    confirmedFacts: [`${threat.reports} visible report(s)`, `${threat.hostileReports} hostile contact(s)`, ...threat.evidence],
    calculatedValues: [`Threat score ${Math.round(threat.threatScore)}`, `Power seen ${Math.round(threat.powerSeen)}`],
    inferences: ['Visible report pattern suggests this commander deserves attention.'],
    missingData: ['Current garrison state', 'Hidden fleet launches', 'Private diplomacy'],
    verifyInGame: ['Check latest report details.', 'Confirm diplomacy before retaliation.', 'Spy before committing a major fleet.'],
    alternatives: []
  });
  cards.push(...(input.businessCards ?? []));
  return cards.sort((a, b) => a.rank - b.rank).map((card, index) => ({ ...card, rank: index + 1 }));
}

export type { ResourceKind };
