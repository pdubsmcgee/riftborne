import { describe, expect, it } from 'vitest';
import type { MapGeometry } from '../shared/types.js';
import { deriveMapGeometry, wrappedDistance } from '../server/strategy-utils.js';

const current: MapGeometry = { minX: -49, maxX: 50, minY: -49, maxY: 50, width: 100, height: 100, source: 'manifest' };

describe('map geometry and toroidal wrapping', () => {
  it('-49 to 50 is one wrapped unit apart on the current map', () => {
    expect(wrappedDistance({ x: -49, y: 0 }, { x: 50, y: 0 }, current)).toBe(1);
  });

  it('wraps on X', () => {
    expect(wrappedDistance({ x: -48, y: 10 }, { x: 50, y: 10 }, current)).toBe(2);
  });

  it('wraps on Y', () => {
    expect(wrappedDistance({ x: 10, y: -49 }, { x: 10, y: 50 }, current)).toBe(1);
  });

  it('wraps diagonally', () => {
    expect(wrappedDistance({ x: -49, y: -49 }, { x: 50, y: 50 }, current)).toBeCloseTo(Math.sqrt(2));
  });

  it('keeps interior distances nonwrapped', () => {
    expect(wrappedDistance({ x: -10, y: -10 }, { x: -7, y: -6 }, current)).toBe(5);
  });

  it('derives future map sizes from manifests', () => {
    const future = deriveMapGeometry({ minX: -9, maxX: 10, minY: -4, maxY: 5, chunks: [] });
    expect(future.width).toBe(20);
    expect(future.height).toBe(10);
    expect(wrappedDistance({ x: -9, y: -4 }, { x: 10, y: 5 }, future)).toBeCloseTo(Math.sqrt(2));
  });
});
