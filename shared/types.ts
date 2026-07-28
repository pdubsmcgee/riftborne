export type JsonObject = Record<string, unknown>;

export interface Session {
  authenticated: boolean;
  username?: string;
  displayName?: string;
  playerId?: string | number;
  faction?: string;
  operator?: boolean;
  [key: string]: unknown;
}

export interface WorldSummary extends JsonObject {
  generatedAtUtc?: string;
  worldStartedAtUtc?: string;
  latestReportTimeUtc?: string;
}

export interface ReportSummary extends JsonObject {
  id: string | number;
  timeUtc?: string;
  type?: string;
  mission?: string;
  missionType?: string;
  attackerName?: string;
  defenderName?: string;
  attackerFaction?: string;
  defenderFaction?: string;
  outcome?: string;
  attackerPower?: number;
  defenderPower?: number;
  attackerPowerLost?: number;
  defenderPowerLost?: number;
  shipsDestroyed?: number;
  resourcesStolenTotal?: number;
  spyScore?: number;
  visibility?: string;
  location?: JsonObject;
}

export interface ReportDetail extends JsonObject {
  id?: string | number;
  timeUtc?: string;
}

export interface MapTile extends JsonObject {
  x: number;
  y: number;
  type?: string;
  tileType?: string;
  ownerName?: string;
  owner?: string;
  faction?: string;
  name?: string;
  bonuses?: Record<string, number>;
  base?: {
    name?: string;
    ownerName?: string;
    faction?: string;
    factionKey?: string;
    culture?: string;
    kind?: string;
    [key: string]: unknown;
  };
  expedition?: {
    id?: string | number;
    faction?: string;
    region?: string;
    status?: string;
    missionKind?: string;
    missionName?: string;
    spawnedAtUtc?: string;
    choiceDeadlineUtc?: string;
    contributionClosesAtUtc?: string;
    deliveredResources?: Record<string, number>;
    resourceBonusPercents?: Record<string, number>;
    donatedShipPower?: number;
    donatedNoctmarks?: number;
    completedAtUtc?: string;
    completionSummary?: string;
    [key: string]: unknown;
  };
}

export interface MapManifest extends JsonObject {
  chunks?: Array<{ x: number; y: number; [key: string]: unknown }>;
  width?: number;
  height?: number;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}

export interface MapGeometry {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  width: number;
  height: number;
  source: 'manifest' | 'tiles' | 'fallback';
}

export interface MapChunk extends JsonObject {
  x?: number;
  y?: number;
  tiles: MapTile[];
}

export interface Medal extends JsonObject {
  id?: string | number;
  title?: string;
  playerName?: string;
  timeUtc?: string;
}

export interface KnowledgeFact {
  id: number;
  topic: string;
  title: string;
  body: string;
  version: string;
  authority: number;
  confidence: number;
  effectiveAt: string;
  sourceTitle: string;
  sourceUrl: string;
  superseded: boolean;
}

export interface Recommendation {
  id: string;
  category: 'threat' | 'expansion' | 'combat' | 'economy' | 'intel' | 'expedition';
  title: string;
  rationale: string;
  expectedBenefit: string;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  evidence: string[];
  missingInformation?: string;
  score?: number;
  whyNow?: string;
  verifyInGame?: string[];
  sourceRefs?: Array<{ kind: 'tile' | 'report' | 'expedition' | 'guide' | 'derived'; id: string; label: string }>;
}

export interface TileMetric {
  key: string;
  x: number;
  y: number;
  terrain: string;
  ownerName: string;
  faction: string;
  baseKind: string;
  resourceScore: number;
  slotScore: number;
  specialScore: number;
  threatScore: number;
  opportunityScore: number;
  uncertainty: number;
  nearestOwnedDistance: number | null;
  nearestOccupiedDistance: number | null;
  nearestFriendlyFactionDistance?: number | null;
  nearestHostileFactionDistance?: number | null;
  factionSupportScore?: number;
  evidence: string[];
}

