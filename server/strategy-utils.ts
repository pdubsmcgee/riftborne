import type { MapGeometry, MapManifest, MapTile, ReportSummary } from '../shared/types.js';

export function asText(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export function asNumber(value: unknown) {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function ownerName(tile: MapTile) {
  return asText(tile.ownerName || tile.owner || tile.playerName || tile.commanderName || tile.base?.ownerName);
}

export function factionName(tile: MapTile) {
  return asText(tile.faction || tile.base?.faction || tile.base?.factionKey);
}

export function terrainName(tile: MapTile) {
  return asText(tile.tileType || tile.type || tile.terrain || tile.name || tile.displayedTileType) || 'Unknown';
}

export function baseKind(tile: MapTile) {
  return asText(tile.base?.kind || tile.specialSiteKind || (tile.isMiningOutpostSite ? 'MiningOutpostSite' : ''));
}

export function reportPeople(report: ReportSummary) {
  return [report.attackerName, report.defenderName, report.attacker, report.defender, report.sourcePlayerName, report.targetPlayerName].map(asText).filter(Boolean);
}

export function reportMission(report: ReportSummary) {
  return asText(report.mission || report.type || report.missionType || report.title) || 'Report';
}

export function reportLocationKey(report: ReportSummary) {
  const location = report.location && typeof report.location === 'object' ? report.location as Record<string, unknown> : {};
  const x = Number(report.x ?? report.targetX ?? report.defenderX ?? location.x);
  const y = Number(report.y ?? report.targetY ?? report.defenderY ?? location.y);
  return Number.isFinite(x) && Number.isFinite(y) ? `${x},${y}` : null;
}

export function deriveMapGeometry(manifest: MapManifest | null | undefined, tiles: MapTile[] = []): MapGeometry {
  const manifestMinX = Number(manifest?.minX);
  const manifestMaxX = Number(manifest?.maxX);
  const manifestMinY = Number(manifest?.minY);
  const manifestMaxY = Number(manifest?.maxY);
  if ([manifestMinX, manifestMaxX, manifestMinY, manifestMaxY].every(Number.isFinite)) {
    return {
      minX: manifestMinX,
      maxX: manifestMaxX,
      minY: manifestMinY,
      maxY: manifestMaxY,
      width: manifestMaxX - manifestMinX + 1,
      height: manifestMaxY - manifestMinY + 1,
      source: 'manifest'
    };
  }
  const manifestWidth = Number(manifest?.width);
  const manifestHeight = Number(manifest?.height);
  if (Number.isFinite(manifestWidth) && Number.isFinite(manifestHeight) && tiles.length) {
    const minX = Math.min(...tiles.map(tile => tile.x));
    const minY = Math.min(...tiles.map(tile => tile.y));
    return { minX, maxX: minX + manifestWidth - 1, minY, maxY: minY + manifestHeight - 1, width: manifestWidth, height: manifestHeight, source: 'manifest' };
  }
  if (tiles.length) {
    const minX = Math.min(...tiles.map(tile => tile.x));
    const maxX = Math.max(...tiles.map(tile => tile.x));
    const minY = Math.min(...tiles.map(tile => tile.y));
    const maxY = Math.max(...tiles.map(tile => tile.y));
    return { minX, maxX, minY, maxY, width: maxX - minX + 1, height: maxY - minY + 1, source: 'tiles' };
  }
  return { minX: -49, maxX: 50, minY: -49, maxY: 50, width: 100, height: 100, source: 'fallback' };
}

export function wrappedDistance(a: { x: number; y: number }, b: { x: number; y: number }, geometryOrWidth: MapGeometry | number = deriveMapGeometry(null), height?: number) {
  const geometry = typeof geometryOrWidth === 'number'
    ? { minX: 0, maxX: geometryOrWidth - 1, minY: 0, maxY: (height ?? geometryOrWidth) - 1, width: geometryOrWidth, height: height ?? geometryOrWidth, source: 'fallback' as const }
    : geometryOrWidth;
  const dxRaw = Math.abs(a.x - b.x);
  const dyRaw = Math.abs(a.y - b.y);
  const dx = Math.min(dxRaw, geometry.width - dxRaw);
  const dy = Math.min(dyRaw, geometry.height - dyRaw);
  return Math.sqrt(dx * dx + dy * dy);
}

export function riskFromScore(score: number): 'low' | 'medium' | 'high' {
  if (score >= 70) return 'high';
  if (score >= 35) return 'medium';
  return 'low';
}

export function confidence(parts: Array<boolean | number>) {
  const values = parts.map(part => typeof part === 'number' ? clamp(part) : (part ? 1 : 0));
  if (!values.length) return 0.5;
  return clamp(0.35 + values.reduce((sum, value) => sum + value, 0) / values.length * 0.6);
}

export function resourceScore(tile: MapTile) {
  const bonus =
    asNumber(tile.vulkronBonus) + asNumber(tile.aureliteBonus) + asNumber(tile.deuteriumBonus) + asNumber(tile.astraBonus);
  const multipliers =
    asNumber(tile.vulkronMultiplier) + asNumber(tile.aureliteMultiplier) + asNumber(tile.deuteriumMultiplier) + asNumber(tile.astraMultiplier);
  const defense = asNumber(tile.defenseBonus) + asNumber(tile.defenseMultiplier) * 0.5;
  return bonus * 12 + multipliers * 18 + defense * 5;
}

export function slotScore(tile: MapTile) {
  return asNumber(tile.colonyBuildingSlots) * 5 + asNumber(tile.outpostBuildingSlots) * 3;
}

export function specialScore(tile: MapTile) {
  let score = 0;
  const text = `${terrainName(tile)} ${asText(tile.specialEffectName)} ${asText(tile.featureName)} ${baseKind(tile)}`.toLowerCase();
  if (text.includes('spire') || text.includes('nexus') || text.includes('reactor')) score += 28;
  if (text.includes('rare') || text.includes('mining')) score += 18;
  if (text.includes('keystone') || asNumber(tile.keystoneTier) > 0) score += 18 + asNumber(tile.keystoneTier) * 4;
  if (text.includes('black hole')) score -= 30;
  if (tile.expedition) score += 12;
  return score;
}

export function scoreLabel(score: number) {
  return `${Math.round(score)}/100`;
}
