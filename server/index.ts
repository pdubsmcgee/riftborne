import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { z } from 'zod';
import { answerQuestion } from './assistant.js';
import { config, publicConfig } from './config.js';
import { Store } from './db.js';
import { seedKnowledge } from './knowledge.js';
import { RiftborneClient } from './riftborne-client.js';
import { SyncService } from './sync.js';
import { importJsonPayload } from './importer.js';
import { buildForecast } from './forecast.js';
import { buildAlerts } from './alerts.js';
import { buildFactionStrategy } from './faction-strategy.js';
import { buildBridgePlan, buildDecisionCards, buildResourcePlan } from './decision-tools.js';
import { assessDeal, buildBorrowerProfiles, buildOrganizationState } from './organization.js';

const app = Fastify({ logger: { redact: ['req.headers.authorization', 'req.headers.cookie', 'body.password', 'body.payload'] }, bodyLimit: 25 * 1024 * 1024 });
const store = new Store(config.DATABASE_PATH);
seedKnowledge(store);
const client = new RiftborneClient(config.RIFTBORNE_LOGS_BASE_URL, config.RIFTBORNE_LOGS_USERNAME, config.RIFTBORNE_LOGS_PASSWORD);
const sync = new SyncService(store, client, config.RIFTBORNE_SYNC_INTERVAL_MINUTES);

