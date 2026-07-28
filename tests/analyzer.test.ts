import { describe, expect, it } from 'vitest';
import { buildRecommendations, wrappedDistance } from '../server/analyzer.js';

describe('field analysis', () => {
  it('uses the shortest wrapped distance', () => expect(wrappedDistance({ x: -149, y: 0 }, { x: 150, y: 0 }, 300, 300)).toBe(1));
  it('ranks a visible expansion candidate without pretending hidden data is known', () => {
    const recommendations = buildRecommendations({
      session: { authenticated: true, username: 'Pilot' }, summary: null, reports: [],
      tiles: [{ x: 0, y: 0, ownerName: 'Pilot', tileType: 'Terran World' }, { x: 3, y: 2, tileType: 'Energy Spire', astraBonus: 2 }]
    });
    expect(recommendations.some(item => item.category === 'expansion' && item.title.includes('3, 2'))).toBe(true);
    expect(recommendations.find(item => item.category === 'expansion')?.verifyInGame?.join(' ')).toMatch(/Confirm/);
  });
});
