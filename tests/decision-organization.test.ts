import { describe, expect, it } from 'vitest';
import { buildBridgePlan, buildDecisionCards, buildResourcePlan } from '../server/decision-tools.js';
import { assessDeal, buildBorrowerProfiles, buildOrganizationState, dailyInterest, normalizeLoanStatus } from '../server/organization.js';
import type { LoanRecord, StrategicAnalysis } from '../shared/types.js';

function baseAnalysis(): StrategicAnalysis {
  return {
    posture: 'balanced',
    generatedAt: '2026-07-25T00:00:00Z',
    worldId: 'world:test',
    mapGeometry: { minX: -49, maxX: 50, minY: -49, maxY: 50, width: 100, height: 100, source: 'manifest' },
    commanderName: 'pilot',
    myTiles: [{ key: '0,0', x: 0, y: 0, terrain: 'Terran World', ownerName: 'pilot', faction: 'Terran Union', baseKind: 'Colony', resourceScore: 0, slotScore: 0, specialScore: 0, threatScore: 0, opportunityScore: 0, uncertainty: 0, nearestOwnedDistance: 0, nearestOccupiedDistance: 0, nearestFriendlyFactionDistance: 0, nearestHostileFactionDistance: 12, evidence: [] }],
    tileMetrics: [
      { key: '0,0', x: 0, y: 0, terrain: 'Terran World', ownerName: 'pilot', faction: 'Terran Union', baseKind: 'Colony', resourceScore: 0, slotScore: 0, specialScore: 0, threatScore: 0, opportunityScore: 0, uncertainty: 0, nearestOwnedDistance: 0, nearestOccupiedDistance: 0, nearestFriendlyFactionDistance: 0, nearestHostileFactionDistance: 12, evidence: [] },
      { key: '4,1', x: 4, y: 1, terrain: 'DeuteriumAsteroid', ownerName: '', faction: '', baseKind: '', resourceScore: 8, slotScore: 20, specialScore: 0, threatScore: 20, opportunityScore: 12, uncertainty: 18, nearestOwnedDistance: 4, nearestOccupiedDistance: 4, nearestFriendlyFactionDistance: 3, nearestHostileFactionDistance: 14, evidence: ['Terrain DeuteriumAsteroid', 'Unclaimed', 'Friendly faction support 3.0 away'] },
      { key: '5,1', x: 5, y: 1, terrain: 'CrystalBelt', ownerName: '', faction: '', baseKind: '', resourceScore: 100, slotScore: 95, specialScore: 0, threatScore: 15, opportunityScore: 100, uncertainty: 20, nearestOwnedDistance: 5, nearestOccupiedDistance: 5, nearestFriendlyFactionDistance: 4, nearestHostileFactionDistance: 16, evidence: ['Terrain CrystalBelt', 'Resource value 100/100', 'Unclaimed'] },
      { key: '9,0', x: 9, y: 0, terrain: 'Energy Spire', ownerName: '', faction: '', baseKind: '', resourceScore: 70, slotScore: 40, specialScore: 20, threatScore: 10, opportunityScore: 80, uncertainty: 20, nearestOwnedDistance: 9, nearestOccupiedDistance: 2, nearestFriendlyFactionDistance: 1, nearestHostileFactionDistance: 22, evidence: ['Friendly faction support 1.0 away', 'Unclaimed'] },
      { key: '-9,0', x: -9, y: 0, terrain: 'Energy Spire', ownerName: '', faction: '', baseKind: '', resourceScore: 70, slotScore: 40, specialScore: 20, threatScore: 45, opportunityScore: 85, uncertainty: 20, nearestOwnedDistance: 9, nearestOccupiedDistance: 1, nearestFriendlyFactionDistance: 20, nearestHostileFactionDistance: 3, evidence: ['Non-faction pressure 3.0 away', 'Unclaimed'] }
    ],
    reportMetrics: [],
    commanderProfiles: [
      { name: 'Ally', faction: 'Terran Union', relation: 'ally', reports: 1, hostileReports: 0, outgoingReports: 0, powerSeen: 0, powerLost: 0, lootNet: 0, spyScore: 0, threatScore: 0, lastSeenUtc: null, evidence: ['Report ally'] },
      { name: 'BadRisk', faction: 'Nomads', relation: 'opponent', reports: 4, hostileReports: 2, outgoingReports: 0, powerSeen: 900, powerLost: 700, lootNet: 0, spyScore: 0, threatScore: 80, lastSeenUtc: '2026-07-25T00:00:00Z', evidence: ['Report hostile'] }
    ],
    factionProfiles: [],
    expeditions: [],
    fleetPlans: [],
    recommendations: [],
    alerts: [],
    changes: []
  };
}