app.get('/api/health', async () => ({ ok: true, ...publicConfig() }));
app.get('/api/world', async () => sync.dashboard());
app.get('/api/capabilities', async () => ({ capabilities: sync.dashboard().capabilities, activeWorld: store.activeWorld(), syncAudit: store.latestSyncAudit() }));
app.get('/api/schema-audit', async () => store.latestSnapshot('schema:audit') ?? { generatedAt: new Date().toISOString(), worldId: store.activeWorld()?.id ?? null, endpoints: [] });
app.get('/api/history', async request => {
  const query = z.object({ worldId: z.string().min(1).max(200).optional() }).parse(request.query);
  return store.history(query.worldId ?? undefined);
});
app.get('/api/forecast', async request => {
  const query = z.object({ worldId: z.string().min(1).max(200).optional() }).parse(request.query);
  const worldId = query.worldId ?? store.activeWorld()?.id ?? null;
  const dashboard = sync.dashboard();
  const forecast = buildForecast({ world: worldId ? store.worlds().find(world => world.id === worldId) ?? store.activeWorld() : store.activeWorld(), analysis: dashboard.analysis, events: store.changeEvents(500, worldId), syncAudit: store.latestSyncAudit() });
  store.saveForecastRun(forecast);
  return { ...forecast, backtest: store.forecastBacktest(worldId) };
});
app.get('/api/alerts', async request => {
  const query = z.object({ worldId: z.string().min(1).max(200).optional() }).parse(request.query);
  const worldId = query.worldId ?? store.activeWorld()?.id ?? null;
  const dashboard = sync.dashboard();
  const world = worldId ? store.worlds().find(item => item.id === worldId) ?? store.activeWorld() : store.activeWorld();
  store.upsertAlerts(buildAlerts({ world, events: store.changeEvents(300, worldId), analysis: dashboard.analysis, syncAudit: store.latestSyncAudit(), manualState: store.manualState(worldId) }));
  return store.alertState(worldId);
});
app.get('/api/factions', async request => {
  const query = z.object({ worldId: z.string().min(1).max(200).optional() }).parse(request.query);
  const worldId = query.worldId ?? store.activeWorld()?.id ?? null;
  const dashboard = sync.dashboard();
  const world = worldId ? store.worlds().find(item => item.id === worldId) ?? store.activeWorld() : store.activeWorld();
  const forecast = buildForecast({ world, analysis: dashboard.analysis, events: store.changeEvents(500, worldId), syncAudit: store.latestSyncAudit() });
  return buildFactionStrategy({ world, analysis: dashboard.analysis, events: store.changeEvents(500, worldId), forecasts: forecast.items });
});
app.get('/api/bridge-plan', async () => {
  const dashboard = sync.dashboard();
  return buildBridgePlan({ analysis: dashboard.analysis, worldId: store.activeWorld()?.id ?? null });
});
app.get('/api/resource-plan', async request => {
  const query = z.object({ resource: z.enum(['deuterium', 'vulkron', 'aurelite', 'astra', 'rare', 'noctium']).default('deuterium') }).parse(request.query);
  const dashboard = sync.dashboard();
  return buildResourcePlan({ analysis: dashboard.analysis, worldId: store.activeWorld()?.id ?? null, resource: query.resource });
});
app.get('/api/decision-cards', async () => {
  const dashboard = sync.dashboard();
  const worldId = store.activeWorld()?.id ?? null;
  const bridgePlan = buildBridgePlan({ analysis: dashboard.analysis, worldId });
  const deuterium = buildResourcePlan({ analysis: dashboard.analysis, worldId, resource: 'deuterium' });
  const organization = buildOrganizationState({
    worldId,
    analysis: dashboard.analysis,
    account: store.organizationAccount(worldId),
    loans: store.organizationLoans(worldId),
    repayments: store.organizationRepayments(worldId),
    contracts: store.organizationContracts(worldId)
  });
  return { items: buildDecisionCards({ analysis: dashboard.analysis, worldId, bridgePlan, resourcePlans: [deuterium], businessCards: organization.businessCards }), bridgePlan, resourcePlans: [deuterium], organization };
});
app.get('/api/organization', async () => {
  const dashboard = sync.dashboard();
  const worldId = store.activeWorld()?.id ?? null;
  return buildOrganizationState({
    worldId,
    analysis: dashboard.analysis,
    account: store.organizationAccount(worldId),
    loans: store.organizationLoans(worldId),
    repayments: store.organizationRepayments(worldId),
    contracts: store.organizationContracts(worldId)
  });
});
app.post('/api/organization/account', async request => {
  const body = z.object({
    id: z.string().min(1).max(80).optional(),
    name: z.string().min(1).max(120).optional(),
    capitalNoctmarks: z.coerce.number().min(0).optional(),
    reserveNoctmarks: z.coerce.number().min(0).optional(),
    goal: z.enum(['profit-engine', 'faction-bank', 'war-funding']).optional()
  }).parse(request.body);
  store.saveOrganizationAccount(body);
  return buildOrganizationState({ worldId: store.activeWorld()?.id ?? null, analysis: sync.dashboard().analysis, account: store.organizationAccount(), loans: store.organizationLoans(), repayments: store.organizationRepayments(), contracts: store.organizationContracts() });
});
app.get('/api/organization/loans', async () => ({ items: store.organizationLoans(), organization: await app.inject({ method: 'GET', url: '/api/organization' }).then(r => JSON.parse(r.payload)) }));
app.post('/api/organization/loans', async request => {
  const body = z.object({
    id: z.string().min(1).max(120).optional(),
    borrower: z.string().min(1).max(120),
    faction: z.string().max(120).default(''),
    principalNoctmarks: z.coerce.number().min(0),
    outstandingNoctmarks: z.coerce.number().min(0).optional(),
    dailyRatePercent: z.coerce.number().min(0).max(100),
    startDate: z.string().min(4).max(30),
    maturityDate: z.string().min(4).max(30),
    collateral: z.string().max(1000).default(''),
    notes: z.string().max(2000).default(''),
    status: z.enum(['proposed', 'active', 'repaid', 'late', 'defaulted']).default('proposed'),
    purpose: z.enum(['expansion', 'fleet', 'market', 'keystone', 'emergency', 'other']).default('other')
  }).parse(request.body);
  store.saveOrganizationLoan(body);
  return buildOrganizationState({ worldId: store.activeWorld()?.id ?? null, analysis: sync.dashboard().analysis, account: store.organizationAccount(), loans: store.organizationLoans(), repayments: store.organizationRepayments(), contracts: store.organizationContracts() });
});
app.get('/api/organization/contracts', async () => ({ items: store.organizationContracts() }));
app.post('/api/organization/contracts', async request => {
  const body = z.object({
    id: z.string().min(1).max(120).optional(),
    target: z.string().min(1).max(160),
    payer: z.string().max(120).default(''),
    rewardNoctmarks: z.coerce.number().min(0),
    requiredAction: z.string().min(1).max(500),
    deadline: z.string().max(40).nullable().optional(),
    status: z.enum(['watch', 'posted', 'accepted', 'completed', 'expired', 'cancelled']).default('watch'),
    riskNotes: z.string().max(1500).default('')
  }).parse(request.body);
  store.saveOrganizationContract(body);
  return buildOrganizationState({ worldId: store.activeWorld()?.id ?? null, analysis: sync.dashboard().analysis, account: store.organizationAccount(), loans: store.organizationLoans(), repayments: store.organizationRepayments(), contracts: store.organizationContracts() });
});
app.post('/api/organization/deal-check', async request => {
  const body = z.object({
    borrower: z.string().min(1).max(120),
    principalNoctmarks: z.coerce.number().min(0),
    dailyRatePercent: z.coerce.number().min(0).max(100),
    startDate: z.string().min(4).max(30),
    maturityDate: z.string().min(4).max(30)
  }).parse(request.body);
  const dashboard = sync.dashboard();
  const borrowers = buildBorrowerProfiles({ analysis: dashboard.analysis, loans: store.organizationLoans() });
  const borrower = borrowers.find(item => item.name.toLowerCase() === body.borrower.toLowerCase()) ?? { name: body.borrower, faction: '', riskLabel: 'unknown credit' as const, riskScore: 65, openLoans: 0, totalOutstanding: 0, reports: 0, holdings: 0, evidence: ['No local borrower history yet.'] };
  return assessDeal({ borrower, principalNoctmarks: body.principalNoctmarks, dailyRatePercent: body.dailyRatePercent, startDate: body.startDate, maturityDate: body.maturityDate });
});
app.post('/api/alerts/:id', async request => {
  const params = z.object({ id: z.string().min(1).max(200) }).parse(request.params);
  const body = z.object({ action: z.enum(['ack', 'snooze', 'clear-snooze']), minutes: z.coerce.number().min(5).max(1440).default(60) }).parse(request.body);
  store.setAlertState(params.id, body.action, body.minutes);
  return store.alertState();
});
app.get('/api/manual-state', async () => ({ items: store.manualState(), activeWorld: store.activeWorld() }));
app.post('/api/manual-state', async request => {
  const body = z.object({
    subject: z.enum(['economy', 'fleet', 'profile', 'diplomacy']),
    payload: z.record(z.string(), z.unknown())
  }).parse(request.body);
  const saved = store.saveManualState(body);
  return { saved, items: store.manualState(saved.worldId) };
});
app.get('/api/map', async () => {
  const dashboard = sync.dashboard();
  return { tiles: store.tiles(store.activeWorld()?.id ?? null), manifest: store.latestSnapshot('map:manifest'), analysis: dashboard.analysis, updatedAt: store.getState('lastSyncAt') };
});
app.get('/api/recommendations', async () => {
  const dashboard = sync.dashboard();
  return { items: dashboard.recommendations, analysis: dashboard.analysis, updatedAt: store.getState('lastSyncAt') };
});
app.post('/api/sync', async (_request, reply) => {
  try { return await sync.sync(); }
  catch (error) { return reply.code(502).send({ error: error instanceof Error ? error.message : 'Sync failed.', cached: sync.dashboard() }); }
});
app.post('/api/import/json', async request => {
  const body = z.object({
    filename: z.string().min(1).max(260).default('import.json'),
    payload: z.unknown(),
    worldId: z.string().min(1).max(200).optional()
  }).parse(request.body);
  const result = importJsonPayload(store, { filename: body.filename, payload: body.payload, worldId: body.worldId });
  return { result, history: store.history(result.worldId) };
});
app.get('/api/guide/search', async request => {
  const query = z.object({ q: z.string().max(200).default(''), topic: z.string().max(50).default('') }).parse(request.query);
  return { items: store.searchFacts(query.q, query.topic), retrievedAt: new Date().toISOString() };
});
app.post('/api/assistant', async request => {
  const body = z.object({ question: z.string().min(2).max(1000) }).parse(request.body);
  const facts = store.searchFacts(body.question, '', 12);
  const fallbackFacts = facts.length ? facts : store.searchFacts('', '', 12);
  const dashboard = sync.dashboard();
  return answerQuestion({ question: body.question, facts: fallbackFacts, recommendations: dashboard.recommendations, analysis: dashboard.analysis, apiKey: config.OPENAI_API_KEY, model: config.OPENAI_MODEL });
});
app.get('/api/reports/:id', async request => {
  const { id } = z.object({ id: z.string().min(1).max(200) }).parse(request.params);
  const payload = await client.report(id);
  store.saveSnapshot(`report:${id}`, payload.report);
  return payload;
});

