import type { CapabilityItem, CapabilityModel, MapTile, ReportDetail, ReportSummary, SchemaAudit, Session, WorldSummary } from '../shared/types.js';

type SourceBundle = {
  worldId: string | null;
  session: Session | null;
  summaryMe: WorldSummary | null;
  summaryWorld: WorldSummary | null;
  status: WorldSummary | null;
  reports: ReportSummary[];
  reportDetails: ReportDetail[];
  tiles: MapTile[];
  generatedAt?: string;
};

const endpointLabels: Record<string, string> = {
  session: '/api/session',
  summaryMe: '/api/summary?scope=me',
  summaryWorld: '/api/summary?scope=world',
  status: '/api/summary?status=1',
  reports: '/api/reports',
  reportDetails: '/api/report',
  tiles: '/api/map/chunk'
};

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function collectKeys(value: unknown, depth = 0, prefix = ''): string[] {
  if (depth > 2) return [];
  const object = Array.isArray(value) ? value.find(isObject) : value;
  if (!isObject(object)) return [];
  return Object.keys(object).flatMap(key => {
    const path = prefix ? `${prefix}.${key}` : key;
    return [path, ...collectKeys(object[key], depth + 1, path)];
  });
}

function sourceValues(bundle: SourceBundle) {
  return {
    session: bundle.session,
    summaryMe: bundle.summaryMe,
    summaryWorld: bundle.summaryWorld,
    status: bundle.status,
    reports: bundle.reports,
    reportDetails: bundle.reportDetails,
    tiles: bundle.tiles
  } satisfies Record<string, unknown>;
}

function findFields(bundle: SourceBundle, patterns: RegExp[]) {
  const matches: Array<{ source: string; field: string }> = [];
  const sources = sourceValues(bundle);
  for (const [source, value] of Object.entries(sources)) {
    for (const field of collectKeys(value)) if (patterns.some(pattern => pattern.test(field))) matches.push({ source, field });
  }
  const seen = new Set<string>();
  return matches.filter(match => {
    const key = `${match.source}:${match.field}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function item(bundle: SourceBundle, key: string, label: string, patterns: RegExp[], notes: string): CapabilityItem {
  const matches = findFields(bundle, patterns);
  const first = matches[0];
  return {
    key,
    label,
    exposed: matches.length > 0,
    source: matches.length > 0 ? 'telemetry' : 'not-exposed',
    endpoint: first ? endpointLabels[first.source] : undefined,
    fields: matches.map(match => match.field).slice(0, 12),
    notes: matches.length > 0 ? notes : `Not exposed by current telemetry. ${notes}`,
    lastObservedAt: matches.length > 0 ? (bundle.generatedAt ?? new Date().toISOString()) : null
  };
}

export function buildCapabilityModel(bundle: SourceBundle): CapabilityModel {
  const generatedAt = bundle.generatedAt ?? new Date().toISOString();
  const withTime = { ...bundle, generatedAt };
  const items: CapabilityItem[] = [
    item(withTime, 'currentResources', 'Current resources', [/resource/i, /stockpile/i, /inventory/i], 'Required for resource ETA and affordability forecasts.'),
    item(withTime, 'storageCapacities', 'Storage capacities', [/capacity/i, /storage/i], 'Required for capacity alerts and waste forecasting.'),
    item(withTime, 'productionRates', 'Production rates', [/production/i, /perHour/i, /rate/i], 'Required for time-to-full and build affordability forecasts.'),
    item(withTime, 'colonyState', 'Colony state', [/base/i, /colony/i, /outpost/i, /owner/i], 'Map ownership and base state can support expansion and threat analysis.'),
    item(withTime, 'currentFleets', 'Current fleets', [/fleet/i, /shipInventory/i, /ships/i], 'Required for exact fleet planner outputs.'),
    item(withTime, 'incomingMovements', 'Incoming movements', [/incoming/i, /arriving/i, /hostileMovement/i], 'Required for urgent attack/raid/spy launch alerts.'),
    item(withTime, 'outgoingMovements', 'Outgoing movements', [/outgoing/i, /departure/i, /movement/i], 'Required for launch queue and route collision analysis.'),
    item(withTime, 'arrivalTimes', 'Arrival times', [/arrival/i, /eta/i, /arrivesAt/i], 'Required for ETA-change alerts.'),
    item(withTime, 'constructionQueues', 'Construction queues', [/construction/i, /buildQueue/i, /buildingQueue/i], 'Required for build-stall forecasts.'),
    item(withTime, 'trainingQueues', 'Training queues', [/training/i, /shipyard/i, /trainQueue/i], 'Required for training-stall forecasts.'),
    item(withTime, 'astraUpkeep', 'Astra upkeep', [/astra.*upkeep/i, /upkeep/i, /starvation/i], 'Required for Astra deficit and fleet starvation alerts.'),
    item(withTime, 'tradeRoutes', 'Trade routes', [/route/i, /shipment/i, /delivery/i], 'Required for logistics bottleneck analysis.'),
    item(withTime, 'loanMarketState', 'Loan or market state', [/loan/i, /market/i, /order/i, /price/i], 'Required for market/loan advice.'),
    item(withTime, 'valorVisions', 'Current Valor and Visions', [/valor/i, /vision/i], 'Required for Keystone/victory pacing advice.'),
    item(withTime, 'reportDetails', 'Report details', [/detail/i, /combat/i, /casualt/i, /loot/i], 'Required for deeper combat parsing.'),
    item(withTime, 'shipCompositions', 'Ship compositions', [/composition/i, /hull/i, /light/i, /heavy/i, /ship/i], 'Required for exact counters and fleet composition math.'),
    item(withTime, 'spyIntelligence', 'Spy intelligence', [/spy/i, /intelligence/i, /spyScore/i], 'Required for spy target timelines and intel confidence.')
  ];
  return { generatedAt, worldId: bundle.worldId, items };
}

export function buildSchemaAudit(bundle: SourceBundle): SchemaAudit {
  const endpoints = Object.entries(sourceValues(bundle)).map(([source, value]) => {
    const keys = collectKeys(value);
    return {
      endpoint: endpointLabels[source],
      observed: Array.isArray(value) ? value.length > 0 : Boolean(value),
      topLevelKeys: [...new Set(keys.filter(key => !key.includes('.')))].sort(),
      nestedKeys: [...new Set(keys.filter(key => key.includes('.')))].sort().slice(0, 100),
      notes: ['Keys only; values are intentionally omitted to avoid exposing private telemetry.']
    };
  });
  return { generatedAt: bundle.generatedAt ?? new Date().toISOString(), worldId: bundle.worldId, endpoints };
}
