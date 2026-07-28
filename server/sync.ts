import type { CapabilityModel, MapChunk, MapManifest, MapTile, Medal, Session, StrategicAnalysis, SyncEndpointAudit, WorldRecord, WorldSummary } from '../shared/types.js';
import { buildCapabilityModel, buildSchemaAudit } from './capabilities.js';
import { diffMapSnapshot, reportEvents } from './history.js';
import { buildStrategicAnalysis } from './strategy.js';
import type { Store } from './db.js';
import type { RiftborneClient } from './riftborne-client.js';
import { contentHash, deriveWorldRecord } from './world.js';

export class SyncService {
  private inFlight: Promise<ReturnType<Store['dashboard']>> | null = null;
  private timer: NodeJS.Timeout | null = null;

  constructor(private readonly store: Store, private readonly client: RiftborneClient, private readonly intervalMinutes: number) {}

  private capabilities(worldId = this.store.activeWorld()?.id ?? null): CapabilityModel {
    return buildCapabilityModel({
      worldId,
      session: this.store.latestSnapshot('session'),
      summaryMe: this.store.latestSnapshot('summary:me'),
      summaryWorld: this.store.latestSnapshot('summary:world'),
      status: this.store.latestSnapshot('summary:status'),
      reports: this.store.reports(500, worldId),
      reportDetails: [],
      tiles: this.store.tiles(worldId)
    });
  }

  private analysis(): StrategicAnalysis {
    const cached = this.store.latestSnapshot<StrategicAnalysis>('analysis');
    const activeWorld = this.store.activeWorld();
    if (cached && cached.worldId === activeWorld?.id) return cached;
    const analysis = buildStrategicAnalysis({
      session: this.store.latestSnapshot('session'),
      summary: this.store.latestSnapshot('summary:me'),
      manifest: this.store.latestSnapshot('map:manifest'),
      reports: this.store.reports(500, activeWorld?.id ?? null),
      tiles: this.store.tiles(activeWorld?.id ?? null),
      worldId: activeWorld?.id ?? null,
      syncAudit: this.store.latestSyncAudit()
    });
    this.store.replaceDerived(analysis);
    return analysis;
  }

  dashboard() {
    const worldId = this.store.activeWorld()?.id ?? null;
    return this.store.dashboard(this.analysis(), this.capabilities(worldId));
  }

  start() {
    this.stop();
    this.timer = setInterval(() => this.sync().catch(() => null), this.intervalMinutes * 60_000);
    this.timer.unref();
  }

  stop() { if (this.timer) clearInterval(this.timer); this.timer = null; }

  sync() {
    if (this.inFlight) return this.inFlight;
    this.inFlight = this.performSync().finally(() => { this.inFlight = null; });
    return this.inFlight;
  }

  private async mapTiles(world: WorldRecord) {
    const manifest = await this.client.manifest();
    this.store.saveSnapshot('map:manifest', manifest);
    this.store.saveRawSnapshot(world.id, '/api/map/manifest', manifest);
    const chunks = Array.isArray(manifest.chunks) ? manifest.chunks : [];
    const previousTiles = this.store.tiles(world.id);
    const tiles: MapTile[] = [];
    for (let i = 0; i < chunks.length; i += 2) {
      const batch = chunks.slice(i, i + 2);
      const results = await Promise.all(batch.map(chunk => this.client.chunk(Number(chunk.x), Number(chunk.y))));
      for (const result of results as MapChunk[]) {
        this.store.saveRawSnapshot(world.id, '/api/map/chunk', result);
        if (Array.isArray(result.tiles)) tiles.push(...result.tiles);
      }
    }
    this.store.replaceTiles(tiles, world.id, contentHash(manifest).slice(0, 24));
    this.store.upsertChangeEvents(diffMapSnapshot(world.id, previousTiles, tiles));
    return { manifest, tileCount: tiles.length };
  }

