import { z } from 'zod';
import type { MapChunk, MapManifest, Medal, ReportDetail, ReportSummary, Session, WorldSummary } from '../shared/types.js';

const objectSchema = z.object({}).catchall(z.unknown());
const sessionSchema = objectSchema;
const summarySchema = objectSchema;
const mapTileSchema = objectSchema.extend({ x: z.coerce.number(), y: z.coerce.number() });
const mapChunkSchema = objectSchema.extend({ tiles: z.array(mapTileSchema).default([]) });
const mapManifestSchema = objectSchema.extend({ chunks: z.array(objectSchema.extend({ x: z.coerce.number(), y: z.coerce.number() })).optional() });
const reportSummarySchema = objectSchema.extend({ id: z.union([z.string(), z.number()]) });

export class RiftborneApiError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

export class RiftborneClient {
  private cookie = '';
  private authenticating: Promise<Session> | null = null;

  constructor(
    private readonly baseUrl: string,
    private readonly username: string,
    private readonly password: string,
    private readonly fetchImpl: typeof fetch = fetch
  ) {}

  private safeError(status: number) {
    if (status === 401) return 'Riftborne session is not authorized.';
    if (status === 429) return 'Riftborne requested a slower refresh rate.';
    return `Riftborne API returned HTTP ${status}.`;
  }

  private async raw(path: string, init: RequestInit = {}, attempt = 0): Promise<unknown> {
    const headers = new Headers(init.headers);
    headers.set('accept', 'application/json');
    headers.set('content-type', 'application/json');
    headers.set('user-agent', 'Riftborne-Command/0.1 (+local private guide; contact via account owner)');
    if (this.cookie) headers.set('cookie', this.cookie);

    const response = await this.fetchImpl(new URL(path, this.baseUrl), { ...init, headers, redirect: 'manual' });
    const setCookie = response.headers.get('set-cookie');
    if (setCookie) this.cookie = setCookie.split(';', 1)[0];

    if (response.status === 429 && attempt < 3) {
      const retryAfter = Math.min(60, Math.max(2, Number(response.headers.get('retry-after') ?? 2)));
      await new Promise(resolve => setTimeout(resolve, retryAfter * 1000 * (attempt + 1)));
      return this.raw(path, init, attempt + 1);
    }
    if (!response.ok) throw new RiftborneApiError(this.safeError(response.status), response.status);
    return response.json().catch(() => ({}));
  }

  async login(): Promise<Session> {
    if (this.authenticating) return this.authenticating;
    this.authenticating = (async () => {
      const payload = objectSchema.parse(await this.raw('/api/login', {
        method: 'POST',
        body: JSON.stringify({ username: this.username, password: this.password })
      }));
      return sessionSchema.parse(payload.session ?? payload) as Session;
    })().finally(() => { this.authenticating = null; });
    return this.authenticating;
  }

  async logout() {
    if (this.cookie) await this.raw('/api/logout', { method: 'POST', body: '{}' }).catch(() => null);
    this.cookie = '';
  }

  private async get<T>(path: string, retryAuth = true): Promise<T> {
    if (!this.cookie) await this.login();
    try {
      return objectSchema.parse(await this.raw(path)) as T;
    } catch (error) {
      if (retryAuth && error instanceof RiftborneApiError && error.status === 401) {
        this.cookie = '';
        await this.login();
        return this.get<T>(path, false);
      }
      throw error;
    }
  }

  async session() { return sessionSchema.parse(await this.get<Session>('/api/session')) as Session; }
  async summary(scope: 'me' | 'world') { return summarySchema.parse(await this.get<WorldSummary>(`/api/summary?scope=${scope}`)) as WorldSummary; }
  async status() { return summarySchema.parse(await this.get<WorldSummary>('/api/summary?status=1')) as WorldSummary; }
  medals() { return this.get<{ items?: Medal[] } & Record<string, unknown>>('/api/medals'); }
  async manifest() { return mapManifestSchema.parse(await this.get<MapManifest>('/api/map/manifest')) as MapManifest; }
  async chunk(x: number, y: number) { return mapChunkSchema.parse(await this.get<MapChunk>(`/api/map/chunk?x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}`)) as MapChunk; }
  report(id: string) { return this.get<{ report: ReportDetail }>(`/api/report?id=${encodeURIComponent(id)}`); }
  leaderboard() { return this.get<Record<string, unknown>>('/api/leaderboard'); }

  async reports(sinceTimeUtc?: string): Promise<ReportSummary[]> {
    const all: ReportSummary[] = [];
    const pageSize = 5000;
    for (let offset = 0; ; offset += pageSize) {
      const params = new URLSearchParams({ limit: String(pageSize), offset: String(offset) });
      if (sinceTimeUtc) params.set('sinceTimeUtc', sinceTimeUtc);
      const payload = await this.get<{ items?: ReportSummary[]; total?: number }>(`/api/reports?${params}`);
      const page = Array.isArray(payload.items) ? z.array(reportSummarySchema).parse(payload.items) as ReportSummary[] : [];
      all.push(...page);
      if (!page.length || page.length < pageSize || all.length >= Number(payload.total ?? all.length)) break;
    }
    return all;
  }
}
