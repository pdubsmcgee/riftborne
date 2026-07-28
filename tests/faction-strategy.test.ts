import { describe, expect, it } from 'vitest';
import { buildFactionStrategy } from '../server/faction-strategy.js';
import type { StrategicAnalysis } from '../shared/types.js';

function analysis(): StrategicAnalysis {
  return {
    posture: 'balanced',
    generatedAt: '2026-07-22T00:00:00Z',
    worldId: 'world:a',
    mapGeometry: { minX: -49, maxX: 50, minY: -49, maxY: 50, width: 100, height: 100, source: 'manifest' },
    commanderName: 'pilot',
    myTiles: [{ key: '0,0', x: 0, y: 0, terrain: 'Terran World', ownerName: 'pilot', faction: 'Terran Union', baseKind: 'Colony', resourceScore: 0, slotScore: 0, specialScore: 0, threatScore: 0, opportunityScore: 0, uncertainty: 0, nearestOwnedDistance: 0, nearestOccupiedDistance: 0, evidence: [] }],
    tileMetrics: [
      { key: '0,0', x: 0, y: 0, terrain: 'Terran World', ownerName: 'pilot', faction: 'Terran Union', baseKind: 'Colony', resourceScore: 0, slotScore: 0, specialScore: 0, threatScore: 0, opportunityScore: 0, uncertainty: 0, nearestOwnedDistance: 0, nearestOccupiedDistance: 0, evidence: [] },
      { key: '8,0', x: 8, y: 0, terrain: 'Energy Spire', ownerName: '', faction: '', baseKind: '', resourceScore: 80, slotScore: 30, specialScore: 25, threatScore: 20, opportunityScore: 80, uncertainty: 20, nearestOwnedDistance: 8, nearestOccupiedDistance: 2, nearestFriendlyFactionDistance: 2, nearestHostileFactionDistance: 20, factionSupportScore: 16, evidence: ['Friendly faction support 2.0 away'] }
    ],
    reportMetrics: [],
    commanderProfiles: [{ name: 'NomadBoss', faction: 'Nomads', relation: 'opponent', reports: 4, hostileReports: 2, outgoingReports: 0, powerSeen: 500, powerLost: 0, lootNet: 0, spyScore: 0, threatScore: 80, lastSeenUtc: '2026-07-22T00:00:00Z', evidence: ['Report r1'] }],
    factionProfiles: [{ faction: 'Terran Union', commanders: 2, occupiedTiles: 4, reports: 0, hostileReports: 0, threatScore: 0, lastSeenUtc: null }, { faction: 'Nomads', commanders: 1, occupiedTiles: 5, reports: 4, hostileReports: 2, threatScore: 80, lastSeenUtc: '2026-07-22T00:00:00Z' }],
    expeditions: [],
    fleetPlans: [],
    recommendations: [],
    alerts: [],
    changes: []
  };
}

describe('faction strategy', () => {
  it('recommends faction coordination around supported expansion and visible opponents', () => {
    const state = buildFactionStrategy({
      world: { id: 'world:a', label: 'A', identitySource: 'telemetry', firstSeenAt: '2026-07-22', lastSeenAt: '2026-07-22', active: true },
      analysis: analysis(),
      events: [],
      forecasts: []
    });
    expect(state.myFaction).toBe('Terran Union');
    expect(state.actions.some(action => action.category === 'expand' && action.targetKey === '8,0')).toBe(true);
    expect(state.actions.some(action => action.category === 'intel' && /NomadBoss/.test(action.title))).toBe(true);
    expect(state.note).toMatch(/hidden fleets/i);
  });
});