  private async capture<T>(endpoint: string, audits: SyncEndpointAudit[], fn: () => Promise<T>, options: { worldId?: string | null; inserted?: (value: T) => number; required?: boolean } = {}): Promise<T | null> {
    const start = Date.now();
    try {
      const value = await fn();
      const inserted = options.inserted?.(value);
      audits.push({ endpoint, ok: true, checkedAt: new Date().toISOString(), durationMs: Date.now() - start, inserted });
      if (endpoint !== '/api/login') this.store.saveRawSnapshot(options.worldId ?? this.store.activeWorld()?.id ?? null, endpoint, value);
      return value;
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Endpoint failed.';
      const rateLimited = /429|slower|rate/i.test(detail);
      audits.push({ endpoint, ok: false, checkedAt: new Date().toISOString(), durationMs: Date.now() - start, detail, backoffMs: rateLimited ? 120_000 : undefined });
      if (options.required) throw error;
      return null;
    }
  }

  private overlappingSince() {
    const latest = this.store.getState('latestReportTimeUtc');
    if (!latest) return undefined;
    const time = new Date(latest).getTime();
    if (!Number.isFinite(time)) return latest;
    return new Date(time - 15 * 60_000).toISOString();
  }

  private async performSync() {
    const audits: SyncEndpointAudit[] = [];
    const attemptAt = new Date().toISOString();
    try {
      const login = await this.capture('/api/login', audits, () => this.client.login(), { required: true });
      const sessionPayload = await this.capture('/api/session', audits, () => this.client.session(), { required: true });
      const session = ((sessionPayload as Record<string, unknown>).session ?? sessionPayload) as Session;
      this.store.saveSnapshot('session', { ...login, ...session, authenticated: true });

      const mine = await this.capture('/api/summary?scope=me', audits, () => this.client.summary('me'));
      const worldSummary = await this.capture('/api/summary?scope=world', audits, () => this.client.summary('world'));
      const status = await this.capture('/api/summary?status=1', audits, () => this.client.status());
      if (mine) this.store.saveSnapshot('summary:me', mine);
      if (worldSummary) this.store.saveSnapshot('summary:world', worldSummary);
      if (status) this.store.saveSnapshot('summary:status', status);

      const manifest = await this.capture('/api/map/manifest', audits, () => this.client.manifest());
      if (manifest) this.store.saveSnapshot('map:manifest', manifest);
      const activeWorld = deriveWorldRecord({
        session: { ...login as Session, ...session, authenticated: true },
        summaryMe: mine as WorldSummary | null,
        summaryWorld: worldSummary as WorldSummary | null,
        status: status as WorldSummary | null,
        manifest: manifest as MapManifest | null,
        previous: this.store.activeWorld()
      });
      this.store.upsertWorld(activeWorld);

      const medalsPayload = await this.capture('/api/medals', audits, () => this.client.medals(), { worldId: activeWorld.id });
      const knownReportIds = this.store.reportIds(activeWorld.id);
      const reports = await this.capture('/api/reports', audits, () => this.client.reports(this.overlappingSince()), { worldId: activeWorld.id });
      if (medalsPayload) {
        const medals = Array.isArray((medalsPayload as { items?: Medal[] }).items) ? (medalsPayload as { items: Medal[] }).items : (Array.isArray(medalsPayload) ? medalsPayload : []);
        this.store.saveSnapshot('medals', medals);
      }
      if (reports?.length) {
        this.store.upsertChangeEvents(reportEvents(activeWorld.id, reports, knownReportIds));
        this.store.upsertReports(reports, activeWorld.id);
        const latest = reports.map(report => report.timeUtc).filter(Boolean).sort().at(-1);
        if (latest) this.store.setState('latestReportTimeUtc', latest);
      }
      if (manifest) await this.capture('/api/map', audits, () => this.mapTiles(activeWorld), { worldId: activeWorld.id, inserted: value => value.tileCount });
      if ((session as Session).operator === true) {
        const leaderboard = await this.capture('/api/leaderboard', audits, () => this.client.leaderboard(), { worldId: activeWorld.id });
        if (leaderboard) this.store.saveSnapshot('leaderboard', leaderboard);
      } else {
        audits.push({ endpoint: '/api/leaderboard', ok: false, checkedAt: new Date().toISOString(), detail: 'Not requested: session does not report operator access.' });
      }
      const capabilities = buildCapabilityModel({
        worldId: activeWorld.id,
        session: { ...login as Session, ...session, authenticated: true },
        summaryMe: (mine ?? this.store.latestSnapshot('summary:me')) as WorldSummary | null,
        summaryWorld: (worldSummary ?? this.store.latestSnapshot('summary:world')) as WorldSummary | null,
        status: (status ?? this.store.latestSnapshot('summary:status')) as WorldSummary | null,
        reports: this.store.reports(500, activeWorld.id),
        reportDetails: [],
        tiles: this.store.tiles(activeWorld.id)
      });
      this.store.saveSnapshot('capabilities', capabilities);
      this.store.saveSnapshot('schema:audit', buildSchemaAudit({
        worldId: activeWorld.id,
        session: { ...login as Session, ...session, authenticated: true },
        summaryMe: this.store.latestSnapshot('summary:me'),
        summaryWorld: this.store.latestSnapshot('summary:world'),
        status: this.store.latestSnapshot('summary:status'),
        reports: this.store.reports(500, activeWorld.id),
        reportDetails: [],
        tiles: this.store.tiles(activeWorld.id)
      }));
      const now = new Date().toISOString();
      const anySuccess = audits.some(audit => audit.ok && audit.endpoint !== '/api/login');
      const lastSuccessAt = anySuccess ? now : this.store.getState('lastSyncAt');
      const staleMinutes = lastSuccessAt ? Math.max(0, Math.round((Date.now() - new Date(lastSuccessAt).getTime()) / 60_000)) : null;
      const schemaWarnings = capabilities.items.filter(item => !item.exposed && ['incomingMovements', 'currentFleets', 'currentResources'].includes(item.key)).map(item => `${item.label}: ${item.notes}`);
      this.store.saveSyncAudit({ lastAttemptAt: attemptAt, lastSuccessAt, staleMinutes, endpoints: audits, schemaWarnings });
      this.store.db.prepare('INSERT INTO sync_runs(world_id,attempted_at,successful_at,status,payload) VALUES(?,?,?,?,?)')
        .run(activeWorld.id, attemptAt, lastSuccessAt, anySuccess ? 'partial-or-ok' : 'failed', JSON.stringify({ endpoints: audits, schemaWarnings }));
      if (lastSuccessAt) this.store.setState('lastSyncAt', lastSuccessAt);
      this.store.setState('lastSyncStatus', audits.some(audit => !audit.ok && audit.endpoint !== '/api/leaderboard') ? 'partial' : 'ok');
      this.store.setState('lastSyncError', '');
      const analysis = buildStrategicAnalysis({
        session: this.store.latestSnapshot('session'),
        summary: this.store.latestSnapshot('summary:me'),
        manifest: this.store.latestSnapshot('map:manifest'),
        reports: this.store.reports(500, activeWorld.id),
        tiles: this.store.tiles(activeWorld.id),
        worldId: activeWorld.id,
        syncAudit: this.store.latestSyncAudit()
      });
      this.store.replaceDerived(analysis);
      return this.dashboard();
    } catch (error) {
      const lastSuccessAt = this.store.getState('lastSyncAt');
      const staleMinutes = lastSuccessAt ? Math.max(0, Math.round((Date.now() - new Date(lastSuccessAt).getTime()) / 60_000)) : null;
      this.store.saveSyncAudit({ lastAttemptAt: attemptAt, lastSuccessAt, staleMinutes, endpoints: audits, schemaWarnings: [] });
      this.store.setState('lastSyncStatus', 'error');
      this.store.setState('lastSyncError', error instanceof Error ? error.message : 'Telemetry sync failed.');
      throw error;
    }
  }
}