export interface ReportMetric {
  id: string;
  timeUtc: string | null;
  mission: string;
  locationKey: string | null;
  attackerName: string;
  defenderName: string;
  opponentName: string;
  isMine: boolean;
  isHostileToMe: boolean;
  isOutgoing: boolean;
  powerSwing: number;
  lossEfficiency: number;
  lootScore: number;
  spyScore: number;
  threatScore: number;
  evidence: string[];
}

export interface CommanderProfile {
  name: string;
  faction: string;
  relation: 'self' | 'ally' | 'opponent' | 'unknown';
  reports: number;
  hostileReports: number;
  outgoingReports: number;
  powerSeen: number;
  powerLost: number;
  lootNet: number;
  spyScore: number;
  threatScore: number;
  lastSeenUtc: string | null;
  evidence: string[];
}

export interface FactionProfile {
  faction: string;
  commanders: number;
  occupiedTiles: number;
  reports: number;
  hostileReports: number;
  threatScore: number;
  lastSeenUtc: string | null;
}

export interface ExpeditionMetric {
  id: string;
  tileKey: string;
  x: number;
  y: number;
  missionName: string;
  faction: string;
  status: string;
  deadlineUtc: string | null;
  payoffScore: number;
  urgencyScore: number;
  relevanceScore: number;
  totalScore: number;
  evidence: string[];
}

export interface FleetPlan {
  id: string;
  role: 'defense' | 'raid' | 'attack' | 'spy' | 'colonize' | 'logistics';
  priority: number;
  title: string;
  composition: string[];
  rationale: string;
  readinessChecks: string[];
  risk: 'low' | 'medium' | 'high';
  evidence: string[];
}

export interface SyncEndpointAudit {
  endpoint: string;
  ok: boolean;
  checkedAt: string;
  durationMs?: number;
  httpStatus?: number;
  inserted?: number;
  updated?: number;
  unchanged?: number;
  rateLimitedUntil?: string;
  backoffMs?: number;
  detail?: string;
}

export interface SyncAudit {
  lastAttemptAt: string | null;
  lastSuccessAt: string | null;
  staleMinutes: number | null;
  endpoints: SyncEndpointAudit[];
  schemaWarnings: string[];
}

export interface CapabilityItem {
  key: string;
  label: string;
  exposed: boolean;
  source: 'telemetry' | 'manual' | 'import' | 'not-exposed';
  endpoint?: string;
  fields: string[];
  notes: string;
  lastObservedAt: string | null;
}

export interface CapabilityModel {
  generatedAt: string;
  worldId: string | null;
  items: CapabilityItem[];
}

export interface WorldRecord {
  id: string;
  label: string;
  identitySource: 'telemetry' | 'world-start' | 'manifest-hash' | 'manual' | 'fallback';
  firstSeenAt: string;
  lastSeenAt: string;
  active: boolean;
  manifestHash?: string;
  worldStartedAtUtc?: string;
}

export interface SchemaAudit {
  generatedAt: string;
  worldId: string | null;
  endpoints: Array<{
    endpoint: string;
    observed: boolean;
    topLevelKeys: string[];
    nestedKeys: string[];
    notes: string[];
  }>;
}

export interface ChangeEvent {
  id: string;
  worldId: string;
  eventType: string;
  severity: 'info' | 'warning' | 'danger';
  occurredAt: string;
  subjectKey: string | null;
  confidence: number;
  evidence: string[];
  provenance: 'observed' | 'reconstructed' | 'inferred' | 'unknown';
}

export interface MapSnapshotSummary {
  id: number;
  worldId: string;
  capturedAt: string;
  manifestHash: string | null;
  tileCount: number;
  contentHash: string;
}

export interface HistoryState {
  activeWorld: WorldRecord | null;
  worlds: WorldRecord[];
  tiles: MapTile[];
  events: ChangeEvent[];
  sinceLastSync: ChangeEvent[];
  mapSnapshots: MapSnapshotSummary[];
  note: string;
}

