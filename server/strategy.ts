import type {
  CommanderProfile,
  ExpeditionMetric,
  FactionProfile,
  FleetPlan,
  MapTile,
  MapGeometry,
  MapManifest,
  Recommendation,
  ReportMetric,
  ReportSummary,
  Session,
  StrategicAnalysis,
  SyncAudit,
  TileMetric,
  WorldSummary
} from '../shared/types.js';
import {
  asNumber,
  asText,
  baseKind,
  clamp,
  confidence,
  factionName,
  ownerName,
  reportLocationKey,
  reportMission,
  resourceScore,
  riskFromScore,
  scoreLabel,
  slotScore,
  specialScore,
  terrainName,
  wrappedDistance,
  deriveMapGeometry
} from './strategy-utils.js';

type Input = {
  session: Session | null;
  summary: WorldSummary | null;
  reports: ReportSummary[];
  tiles: MapTile[];
  manifest?: MapManifest | null;
  worldId?: string | null;
  syncAudit?: SyncAudit | null;
};

function commanderName(session: Session | null) {
  return asText(session?.displayName || session?.username || session?.playerName).toLowerCase();
}

function normalizeFaction(value: string) {
  return value.replace(/[^a-z0-9]/gi, '').toLowerCase();
}

function myFactionNames(session: Session | null, tiles: MapTile[], me: string) {
  const names = new Set<string>();
  const add = (value: unknown) => {
    const text = asText(value);
    if (text) names.add(normalizeFaction(text));
  };
  for (const tile of tiles) {
    if (ownerName(tile).toLowerCase() === me) {
      add(tile.base?.faction);
      add(tile.base?.factionKey);
      add(tile.faction);
    }
  }
  add(session?.faction);
  return names;
}

function relationFor(name: string, faction: string, me: string, myFactions: Set<string>): CommanderProfile['relation'] {
  if (me && name.toLowerCase() === me) return 'self';
  const normalized = normalizeFaction(faction);
  if (normalized && myFactions.has(normalized)) return 'ally';
  return faction ? 'opponent' : 'unknown';
}

function nearestDistance(tile: MapTile, candidates: MapTile[], geometry: MapGeometry) {
  if (!candidates.length) return null;
  return Math.min(...candidates.map(candidate => wrappedDistance(tile, candidate, geometry)));
}

function reportFaction(report: ReportSummary, side: 'attacker' | 'defender') {
  return side === 'attacker'
    ? asText(report.attackerFaction || report.attackerFactionKey)
    : asText(report.defenderFaction || report.defenderFactionKey);
}

function buildReportMetrics(reports: ReportSummary[], me: string, myFactions: Set<string>): ReportMetric[] {
  return reports.map(report => {
    const attacker = asText(report.attackerName || report.attacker);
    const defender = asText(report.defenderName || report.defender);
    const attackerFaction = reportFaction(report, 'attacker');
    const defenderFaction = reportFaction(report, 'defender');
    const attackerIsAlly = normalizeFaction(attackerFaction) ? myFactions.has(normalizeFaction(attackerFaction)) : false;
    const defenderIsAlly = normalizeFaction(defenderFaction) ? myFactions.has(normalizeFaction(defenderFaction)) : false;
    const attackerIsMe = Boolean(me && attacker.toLowerCase() === me);
    const defenderIsMe = Boolean(me && defender.toLowerCase() === me);
    const opponent = attackerIsMe ? defender : defenderIsMe ? attacker : (attacker || defender);
    const mission = reportMission(report);
    const attackerLost = asNumber(report.attackerPowerLost);
    const defenderLost = asNumber(report.defenderPowerLost);
    const attackerPower = asNumber(report.attackerPower);
    const defenderPower = asNumber(report.defenderPower);
    const isCombat = /raid|attack|siege|combat/i.test(mission);
    const isSpy = /spy/i.test(mission);
    const isHostileToMe = (defenderIsMe || defenderIsAlly) && !attackerIsAlly && (isCombat || isSpy);
    const powerSwing = defenderLost - attackerLost;
    const lossEfficiency = (defenderLost + 1) / (attackerLost + 1);
    const lootScore = asNumber(report.resourcesStolenTotal) + asNumber(report.attackerNetLoot) - asNumber(report.resourceLossNet);
    const spy = asNumber(report.spyScore) - asNumber(report.attackerSpiesLost) * 4 - asNumber(report.defenderSpiesLost) * 2;
    const alliedIntel = attackerIsAlly && !defenderIsAlly && isSpy;
    const threat = alliedIntel ? 0 : (isHostileToMe ? 25 : 0) + attackerPower / 20 + Math.max(0, attackerPower - defenderPower) / 18 + (isSpy && isHostileToMe ? 10 : 0);
    return {
      id: String(report.id),
      timeUtc: report.timeUtc ?? null,
      mission,
      locationKey: reportLocationKey(report),
      attackerName: attacker,
      defenderName: defender,
      opponentName: opponent,
      isMine: attackerIsMe || defenderIsMe,
      isHostileToMe,
      isOutgoing: attackerIsMe,
      powerSwing,
      lossEfficiency,
      lootScore,
      spyScore: spy,
      threatScore: Math.max(0, threat),
      evidence: [
        `Mission ${mission}`,
        attackerPower || defenderPower ? `Power ${attackerPower} vs ${defenderPower}` : '',
        attackerLost || defenderLost ? `Losses ${attackerLost} vs ${defenderLost}` : '',
        lootScore ? `Loot signal ${Math.round(lootScore)}` : ''
      ].filter(Boolean)
    };
  });
}

