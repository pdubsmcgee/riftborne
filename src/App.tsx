import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Bot,
  ChevronRight,
  CircleAlert,
  Crosshair,
  Database,
  Bell,
  Clock,
  DollarSign,
  Flag,
  Gauge,
  Hexagon,
  Map,
  Radar,
  RefreshCw,
  Route,
  Search,
  ShieldAlert,
  Swords,
  Target,
  Timer,
  Waypoints
} from 'lucide-react';
import type { AlertState, BridgeCandidate, CapabilityItem, ChangeEvent, DashboardState, DealRiskAssessment, DecisionCard, ExpeditionMetric, FactionStrategyState, FleetPlan, ForecastState, HistoryState, KnowledgeFact, ManualStateSnapshot, OrganizationState, Recommendation, ReportSummary, ResourcePlan, TileMetric } from '../shared/types';
import { api } from './api';
import { GalaxyMap } from './GalaxyMap';

type View = 'overview' | 'alerts' | 'galaxy' | 'history' | 'forecast' | 'intelligence' | 'factions' | 'organization' | 'keystones' | 'economy' | 'fleet' | 'guide' | 'settings';
const empty: DashboardState = { connected: false, session: null, summary: null, reports: [], tiles: [], medals: [], recommendations: [], analysis: null, syncAudit: null, capabilities: null, activeWorld: null, lastSyncAt: null, stale: false };
const nav: Array<{ id: View; label: string; icon: typeof Activity }> = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'galaxy', label: 'Galaxy', icon: Map },
  { id: 'history', label: 'History', icon: Clock },
  { id: 'forecast', label: 'Forecast', icon: Activity },
  { id: 'intelligence', label: 'Intelligence', icon: Radar },
  { id: 'factions', label: 'Factions', icon: Flag },
  { id: 'organization', label: 'Organization', icon: DollarSign },
  { id: 'keystones', label: 'Keystones', icon: Target },
  { id: 'economy', label: 'Economy', icon: Database },
  { id: 'fleet', label: 'Fleet', icon: Swords },
  { id: 'guide', label: 'Guide', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Waypoints }
];

function str(value: unknown) { return typeof value === 'string' ? value : ''; }
function displayDate(value: string | null | undefined) {
  if (!value) return 'Never';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(date);
}
function number(value: unknown) { const n = Number(value); return Number.isFinite(n) ? n : 0; }
function reportTitle(report: ReportSummary) { return str(report.title || report.type || report.mission || report.missionType) || 'Battle report'; }
function reportPlayers(report: ReportSummary) { return [report.attackerName || report.attacker, report.defenderName || report.defender].map(str).filter(Boolean).join(' -> ') || 'Participants classified'; }

export function App() {
  const [view, setView] = useState<View>('overview');
  const [state, setState] = useState<DashboardState>(empty);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { api.world().then(setState).catch(err => setError(err.message)).finally(() => setLoading(false)); }, []);
  async function sync() {
    setSyncing(true);
    setError('');
    try { setState(await api.sync()); }
    catch (err) { setError(err instanceof Error ? err.message : 'Sync failed'); }
    finally { setSyncing(false); }
  }
  const identity = str(state.session?.displayName || state.session?.username || state.session?.playerName) || 'Local commander';

  return <div className="app-shell">
    <aside className="rail">
      <div className="brand"><Hexagon size={22}/><div><strong>RIFTBORNE</strong><span>COMMAND / 02</span></div></div>
      <nav>{nav.map(item => <button key={item.id} className={view === item.id ? 'active' : ''} onClick={() => setView(item.id)}><item.icon size={17}/><span>{item.label}</span></button>)}</nav>
      <div className="rail-status"><span className={`signal ${state.connected ? 'online' : ''}`}/><div><strong>{state.connected ? 'Analysis linked' : 'Archive offline'}</strong><span>{displayDate(state.lastSyncAt)}</span></div></div>
    </aside>
    <main>
      <header className="topbar">
        <div><span className="eyebrow">PRIVATE STRATEGY NODE</span><h1>{nav.find(item => item.id === view)?.label}</h1></div>
        <div className="top-actions">
          <div className="commander"><span>{identity}</span><small>{state.activeWorld?.label || str(state.session?.faction) || 'WORLD UNCONFIRMED'}</small></div>
          <button className="sync-button" onClick={sync} disabled={syncing}><RefreshCw size={15} className={syncing ? 'spin' : ''}/>{syncing ? 'Synchronizing' : 'Sync field'}</button>
        </div>
      </header>
      {error && <div className="error-strip"><CircleAlert size={15}/><span>{error}</span><button onClick={() => setError('')}>Dismiss</button></div>}
      <div className={`workspace ${loading ? 'loading' : ''}`}>
        {view === 'overview' && <Overview state={state} onNavigate={setView} onSync={sync}/>}
        {view === 'alerts' && <Alerts state={state}/>}
        {view === 'galaxy' && <Galaxy state={state}/>}
        {view === 'history' && <History state={state}/>}
        {view === 'forecast' && <Forecast state={state}/>}
        {view === 'intelligence' && <Intelligence state={state}/>}
        {view === 'factions' && <Factions state={state}/>}
        {view === 'organization' && <Organization state={state}/>}
        {view === 'keystones' && <Keystones state={state}/>}
        {view === 'economy' && <Economy state={state}/>}
        {view === 'fleet' && <Fleet state={state}/>}
        {view === 'guide' && <Guide state={state}/>}
        {view === 'settings' && <Settings state={state}/>}
      </div>
    </main>
  </div>;
}

