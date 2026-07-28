import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import type {
  CommanderProfile,
  ExpeditionMetric,
  FactionProfile,
  ChangeEvent,
  AlertRecord,
  AlertState,
  ForecastState,
  HistoryState,
  ImportResult,
  KnowledgeFact,
  CapabilityModel,
  MapTile,
  MapSnapshotSummary,
  ManualStateSnapshot,
  Medal,
  ContractRecord,
  LoanRecord,
  OrganizationAccount,
  RepaymentRecord,
  Recommendation,
  ReportMetric,
  ReportSummary,
  Session,
  StrategicAnalysis,
  SyncAudit,
  TileMetric,
  WorldRecord,
  WorldSummary
} from '../shared/types.js';
import { contentHash } from './world.js';

export class Store {
  readonly db: DatabaseSync;

  constructor(path: string) {
    const resolved = resolve(path);
    mkdirSync(dirname(resolved), { recursive: true });
    this.db = new DatabaseSync(resolved);
    this.db.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
      CREATE TABLE IF NOT EXISTS snapshots (
        id INTEGER PRIMARY KEY, kind TEXT NOT NULL, captured_at TEXT NOT NULL, payload TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_snapshots_kind_time ON snapshots(kind, captured_at DESC);
      CREATE TABLE IF NOT EXISTS worlds (
        id TEXT PRIMARY KEY, label TEXT NOT NULL, identity_source TEXT NOT NULL, first_seen_at TEXT NOT NULL,
        last_seen_at TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 0, manifest_hash TEXT, world_started_at_utc TEXT
      );
      CREATE TABLE IF NOT EXISTS sources (
        id TEXT PRIMARY KEY, title TEXT NOT NULL, url TEXT NOT NULL, authority INTEGER NOT NULL,
        published_at TEXT, retrieved_at TEXT NOT NULL, version TEXT NOT NULL, notes TEXT
      );
      CREATE TABLE IF NOT EXISTS facts (
        id INTEGER PRIMARY KEY, source_id TEXT NOT NULL REFERENCES sources(id), topic TEXT NOT NULL,
        title TEXT NOT NULL, body TEXT NOT NULL, version TEXT NOT NULL, authority INTEGER NOT NULL,
        confidence REAL NOT NULL, effective_at TEXT NOT NULL, superseded INTEGER NOT NULL DEFAULT 0,
        UNIQUE(source_id, title, version)
      );
      CREATE INDEX IF NOT EXISTS idx_facts_topic ON facts(topic, superseded, authority DESC);
      CREATE TABLE IF NOT EXISTS reports (
        id TEXT PRIMARY KEY, world_id TEXT, time_utc TEXT, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_reports_time ON reports(time_utc DESC);
      CREATE TABLE IF NOT EXISTS tiles (
        key TEXT PRIMARY KEY, world_id TEXT, x INTEGER NOT NULL, y INTEGER NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS raw_snapshots (
        id INTEGER PRIMARY KEY, world_id TEXT, endpoint TEXT NOT NULL, captured_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, endpoint, content_hash)
      );
      CREATE INDEX IF NOT EXISTS idx_raw_snapshots_world_endpoint ON raw_snapshots(world_id, endpoint, captured_at DESC);
      CREATE TABLE IF NOT EXISTS sync_runs (
        id INTEGER PRIMARY KEY, world_id TEXT, attempted_at TEXT NOT NULL, successful_at TEXT,
        status TEXT NOT NULL, payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS map_snapshots (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, captured_at TEXT NOT NULL, manifest_hash TEXT,
        tile_count INTEGER NOT NULL, content_hash TEXT NOT NULL, UNIQUE(world_id, content_hash)
      );
      CREATE TABLE IF NOT EXISTS tile_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, x INTEGER NOT NULL, y INTEGER NOT NULL,
        observed_at TEXT NOT NULL, content_hash TEXT NOT NULL, payload TEXT NOT NULL,
        UNIQUE(world_id, x, y, content_hash)
      );
      CREATE TABLE IF NOT EXISTS base_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, tile_key TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, tile_key, content_hash)
      );
      CREATE TABLE IF NOT EXISTS resource_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, subject_key TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, subject_key, content_hash)
      );
      CREATE TABLE IF NOT EXISTS movement_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, subject_key TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, subject_key, content_hash)
      );
      CREATE TABLE IF NOT EXISTS report_summaries (
        id TEXT NOT NULL, world_id TEXT NOT NULL, time_utc TEXT, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(world_id, id)
      );
      CREATE TABLE IF NOT EXISTS report_details (
        id TEXT NOT NULL, world_id TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, PRIMARY KEY(world_id, id)
      );
      CREATE TABLE IF NOT EXISTS spy_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, target_key TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, target_key, content_hash)
      );
      CREATE TABLE IF NOT EXISTS commander_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, commander TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, commander, content_hash)
      );
      CREATE TABLE IF NOT EXISTS faction_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, faction TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, faction, content_hash)
      );
      CREATE TABLE IF NOT EXISTS expedition_observations (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, expedition_id TEXT NOT NULL, observed_at TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(world_id, expedition_id, content_hash)
      );
      CREATE TABLE IF NOT EXISTS change_events (
        id TEXT PRIMARY KEY, world_id TEXT NOT NULL, event_type TEXT NOT NULL, severity TEXT NOT NULL,
        occurred_at TEXT NOT NULL, subject_key TEXT, confidence REAL NOT NULL, evidence TEXT NOT NULL, acknowledged_at TEXT
      );
      CREATE TABLE IF NOT EXISTS notification_rules (
        id TEXT PRIMARY KEY, world_id TEXT, event_type TEXT NOT NULL, enabled INTEGER NOT NULL DEFAULT 1,
        payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY, world_id TEXT NOT NULL, fingerprint TEXT NOT NULL, event_type TEXT NOT NULL,
        severity TEXT NOT NULL, created_at TEXT NOT NULL, source_observation TEXT, evidence TEXT NOT NULL,
        confidence REAL NOT NULL, acknowledged_at TEXT, snoozed_until TEXT, delivery_state TEXT NOT NULL,
        UNIQUE(world_id, fingerprint)
      );
      CREATE TABLE IF NOT EXISTS alert_deliveries (
        id INTEGER PRIMARY KEY, alert_id TEXT NOT NULL, channel TEXT NOT NULL, delivered_at TEXT, status TEXT NOT NULL, detail TEXT
      );
      CREATE TABLE IF NOT EXISTS forecast_runs (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, generated_at TEXT NOT NULL, horizon_hours INTEGER NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS manual_state_snapshots (
        id INTEGER PRIMARY KEY, world_id TEXT NOT NULL, captured_at TEXT NOT NULL, subject TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS imported_files (
        id INTEGER PRIMARY KEY, world_id TEXT, imported_at TEXT NOT NULL, filename TEXT NOT NULL,
        content_hash TEXT NOT NULL, payload TEXT NOT NULL, UNIQUE(content_hash)
      );
      CREATE TABLE IF NOT EXISTS sync_audit (
        id INTEGER PRIMARY KEY, checked_at TEXT NOT NULL, payload TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_sync_audit_checked ON sync_audit(checked_at DESC);
      CREATE TABLE IF NOT EXISTS tile_metrics (
        key TEXT PRIMARY KEY, x INTEGER NOT NULL, y INTEGER NOT NULL, opportunity_score REAL NOT NULL,
        threat_score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS report_metrics (
        id TEXT PRIMARY KEY, time_utc TEXT, threat_score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS commander_profiles (
        name TEXT PRIMARY KEY, threat_score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS faction_profiles (
        faction TEXT PRIMARY KEY, threat_score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS expedition_metrics (
        id TEXT PRIMARY KEY, total_score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS recommendations (
        id TEXT PRIMARY KEY, category TEXT NOT NULL, score REAL NOT NULL, payload TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS organization_accounts (
        id TEXT PRIMARY KEY, world_id TEXT, name TEXT NOT NULL, capital_noctmarks REAL NOT NULL,
        reserve_noctmarks REAL NOT NULL, goal TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS organization_loans (
        id TEXT PRIMARY KEY, world_id TEXT, borrower TEXT NOT NULL, faction TEXT NOT NULL,
        principal_noctmarks REAL NOT NULL, outstanding_noctmarks REAL NOT NULL, daily_rate_percent REAL NOT NULL,
        start_date TEXT NOT NULL, maturity_date TEXT NOT NULL, collateral TEXT NOT NULL, notes TEXT NOT NULL,
        status TEXT NOT NULL, purpose TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS organization_repayments (
        id TEXT PRIMARY KEY, world_id TEXT, loan_id TEXT NOT NULL, paid_at TEXT NOT NULL,
        amount_noctmarks REAL NOT NULL, notes TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS organization_contracts (
        id TEXT PRIMARY KEY, world_id TEXT, target TEXT NOT NULL, payer TEXT NOT NULL,
        reward_noctmarks REAL NOT NULL, required_action TEXT NOT NULL, deadline TEXT,
        status TEXT NOT NULL, risk_notes TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS app_state (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    `);
    this.migrateColumns();
  }

  close() { this.db.close(); }

  transaction<T>(fn: () => T): T {
    this.db.exec('BEGIN IMMEDIATE');
    try {
      const result = fn();
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  saveSnapshot(kind: string, payload: unknown) {
    this.db.prepare('INSERT INTO snapshots(kind, captured_at, payload) VALUES (?, ?, ?)')
      .run(kind, new Date().toISOString(), JSON.stringify(payload));
  }

  private migrateColumns() {
    const ensure = (table: string, column: string, definition: string) => {
      const rows = this.db.prepare(`PRAGMA table_info(${table})`).all() as Array<{ name: string }>;
      if (!rows.some(row => row.name === column)) this.db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    };
    ensure('reports', 'world_id', 'TEXT');
    ensure('tiles', 'world_id', 'TEXT');
    ensure('alerts', 'title', 'TEXT');
    ensure('alerts', 'detail', 'TEXT');
    this.db.exec(`
      CREATE INDEX IF NOT EXISTS idx_reports_world_time ON reports(world_id, time_utc DESC);
      CREATE INDEX IF NOT EXISTS idx_tiles_world ON tiles(world_id);
    `);
  }

  saveRawSnapshot(worldId: string | null, endpoint: string, payload: unknown) {
    const hash = contentHash(payload);
    const result = this.db.prepare('INSERT OR IGNORE INTO raw_snapshots(world_id,endpoint,captured_at,content_hash,payload) VALUES(?,?,?,?,?)')
      .run(worldId, endpoint, new Date().toISOString(), hash, JSON.stringify(payload));
    return { hash, inserted: Number(result.changes ?? 0) };
  }

  latestSnapshot<T>(kind: string): T | null {
    const row = this.db.prepare('SELECT payload FROM snapshots WHERE kind = ? ORDER BY captured_at DESC LIMIT 1').get(kind) as { payload: string } | undefined;
    return row ? JSON.parse(row.payload) as T : null;
  }

  setState(key: string, value: string) {
    this.db.prepare('INSERT INTO app_state(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').run(key, value);
  }

  getState(key: string) {
    const row = this.db.prepare('SELECT value FROM app_state WHERE key=?').get(key) as { value: string } | undefined;
    return row?.value ?? null;
  }

  upsertWorld(world: WorldRecord, makeActive = true) {
    this.transaction(() => {
      if (makeActive) this.db.prepare('UPDATE worlds SET active=0 WHERE id<>?').run(world.id);
      this.db.prepare(`INSERT INTO worlds(id,label,identity_source,first_seen_at,last_seen_at,active,manifest_hash,world_started_at_utc)
        VALUES(?,?,?,?,?,?,?,?)
        ON CONFLICT(id) DO UPDATE SET label=excluded.label,identity_source=excluded.identity_source,last_seen_at=excluded.last_seen_at,active=CASE WHEN ? THEN excluded.active ELSE worlds.active END,manifest_hash=excluded.manifest_hash,world_started_at_utc=excluded.world_started_at_utc`)
        .run(world.id, world.label, world.identitySource, world.firstSeenAt, world.lastSeenAt, makeActive && world.active ? 1 : 0, world.manifestHash ?? null, world.worldStartedAtUtc ?? null, makeActive ? 1 : 0);
      if (makeActive) {
        this.db.prepare('UPDATE reports SET world_id=? WHERE world_id IS NULL').run(world.id);
        this.db.prepare('UPDATE tiles SET world_id=? WHERE world_id IS NULL').run(world.id);
      }
    });
  }

  worlds(): WorldRecord[] {
    const rows = this.db.prepare('SELECT * FROM worlds ORDER BY active DESC,last_seen_at DESC').all() as Array<Record<string, unknown>>;
    return rows.map(row => ({
      id: String(row.id),
      label: String(row.label),
      identitySource: String(row.identity_source) as WorldRecord['identitySource'],
      firstSeenAt: String(row.first_seen_at),
      lastSeenAt: String(row.last_seen_at),
      active: Boolean(row.active),
      manifestHash: row.manifest_hash ? String(row.manifest_hash) : undefined,
      worldStartedAtUtc: row.world_started_at_utc ? String(row.world_started_at_utc) : undefined
    }));
  }

  activeWorld(): WorldRecord | null {
    const row = this.db.prepare('SELECT * FROM worlds WHERE active=1 ORDER BY last_seen_at DESC LIMIT 1').get() as Record<string, unknown> | undefined;
    if (!row) return null;
    return {
      id: String(row.id),
      label: String(row.label),
      identitySource: String(row.identity_source) as WorldRecord['identitySource'],
      firstSeenAt: String(row.first_seen_at),
      lastSeenAt: String(row.last_seen_at),
      active: Boolean(row.active),
      manifestHash: row.manifest_hash ? String(row.manifest_hash) : undefined,
      worldStartedAtUtc: row.world_started_at_utc ? String(row.world_started_at_utc) : undefined
    };
  }

  upsertReports(reports: ReportSummary[], worldId: string | null = this.activeWorld()?.id ?? null) {
    const stmt = this.db.prepare('INSERT INTO reports(id,world_id,time_utc,payload,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET world_id=excluded.world_id,time_utc=excluded.time_utc,payload=excluded.payload,updated_at=excluded.updated_at');
    const summaryStmt = this.db.prepare(`INSERT INTO report_summaries(id,world_id,time_utc,observed_at,content_hash,payload) VALUES(?,?,?,?,?,?)
      ON CONFLICT(world_id,id) DO UPDATE SET time_utc=excluded.time_utc,observed_at=excluded.observed_at,content_hash=excluded.content_hash,payload=excluded.payload`);
    const now = new Date().toISOString();
    this.transaction(() => reports.forEach(report => {
      const payload = JSON.stringify(report);
      stmt.run(String(report.id), worldId, report.timeUtc ?? null, payload, now);
      if (worldId) summaryStmt.run(String(report.id), worldId, report.timeUtc ?? null, now, contentHash(report), payload);
    }));
  }

  reportIds(worldId: string | null = this.activeWorld()?.id ?? null): Set<string> {
    const rows = worldId
      ? this.db.prepare('SELECT id FROM reports WHERE world_id=?').all(worldId)
      : this.db.prepare('SELECT id FROM reports').all();
    return new Set((rows as Array<{ id: string }>).map(row => String(row.id)));
  }

  reports(limit = 500, worldId: string | null = this.activeWorld()?.id ?? null): ReportSummary[] {
    const rows = worldId
      ? this.db.prepare('SELECT payload FROM reports WHERE world_id=? ORDER BY time_utc DESC LIMIT ?').all(worldId, limit)
      : this.db.prepare('SELECT payload FROM reports ORDER BY time_utc DESC LIMIT ?').all(limit);
    return (rows as Array<{ payload: string }>).map(row => JSON.parse(row.payload));
  }

  replaceTiles(tiles: MapTile[], worldId: string | null = this.activeWorld()?.id ?? null, manifestHash?: string) {
    const stmt = this.db.prepare('INSERT INTO tiles(key,world_id,x,y,payload,updated_at) VALUES(?,?,?,?,?,?) ON CONFLICT(key) DO UPDATE SET world_id=excluded.world_id,payload=excluded.payload,updated_at=excluded.updated_at');
    const observationStmt = this.db.prepare(`INSERT OR IGNORE INTO tile_observations(world_id,x,y,observed_at,content_hash,payload) VALUES(?,?,?,?,?,?)`);
    const baseStmt = this.db.prepare(`INSERT OR IGNORE INTO base_observations(world_id,tile_key,observed_at,content_hash,payload) VALUES(?,?,?,?,?)`);
    const expeditionStmt = this.db.prepare(`INSERT OR IGNORE INTO expedition_observations(world_id,expedition_id,observed_at,content_hash,payload) VALUES(?,?,?,?,?)`);
    const now = new Date().toISOString();
    this.transaction(() => {
      if (worldId) this.db.prepare('DELETE FROM tiles WHERE world_id=?').run(worldId);
      tiles.forEach(tile => {
        const key = worldId ? `${worldId}:${tile.x},${tile.y}` : `${tile.x},${tile.y}`;
        const tileKey = `${tile.x},${tile.y}`;
        const payload = JSON.stringify(tile);
        stmt.run(key, worldId, tile.x, tile.y, payload, now);
        if (worldId) {
          observationStmt.run(worldId, tile.x, tile.y, now, contentHash(tile), payload);
          if (tile.base) baseStmt.run(worldId, tileKey, now, contentHash(tile.base), JSON.stringify(tile.base));
          if (tile.expedition) expeditionStmt.run(worldId, String(tile.expedition.id ?? tileKey), now, contentHash(tile.expedition), JSON.stringify(tile.expedition));
        }
      });
      if (worldId) this.db.prepare('INSERT OR IGNORE INTO map_snapshots(world_id,captured_at,manifest_hash,tile_count,content_hash) VALUES(?,?,?,?,?)')
        .run(worldId, now, manifestHash ?? null, tiles.length, contentHash(tiles));
    });
  }

  upsertChangeEvents(events: ChangeEvent[]) {
    if (!events.length) return 0;
    const stmt = this.db.prepare(`INSERT OR IGNORE INTO change_events(id,world_id,event_type,severity,occurred_at,subject_key,confidence,evidence)
      VALUES(?,?,?,?,?,?,?,?)`);
    let inserted = 0;
    this.transaction(() => {
      for (const event of events) {
        const result = stmt.run(event.id, event.worldId, event.eventType, event.severity, event.occurredAt, event.subjectKey, event.confidence, JSON.stringify({ evidence: event.evidence, provenance: event.provenance }));
        inserted += Number(result.changes ?? 0);
      }
    });
    return inserted;
  }

  changeEvents(limit = 300, worldId: string | null = this.activeWorld()?.id ?? null): ChangeEvent[] {
    const rows = worldId
      ? this.db.prepare('SELECT * FROM change_events WHERE world_id=? ORDER BY occurred_at DESC LIMIT ?').all(worldId, limit)
      : this.db.prepare('SELECT * FROM change_events ORDER BY occurred_at DESC LIMIT ?').all(limit);
    return (rows as Array<Record<string, unknown>>).map(row => {
      const evidencePayload = JSON.parse(String(row.evidence)) as { evidence?: string[]; provenance?: ChangeEvent['provenance'] };
      return {
        id: String(row.id),
        worldId: String(row.world_id),
        eventType: String(row.event_type),
        severity: String(row.severity) as ChangeEvent['severity'],
        occurredAt: String(row.occurred_at),
        subjectKey: row.subject_key ? String(row.subject_key) : null,
        confidence: Number(row.confidence),
        evidence: evidencePayload.evidence ?? [],
        provenance: evidencePayload.provenance ?? 'observed'
      };
    });
  }

  mapSnapshots(worldId: string | null = this.activeWorld()?.id ?? null, limit = 80): MapSnapshotSummary[] {
    const rows = worldId
      ? this.db.prepare('SELECT * FROM map_snapshots WHERE world_id=? ORDER BY captured_at DESC LIMIT ?').all(worldId, limit)
      : this.db.prepare('SELECT * FROM map_snapshots ORDER BY captured_at DESC LIMIT ?').all(limit);
    return (rows as Array<Record<string, unknown>>).map(row => ({
      id: Number(row.id),
      worldId: String(row.world_id),
      capturedAt: String(row.captured_at),
      manifestHash: row.manifest_hash ? String(row.manifest_hash) : null,
      tileCount: Number(row.tile_count),
      contentHash: String(row.content_hash)
    }));
  }

  history(worldId: string | null = this.activeWorld()?.id ?? null): HistoryState {
    const sync = this.latestSyncAudit();
    const lastAttempt = sync?.lastAttemptAt ? new Date(sync.lastAttemptAt).getTime() : 0;
    const events = this.changeEvents(300, worldId);
    return {
      activeWorld: worldId ? this.worlds().find(world => world.id === worldId) ?? this.activeWorld() : this.activeWorld(),
      worlds: this.worlds(),
      tiles: this.tiles(worldId),
      events,
      sinceLastSync: lastAttempt ? events.filter(event => new Date(event.occurredAt).getTime() >= lastAttempt) : events.slice(0, 50),
      mapSnapshots: this.mapSnapshots(worldId),
      note: 'Historical map state is observed from stored snapshots onward. Earlier state is unknown unless reconstructed from reports and labeled as such.'
    };
  }

  recordImportedFile(input: { filename: string; worldId: string | null; payload: unknown }): Pick<ImportResult, 'insertedFile'> & { hash: string } {
    const hash = contentHash(input.payload);
    const result = this.db.prepare('INSERT OR IGNORE INTO imported_files(world_id,imported_at,filename,content_hash,payload) VALUES(?,?,?,?,?)')
      .run(input.worldId, new Date().toISOString(), input.filename, hash, JSON.stringify(input.payload));
    return { hash, insertedFile: Number(result.changes ?? 0) > 0 };
  }

  upsertAlerts(alerts: AlertRecord[]) {
    if (!alerts.length) return 0;
    const stmt = this.db.prepare(`INSERT INTO alerts(id,world_id,fingerprint,event_type,severity,title,detail,created_at,source_observation,evidence,confidence,acknowledged_at,snoozed_until,delivery_state)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)
      ON CONFLICT(world_id,fingerprint) DO UPDATE SET severity=excluded.severity,title=excluded.title,detail=excluded.detail,evidence=excluded.evidence,confidence=excluded.confidence,delivery_state=alerts.delivery_state`);
    let inserted = 0;
    this.transaction(() => {
      for (const alert of alerts) {
        const result = stmt.run(alert.id, alert.worldId, alert.fingerprint, alert.eventType, alert.severity, alert.title, alert.detail, alert.createdAt, alert.sourceObservation, JSON.stringify(alert.evidence), alert.confidence, alert.acknowledgedAt, alert.snoozedUntil, alert.deliveryState);
        inserted += Number(result.changes ?? 0);
      }
    });
    return inserted;
  }

  alerts(worldId: string | null = this.activeWorld()?.id ?? null): AlertRecord[] {
    const rows = worldId
      ? this.db.prepare('SELECT * FROM alerts WHERE world_id=? ORDER BY created_at DESC LIMIT 300').all(worldId)
      : this.db.prepare('SELECT * FROM alerts ORDER BY created_at DESC LIMIT 300').all();
    return (rows as Array<Record<string, unknown>>).map(row => ({
      id: String(row.id),
      worldId: String(row.world_id),
      fingerprint: String(row.fingerprint),
      eventType: String(row.event_type),
      severity: String(row.severity) as AlertRecord['severity'],
      title: String(row.title ?? row.event_type),
      detail: String(row.detail ?? ''),
      createdAt: String(row.created_at),
      sourceObservation: row.source_observation ? String(row.source_observation) : null,
      evidence: JSON.parse(String(row.evidence || '[]')) as string[],
      confidence: Number(row.confidence),
      acknowledgedAt: row.acknowledged_at ? String(row.acknowledged_at) : null,
      snoozedUntil: row.snoozed_until ? String(row.snoozed_until) : null,
      deliveryState: String(row.delivery_state)
    }));
  }

  setAlertState(id: string, action: 'ack' | 'snooze' | 'clear-snooze', minutes = 60) {
    const now = new Date().toISOString();
    if (action === 'ack') this.db.prepare('UPDATE alerts SET acknowledged_at=? WHERE id=?').run(now, id);
    if (action === 'snooze') this.db.prepare('UPDATE alerts SET snoozed_until=? WHERE id=?').run(new Date(Date.now() + minutes * 60_000).toISOString(), id);
    if (action === 'clear-snooze') this.db.prepare('UPDATE alerts SET snoozed_until=NULL WHERE id=?').run(id);
  }

  alertState(worldId: string | null = this.activeWorld()?.id ?? null): AlertState {
    const alerts = this.alerts(worldId);
    const now = Date.now();
    const activeCount = alerts.filter(alert => !alert.acknowledgedAt && (!alert.snoozedUntil || new Date(alert.snoozedUntil).getTime() <= now)).length;
    return { generatedAt: new Date().toISOString(), worldId, alerts, activeCount, note: 'Alerts are generated only from visible observations and manual state. No hidden incoming movement is assumed.' };
  }

  saveManualState(snapshot: Omit<ManualStateSnapshot, 'id' | 'capturedAt' | 'worldId'> & { worldId?: string | null }) {
    const worldId = snapshot.worldId ?? this.activeWorld()?.id ?? 'manual:default';
    const capturedAt = new Date().toISOString();
    const payload = JSON.stringify(snapshot.payload);
    this.db.prepare('INSERT INTO manual_state_snapshots(world_id,captured_at,subject,content_hash,payload) VALUES(?,?,?,?,?)')
      .run(worldId, capturedAt, snapshot.subject, contentHash(snapshot.payload), payload);
    return { worldId, capturedAt, subject: snapshot.subject, payload: snapshot.payload, expiresAt: snapshot.expiresAt ?? null } satisfies ManualStateSnapshot;
  }

  manualState(worldId: string | null = this.activeWorld()?.id ?? null): ManualStateSnapshot[] {
    const rows = worldId
      ? this.db.prepare('SELECT rowid id,* FROM manual_state_snapshots WHERE world_id=? ORDER BY captured_at DESC LIMIT 80').all(worldId)
      : this.db.prepare('SELECT rowid id,* FROM manual_state_snapshots ORDER BY captured_at DESC LIMIT 80').all();
    return (rows as Array<Record<string, unknown>>).map(row => ({
      id: Number(row.id),
      worldId: String(row.world_id),
      capturedAt: String(row.captured_at),
      subject: String(row.subject) as ManualStateSnapshot['subject'],
      payload: JSON.parse(String(row.payload)) as Record<string, unknown>,
      expiresAt: null
    }));
  }

  organizationAccount(worldId: string | null = this.activeWorld()?.id ?? null): OrganizationAccount {
    const row = this.db.prepare('SELECT * FROM organization_accounts WHERE world_id IS ? ORDER BY updated_at DESC LIMIT 1').get(worldId) as Record<string, unknown> | undefined;
    if (row) return {
      id: String(row.id),
      name: String(row.name),
      capitalNoctmarks: Number(row.capital_noctmarks),
      reserveNoctmarks: Number(row.reserve_noctmarks),
      goal: String(row.goal) as OrganizationAccount['goal'],
      updatedAt: String(row.updated_at)
    };
    return { id: 'default', name: 'Local Organization', capitalNoctmarks: 0, reserveNoctmarks: 0, goal: 'profit-engine', updatedAt: new Date().toISOString() };
  }

  saveOrganizationAccount(account: Partial<OrganizationAccount> & { worldId?: string | null }) {
    const worldId = account.worldId ?? this.activeWorld()?.id ?? null;
    const current = this.organizationAccount(worldId);
    const updated: OrganizationAccount = {
      id: account.id ?? current.id,
      name: account.name ?? current.name,
      capitalNoctmarks: Number(account.capitalNoctmarks ?? current.capitalNoctmarks),
      reserveNoctmarks: Number(account.reserveNoctmarks ?? current.reserveNoctmarks),
      goal: account.goal ?? current.goal,
      updatedAt: new Date().toISOString()
    };
    this.db.prepare(`INSERT INTO organization_accounts(id,world_id,name,capital_noctmarks,reserve_noctmarks,goal,updated_at)
      VALUES(?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET world_id=excluded.world_id,name=excluded.name,capital_noctmarks=excluded.capital_noctmarks,reserve_noctmarks=excluded.reserve_noctmarks,goal=excluded.goal,updated_at=excluded.updated_at`)
      .run(updated.id, worldId, updated.name, updated.capitalNoctmarks, updated.reserveNoctmarks, updated.goal, updated.updatedAt);
    return updated;
  }

  organizationLoans(worldId: string | null = this.activeWorld()?.id ?? null): LoanRecord[] {
    const rows = this.db.prepare('SELECT * FROM organization_loans WHERE world_id IS ? ORDER BY updated_at DESC LIMIT 300').all(worldId) as Array<Record<string, unknown>>;
    return rows.map(row => ({
      id: String(row.id),
      borrower: String(row.borrower),
      faction: String(row.faction),
      principalNoctmarks: Number(row.principal_noctmarks),
      outstandingNoctmarks: Number(row.outstanding_noctmarks),
      dailyRatePercent: Number(row.daily_rate_percent),
      startDate: String(row.start_date),
      maturityDate: String(row.maturity_date),
      collateral: String(row.collateral),
      notes: String(row.notes),
      status: String(row.status) as LoanRecord['status'],
      purpose: String(row.purpose) as LoanRecord['purpose'],
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at)
    }));
  }

  saveOrganizationLoan(input: Partial<LoanRecord> & { id?: string; worldId?: string | null }): LoanRecord {
    const worldId = input.worldId ?? this.activeWorld()?.id ?? null;
    const now = new Date().toISOString();
    const id = input.id || `loan:${Date.now()}:${Math.random().toString(16).slice(2)}`;
    const existing = this.organizationLoans(worldId).find(loan => loan.id === id);
    const loan: LoanRecord = {
      id,
      borrower: input.borrower ?? existing?.borrower ?? 'Unknown borrower',
      faction: input.faction ?? existing?.faction ?? '',
      principalNoctmarks: Number(input.principalNoctmarks ?? existing?.principalNoctmarks ?? 0),
      outstandingNoctmarks: Number(input.outstandingNoctmarks ?? existing?.outstandingNoctmarks ?? input.principalNoctmarks ?? 0),
      dailyRatePercent: Number(input.dailyRatePercent ?? existing?.dailyRatePercent ?? 1.5),
      startDate: input.startDate ?? existing?.startDate ?? now.slice(0, 10),
      maturityDate: input.maturityDate ?? existing?.maturityDate ?? new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10),
      collateral: input.collateral ?? existing?.collateral ?? '',
      notes: input.notes ?? existing?.notes ?? '',
      status: input.status ?? existing?.status ?? 'proposed',
      purpose: input.purpose ?? existing?.purpose ?? 'other',
      createdAt: existing?.createdAt ?? now,
      updatedAt: now
    };
    this.db.prepare(`INSERT INTO organization_loans(id,world_id,borrower,faction,principal_noctmarks,outstanding_noctmarks,daily_rate_percent,start_date,maturity_date,collateral,notes,status,purpose,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET borrower=excluded.borrower,faction=excluded.faction,principal_noctmarks=excluded.principal_noctmarks,outstanding_noctmarks=excluded.outstanding_noctmarks,daily_rate_percent=excluded.daily_rate_percent,start_date=excluded.start_date,maturity_date=excluded.maturity_date,collateral=excluded.collateral,notes=excluded.notes,status=excluded.status,purpose=excluded.purpose,updated_at=excluded.updated_at`)
      .run(loan.id, worldId, loan.borrower, loan.faction, loan.principalNoctmarks, loan.outstandingNoctmarks, loan.dailyRatePercent, loan.startDate, loan.maturityDate, loan.collateral, loan.notes, loan.status, loan.purpose, loan.createdAt, loan.updatedAt);
    return loan;
  }

  organizationRepayments(worldId: string | null = this.activeWorld()?.id ?? null): RepaymentRecord[] {
    const rows = this.db.prepare('SELECT * FROM organization_repayments WHERE world_id IS ? ORDER BY paid_at DESC LIMIT 300').all(worldId) as Array<Record<string, unknown>>;
    return rows.map(row => ({ id: String(row.id), loanId: String(row.loan_id), paidAt: String(row.paid_at), amountNoctmarks: Number(row.amount_noctmarks), notes: String(row.notes) }));
  }

  organizationContracts(worldId: string | null = this.activeWorld()?.id ?? null): ContractRecord[] {
    const rows = this.db.prepare('SELECT * FROM organization_contracts WHERE world_id IS ? ORDER BY updated_at DESC LIMIT 300').all(worldId) as Array<Record<string, unknown>>;
    return rows.map(row => ({
      id: String(row.id),
      target: String(row.target),
      payer: String(row.payer),
      rewardNoctmarks: Number(row.reward_noctmarks),
      requiredAction: String(row.required_action),
      deadline: row.deadline ? String(row.deadline) : null,
      status: String(row.status) as ContractRecord['status'],
      riskNotes: String(row.risk_notes),
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at)
    }));
  }

  saveOrganizationContract(input: Partial<ContractRecord> & { id?: string; worldId?: string | null }): ContractRecord {
    const worldId = input.worldId ?? this.activeWorld()?.id ?? null;
    const now = new Date().toISOString();
    const id = input.id || `contract:${Date.now()}:${Math.random().toString(16).slice(2)}`;
    const existing = this.organizationContracts(worldId).find(contract => contract.id === id);
    const contract: ContractRecord = {
      id,
      target: input.target ?? existing?.target ?? 'Unknown target',
      payer: input.payer ?? existing?.payer ?? '',
      rewardNoctmarks: Number(input.rewardNoctmarks ?? existing?.rewardNoctmarks ?? 0),
      requiredAction: input.requiredAction ?? existing?.requiredAction ?? '',
      deadline: input.deadline ?? existing?.deadline ?? null,
      status: input.status ?? existing?.status ?? 'watch',
      riskNotes: input.riskNotes ?? existing?.riskNotes ?? '',
      createdAt: existing?.createdAt ?? now,
      updatedAt: now
    };
    this.db.prepare(`INSERT INTO organization_contracts(id,world_id,target,payer,reward_noctmarks,required_action,deadline,status,risk_notes,created_at,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET target=excluded.target,payer=excluded.payer,reward_noctmarks=excluded.reward_noctmarks,required_action=excluded.required_action,deadline=excluded.deadline,status=excluded.status,risk_notes=excluded.risk_notes,updated_at=excluded.updated_at`)
      .run(contract.id, worldId, contract.target, contract.payer, contract.rewardNoctmarks, contract.requiredAction, contract.deadline, contract.status, contract.riskNotes, contract.createdAt, contract.updatedAt);
    return contract;
  }

  saveForecastRun(forecast: ForecastState) {
    if (!forecast.worldId) return;
    const now = forecast.generatedAt;
    const stmt = this.db.prepare('INSERT INTO forecast_runs(world_id,generated_at,horizon_hours,content_hash,payload) VALUES(?,?,?,?,?)');
    this.transaction(() => {
      for (const item of forecast.items) stmt.run(forecast.worldId, now, item.horizonHours, contentHash(item), JSON.stringify(item));
    });
  }

  forecastBacktest(worldId: string | null = this.activeWorld()?.id ?? null) {
    if (!worldId) return { evaluatedRuns: 0, hits: 0, misses: 0, accuracy: null, calibrationNote: 'No active world.' };
    const rows = this.db.prepare('SELECT payload FROM forecast_runs WHERE world_id=? ORDER BY generated_at DESC LIMIT 200').all(worldId) as Array<{ payload: string }>;
    const events = this.changeEvents(1000, worldId);
    let evaluatedRuns = 0, hits = 0;
    for (const row of rows) {
      const item = JSON.parse(row.payload) as { subjectKey?: string | null; category?: string };
      if (!item.subjectKey) continue;
      evaluatedRuns += 1;
      if (events.some(event => event.subjectKey === item.subjectKey && (item.category !== 'expansion' || /new_colony|new_outpost|ownership_transfer/.test(event.eventType)))) hits += 1;
    }
    const misses = Math.max(0, evaluatedRuns - hits);
    return { evaluatedRuns, hits, misses, accuracy: evaluatedRuns ? hits / evaluatedRuns : null, calibrationNote: evaluatedRuns ? 'Naive subject-key backtest against later observed events.' : 'Not enough saved forecasts and later observations to calibrate yet.' };
  }

  upsertTiles(tiles: MapTile[], worldId: string | null = this.activeWorld()?.id ?? null) {
    this.replaceTiles(tiles, worldId);
  }

  tiles(worldId: string | null = this.activeWorld()?.id ?? null): MapTile[] {
    const rows = worldId
      ? this.db.prepare('SELECT payload FROM tiles WHERE world_id=?').all(worldId)
      : this.db.prepare('SELECT payload FROM tiles').all();
    return (rows as Array<{ payload: string }>).map(row => JSON.parse(row.payload));
  }

  saveSyncAudit(audit: SyncAudit) {
    this.db.prepare('INSERT INTO sync_audit(checked_at,payload) VALUES(?,?)').run(new Date().toISOString(), JSON.stringify(audit));
  }

  latestSyncAudit(): SyncAudit | null {
    const row = this.db.prepare('SELECT payload FROM sync_audit ORDER BY checked_at DESC LIMIT 1').get() as { payload: string } | undefined;
    return row ? JSON.parse(row.payload) as SyncAudit : null;
  }

  replaceDerived(analysis: StrategicAnalysis) {
    const now = new Date().toISOString();
    this.transaction(() => {
      this.db.exec('DELETE FROM tile_metrics; DELETE FROM report_metrics; DELETE FROM commander_profiles; DELETE FROM faction_profiles; DELETE FROM expedition_metrics; DELETE FROM recommendations;');
      const tileStmt = this.db.prepare('INSERT INTO tile_metrics(key,x,y,opportunity_score,threat_score,payload,updated_at) VALUES(?,?,?,?,?,?,?)');
      analysis.tileMetrics.forEach((item: TileMetric) => tileStmt.run(item.key, item.x, item.y, item.opportunityScore, item.threatScore, JSON.stringify(item), now));
      const reportStmt = this.db.prepare('INSERT INTO report_metrics(id,time_utc,threat_score,payload,updated_at) VALUES(?,?,?,?,?)');
      analysis.reportMetrics.forEach((item: ReportMetric) => reportStmt.run(item.id, item.timeUtc, item.threatScore, JSON.stringify(item), now));
      const commanderStmt = this.db.prepare('INSERT INTO commander_profiles(name,threat_score,payload,updated_at) VALUES(?,?,?,?)');
      analysis.commanderProfiles.forEach((item: CommanderProfile) => commanderStmt.run(item.name, item.threatScore, JSON.stringify(item), now));
      const factionStmt = this.db.prepare('INSERT INTO faction_profiles(faction,threat_score,payload,updated_at) VALUES(?,?,?,?)');
      analysis.factionProfiles.forEach((item: FactionProfile) => factionStmt.run(item.faction, item.threatScore, JSON.stringify(item), now));
      const expeditionStmt = this.db.prepare('INSERT INTO expedition_metrics(id,total_score,payload,updated_at) VALUES(?,?,?,?)');
      analysis.expeditions.forEach((item: ExpeditionMetric) => expeditionStmt.run(item.id, item.totalScore, JSON.stringify(item), now));
      const recStmt = this.db.prepare('INSERT INTO recommendations(id,category,score,payload,updated_at) VALUES(?,?,?,?,?)');
      analysis.recommendations.forEach((item: Recommendation) => recStmt.run(item.id, item.category, item.score ?? 0, JSON.stringify(item), now));
      this.saveSnapshot('analysis', analysis);
    });
  }

  addSource(source: { id: string; title: string; url: string; authority: number; publishedAt?: string; retrievedAt: string; version: string; notes?: string }) {
    this.db.prepare(`INSERT INTO sources(id,title,url,authority,published_at,retrieved_at,version,notes) VALUES(?,?,?,?,?,?,?,?)
      ON CONFLICT(id) DO UPDATE SET title=excluded.title,url=excluded.url,authority=excluded.authority,published_at=excluded.published_at,retrieved_at=excluded.retrieved_at,version=excluded.version,notes=excluded.notes`)
      .run(source.id, source.title, source.url, source.authority, source.publishedAt ?? null, source.retrievedAt, source.version, source.notes ?? null);
  }

  addFact(fact: Omit<KnowledgeFact, 'id' | 'sourceTitle' | 'sourceUrl'> & { sourceId: string }) {
    this.db.prepare(`INSERT INTO facts(source_id,topic,title,body,version,authority,confidence,effective_at,superseded) VALUES(?,?,?,?,?,?,?,?,?)
      ON CONFLICT(source_id,title,version) DO UPDATE SET body=excluded.body,authority=excluded.authority,confidence=excluded.confidence,effective_at=excluded.effective_at,superseded=excluded.superseded`)
      .run(fact.sourceId, fact.topic, fact.title, fact.body, fact.version, fact.authority, fact.confidence, fact.effectiveAt, fact.superseded ? 1 : 0);
  }

  searchFacts(query = '', topic = '', limit = 80): KnowledgeFact[] {
    const terms = `%${query.trim()}%`;
    const rows = this.db.prepare(`SELECT f.*,s.title source_title,s.url source_url FROM facts f JOIN sources s ON s.id=f.source_id
      WHERE (?='' OR f.topic=?) AND (?='' OR f.title LIKE ? OR f.body LIKE ? OR f.topic LIKE ?)
      ORDER BY f.superseded ASC,f.authority DESC,f.effective_at DESC LIMIT ?`).all(topic, topic, query, terms, terms, terms, limit) as Array<Record<string, unknown>>;
    return rows.map(row => ({
      id: Number(row.id), topic: String(row.topic), title: String(row.title), body: String(row.body), version: String(row.version),
      authority: Number(row.authority), confidence: Number(row.confidence), effectiveAt: String(row.effective_at),
      sourceTitle: String(row.source_title), sourceUrl: String(row.source_url), superseded: Boolean(row.superseded)
    }));
  }

  dashboard(analysis: StrategicAnalysis | null, capabilities: CapabilityModel | null = null) {
    return {
      connected: Boolean(this.getState('lastSyncAt')),
      session: this.latestSnapshot<Session>('session'),
      summary: this.latestSnapshot<WorldSummary>('summary:me'),
      reports: this.reports(100),
      tiles: this.tiles(),
      medals: this.latestSnapshot<Medal[]>('medals') ?? [],
      recommendations: analysis?.recommendations ?? [],
      analysis,
      syncAudit: this.latestSyncAudit(),
      capabilities,
      activeWorld: this.activeWorld(),
      lastSyncAt: this.getState('lastSyncAt'),
      stale: this.getState('lastSyncStatus') === 'error',
      error: this.getState('lastSyncError') ?? undefined
    };
  }
}
