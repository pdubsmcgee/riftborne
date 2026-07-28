import type { MapTile, Recommendation, ReportSummary, Session, WorldSummary } from '../shared/types.js';
import { buildStrategicAnalysis } from './strategy.js';

export { wrappedDistance } from './strategy-utils.js';

export function buildRecommendations(input: {
  session: Session | null;
  summary: WorldSummary | null;
  reports: ReportSummary[];
  tiles: MapTile[];
}): Recommendation[] {
  return buildStrategicAnalysis(input).recommendations;
}