function Overview({ state, onNavigate, onSync }: { state: DashboardState; onNavigate: (view: View) => void; onSync: () => void }) {
  const analysis = state.analysis;
  const [decisions, setDecisions] = useState<DecisionCard[]>([]);
  const [resourcePlan, setResourcePlan] = useState<ResourcePlan | null>(null);
  const [modeMessage, setModeMessage] = useState('');
  useEffect(() => { api.decisionCards().then(result => setDecisions(result.items)).catch(() => null); }, [state.lastSyncAt]);
  async function quick(kind: 'deuterium' | 'expand' | 'danger' | 'changed' | 'business' | 'loan') {
    setModeMessage('');
    try {
      if (kind === 'deuterium') {
        const plan = await api.resourcePlan('deuterium');
        setResourcePlan(plan);
        setModeMessage(plan.bestNow ? `Use ${plan.bestNow.terrain} at ${plan.bestNow.key} for Deuterium if it is still open/legal.` : 'No Deuterium candidate found in visible cache.');
      } else if (kind === 'expand') {
        const plan = await api.bridgePlan();
        setModeMessage(plan.best ? `Best bridge expansion: ${plan.best.terrain} at ${plan.best.key}.` : 'No bridge candidate found.');
      } else if (kind === 'danger') {
        const danger = analysis?.commanderProfiles.find(profile => profile.relation === 'opponent' && profile.threatScore > 0);
        setModeMessage(danger ? `${danger.name} is the top visible opponent pressure: threat ${Math.round(danger.threatScore)}, reports ${danger.reports}.` : 'No high-confidence opponent pressure is visible.');
      } else if (kind === 'changed') {
        onNavigate('history');
      } else if (kind === 'business') {
        const org = await api.organization();
        setModeMessage(org.businessCards[0]?.answer ?? 'Enter organization capital or a loan to unlock business cards.');
      } else {
        onNavigate('organization');
      }
    } catch (error) {
      setModeMessage(error instanceof Error ? error.message : 'Decision request failed.');
    }
  }
  const occupied = state.tiles.filter(tile => tile.owner || tile.ownerName || tile.playerName || tile.base?.ownerName).length;
  const facts = [
    { label: 'Known tiles', value: state.tiles.length.toLocaleString(), hint: state.tiles.length ? 'Map archive' : 'Awaiting sync' },
    { label: 'Occupied sites', value: occupied.toLocaleString(), hint: 'Visible ownership' },
    { label: 'Threat contacts', value: String(analysis?.commanderProfiles.filter(item => item.threatScore > 0).length ?? 0), hint: 'Profiled from reports' },
    { label: 'Field age', value: state.syncAudit?.staleMinutes ? `${state.syncAudit.staleMinutes}m` : displayDate(state.lastSyncAt), hint: state.stale ? 'Last attempt failed' : 'Last good sync' }
  ];
  return <div className="overview enter">
    <section className="status-band compact">
      <div><span className="eyebrow">DECISION MODE</span><h2>{decisions[0]?.title ?? (state.connected ? 'Pick the next useful move.' : 'Build the first strategic baseline.')}</h2><p>{decisions[0]?.answer ?? (state.connected ? 'Use the quick intents below for one concrete answer instead of browsing generic dashboards.' : 'Run one read-only sync to reconstruct the visible field and start scoring useful decisions.')}</p></div>
      {!state.connected && <button className="primary" onClick={onSync}><Database size={16}/>Initialize archive</button>}
    </section>
    <section className="quick-intents">
      <button onClick={() => quick('deuterium')}>I need Deuterium</button>
      <button onClick={() => quick('expand')}>Where should I expand?</button>
      <button onClick={() => quick('danger')}>Who is dangerous?</button>
      <button onClick={() => quick('changed')}>What changed?</button>
      <button onClick={() => quick('business')}>Business opportunity</button>
      <button onClick={() => quick('loan')}>Loan calculator</button>
    </section>
    {modeMessage && <section className="decision-answer"><strong>{modeMessage}</strong>{resourcePlan?.bestNow && <CandidateMini candidate={resourcePlan.bestNow}/>}</section>}
    <section className="metric-line">{facts.map(fact => <div key={fact.label}><span>{fact.label}</span><strong>{fact.value}</strong><small>{fact.hint}</small></div>)}</section>
    {analysis?.alerts.length ? <section className="alert-row">{analysis.alerts.map(alert => <article key={alert.id} className={alert.severity}><CircleAlert size={15}/><div><strong>{alert.title}</strong><span>{alert.detail}</span></div></article>)}</section> : null}
    <FleetReadiness plans={analysis?.fleetPlans ?? []}/>
    <section className="decision-grid">
      <div className="priorities"><div className="section-head"><div><span className="eyebrow">RANKED ACTIONS</span><h2>Recommended moves</h2></div><button className="text-button" onClick={() => onNavigate('settings')}>Compare targets <ChevronRight size={14}/></button></div>
        {decisions.length ? <DecisionCardList cards={decisions.slice(0, 6)}/> : <div className="recommendation-list">{state.recommendations.map((rec, i) => <RecommendationRow key={rec.id} rec={rec} index={i}/>)}</div>}
      </div>
      <div className="field-preview"><div className="section-head"><div><span className="eyebrow">FIELD SIGNAL</span><h2>Opportunity surface</h2></div><button className="icon-button" onClick={() => onNavigate('galaxy')} aria-label="Open galaxy"><Crosshair size={17}/></button></div><GalaxyMap tiles={state.tiles} reports={state.reports} analysis={analysis}/></div>
    </section>
  </div>;
}

function CandidateMini({ candidate }: { candidate: BridgeCandidate }) {
  return <div className="candidate-mini"><span>{candidate.terrain} {candidate.key}</span><span>score {Math.round(candidate.score)}</span><span>threat {Math.round(candidate.threatScore)}</span><span>{candidate.labels.join(', ')}</span></div>;
}