function loan(partial: Partial<LoanRecord>): LoanRecord {
  return {
    id: partial.id ?? 'l1',
    borrower: partial.borrower ?? 'Borrower',
    faction: partial.faction ?? '',
    principalNoctmarks: partial.principalNoctmarks ?? 1000,
    outstandingNoctmarks: partial.outstandingNoctmarks ?? 1000,
    dailyRatePercent: partial.dailyRatePercent ?? 1.5,
    startDate: partial.startDate ?? '2026-07-20',
    maturityDate: partial.maturityDate ?? '2026-07-27',
    collateral: partial.collateral ?? '',
    notes: partial.notes ?? '',
    status: partial.status ?? 'active',
    purpose: partial.purpose ?? 'expansion',
    createdAt: partial.createdAt ?? '2026-07-20T00:00:00Z',
    updatedAt: partial.updatedAt ?? '2026-07-20T00:00:00Z'
  };
}

describe('decision and organization tools', () => {
  it('prefers explicit DeuteriumAsteroid over generic high-value crystal for deuterium', () => {
    const plan = buildResourcePlan({ analysis: baseAnalysis(), worldId: 'world:test', resource: 'deuterium' });
    expect(plan.bestNow?.key).toBe('4,1');
    expect(plan.bestNow?.terrain).toBe('DeuteriumAsteroid');
  });

  it('promotes Terran bridge support and penalizes hostile pressure', () => {
    const plan = buildBridgePlan({ analysis: baseAnalysis(), worldId: 'world:test' });
    const friendly = plan.candidates.find(candidate => candidate.key === '9,0')!;
    const hostile = plan.candidates.find(candidate => candidate.key === '-9,0')!;
    expect(friendly.score).toBeGreaterThan(hostile.score);
    expect(hostile.labels).toContain('hostile pressure');
  });

  it('creates decision cards with facts, calculations, inference, and missing data', () => {
    const analysis = baseAnalysis();
    const bridgePlan = buildBridgePlan({ analysis, worldId: 'world:test' });
    const resourcePlan = buildResourcePlan({ analysis, worldId: 'world:test', resource: 'deuterium' });
    const cards = buildDecisionCards({ analysis, worldId: 'world:test', bridgePlan, resourcePlans: [resourcePlan] });
    expect(cards[0].confirmedFacts.length).toBeGreaterThan(0);
    expect(cards[0].calculatedValues.length).toBeGreaterThan(0);
    expect(cards[0].inferences.length).toBeGreaterThan(0);
    expect(cards[0].missingData.join(' ')).toMatch(/Hidden|reservations/i);
  });

  it('uses v11.73 loan interest rule with ceiling', () => {
    expect(dailyInterest(12_000, 1.8)).toBe(216);
    expect(dailyInterest(101, 1)).toBe(2);
  });

  it('updates loan status when maturity passes', () => {
    expect(normalizeLoanStatus(loan({ maturityDate: '2026-07-01' }), new Date('2026-07-25'))).toBe('late');
    expect(normalizeLoanStatus(loan({ outstandingNoctmarks: 0 }), new Date('2026-07-25'))).toBe('repaid');
  });

  it('does not treat missing borrower history as safe', () => {
    const borrowers = buildBorrowerProfiles({ analysis: baseAnalysis(), loans: [loan({ borrower: 'UnknownNew' })] });
    const unknown = borrowers.find(item => item.name === 'UnknownNew')!;
    const ally = borrowers.find(item => item.name === 'Ally')!;
    expect(unknown.riskLabel).not.toBe('safe ally');
    expect(unknown.riskScore).toBeGreaterThan(ally.riskScore);
  });

  it('assesses deal break-even and risk recommendation', () => {
    const borrower = buildBorrowerProfiles({ analysis: baseAnalysis(), loans: [loan({ borrower: 'BadRisk', faction: 'Nomads' })] }).find(item => item.name === 'BadRisk')!;
    const assessment = assessDeal({ borrower, principalNoctmarks: 1000, dailyRatePercent: 1, startDate: '2026-07-20', maturityDate: '2026-07-25' });
    expect(assessment.dailyInterest).toBe(10);
    expect(assessment.breakEvenRequiredProfit).toBe(1050);
    expect(assessment.recommendation).toMatch(/Do not lend|too low|collateral/i);
  });

  it('builds organization business cards from manual ledger state', () => {
    const state = buildOrganizationState({
      worldId: 'world:test',
      analysis: baseAnalysis(),
      account: { id: 'default', name: 'Ledger', capitalNoctmarks: 5000, reserveNoctmarks: 1000, goal: 'profit-engine', updatedAt: '2026-07-25T00:00:00Z' },
      loans: [loan({ borrower: 'LateGuy', maturityDate: '2026-07-01' })],
      repayments: [],
      contracts: []
    });
    expect(state.businessCards[0].title).toMatch(/Collect|renegotiate/i);
    expect(state.telemetryWarning).toMatch(/manual ledger/i);
  });
});
