import { describe, expect, it } from 'vitest';
import { buildStrategicAnalysis } from '../server/strategy.js';

describe('strategic analysis', () => {
  it('scores expansion from resources, slots, specials, distance, and exposure', () => {
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot' },
      summary: null,
      reports: [],
      tiles: [
        { x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Astraean', kind: 'Colony' } },
        { x: 5, y: 0, tileType: 'Energy Spire', astraBonus: 3, astraMultiplier: 2, colonyBuildingSlots: 8, specialEffectName: 'Energy Spire' },
        { x: 60, y: 0, tileType: 'Empty Space', outpostBuildingSlots: 5 }
      ]
    });
    expect(analysis.tileMetrics.find(tile => tile.key === '5,0')?.opportunityScore).toBeGreaterThan(analysis.tileMetrics.find(tile => tile.key === '60,0')!.opportunityScore);
    expect(analysis.recommendations[0].category).toBe('expansion');
    expect(analysis.recommendations[0].verifyInGame?.join(' ')).toMatch(/Spire|fleet|fog/i);
  });

  it('profiles repeated hostile commanders without claiming hidden state', () => {
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot' },
      summary: null,
      reports: [
        { id: 'r1', timeUtc: '2026-07-20T00:00:00Z', mission: 'Raid', attackerName: 'Blaze', defenderName: 'pilot', attackerPower: 120, defenderPower: 60, attackerPowerLost: 10, defenderPowerLost: 40 },
        { id: 'r2', timeUtc: '2026-07-20T01:00:00Z', mission: 'Spy', attackerName: 'Blaze', defenderName: 'pilot', attackerPower: 30, defenderPower: 10, spyScore: 8 }
      ],
      tiles: [{ x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Astraean' } }]
    });
    const blaze = analysis.commanderProfiles.find(profile => profile.name === 'Blaze');
    expect(blaze?.hostileReports).toBe(2);
    expect(blaze?.threatScore).toBeGreaterThan(0);
    expect(analysis.recommendations.find(rec => rec.category === 'threat')?.missingInformation).toMatch(/Hidden fleets/);
  });

  it('ranks active expeditions by urgency, payoff, and faction relevance', () => {
    const deadline = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot', faction: 'Astraean' },
      summary: null,
      reports: [],
      tiles: [
        { x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Astraean' } },
        { x: 8, y: 3, tileType: 'Ancient Site', expedition: { id: 'e1', faction: 'Astraean', status: 'active', missionName: 'Relic Push', contributionClosesAtUtc: deadline, deliveredResources: { astra: 900 }, resourceBonusPercents: { astra: 12 } } }
      ]
    });
    expect(analysis.expeditions[0].id).toBe('e1');
    expect(analysis.recommendations.some(rec => rec.category === 'expedition')).toBe(true);
  });

  it('treats same-faction scouts as allied intel instead of threats', () => {
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot', faction: 'Astraean' },
      summary: null,
      reports: [
        { id: 'ally-spy', timeUtc: '2026-07-20T00:00:00Z', mission: 'Spy', attackerName: 'Ragnar', defenderName: 'Firen', attackerFaction: 'Terran Union', defenderFaction: 'Eclipse Dominion', spyScore: 5000 },
        { id: 'enemy-spy', timeUtc: '2026-07-20T01:00:00Z', mission: 'Spy', attackerName: 'Firen', defenderName: 'pilot', attackerFaction: 'Eclipse Dominion', defenderFaction: 'Terran Union', spyScore: 100 }
      ],
      tiles: [{ x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Terran Union', factionKey: 'TerranUnion', culture: 'Astraean' } }]
    });
    const ragnar = analysis.commanderProfiles.find(profile => profile.name === 'Ragnar');
    const firen = analysis.commanderProfiles.find(profile => profile.name === 'Firen');
    expect(ragnar?.relation).toBe('ally');
    expect(ragnar?.threatScore).toBe(0);
    expect(firen?.relation).toBe('opponent');
    expect(firen?.threatScore).toBeGreaterThan(0);
    expect(analysis.recommendations.find(rec => rec.category === 'threat')?.title).toMatch(/Firen/);
  });

  it('produces fleet posture plans with readiness checks', () => {
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot' },
      summary: null,
      reports: [{ id: 'r1', mission: 'Raid', attackerName: 'Blaze', defenderName: 'pilot', attackerFaction: 'Eclipse Dominion', defenderFaction: 'Terran Union', attackerPower: 200 }],
      tiles: [
        { x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Terran Union' } },
        { x: 4, y: 2, tileType: 'Energy Spire', astraBonus: 3, colonyBuildingSlots: 20 }
      ]
    });
    expect(analysis.fleetPlans.length).toBeGreaterThan(0);
    expect(analysis.fleetPlans[0].composition.length).toBeGreaterThan(0);
    expect(analysis.fleetPlans.flatMap(plan => plan.readinessChecks).join(' ')).toMatch(/Astra|fleet|power|route|report/i);
    expect(analysis.recommendations.some(rec => rec.id.startsWith('fleet-'))).toBe(true);
  });

  it('favors expansion closer to same-faction support over hostile clusters', () => {
    const analysis = buildStrategicAnalysis({
      session: { authenticated: true, username: 'pilot', faction: 'Terran Union' },
      summary: null,
      reports: [],
      tiles: [
        { x: 0, y: 0, tileType: 'Terran World', base: { ownerName: 'pilot', faction: 'Terran Union' } },
        { x: 8, y: 0, tileType: 'Terran World', base: { ownerName: 'Ally', faction: 'Terran Union' } },
        { x: 9, y: 0, tileType: 'Energy Spire', astraBonus: 2, colonyBuildingSlots: 12 },
        { x: -8, y: 0, tileType: 'Terran World', base: { ownerName: 'Nomad', faction: 'Nomads' } },
        { x: -9, y: 0, tileType: 'Energy Spire', astraBonus: 2, colonyBuildingSlots: 12 }
      ]
    });
    const friendly = analysis.tileMetrics.find(tile => tile.key === '9,0')!;
    const hostile = analysis.tileMetrics.find(tile => tile.key === '-9,0')!;
    expect(friendly.opportunityScore).toBeGreaterThan(hostile.opportunityScore);
    expect(friendly.evidence.join(' ')).toMatch(/Friendly faction support/);
    expect(hostile.evidence.join(' ')).toMatch(/Non-faction pressure/);
  });
});