function DecisionCardList({ cards }: { cards: DecisionCard[] }) {
  return <div className="recommendation-list">{cards.map(card => <article className="decision-card" key={card.id}>
    <div className="rec-index">{String(card.rank).padStart(2, '0')}</div>
    <Target size={18}/>
    <div>
      <div className="rec-title"><h3>{card.title}</h3><span className={`risk ${card.risk}`}>{card.risk}</span><span className="score-pill">{Math.round(card.confidence * 100)}%</span></div>
      <p>{card.answer}</p>
      <small>{card.benefit}</small>
      <details><summary>Evidence and checks</summary>
        <div className="evidence-grid"><div><b>Facts</b>{card.confirmedFacts.slice(0, 5).map(item => <span key={item}>{item}</span>)}</div><div><b>Calculated</b>{card.calculatedValues.slice(0, 5).map(item => <span key={item}>{item}</span>)}</div><div><b>Missing</b>{card.missingData.slice(0, 5).map(item => <span key={item}>{item}</span>)}</div></div>
        <div className="verify">{card.verifyInGame.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div>
      </details>
    </div>
  </article>)}</div>;
}

function capability(state: DashboardState, key: string) {
  return state.capabilities?.items.find(item => item.key === key);
}

function Unsupported({ item, fallback }: { item?: CapabilityItem; fallback: string }) {
  return <div className="empty"><CircleAlert size={19}/><span>{item?.notes || fallback}</span></div>;
}

function Alerts({ state }: { state: DashboardState }) {
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  useEffect(() => { api.alerts().then(setAlertState).catch(() => null); }, [state.lastSyncAt]);
  async function action(id: string, kind: 'ack' | 'snooze' | 'clear-snooze') { setAlertState(await api.alertAction(id, kind, 120)); }
  async function testNotification() {
    if (!('Notification' in window)) return;
    const permission = Notification.permission === 'granted' ? 'granted' : await Notification.requestPermission();
    if (permission === 'granted') new Notification('Riftborne Command test', { body: 'Browser notifications are available for future alert delivery.' });
  }
  const incoming = capability(state, 'incomingMovements');
  const alerts = alertState?.alerts ?? [];
  return <div className="enter"><div className="view-intro"><div><span className="eyebrow">PERSISTENT RULE ENGINE</span><h2>Alerts</h2></div><p>{alertState?.note ?? 'Alerts are generated from visible observations, cached analysis, and manual state.'}</p><button className="sync-button" onClick={testNotification}>Test notification</button></div>
    <section className="metric-line"><div><span>Active alerts</span><strong>{alertState?.activeCount ?? 0}</strong><small>Ack/snooze suppresses repeats</small></div><div><span>Total records</span><strong>{alerts.length}</strong><small>Persistent local DB</small></div><div><span>Incoming telemetry</span><strong>{incoming?.exposed ? 'Yes' : 'No'}</strong><small>{incoming?.exposed ? 'Launch alerts enabled' : 'Earliest visible event only'}</small></div><div><span>Delivery</span><strong>In-app</strong><small>Browser test available</small></div></section>
    {alerts.length ? <section className="alert-center">{alerts.map(alert => <article key={alert.id} className={alert.severity}><div><strong>{alert.title}</strong><span>{alert.detail}</span><small>{displayDate(alert.createdAt)} | {Math.round(alert.confidence * 100)}% confidence</small></div><p>{alert.evidence.join(' | ')}</p><footer><button onClick={() => action(alert.id, 'ack')} disabled={Boolean(alert.acknowledgedAt)}>Acknowledge</button><button onClick={() => action(alert.id, 'snooze')}>Snooze 2h</button>{alert.snoozedUntil && <button onClick={() => action(alert.id, 'clear-snooze')}>Unsnooze</button>}</footer></article>)}</section> : <Unsupported item={incoming} fallback="No alert records yet. Incoming movement telemetry is not exposed, so launch-time attack alerts are unavailable until a visible report/change/manual state triggers one."/>}
  </div>;
}

function History({ state }: { state: DashboardState }) {
  const [history, setHistory] = useState<HistoryState | null>(null);
  const [worldId, setWorldId] = useState('');
  const [filter, setFilter] = useState('');
  const [importMessage, setImportMessage] = useState('');
  useEffect(() => { api.history(worldId).then(setHistory).catch(error => setImportMessage(error instanceof Error ? error.message : 'History load failed')); }, [worldId]);
  const events = (history?.events ?? []).filter(event => `${event.eventType} ${event.subjectKey} ${event.evidence.join(' ')}`.toLowerCase().includes(filter.toLowerCase()));
  async function importFile(file: File | null) {
    if (!file) return;
    setImportMessage(`Reading ${file.name}...`);
    try {
      const payload = JSON.parse(await file.text()) as unknown;
      const response = await api.importJson(file.name, payload);
      setHistory(response.history);
      setWorldId(response.result.worldId ?? '');
      setImportMessage(`${response.result.filename}: ${response.result.insertedReports} new reports, ${response.result.insertedTiles} current tiles, ${response.result.generatedEvents} new events. ${response.result.warnings.join(' ')}`);
    } catch (error) {
      setImportMessage(error instanceof Error ? error.message : 'Import failed');
    }
  }
  return <div className="enter history-view">
    <div className="view-intro"><div><span className="eyebrow">OBSERVATION HISTORY</span><h2>History</h2></div><p>{history?.note ?? 'Loading world-scoped history...'}</p></div>
    <section className="metric-line"><div><span>Active world</span><strong>{history?.activeWorld?.label || state.activeWorld?.label || 'Unknown'}</strong><small>{history?.activeWorld?.identitySource || state.activeWorld?.identitySource || 'not established'}</small></div><div><span>Map snapshots</span><strong>{history?.mapSnapshots.length ?? 0}</strong><small>Observed snapshots only</small></div><div><span>Events</span><strong>{history?.events.length ?? 0}</strong><small>Observed/reconstructed labeled</small></div><div><span>Since last sync</span><strong>{history?.sinceLastSync.length ?? 0}</strong><small>Latest attempt window</small></div></section>
    <section className="history-controls"><label><Search size={15}/><input value={filter} onChange={event => setFilter(event.target.value)} placeholder="Filter by event, player, faction, coordinate..."/></label><label><Map size={15}/><select value={worldId} onChange={event => setWorldId(event.target.value)}><option value="">Active world</option>{(history?.worlds ?? []).map(world => <option key={world.id} value={world.id}>{world.active ? 'Active: ' : ''}{world.label}</option>)}</select></label><label className="file-import"><Database size={15}/>Import JSON<input type="file" accept="application/json,.json" onChange={event => importFile(event.target.files?.[0] ?? null)}/></label></section>
    {importMessage && <div className="error-strip inline"><CircleAlert size={15}/><span>{importMessage}</span><button onClick={() => setImportMessage('')}>Dismiss</button></div>}
    <section className="history-map"><div className="section-head"><div><span className="eyebrow">VISUAL PROGRESSION</span><h2>Observed expansion/change layer</h2></div></div><GalaxyMap tiles={history?.tiles ?? state.tiles} reports={state.reports} analysis={state.analysis ? { ...state.analysis, historyEvents: history?.events ?? [] } : state.analysis}/></section>
    <section className="history-grid">
      <div><div className="section-head"><div><span className="eyebrow">SINCE LAST SYNC</span><h2>Fresh changes</h2></div></div><EventList events={history?.sinceLastSync ?? []}/></div>
      <div><div className="section-head"><div><span className="eyebrow">TIMELINE</span><h2>All events</h2></div></div><EventList events={events}/></div>
    </section>
  </div>;
}

function EventList({ events }: { events: ChangeEvent[] }) {
  if (!events.length) return <Empty text="No events match this view yet. New map/report observations will populate this timeline." />;
  return <div className="event-list">{events.slice(0, 120).map(event => <article key={event.id} className={event.severity}><div><strong>{event.eventType.replaceAll('_', ' ')}</strong><span>{event.subjectKey || 'world'}</span></div><time>{displayDate(event.occurredAt)}</time><p>{event.evidence.join(' | ')}</p><footer><span>{event.provenance}</span><span>{Math.round(event.confidence * 100)}% confidence</span></footer></article>)}</div>;
}

function Forecast({ state }: { state: DashboardState }) {
  const [forecast, setForecast] = useState<ForecastState | null>(null);
  useEffect(() => { api.forecast().then(setForecast).catch(() => null); }, []);
  const production = capability(state, 'productionRates');
  const analysisWithForecast = state.analysis ? { ...state.analysis, forecastItems: forecast?.items ?? [] } : state.analysis;
  return <div className="enter forecast-view"><div className="view-intro"><div><span className="eyebrow">TRANSPARENT PROJECTIONS</span><h2>Future projections</h2></div><p>{forecast?.note ?? 'Loading transparent rule-based projections...'}</p></div>
    <GalaxyMap tiles={state.tiles} reports={state.reports} analysis={analysisWithForecast}/>
    {forecast?.backtest && <section className="metric-line"><div><span>Backtested runs</span><strong>{forecast.backtest.evaluatedRuns}</strong><small>Saved forecast items</small></div><div><span>Hits</span><strong>{forecast.backtest.hits}</strong><small>Observed later events</small></div><div><span>Misses</span><strong>{forecast.backtest.misses}</strong><small>Not observed yet</small></div><div><span>Accuracy</span><strong>{forecast.backtest.accuracy === null ? '-' : `${Math.round(forecast.backtest.accuracy * 100)}%`}</strong><small>{forecast.backtest.calibrationNote}</small></div></section>}
    <section className="forecast-grid">{(forecast?.items ?? []).slice(0, 12).map(item => <article key={item.id}><div><strong>{item.title}</strong><span>{item.horizonHours}h | {item.category} | {item.likelihood}</span></div><p>{item.supportingFeatures.join(' | ')}</p><footer><span>{Math.round(item.probability * 100)}% scenario likelihood</span><span>{Math.round(item.confidence * 100)}% confidence</span></footer><small>Invalidated by: {item.invalidatedBy.slice(0, 2).join('; ')}</small></article>)}</section>
    <Unsupported item={production} fallback="Production-rate telemetry is not exposed by the current source, so resource-cap forecasts need manual state or future telemetry."/>
  </div>;
}

function Keystones({ state }: { state: DashboardState }) {
  const keystones = (state.analysis?.tileMetrics ?? []).filter(tile => /keystone|kraken|origin|inner|border|outer/i.test(`${tile.terrain} ${tile.baseKind}`));
  return <div className="enter"><div className="view-intro"><div><span className="eyebrow">KEYSTONE OPERATIONS</span><h2>Keystones</h2></div><p>Raw spyScore is treated as an observed target score, not a win probability.</p></div>{keystones.length ? <div className="candidate-strip">{keystones.map(tile => <TargetCard key={tile.key} tile={tile}/>)}</div> : <Empty text="No Keystone/KRAKEN tiles are identifiable in the current map cache."/>}</div>;
}

function Factions({ state }: { state: DashboardState }) {
  const [strategy, setStrategy] = useState<FactionStrategyState | null>(null);
  useEffect(() => { api.factions().then(setStrategy).catch(() => null); }, [state.lastSyncAt]);
  const summary = strategy?.summary;
  return <div className="enter faction-view">
    <div className="view-intro"><div><span className="eyebrow">FACTION WAR ROOM</span><h2>{strategy?.myFaction || 'Faction'} strategy and tactics</h2></div><p>{strategy?.note ?? 'Building faction strategy from visible holdings, reports, imports, and projections.'}</p></div>
    <section className="metric-line"><div><span>Friendly holdings</span><strong>{summary?.friendlyHoldings ?? 0}</strong><small>Same-faction visible bases</small></div><div><span>Hostile holdings</span><strong>{summary?.hostileHoldings ?? 0}</strong><small>Non-faction visible bases</small></div><div><span>Hostile commanders</span><strong>{summary?.hostileCommanders ?? 0}</strong><small>Report-profiled opponents</small></div><div><span>Recent events</span><strong>{summary?.recentFactionEvents ?? 0}</strong><small>Expansion/combat/objective changes</small></div></section>
    <section className="faction-grid">
      <div><div className="section-head"><div><span className="eyebrow">RANKED FACTION MOVES</span><h2>What we should coordinate</h2></div></div><div className="recommendation-list">{(strategy?.actions ?? []).map((item, index) => <article className="recommendation" key={item.id}><div className="rec-index">{String(index + 1).padStart(2, '0')}</div><Flag size={18}/><div><div className="rec-title"><h3>{item.title}</h3><span className={`risk ${item.risk}`}>{item.risk}</span><span className="score-pill">{Math.round(item.priority)}</span></div><p>{item.rationale}</p><small>{Math.round(item.confidence * 100)}% confidence | {item.scope}</small><div className="verify">{item.verifyInGame.slice(0, 3).map(check => <span key={check}>{check}</span>)}</div>{item.missingInformation.length ? <p className="why-now">Missing: {item.missingInformation.join(', ')}</p> : null}</div></article>)}</div></div>
      <aside className="intel-aside"><span className="eyebrow">FACTION PRESSURE</span><h3>Visible factions</h3>{(strategy?.factionProfiles ?? state.analysis?.factionProfiles ?? []).slice(0, 10).map(profile => <div className="contact" key={profile.faction}><span>{profile.faction}</span><i style={{ width: `${Math.min(100, profile.threatScore || profile.occupiedTiles)}%` }}/><strong>{profile.occupiedTiles}</strong></div>)}<div className="medals"><span className="eyebrow">TACTICAL POSTURE</span><strong>{strategy?.posture || 'balanced'}</strong><p>Prioritizes faction-safe gains over isolated greed.</p></div></aside>
    </section>
  </div>;
}

function Organization({ state }: { state: DashboardState }) {
  const [org, setOrg] = useState<OrganizationState | null>(null);
  const [message, setMessage] = useState('');
  const today = new Date().toISOString().slice(0, 10);
  const nextWeek = new Date(Date.now() + 7 * 86_400_000).toISOString().slice(0, 10);
  const [account, setAccount] = useState({ name: 'Local Organization', capitalNoctmarks: '0', reserveNoctmarks: '0', goal: 'profit-engine' });
  const [loan, setLoan] = useState({ borrower: '', faction: '', principalNoctmarks: '1000', dailyRatePercent: '1.5', startDate: today, maturityDate: nextWeek, collateral: '', notes: '', status: 'proposed', purpose: 'expansion' });
  const [deal, setDeal] = useState<DealRiskAssessment | null>(null);
  const [contract, setContract] = useState({ target: '', payer: '', rewardNoctmarks: '500', requiredAction: '', deadline: '', status: 'watch', riskNotes: '' });
  useEffect(() => { api.organization().then(result => { setOrg(result); setAccount({ name: result.account.name, capitalNoctmarks: String(result.account.capitalNoctmarks), reserveNoctmarks: String(result.account.reserveNoctmarks), goal: result.account.goal }); }).catch(() => null); }, [state.lastSyncAt]);
  async function saveAccount() {
    setOrg(await api.saveOrganizationAccount({ ...account, capitalNoctmarks: Number(account.capitalNoctmarks), reserveNoctmarks: Number(account.reserveNoctmarks) }));
    setMessage('Organization capital saved locally.');
  }
  async function checkDeal() {
    const result = await api.dealCheck({ borrower: loan.borrower || 'Unknown borrower', principalNoctmarks: Number(loan.principalNoctmarks), dailyRatePercent: Number(loan.dailyRatePercent), startDate: loan.startDate, maturityDate: loan.maturityDate });
    setDeal(result);
  }
  async function saveLoan() {
    setOrg(await api.saveLoan({ ...loan, principalNoctmarks: Number(loan.principalNoctmarks), outstandingNoctmarks: Number(loan.principalNoctmarks), dailyRatePercent: Number(loan.dailyRatePercent) }));
    setMessage('Loan saved to local ledger.');
  }
  async function saveContract() {
    setOrg(await api.saveContract({ ...contract, rewardNoctmarks: Number(contract.rewardNoctmarks), deadline: contract.deadline || null }));
    setMessage('Contract saved to local tracker.');
  }
  const loans = org?.loans ?? [];
  const activeLoans = loans.filter(item => !['repaid', 'defaulted'].includes(item.status));
  const outstanding = activeLoans.reduce((sum, item) => sum + item.outstandingNoctmarks, 0);
  return <div className="enter organization-view">
    <div className="view-intro"><div><span className="eyebrow">ORGANIZATION ECONOMY</span><h2>Profit ledger and deal desk</h2></div><p>{org?.telemetryWarning ?? 'Loan and market state are local/manual only.'}</p></div>
    {message && <div className="error-strip inline"><CircleAlert size={15}/><span>{message}</span><button onClick={() => setMessage('')}>Dismiss</button></div>}
    <section className="metric-line"><div><span>Capital</span><strong>{org?.account.capitalNoctmarks ?? 0}</strong><small>Noctmarks, manual</small></div><div><span>Reserve</span><strong>{org?.account.reserveNoctmarks ?? 0}</strong><small>Do-not-lend buffer</small></div><div><span>Outstanding</span><strong>{Math.round(outstanding)}</strong><small>{activeLoans.length} open loan(s)</small></div><div><span>Business alerts</span><strong>{org?.alerts.length ?? 0}</strong><small>Late/default risk</small></div></section>
    <section className="organization-grid">
      <div>
        <div className="section-head"><div><span className="eyebrow">BUSINESS CARDS</span><h2>What to do with the organization</h2></div></div>
        <DecisionCardList cards={org?.businessCards ?? []}/>
        <div className="section-head"><div><span className="eyebrow">LOAN BOOK</span><h2>Active and proposed loans</h2></div></div>
        <div className="profile-table org-table"><div><span>Borrower</span><span>Status</span><span>Outstanding</span><span>Rate</span><span>Maturity</span></div>{loans.map(item => <div key={item.id}><strong>{item.borrower}</strong><span className={`relation ${item.status === 'late' || item.status === 'defaulted' ? 'opponent' : item.status === 'repaid' ? 'ally' : 'unknown'}`}>{item.status}</span><span>{Math.round(item.outstandingNoctmarks)}</span><span>{item.dailyRatePercent}%</span><span>{item.maturityDate}</span></div>)}</div>
        <div className="section-head"><div><span className="eyebrow">BORROWER RISK</span><h2>Credit profiles</h2></div></div>
        <div className="profile-table org-table"><div><span>Name</span><span>Risk</span><span>Owes</span><span>Reports</span><span>Holdings</span></div>{(org?.borrowers ?? []).slice(0, 12).map(item => <div key={item.name}><strong>{item.name}</strong><span>{item.riskLabel}</span><span>{Math.round(item.totalOutstanding)}</span><span>{item.reports}</span><span>{item.holdings}</span></div>)}</div>
      </div>
      <aside className="deal-desk">
        <section><div className="section-head"><div><span className="eyebrow">CAPITAL</span><h2>Account</h2></div><button className="sync-button" onClick={saveAccount}>Save</button></div><input value={account.name} onChange={e => setAccount({ ...account, name: e.target.value })} placeholder="Organization name"/><input value={account.capitalNoctmarks} onChange={e => setAccount({ ...account, capitalNoctmarks: e.target.value })} placeholder="Capital Noctmarks"/><input value={account.reserveNoctmarks} onChange={e => setAccount({ ...account, reserveNoctmarks: e.target.value })} placeholder="Reserve Noctmarks"/><select value={account.goal} onChange={e => setAccount({ ...account, goal: e.target.value })}><option value="profit-engine">Profit engine</option><option value="faction-bank">Faction bank</option><option value="war-funding">War funding</option></select></section>
        <section><div className="section-head"><div><span className="eyebrow">LOAN CALCULATOR</span><h2>New loan</h2></div></div>{(['borrower','faction','principalNoctmarks','dailyRatePercent','startDate','maturityDate','collateral','notes'] as const).map(key => <input key={key} value={loan[key]} onChange={e => setLoan({ ...loan, [key]: e.target.value })} placeholder={key}/>)}
          <select value={loan.purpose} onChange={e => setLoan({ ...loan, purpose: e.target.value })}><option value="expansion">Expansion</option><option value="fleet">Fleet</option><option value="market">Market</option><option value="keystone">Keystone</option><option value="emergency">Emergency</option><option value="other">Other</option></select>
          <div className="button-row"><button className="sync-button" onClick={checkDeal}>Check deal</button><button className="sync-button" onClick={saveLoan}>Save loan</button></div>
          {deal && <div className="deal-result"><strong>{deal.recommendation}</strong><span>Daily interest: {deal.dailyInterest}</span><span>Total interest: {deal.totalInterestToMaturity}</span><span>Break-even: {deal.breakEvenRequiredProfit}</span><span>Risk: {deal.borrower.riskLabel}</span></div>}
        </section>
        <section><div className="section-head"><div><span className="eyebrow">CONTRACT TRACKER</span><h2>Manual contract</h2></div></div>{(['target','payer','rewardNoctmarks','requiredAction','deadline','riskNotes'] as const).map(key => <input key={key} value={contract[key]} onChange={e => setContract({ ...contract, [key]: e.target.value })} placeholder={key}/>)}
          <button className="sync-button" onClick={saveContract}>Save contract</button>
        </section>
      </aside>
    </section>
  </div>;
}

function Economy({ state }: { state: DashboardState }) {
  const keys = ['currentResources', 'storageCapacities', 'productionRates', 'astraUpkeep', 'tradeRoutes', 'loanMarketState'];
  return <div className="enter"><div className="view-intro"><div><span className="eyebrow">CAPABILITY-GATED ECONOMY</span><h2>Economy</h2></div><p>Economy advice is enabled only when telemetry or manual state exposes the required fields.</p></div><ManualStateForm subject="economy"/><CapabilityGrid items={(state.capabilities?.items ?? []).filter(item => keys.includes(item.key))}/></div>;
}

function Fleet({ state }: { state: DashboardState }) {
  return <div className="enter"><div className="view-intro"><div><span className="eyebrow">FLEET POSTURE</span><h2>Fleet</h2></div><p>Exact fleet composition math needs current inventory and ship stat inputs; current output remains assumption-labeled posture advice.</p></div><ManualStateForm subject="fleet"/><FleetReadiness plans={state.analysis?.fleetPlans ?? []}/><CapabilityGrid items={(state.capabilities?.items ?? []).filter(item => ['currentFleets', 'shipCompositions', 'trainingQueues', 'astraUpkeep'].includes(item.key))}/></div>;
}

function ManualStateForm({ subject }: { subject: ManualStateSnapshot['subject'] }) {
  const [text, setText] = useState(subject === 'economy' ? '{"astra":0,"astraUpkeepPerHour":0,"vulkron":0,"vulkronCapacity":0,"aurelite":0,"aureliteCapacity":0,"deuterium":0,"deuteriumCapacity":0,"astraCapacity":0}' : '{"ships":{},"notes":"Enter current ships, unlocked hulls, lanes, reserves."}');
  const [message, setMessage] = useState('');
  async function save() {
    try {
      const payload = JSON.parse(text) as Record<string, unknown>;
      const result = await api.saveManualState(subject, payload);
      setMessage(`Saved ${result.saved.subject} manual state at ${displayDate(result.saved.capturedAt)}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Manual state save failed');
    }
  }
  return <section className="manual-state"><div className="section-head"><div><span className="eyebrow">MANUAL STATE</span><h2>{subject === 'economy' ? 'Resource/upkeep input' : 'Fleet inventory input'}</h2></div><button className="sync-button" onClick={save}>Save manual state</button></div><textarea value={text} onChange={event => setText(event.target.value)} spellCheck={false}/>{message && <small>{message}</small>}</section>;
}

function Settings({ state }: { state: DashboardState }) {
  return <div className="planner enter"><div className="view-intro"><div><span className="eyebrow">SETTINGS AND CAPABILITY AUDIT</span><h2>Planner and telemetry support</h2></div><p>Use this as the Phase 1 control surface for expansion comparison and source availability.</p></div><Planner state={state}/><CapabilityGrid items={state.capabilities?.items ?? []}/></div>;
}

function CapabilityGrid({ items }: { items: CapabilityItem[] }) {
  if (!items.length) return <Empty text="No capability audit is cached yet. Run Sync field to inspect current telemetry keys."/>;
  return <div className="profile-table capability-table"><div><span>Capability</span><span>Status</span><span>Source</span><span>Fields</span><span>Notes</span></div>{items.map(item => <div key={item.key}><strong>{item.label}</strong><span className={`relation ${item.exposed ? 'self' : 'unknown'}`}>{item.exposed ? 'exposed' : 'not exposed'}</span><span>{item.endpoint || item.source}</span><span>{item.fields.slice(0, 3).join(', ') || '-'}</span><span>{item.notes}</span></div>)}</div>;
}

function RecommendationRow({ rec, index }: { rec: Recommendation; index: number }) {
  const icon = rec.category === 'threat' ? ShieldAlert : rec.category === 'combat' ? Swords : rec.category === 'expansion' ? Route : rec.category === 'expedition' ? Timer : Activity;
  const Icon = icon;
  return <article className="recommendation">
    <div className="rec-index">{String(index + 1).padStart(2, '0')}</div><Icon size={18}/>
    <div>
      <div className="rec-title"><h3>{rec.title}</h3><span className={`risk ${rec.risk}`}>{rec.risk}</span><span className="score-pill">{Math.round(rec.score ?? rec.confidence * 100)}</span></div>
      <p>{rec.rationale}</p>
      {rec.whyNow && <p className="why-now">{rec.whyNow}</p>}
      <small>{Math.round(rec.confidence * 100)}% confidence | {rec.expectedBenefit}</small>
      {rec.verifyInGame?.length ? <div className="verify">{rec.verifyInGame.slice(0, 3).map(item => <span key={item}>{item}</span>)}</div> : null}
    </div>
  </article>;
}

function Galaxy({ state }: { state: DashboardState }) {
  return <div className="galaxy-view enter"><div className="view-intro"><div><span className="eyebrow">TOROIDAL FIELD / VISIBLE DATA ONLY</span><h2>Galaxy operations map</h2></div><p>Switch layers to inspect value, threat, special sites, expeditions, ownership, and uncertainty.</p></div><GalaxyMap tiles={state.tiles} reports={state.reports} analysis={state.analysis}/></div>;
}

function Intelligence({ state }: { state: DashboardState }) {
  const analysis = state.analysis;
  const reports = state.reports;
  return <div className="intel-layout enter">
    <section>
      <div className="view-intro"><div><span className="eyebrow">COMBAT AND INTEL ARCHIVE</span><h2>Commander profiles</h2></div><p>{analysis?.reportMetrics.length ?? reports.length} report metrics in the local cache.</p></div>
      <div className="profile-table">
        <div><span>Commander</span><span>Relation</span><span>Threat</span><span>Reports</span><span>Last seen</span></div>
        {(analysis?.commanderProfiles ?? []).slice(0, 14).map(profile => <div key={profile.name}><strong>{profile.name}</strong><span className={`relation ${profile.relation}`}>{profile.relation}</span><span>{Math.round(profile.threatScore)}</span><span>{profile.reports}</span><span>{displayDate(profile.lastSeenUtc)}</span></div>)}
      </div>
      <div className="report-list">{reports.length ? reports.slice(0, 35).map(report => <article key={String(report.id)}><time>{displayDate(report.timeUtc)}</time><div><strong>{reportTitle(report)}</strong><span>{reportPlayers(report)}</span></div><span className="report-outcome">{str(report.outcome || report.result) || 'Recorded'}</span></article>) : <Empty text="No reports cached. Run Sync field to establish the archive."/>}</div>
    </section>
    <aside className="intel-aside">
      <span className="eyebrow">FACTION PRESSURE</span><h3>Visible factions</h3>
      {(analysis?.factionProfiles ?? []).slice(0, 8).map(profile => <div className="contact" key={profile.faction}><span>{profile.faction}</span><i style={{ width: `${Math.min(100, profile.threatScore)}%` }}/><strong>{Math.round(profile.threatScore)}</strong></div>)}
      <div className="medals"><span className="eyebrow">EXPEDITIONS</span><strong>{analysis?.expeditions.length ?? 0}</strong><p>Visible event opportunities</p></div>
    </aside>
  </div>;
}

function Guide({ state }: { state: DashboardState }) {
  const [facts, setFacts] = useState<KnowledgeFact[]>([]);
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<{ answer: string; citations: Array<{ title:string;url:string;fact:string }>; mode:string; warning?:string } | null>(null);
  const [asking, setAsking] = useState(false);
  useEffect(() => { api.guide(query, topic).then(result => setFacts(result.items)); }, [query, topic]);
  const topics = ['','overview','expansion','map','resources','economy','buildings','ships','fleets','combat','espionage','logistics','spu','factions','victory','controls'];
  async function ask() { if (!question.trim()) return; setAsking(true); try { setAnswer(await api.ask(question)); } finally { setAsking(false); } }
  return <div className="guide-layout enter">
    <section className="guide-browser"><div className="view-intro"><div><span className="eyebrow">PATCH-AWARE REFERENCE</span><h2>Field manual</h2></div><p>Official sources take precedence; tactical answers include current local analysis when relevant.</p></div><div className="search-box"><Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search mechanics, resources, ships..."/></div><div className="topic-strip">{topics.map(item => <button className={topic === item ? 'active' : ''} key={item || 'all'} onClick={() => setTopic(item)}>{item || 'all'}</button>)}</div><div className="facts">{facts.map(fact => <article key={fact.id}><div><span>{fact.topic}</span><small>v{fact.version} | {Math.round(fact.confidence * 100)}%</small></div><h3>{fact.title}</h3><p>{fact.body}</p><a href={fact.sourceUrl} target="_blank" rel="noreferrer">{fact.sourceTitle} <ChevronRight size={13}/></a></article>)}</div></section>
    <aside className="assistant-panel"><div><Bot size={20}/><span className="eyebrow">TACTICAL ASSISTANT</span><h2>Ask the archive</h2><p>Try: what should I do next, what fleet do I need, who is dangerous, or where should I expand?</p></div><textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="What fleet should I have right now?"/><button className="primary" onClick={ask} disabled={asking || !question.trim()}>{asking ? 'Consulting archive...' : 'Ask with sources'}</button>{state.analysis?.recommendations[0] && <div className="mini-priority"><span>Current top move</span><strong>{state.analysis.recommendations[0].title}</strong></div>}{answer && <div className="answer"><span className="mode">{answer.mode}</span><p>{answer.answer}</p>{answer.warning && <small>{answer.warning}</small>}<div>{answer.citations.slice(0,5).map(c => c.url === '#' ? <span key={c.fact}>{c.fact}</span> : <a key={c.fact} href={c.url} target="_blank" rel="noreferrer">{c.fact}</a>)}</div></div>}</aside>
  </div>;
}

function Planner({ state }: { state: DashboardState }) {
  const targets = useMemo(() => (state.analysis?.tileMetrics ?? []).filter(tile => !tile.ownerName).sort((a, b) => b.opportunityScore - a.opportunityScore).slice(0, 80), [state.analysis]);
  const [a, setA] = useState(''); const [b, setB] = useState('');
  const find = (key: string) => targets.find(tile => tile.key === key);
  const defaultA = a || targets[0]?.key || '';
  const defaultB = b || targets[1]?.key || '';
  return <div className="planner enter">
    <div className="view-intro"><div><span className="eyebrow">SCENARIO WORKBENCH</span><h2>Rank and compare expansion targets</h2></div><p>Scores combine resources, multipliers, slots, specials, wrapped distance, exposure, and uncertainty.</p></div>
    <div className="candidate-strip">{targets.slice(0, 6).map(tile => <TargetCard key={tile.key} tile={tile}/>)}</div>
    <div className="compare"><MetricChoice label="Candidate A" value={defaultA} setValue={setA} tiles={targets}/><div className="versus">VS</div><MetricChoice label="Candidate B" value={defaultB} setValue={setB} tiles={targets}/></div>
    <MetricComparison left={find(defaultA)} right={find(defaultB)}/>
    <Expeditions items={state.analysis?.expeditions ?? []}/>
    {!state.tiles.length && <Empty text="Map candidates become available after the first sync."/>}
  </div>;
}

function TargetCard({ tile }: { tile: TileMetric }) {
  return <article className="target-card"><span>{tile.terrain}</span><strong>{tile.key}</strong><div><b>Opp {Math.round(tile.opportunityScore)}</b><b>Risk {Math.round(tile.threatScore)}</b></div></article>;
}

function FleetReadiness({ plans }: { plans: FleetPlan[] }) {
  if (!plans.length) return null;
  return <section className="fleet-readiness"><div className="section-head"><div><span className="eyebrow">FLEET POSTURE</span><h2>What to have ready</h2></div></div>{plans.slice(0, 3).map(plan => <article key={plan.id}><Target size={16}/><div><div className="rec-title"><h3>{plan.title}</h3><span className={`risk ${plan.risk}`}>{plan.risk}</span><span className="score-pill">{plan.priority}</span></div><p>{plan.rationale}</p><div className="verify">{plan.composition.slice(0, 4).map(item => <span key={item}>{item}</span>)}</div></div></article>)}</section>;
}

function MetricChoice({ label, value, setValue, tiles }: { label:string; value:string; setValue:(v:string)=>void; tiles:TileMetric[] }) {
  return <label><span>{label}</span><select value={value} onChange={e => setValue(e.target.value)}><option value="">Select a ranked tile</option>{tiles.map(tile => <option key={tile.key} value={tile.key}>{tile.terrain} | {tile.key} | score {Math.round(tile.opportunityScore)}</option>)}</select></label>;
}

function MetricComparison({ left, right }: { left?: TileMetric; right?: TileMetric }) {
  const rows: Array<[string, (tile?: TileMetric) => string]> = [
    ['Opportunity', tile => tile ? String(Math.round(tile.opportunityScore)) : '-'],
    ['Threat', tile => tile ? String(Math.round(tile.threatScore)) : '-'],
    ['Uncertainty', tile => tile ? String(Math.round(tile.uncertainty)) : '-'],
    ['Resource', tile => tile ? String(Math.round(tile.resourceScore)) : '-'],
    ['Slots', tile => tile ? String(Math.round(tile.slotScore)) : '-'],
    ['Special', tile => tile ? String(Math.round(tile.specialScore)) : '-'],
    ['Owned distance', tile => tile?.nearestOwnedDistance !== null && tile?.nearestOwnedDistance !== undefined ? tile.nearestOwnedDistance.toFixed(1) : '-']
  ];
  return <div className="comparison-table"><div><span>Signal</span><span>{left?.key || '-'}</span><span>{right?.key || '-'}</span></div>{rows.map(([label, fn]) => <div key={label}><span>{label}</span><span>{fn(left)}</span><span>{fn(right)}</span></div>)}</div>;
}

function Expeditions({ items }: { items: ExpeditionMetric[] }) {
  if (!items.length) return null;
  return <section className="expedition-list"><div className="section-head"><div><span className="eyebrow">EVENT WINDOWS</span><h2>Expeditions</h2></div></div>{items.slice(0, 6).map(item => <article key={item.id}><Timer size={15}/><div><strong>{item.missionName}</strong><span>{item.tileKey} | score {Math.round(item.totalScore)} | deadline {displayDate(item.deadlineUtc)}</span></div></article>)}</section>;
}

function Empty({ text }: { text:string }) { return <div className="empty"><Database size={19}/><span>{text}</span></div>; }