function buildTileMetrics(tiles: MapTile[], reportMetrics: ReportMetric[], me: string, myFactions: Set<string>, geometry: MapGeometry): TileMetric[] {
  const ownedTiles = tiles.filter(tile => ownerName(tile).toLowerCase() === me);
  const occupied = tiles.filter(tile => ownerName(tile));
  const friendlyFactionTiles = occupied.filter(tile => {
    const normalized = normalizeFaction(factionName(tile));
    return normalized && myFactions.has(normalized);
  });
  const hostileFactionTiles = occupied.filter(tile => {
    const normalized = normalizeFaction(factionName(tile));
    return normalized && !myFactions.has(normalized);
  });
  const reportThreatByLocation = new Map<string, number>();
  for (const report of reportMetrics) {
    if (!report.locationKey) continue;
    reportThreatByLocation.set(report.locationKey, (reportThreatByLocation.get(report.locationKey) ?? 0) + report.threatScore);
  }

  return tiles.map(tile => {
    const owner = ownerName(tile);
    const sameFaction = normalizeFaction(factionName(tile)) ? myFactions.has(normalizeFaction(factionName(tile))) : false;
    const terrain = terrainName(tile);
    const key = `${tile.x},${tile.y}`;
    const nearestOwned = nearestDistance(tile, ownedTiles, geometry);
    const nearestOccupied = nearestDistance(tile, occupied.filter(candidate => candidate.x !== tile.x || candidate.y !== tile.y), geometry);
    const nearestFriendlyFaction = nearestDistance(tile, friendlyFactionTiles.filter(candidate => candidate.x !== tile.x || candidate.y !== tile.y), geometry);
    const nearestHostileFaction = nearestDistance(tile, hostileFactionTiles.filter(candidate => candidate.x !== tile.x || candidate.y !== tile.y), geometry);
    const rawResource = resourceScore(tile);
    const rawSlot = slotScore(tile);
    const rawSpecial = specialScore(tile);
    const occupiedPenalty = owner ? (sameFaction ? 12 : 35) : 0;
    const distancePenalty = nearestOwned === null ? 8 : Math.min(35, nearestOwned * 0.6);
    const neighborExposure = nearestOccupied === null ? 8 : Math.max(0, 30 - nearestOccupied);
    const friendlySupport = nearestFriendlyFaction === null ? 0 : Math.max(0, 22 - nearestFriendlyFaction) * 1.05;
    const hostilePressure = nearestHostileFaction === null ? 0 : Math.max(0, 28 - nearestHostileFaction) * 0.9;
    const reportThreat = reportThreatByLocation.get(key) ?? 0;
    const threatScore = clamp((occupiedPenalty + neighborExposure + hostilePressure + reportThreat) / 100, 0, 1) * 100;
    const uncertainty = owner ? 12 : nearestOwned === null ? 55 : Math.min(65, 18 + distancePenalty);
    const factionSupportScore = friendlySupport - hostilePressure;
    const opportunity = clamp((rawResource + rawSlot + rawSpecial + friendlySupport - distancePenalty - occupiedPenalty - neighborExposure * 0.35 - hostilePressure * 0.75) / 100, -1, 1) * 100;
    const evidence = [
      `Terrain ${terrain}`,
      rawResource ? `Resource value ${scoreLabel(rawResource)}` : '',
      rawSlot ? `Build slot value ${scoreLabel(rawSlot)}` : '',
      rawSpecial ? `Special value ${scoreLabel(rawSpecial)}` : '',
      nearestOwned !== null ? `Distance ${nearestOwned.toFixed(1)} from owned site` : '',
      nearestFriendlyFaction !== null ? `Friendly faction support ${nearestFriendlyFaction.toFixed(1)} away` : '',
      nearestHostileFaction !== null ? `Non-faction pressure ${nearestHostileFaction.toFixed(1)} away` : '',
      owner ? `Occupied by ${owner}` : 'Unclaimed'
    ].filter(Boolean);
    return {
      key,
      x: tile.x,
      y: tile.y,
      terrain,
      ownerName: owner,
      faction: factionName(tile),
      baseKind: baseKind(tile),
      resourceScore: rawResource,
      slotScore: rawSlot,
      specialScore: rawSpecial,
      threatScore,
      opportunityScore: opportunity,
      uncertainty,
      nearestOwnedDistance: nearestOwned,
      nearestOccupiedDistance: nearestOccupied,
      nearestFriendlyFactionDistance: nearestFriendlyFaction,
      nearestHostileFactionDistance: nearestHostileFaction,
      factionSupportScore,
      evidence
    };
  });
}