export interface ImportResult {
  ok: boolean;
  filename: string;
  worldId: string | null;
  insertedFile: boolean;
  insertedReports: number;
  insertedTiles: number;
  generatedEvents: number;
  warnings: string[];
}

export interface ForecastItem {
  id: string;
  horizonHours: number;
  category: 'expansion' | 'hotspot' | 'keystone' | 'activity';
  title: string;
  likelihood: 'low' | 'medium' | 'high';
  probability: number;
  confidence: number;
  subjectKey: string | null;
  supportingFeatures: string[];
  assumptions: string[];
  invalidatedBy: string[];
  dataAgeMinutes: number | null;
}

export interface ForecastState {
  generatedAt: string;
  worldId: string | null;
  horizons: number[];
  items: ForecastItem[];
  backtest?: ForecastBacktestSummary;
  note: string;
}

export interface AlertRecord {
  id: string;
  worldId: string;
  fingerprint: string;
  eventType: string;
  severity: 'info' | 'warning' | 'danger';
  title: string;
  detail: string;
  createdAt: string;
  sourceObservation: string | null;
  evidence: string[];
  confidence: number;
  acknowledgedAt: string | null;
  snoozedUntil: string | null;
  deliveryState: string;
}

export interface AlertState {
  generatedAt: string;
  worldId: string | null;
  alerts: AlertRecord[];
  activeCount: number;
  note: string;
}

export interface ManualStateSnapshot {
  id?: number;
  worldId: string;
  capturedAt: string;
  subject: 'economy' | 'fleet' | 'profile' | 'diplomacy';
  payload: JsonObject;
  expiresAt?: string | null;
}

export type DecisionIntent = 'next' | 'resource' | 'expansion' | 'threat' | 'history' | 'business' | 'loan';
export type StrategicLabel = 'best bridge' | 'resource fix' | 'safe but low value' | 'greedy' | 'too isolated' | 'hostile pressure' | 'business' | 'watch';

export interface DecisionAlternative {
  label: string;
  targetKey?: string | null;
  reason: string;
  score?: number;
}

export interface DecisionCard {
  id: string;
  intent: DecisionIntent;
  title: string;
  answer: string;
  targetKey: string | null;
  targetType: string;
  rank: number;
  benefit: string;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  confirmedFacts: string[];
  calculatedValues: string[];
  inferences: string[];
  missingData: string[];
  verifyInGame: string[];
  alternatives: DecisionAlternative[];
}

export interface BridgeCandidate {
  key: string;
  x: number;
  y: number;
  terrain: string;
  score: number;
  labels: StrategicLabel[];
  nearestOwnedDistance: number | null;
  nearestTerranDistance: number | null;
  nearestHostileDistance: number | null;
  resourceScore: number;
  threatScore: number;
  bridgeValue: number;
  isolationPenalty: number;
  evidence: string[];
}

export interface BridgePlan {
  generatedAt: string;
  worldId: string | null;
  myFaction: string | null;
  candidates: BridgeCandidate[];
  best: BridgeCandidate | null;
  note: string;
}

export interface ResourcePlan {
  generatedAt: string;
  worldId: string | null;
  resource: 'deuterium' | 'vulkron' | 'aurelite' | 'astra' | 'rare' | 'noctium';
  bestNow: BridgeCandidate | null;
  bestStrategic: BridgeCandidate | null;
  safer: BridgeCandidate[];
  avoid: BridgeCandidate[];
  note: string;
}

export interface OrganizationAccount {
  id: string;
  name: string;
  capitalNoctmarks: number;
  reserveNoctmarks: number;
  goal: 'profit-engine' | 'faction-bank' | 'war-funding';
  updatedAt: string;
}

export interface LoanRecord {
  id: string;
  borrower: string;
  faction: string;
  principalNoctmarks: number;
  outstandingNoctmarks: number;
  dailyRatePercent: number;
  startDate: string;
  maturityDate: string;
  collateral: string;
  notes: string;
  status: 'proposed' | 'active' | 'repaid' | 'late' | 'defaulted';
  purpose: 'expansion' | 'fleet' | 'market' | 'keystone' | 'emergency' | 'other';
  createdAt: string;
  updatedAt: string;
}