const dist = resolve('dist');
if (existsSync(dist)) {
  await app.register(fastifyStatic, { root: dist });
  app.setNotFoundHandler((request, reply) => request.url.startsWith('/api/') ? reply.code(404).send({ error: 'Not found' }) : reply.sendFile('index.html'));
}

const close = async () => { sync.stop(); await client.logout(); store.close(); await app.close(); };
process.on('SIGINT', () => close().finally(() => process.exit(0)));
process.on('SIGTERM', () => close().finally(() => process.exit(0)));

await app.listen({ host: '127.0.0.1', port: config.PORT });
app.log.info({
  port: config.PORT,
  database: config.DATABASE_PATH,
  baseUrl: config.RIFTBORNE_LOGS_BASE_URL,
  syncIntervalMinutes: config.RIFTBORNE_SYNC_INTERVAL_MINUTES,
  cachedLastSyncAt: store.getState('lastSyncAt'),
  activeWorldId: store.activeWorld()?.id ?? null
}, 'Riftborne Command started with cached data available.');
sync.start();
void sync.sync()
  .then(() => app.log.info({ lastSyncAt: store.getState('lastSyncAt'), activeWorldId: store.activeWorld()?.id ?? null }, 'Startup safe sync completed.'))
  .catch(error => app.log.warn({ message: error instanceof Error ? error.message : 'Startup sync failed.' }, 'Startup safe sync failed; cached data remains available.'));