function buildCommanderProfiles(reports: ReportMetric[], rawReports: ReportSummary[], me: string, myFactions: Set<string>): CommanderProfile[] {
  const profiles = new Map<string, CommanderProfile>();
  function profile(name: string) {
    const key = name || 'Unknown';
    if (!profiles.has(key)) profiles.set(key, {
      name: key,
      faction: '',
      relation: 'unknown',
      reports: 0,
      hostileReports: 0,
      outgoingReports: 0,
      powerSeen: 0,
      powerLost: 0,
      lootNet: 0,
      spyScore: 0,
      threatScore: 0,
      lastSeenUtc: null,
      evidence: []
    });
    return profiles.get(key)!;
  }
  reports.forEach((metric, index) => {
    const raw = rawReports[index] ?? {};
    for (const name of [metric.attackerName, metric.defenderName].filter(Boolean)) {
      if (me && name.toLowerCase() === me) continue;
      const item = profile(name);
      item.reports += 1;
      item.hostileReports += metric.isHostileToMe && metric.attackerName === name ? 1 : 0;
      item.outgoingReports += metric.isOutgoing && metric.defenderName === name ? 1 : 0;
      item.powerSeen += metric.attackerName === name ? asNumber(raw.attackerPower) : asNumber(raw.defenderPower);
      item.powerLost += metric.attackerName === name ? asNumber(raw.attackerPowerLost) : asNumber(raw.defenderPowerLost);
      item.lootNet += metric.lootScore;
      item.spyScore += metric.spyScore;
      item.threatScore += metric.attackerName === name ? metric.threatScore : 0;
      item.faction ||= metric.attackerName === name ? asText(raw.attackerFaction || raw.attackerFactionKey) : asText(raw.defenderFaction || raw.defenderFactionKey);
      item.relation = relationFor(item.name, item.faction, me, myFactions);
      if (item.relation === 'ally') {
        item.threatScore = 0;
        item.hostileReports = 0;
      }
      if (metric.timeUtc && (!item.lastSeenUtc || metric.timeUtc > item.lastSeenUtc)) item.lastSeenUtc = metric.timeUtc;
      if (item.evidence.length < 4) item.evidence.push(`Report ${metric.id}: ${metric.mission}`);
    }
  });
  return [...profiles.values()].sort((a, b) => b.threatScore - a.threatScore || b.reports - a.reports).slice(0, 24);
}

function buildFactionProfiles(tiles: MapTile[], reports: ReportMetric[], commanders: CommanderProfile[]): FactionProfile[] {
  const profiles = new Map<string, FactionProfile>();
  function profile(faction: string) {
    const key = faction || 'Unknown';
    if (!profiles.has(key)) profiles.set(key, { faction: key, commanders: 0, occupiedTiles: 0, reports: 0, hostileReports: 0, threatScore: 0, lastSeenUtc: null });
    return profiles.get(key)!;
  }
  for (const tile of tiles) if (ownerName(tile)) profile(factionName(tile)).occupiedTiles += 1;
  for (const commander of commanders) {
    const item = profile(commander.faction);
    item.commanders += 1;
    item.reports += commander.reports;
    item.hostileReports += commander.hostileReports;
    item.threatScore += commander.threatScore;
    if (commander.lastSeenUtc && (!item.lastSeenUtc || commander.lastSeenUtc > item.lastSeenUtc)) item.lastSeenUtc = commander.lastSeenUtc;
  }
  return [...profiles.values()].sort((a, b) => b.threatScore - a.threatScore || b.occupiedTiles - a.occupiedTiles);
}