export interface RepaymentRecord {
  id: string;
  loanId: string;
  paidAt: string;
  amountNoctmarks: number;
  notes: string;
}

export interface ContractRecord {
  id: string;
  target: string;
  payer: string;
  rewardNoctmarks: number;
  requiredAction: string;
  deadline: string | null;
  status: 'watch' | 'posted' | 'accepted' | 'completed' | 'expired' | 'cancelled';
  riskNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowerProfile {
  name: string;
  faction: string;
  riskLabel: 'safe ally' | 'unknown credit' | 'exposed frontier' | 'combat-stressed' | 'delinquent' | 'do-not-lend';
  riskScore: number;
  openLoans: number;
  totalOutstanding: number;
  reports: number;
  holdings: number;
  evidence: string[];
}

export interface DealRiskAssessment {
  borrower: BorrowerProfile;
  principalNoctmarks: number;
  dailyRatePercent: number;
  dailyInterest: number;
  totalInterestToMaturity: number;
  breakEvenRequiredProfit: number;
  recommendation: string;
  confidence: number;
  missingData: string[];
}

export interface OrganizationState {
  generatedAt: string;
  worldId: string | null;
  account: OrganizationAccount;
  loans: LoanRecord[];
  repayments: RepaymentRecord[];
  contracts: ContractRecord[];
  borrowers: BorrowerProfile[];
  businessCards: DecisionCard[];
  alerts: string[];
  telemetryWarning: string;
}

export interface ForecastBacktestSummary {
  evaluatedRuns: number;
  hits: number;
  misses: number;
  accuracy: number | null;
  calibrationNote: string;
}

export interface FactionStrategyAction {
  id: string;
  category: 'expand' | 'defend' | 'attack' | 'intel' | 'keystone' | 'logistics' | 'diplomacy';
  title: string;
  rationale: string;
  priority: number;
  risk: 'low' | 'medium' | 'high';
  confidence: number;
  scope: 'faction' | 'personal' | 'allied';
  targetKey: string | null;
  evidence: string[];
  verifyInGame: string[];
  missingInformation: string[];
}

export interface FactionStrategyState {
  generatedAt: string;
  worldId: string | null;
  myFaction: string | null;
  posture: 'balanced-edge';
  summary: {
    friendlyHoldings: number;
    hostileHoldings: number;
    unknownHoldings: number;
    friendlyCommanders: number;
    hostileCommanders: number;
    recentFactionEvents: number;
  };
  actions: FactionStrategyAction[];
  factionProfiles: FactionProfile[];
  note: string;
}

export interface StrategicAnalysis {
  posture: 'balanced';
  generatedAt: string;
  worldId: string | null;
  mapGeometry: MapGeometry;
  commanderName: string;
  myTiles: TileMetric[];
  tileMetrics: TileMetric[];
  reportMetrics: ReportMetric[];
  commanderProfiles: CommanderProfile[];
  factionProfiles: FactionProfile[];
  expeditions: ExpeditionMetric[];
  fleetPlans: FleetPlan[];
  recommendations: Recommendation[];
  alerts: Array<{ id: string; severity: 'info' | 'warning' | 'danger'; title: string; detail: string; evidence: string[] }>;
  changes: Array<{ id: string; title: string; detail: string; evidence: string[] }>;
  historyEvents?: ChangeEvent[];
  forecastItems?: ForecastItem[];
}

export interface DashboardState {
  connected: boolean;
  session: Session | null;
  summary: WorldSummary | null;
  reports: ReportSummary[];
  tiles: MapTile[];
  medals: Medal[];
  recommendations: Recommendation[];
  analysis: StrategicAnalysis | null;
  syncAudit: SyncAudit | null;
  capabilities: CapabilityModel | null;
  activeWorld: WorldRecord | null;
  lastSyncAt: string | null;
  stale: boolean;
  error?: string;
}