function buildExpeditions(tiles: MapTile[], meFaction: string): ExpeditionMetric[] {
  return tiles.filter(tile => tile.expedition).map(tile => {
    const expedition = tile.expedition!;
    const delivered = expedition.deliveredResources && typeof expedition.deliveredResources === 'object'
      ? Object.values(expedition.deliveredResources).reduce((sum, value) => sum + asNumber(value), 0) : 0;
    const bonuses = expedition.resourceBonusPercents && typeof expedition.resourceBonusPercents === 'object'
      ? Object.values(expedition.resourceBonusPercents).reduce((sum, value) => sum + asNumber(value), 0) : 0;
    const deadline = asText(expedition.contributionClosesAtUtc || expedition.choiceDeadlineUtc) || null;
    const hours = deadline ? (new Date(deadline).getTime() - Date.now()) / 3_600_000 : 999;
    const urgency = deadline ? clamp((72 - hours) / 72) * 100 : 20;
    const relevance = meFaction && asText(expedition.faction).toLowerCase() === meFaction.toLowerCase() ? 100 : 55;
    const payoff = bonuses * 4 + delivered / 150 + asNumber(expedition.donatedShipPower) / 20 + asNumber(expedition.donatedNoctmarks) / 5;
    return {
      id: String(expedition.id ?? `${tile.x},${tile.y}`),
      tileKey: `${tile.x},${tile.y}`,
      x: tile.x,
      y: tile.y,
      missionName: asText(expedition.missionName || expedition.missionKind) || 'Expedition',
      faction: asText(expedition.faction),
      status: asText(expedition.status) || 'unknown',
      deadlineUtc: deadline,
      payoffScore: payoff,
      urgencyScore: urgency,
      relevanceScore: relevance,
      totalScore: payoff * 0.45 + urgency * 0.3 + relevance * 0.25,
      evidence: [`Expedition at ${tile.x},${tile.y}`, deadline ? `Deadline ${deadline}` : '', bonuses ? `Bonus signal ${Math.round(bonuses)}` : ''].filter(Boolean)
    };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

function buildFleetPlans(input: {
  myTiles: TileMetric[];
  reportMetrics: ReportMetric[];
  commanderProfiles: CommanderProfile[];
  tileMetrics: TileMetric[];
  expeditions: ExpeditionMetric[];
}): FleetPlan[] {
  const topEnemy = input.commanderProfiles.find(profile => profile.relation === 'opponent' && profile.threatScore > 0);
  const alliedSpy = input.reportMetrics.filter(report => /spy/i.test(report.mission) && !report.isMine && report.threatScore === 0 && report.spyScore > 0).sort((a, b) => b.spyScore - a.spyScore)[0];
  const expansion = input.tileMetrics.filter(tile => !tile.ownerName).sort((a, b) => b.opportunityScore - a.opportunityScore)[0];
  const plans: FleetPlan[] = [];

  plans.push({
    id: 'fleet-defense-core',
    role: 'defense',
    priority: topEnemy ? 92 : 70,
    title: 'Keep a home defense fleet stationed before long deployments',
    composition: ['Durable combat hulls sized to visible attacker power', 'Enough Astra supply for stationed upkeep', 'A small spy screen if intelligence hulls are available', 'Avoid mixing slow cargo hulls into the response group'],
    rationale: topEnemy ? `${topEnemy.name} is the top opponent pressure source, so preserve a defensive reserve before committing outbound timers.` : 'No high-confidence enemy pressure is visible, but stationed ships can be lost if Astra support collapses.',
    readinessChecks: ['Confirm Astra balance at every stationed base.', 'Compare visible attacker power to your stationed defense.', 'Keep the response fleet faster than cargo/logistics fleets.'],
    risk: topEnemy && topEnemy.threatScore > 70 ? 'high' : 'medium',
    evidence: topEnemy ? topEnemy.evidence : input.myTiles.slice(0, 3).map(tile => `Owned site ${tile.key}`)
  });

  plans.push({
    id: 'fleet-spy-screen',
    role: 'spy',
    priority: alliedSpy ? 88 : 76,
    title: alliedSpy ? `Exploit allied intel around ${alliedSpy.defenderName || alliedSpy.opponentName}` : 'Maintain a disposable spy screen before raids or colonization',
    composition: ['Intelligence ships only for spy missions', 'Multiple small probes instead of one oversized blind commitment', 'Follow-up combat fleet only after report details justify it'],
    rationale: alliedSpy ? `Friendly scouting shows a strong spy signal. Use that to choose targets instead of raw map value alone.` : 'Spy reports reduce the biggest unknown: current defenses and resource exposure.',
    readinessChecks: ['Open the strongest recent spy report detail.', 'Do not repeat a destroyed spy route without changing timing.', 'Use spy results to decide raid, attack, or no-go.'],
    risk: 'low',
    evidence: alliedSpy ? alliedSpy.evidence : ['Guide: spy missions use Intelligence ships only.']
  });

  if (expansion) {
    plans.push({
      id: 'fleet-colonize-target',
      role: 'colonize',
      priority: Math.max(55, Math.round(expansion.opportunityScore)),
      title: `Prepare a guarded colonization package for ${expansion.key}`,
      composition: ['Colonization-capable fleet only after expansion gate is confirmed', 'Escort sized to nearby exposure', 'Separate cargo/logistics follow-up for early build support'],
      rationale: `${expansion.terrain} at ${expansion.key} is the top visible expansion target, but the fleet should be treated as a package: claim, escort, and supply.`,
      readinessChecks: ['Confirm the culture-specific central-infrastructure requirement and colony/outpost cap.', 'Check wrapped travel time from nearest owned site.', 'Stage resources before the new site idles.'],
      risk: expansion.threatScore > 50 ? 'medium' : 'low',
      evidence: expansion.evidence
    });
  }

  const favorable = input.reportMetrics.filter(report => report.isOutgoing && /raid|attack/i.test(report.mission) && report.lossEfficiency > 1.2).sort((a, b) => b.lossEfficiency - a.lossEfficiency)[0];
  plans.push({
    id: 'fleet-raid-attack',
    role: favorable ? 'raid' : 'attack',
    priority: favorable ? 72 : 48,
    title: favorable ? 'Keep a fast raid fleet ready for repeat favorable trades' : 'Delay hard attacks until spy or combat evidence improves',
    composition: favorable ? ['Fast combat hulls', 'Cargo capacity matched to likely loot', 'No slow siege ships unless converting raid into attack'] : ['Combat core', 'Siege hulls only for confirmed building damage goals', 'Spy report first'],
    rationale: favorable ? `Report ${favorable.id} shows favorable loss efficiency. Treat similar targets as candidates, not guarantees.` : 'The current cache does not prove a strong attack pattern; intelligence should come first.',
    readinessChecks: ['Match mission type to goal: raid for loot, attack for decisive damage.', 'Check slowest hull speed before launch.', 'Confirm target is not same-faction.'],
    risk: favorable ? 'medium' : 'high',
    evidence: favorable ? favorable.evidence : ['No favorable outgoing raid/attack metric found.']
  });

  plans.push({
    id: 'fleet-logistics',
    role: 'logistics',
    priority: input.myTiles.length > 1 ? 68 : 45,
    title: 'Keep logistics separate from combat fleets',
    composition: ['Cargo ships assigned to shipments or routes', 'No frontline dependence on slow logistics hulls', 'Astra deliveries prioritized before long garrison holds'],
    rationale: `${input.myTiles.length} visible holding(s) means route timing can become the hidden limiter behind fleet power.`,
    readinessChecks: ['Check route capacity warnings.', 'Check storage caps at producer sites.', 'Keep Astra moving toward stationed fleets.'],
    risk: 'low',
    evidence: input.myTiles.slice(0, 4).map(tile => `${tile.terrain} at ${tile.key}`)
  });

  return plans.sort((a, b) => b.priority - a.priority).slice(0, 6);
}

function recommendations(input: {
  tileMetrics: TileMetric[];
  reportMetrics: ReportMetric[];
  commanderProfiles: CommanderProfile[];
  factionProfiles: FactionProfile[];
  expeditions: ExpeditionMetric[];
  myTiles: TileMetric[];
  syncAudit?: SyncAudit | null;
  fleetPlans: FleetPlan[];
}): Recommendation[] {
  const recs: Recommendation[] = [];
  const topThreat = input.commanderProfiles.find(profile => profile.threatScore > 0 || profile.hostileReports > 0);
  if (topThreat) {
    recs.push({
      id: `threat-${topThreat.name}`,
      category: 'threat',
      title: `Profile ${topThreat.name} before the next commitment`,
      rationale: `${topThreat.name} is the strongest visible pressure source: ${topThreat.hostileReports} hostile contact(s), ${Math.round(topThreat.powerSeen)} power observed, and ${Math.round(topThreat.threatScore)} threat score.`,
      expectedBenefit: 'Avoid walking into repeated opponent patterns and choose whether to reinforce, spy, or redirect expansion.',
      risk: riskFromScore(topThreat.threatScore),
      confidence: confidence([topThreat.reports / 5, topThreat.powerSeen > 0, topThreat.lastSeenUtc !== null]),
      score: topThreat.threatScore,
      whyNow: topThreat.lastSeenUtc ? `Last seen ${topThreat.lastSeenUtc}` : 'Visible report frequency is high.',
      evidence: topThreat.evidence,
      verifyInGame: ['Check current incoming/outgoing fleet timers.', 'Confirm whether faction diplomacy permits retaliation.'],
      missingInformation: 'Hidden fleets, current garrisons, and private stockpiles are not visible.',
      sourceRefs: topThreat.evidence.map(label => ({ kind: 'report', id: label.replace(/^Report /, '').split(':')[0], label }))
    });
  }

  const expansion = input.tileMetrics.filter(tile => !tile.ownerName).sort((a, b) => b.opportunityScore - a.opportunityScore)[0];
  if (expansion) {
    recs.push({
      id: `expansion-${expansion.key}`,
      category: 'expansion',
      title: `Scout expansion target ${expansion.terrain} at ${expansion.x}, ${expansion.y}`,
      rationale: `This unclaimed tile has ${scoreLabel(expansion.opportunityScore)} opportunity from resources, slots, specials, and distance-adjusted exposure.`,
      expectedBenefit: 'Compounds production or staging value while keeping the target list grounded in map math.',
      risk: riskFromScore(expansion.threatScore + expansion.uncertainty * 0.5),
      confidence: confidence([expansion.resourceScore > 0, expansion.nearestOwnedDistance !== null, 1 - expansion.uncertainty / 100]),
      score: expansion.opportunityScore,
      whyNow: expansion.nearestOwnedDistance !== null ? `${expansion.nearestOwnedDistance.toFixed(1)} wrapped tiles from your nearest visible holding.` : 'No owned distance baseline is available.',
      evidence: expansion.evidence,
      verifyInGame: ['Confirm the culture-specific expansion gate.', 'Confirm fleet availability and fog conditions.', 'Check whether a closer staging base is safer.'],
      missingInformation: 'Colonization requirements and hidden fleet movements must be checked in-game.',
      sourceRefs: [{ kind: 'tile', id: expansion.key, label: `Tile ${expansion.key}` }]
    });
  }

  const bestCombat = input.reportMetrics.filter(report => report.isOutgoing && /raid|attack/i.test(report.mission)).sort((a, b) => b.lossEfficiency - a.lossEfficiency || b.lootScore - a.lootScore)[0];
  if (bestCombat) {
    recs.push({
      id: `combat-${bestCombat.id}`,
      category: 'combat',
      title: 'Exploit the best visible combat trade pattern',
      rationale: `Report ${bestCombat.id} shows a ${bestCombat.lossEfficiency.toFixed(2)} loss-efficiency ratio with ${Math.round(bestCombat.lootScore)} loot signal.`,
      expectedBenefit: 'Identify target types or commanders where your past engagements traded favorably.',
      risk: bestCombat.lossEfficiency > 1.5 ? 'medium' : 'low',
      confidence: confidence([bestCombat.lossEfficiency / 3, bestCombat.lootScore > 0, bestCombat.locationKey !== null]),
      score: Math.min(88, bestCombat.lossEfficiency * 25 + Math.max(0, bestCombat.lootScore) / 50),
      whyNow: 'Recent reports can reveal repeatable composition advantages before opponents adapt.',
      evidence: bestCombat.evidence,
      verifyInGame: ['Inspect the detailed report before repeating the matchup.', 'Check whether the opponent reinforced since this report.'],
      missingInformation: 'Ship composition details may require opening the private report detail.',
      sourceRefs: [{ kind: 'report', id: bestCombat.id, label: `Report ${bestCombat.id}` }]
    });
  }

  const spy = input.reportMetrics.filter(report => /spy/i.test(report.mission) && report.isOutgoing).sort((a, b) => b.spyScore - a.spyScore)[0];
  if (spy) {
    recs.push({
      id: `intel-${spy.id}`,
      category: 'intel',
      title: 'Use spy outcomes to narrow the next target',
      rationale: `Your best visible spy signal is report ${spy.id} with score ${Math.round(spy.spyScore)}. Surviving spy contacts are better target filters than raw tile value.`,
      expectedBenefit: 'Reduce uncertainty before spending a fleet timer on raids, attacks, or colonization.',
      risk: spy.spyScore < 0 ? 'medium' : 'low',
      confidence: confidence([Math.abs(spy.spyScore) / 20, spy.isOutgoing, spy.timeUtc !== null]),
      score: Math.min(88, 55 + Math.max(0, spy.spyScore) / 5_000),
      whyNow: 'Intel decays as opponents move resources and ships.',
      evidence: spy.evidence,
      verifyInGame: ['Open the report detail and copy the observed defenses into the plan.', 'Avoid repeating destroyed spy routes without changing timing or composition.'],
      missingInformation: 'The summary does not expose full private intel contents.',
      sourceRefs: [{ kind: 'report', id: spy.id, label: `Spy report ${spy.id}` }]
    });
  }

  const economyNeed = input.myTiles.length > 1 || input.tileMetrics.some(tile => tile.ownerName && /mining|outpost/i.test(tile.baseKind));
  if (economyNeed) {
    const resourceSpecialists = input.myTiles.filter(tile => tile.resourceScore > 0 || /mining|outpost/i.test(tile.baseKind));
    recs.push({
      id: 'economy-logistics',
      category: 'economy',
      title: 'Balance routes around specialized holdings',
      rationale: `${input.myTiles.length} visible holding(s) and ${resourceSpecialists.length} specialist site(s) mean route timing and Astra continuity can matter more than another isolated build.`,
      expectedBenefit: 'Prevent capped production, stranded resources, and garrison attrition.',
      risk: 'low',
      confidence: confidence([input.myTiles.length / 4, resourceSpecialists.length > 0]),
      score: 45 + resourceSpecialists.length * 12,
      whyNow: 'Specialized outposts only create an edge when the rest of the empire can use their output.',
      evidence: input.myTiles.slice(0, 4).map(tile => `${tile.terrain} at ${tile.key}`),
      verifyInGame: ['Check Astra at every stationed fleet.', 'Check route capacity warnings and storage caps.', 'Move surplus toward shipyards or active build queues.'],
      missingInformation: 'Exact stockpiles, queues, and route ETAs are not exposed in summary telemetry.',
      sourceRefs: input.myTiles.slice(0, 4).map(tile => ({ kind: 'tile', id: tile.key, label: `Owned tile ${tile.key}` }))
    });
  }

  const fleetPlan = input.fleetPlans[0];
  if (fleetPlan) {
    recs.push({
      id: `fleet-${fleetPlan.id}`,
      category: fleetPlan.role === 'spy' ? 'intel' : fleetPlan.role === 'raid' || fleetPlan.role === 'attack' ? 'combat' : 'economy',
      title: fleetPlan.title,
      rationale: fleetPlan.rationale,
      expectedBenefit: 'Turn strategic analysis into an actual fleet posture instead of a vague target list.',
      risk: fleetPlan.risk,
      confidence: confidence([fleetPlan.evidence.length / 4, fleetPlan.priority / 100]),
      score: Math.min(82, fleetPlan.priority * 0.75),
      whyNow: 'Fleet composition is the bottleneck between knowing the right move and being able to execute it.',
      evidence: fleetPlan.evidence,
      verifyInGame: fleetPlan.readinessChecks,
      missingInformation: 'The logs view does not expose current ship inventory, queues, or exact fleet ETAs.',
      sourceRefs: fleetPlan.evidence.map((label, index) => ({ kind: 'derived', id: `${fleetPlan.id}-${index}`, label }))
    });
  }

  const expedition = input.expeditions[0];
  if (expedition && !/completed/i.test(expedition.status)) {
    recs.push({
      id: `expedition-${expedition.id}`,
      category: 'expedition',
      title: `Evaluate expedition ${expedition.missionName}`,
      rationale: `This active expedition has ${scoreLabel(expedition.totalScore)} combined payoff, urgency, and faction relevance.`,
      expectedBenefit: 'Convert temporary world events into faction or resource advantage before contribution windows close.',
      risk: expedition.urgencyScore > 70 ? 'medium' : 'low',
      confidence: confidence([expedition.payoffScore / 100, expedition.deadlineUtc !== null, expedition.relevanceScore / 100]),
      score: Math.min(95, expedition.totalScore),
      whyNow: expedition.deadlineUtc ? `Contribution window closes ${expedition.deadlineUtc}.` : 'Expedition is visible in current map telemetry.',
      evidence: expedition.evidence,
      verifyInGame: ['Confirm contribution cost against near-term fleet and building plans.', 'Check whether your faction benefits from the expedition.'],
      missingInformation: 'Exact faction coordination and opportunity cost are outside the logs view.',
      sourceRefs: [{ kind: 'expedition', id: expedition.id, label: `Expedition ${expedition.id}` }]
    });
  }

  if (!input.reportMetrics.length) {
    recs.push({
      id: 'intel-baseline',
      category: 'intel',
      title: 'Establish a combat and spy baseline',
      rationale: 'No report metrics are cached, so the app cannot profile opponents or trade efficiency yet.',
      expectedBenefit: 'Reports unlock commander profiles, threat scoring, and combat pattern detection.',
      risk: 'low',
      confidence: 1,
      score: 30,
      whyNow: 'The strategic model is map-heavy until reports exist.',
      evidence: ['Local report cache is empty.'],
      verifyInGame: ['Run a manual sync after the next report-generating event.']
    });
  }

  return recs.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 8);
}

export function buildStrategicAnalysis(input: Input): StrategicAnalysis {
  const me = commanderName(input.session);
  const mapGeometry = deriveMapGeometry(input.manifest, input.tiles);
  const myFactions = myFactionNames(input.session, input.tiles, me);
  const reportMetrics = buildReportMetrics(input.reports, me, myFactions);
  const tileMetrics = buildTileMetrics(input.tiles, reportMetrics, me, myFactions, mapGeometry);
  const myTiles = tileMetrics.filter(tile => tile.ownerName.toLowerCase() === me);
  const commanderProfiles = buildCommanderProfiles(reportMetrics, input.reports, me, myFactions);
  const factionProfiles = buildFactionProfiles(input.tiles, reportMetrics, commanderProfiles);
  const expeditions = buildExpeditions(input.tiles, asText(input.session?.faction));
  const fleetPlans = buildFleetPlans({ myTiles, reportMetrics, commanderProfiles, tileMetrics, expeditions });
  const recs = recommendations({ tileMetrics, reportMetrics, commanderProfiles, factionProfiles, expeditions, myTiles, syncAudit: input.syncAudit, fleetPlans });
  const alerts = [
    ...(input.syncAudit?.staleMinutes && input.syncAudit.staleMinutes > 60 ? [{
      id: 'stale-sync' as const,
      severity: 'warning' as const,
      title: 'Telemetry is stale',
      detail: `Last good snapshot is ${Math.round(input.syncAudit.staleMinutes)} minutes old.`,
      evidence: ['Sync audit']
    }] : []),
    ...commanderProfiles.filter(profile => profile.relation === 'opponent' && profile.threatScore >= 70).slice(0, 3).map(profile => ({
      id: `threat-alert-${profile.name}`,
      severity: 'danger' as const,
      title: `${profile.name} is a high-threat contact`,
      detail: `${Math.round(profile.threatScore)} threat score from visible report history.`,
      evidence: profile.evidence
    })),
    ...expeditions.filter(item => item.urgencyScore >= 75 && !/completed/i.test(item.status)).slice(0, 2).map(item => ({
      id: `expedition-alert-${item.id}`,
      severity: 'info' as const,
      title: `${item.missionName} window is closing`,
      detail: item.deadlineUtc ? `Deadline ${item.deadlineUtc}.` : 'Visible active expedition.',
      evidence: item.evidence
    }))
  ];
  return {
    posture: 'balanced',
    generatedAt: new Date().toISOString(),
    worldId: input.worldId ?? null,
    mapGeometry,
    commanderName: me,
    myTiles,
    tileMetrics,
    reportMetrics,
    commanderProfiles,
    factionProfiles,
    expeditions,
    fleetPlans,
    recommendations: recs,
    alerts,
    changes: []
  };
}
